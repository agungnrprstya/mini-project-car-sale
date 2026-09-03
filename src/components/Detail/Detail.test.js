import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Detail from "./index";

// Probe: does React Hook Form still receive values when onChange is
// overridden by a custom handler?
// RESULT: YES. onSubmit receives all typed values. register() wires the
// field through ref, not onChange, so overriding onChange does not
// break RHF's value collection.

const noop = () => {};

function renderForm(profile) {
  const onSubmit = jest.fn();
  const formData = { name: "", email: "", phoneNumber: "", address: "" };
  render(
    <Detail
      product={{ carName: "BMW", carPrice: "100", carImage: "http://x/y.jpg" }}
      profile={profile}
      formData={formData}
      handleInput={noop}
      onSubmit={onSubmit}
      loading={false}
    />
  );
  return onSubmit;
}

async function openForm() {
  act(() => {
    userEvent.click(screen.getByRole("button", { name: "Buy" }));
  });
  await waitFor(() => {
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
  });
}

async function submitForm() {
  act(() => {
    userEvent.click(screen.getByRole("button", { name: "Submit" }));
  });
}

describe("Detail checkout form", () => {
  test("new user (no profile): submits typed values", async () => {
    const onSubmit = renderForm(undefined);
    await openForm();

    userEvent.type(screen.getByLabelText("Name"), "Agung");
    userEvent.type(screen.getByLabelText("Email"), "agung@test.com");
    userEvent.type(screen.getByLabelText("Phone Number"), "081234567890");
    userEvent.type(screen.getByLabelText("Address"), "Jl. Sudirman 1");

    await submitForm();

    await waitFor(() => expect(onSubmit).toHaveBeenCalled(), { timeout: 3000 });
    expect(onSubmit.mock.calls[0][0]).toEqual({
      name: "Agung",
      email: "agung@test.com",
      phoneNumber: "081234567890",
      address: "Jl. Sudirman 1",
    });
  });

  test("new user: validation actually runs (blocks invalid email)", async () => {
    const onSubmit = renderForm(undefined);
    await openForm();

    userEvent.type(screen.getByLabelText("Name"), "Agung");
    userEvent.type(screen.getByLabelText("Email"), "bukan-email");
    userEvent.type(screen.getByLabelText("Phone Number"), "081234567890");
    userEvent.type(screen.getByLabelText("Address"), "Jl. Sudirman 1");

    await submitForm();

    // Invalid email must be rejected: onSubmit never fires, error shown
    await waitFor(() => {
      expect(screen.getByText("Please enter a valid email address")).toBeInTheDocument();
    }, { timeout: 3000 });
    expect(onSubmit).not.toHaveBeenCalled();
  });

  test("existing user (profile present): inputs still submitted", async () => {
    const profile = {
      name: "Budi",
      email: "budi@test.com",
      phoneNumber: "081111111111",
      address: "Jl. Thamrin 5",
    };
    const onSubmit = renderForm(profile);
    await openForm();

    await submitForm();

    await waitFor(() => expect(onSubmit).toHaveBeenCalled(), { timeout: 3000 });
    expect(onSubmit.mock.calls[0][0]).toEqual({
      name: "Budi",
      email: "budi@test.com",
      phoneNumber: "081111111111",
      address: "Jl. Thamrin 5",
    });
  });
});
