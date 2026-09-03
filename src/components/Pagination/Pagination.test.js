import React from "react";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Pagination from "./index";

describe("Pagination", () => {
  test("renders one page link per page", () => {
    const onPageChange = jest.fn();
    render(<Pagination currentPage={1} totalPages={3} onPageChange={onPageChange} />);

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  test("clicking a page number reports that page", () => {
    const onPageChange = jest.fn();
    render(<Pagination currentPage={1} totalPages={3} onPageChange={onPageChange} />);

    act(() => {
      userEvent.click(screen.getByText("2"));
    });

    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  test("does not go below page 1", () => {
    const onPageChange = jest.fn();
    render(<Pagination currentPage={1} totalPages={3} onPageChange={onPageChange} />);

    act(() => {
      userEvent.click(screen.getByText("Previous"));
    });

    expect(onPageChange).not.toHaveBeenCalled();
  });

  test("does not go past the last page", () => {
    const onPageChange = jest.fn();
    render(<Pagination currentPage={3} totalPages={3} onPageChange={onPageChange} />);

    act(() => {
      userEvent.click(screen.getByText("Next"));
    });

    expect(onPageChange).not.toHaveBeenCalled();
  });

  test("renders no page links when there are no pages", () => {
    const onPageChange = jest.fn();
    render(<Pagination currentPage={1} totalPages={NaN} onPageChange={onPageChange} />);

    // Array.from({ length: NaN }) is empty, so only prev/next render
    expect(screen.queryByText("1")).not.toBeInTheDocument();
  });
});
