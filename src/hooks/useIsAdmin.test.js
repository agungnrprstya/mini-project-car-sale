import React from "react";
import { renderHook } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import useIsAdmin from "./useIsAdmin";
import adminsSlice from "../store/adminsSlice";
import { auth } from "../configs/firebase";

jest.mock("../configs/firebase", () => ({
  auth: { currentUser: null },
}));

const renderWithStore = (adminsData, uid) => {
  auth.currentUser = uid ? { uid } : null;
  const store = configureStore({
    reducer: { admins: adminsSlice },
    preloadedState: { admins: { status: "success", message: "", data: adminsData } },
  });
  return renderHook(() => useIsAdmin(), { wrapper: ({ children }) => <Provider store={store}>{children}</Provider> });
};

describe("useIsAdmin", () => {
  test("true when signed-in user UID is in the admins list", () => {
    const { result } = renderWithStore([{ id: "admin-uid-1" }, { id: "admin-uid-2" }], "admin-uid-1");
    expect(result.current).toBe(true);
  });

  test("false when signed-in user UID is not in the admins list", () => {
    const { result } = renderWithStore([{ id: "admin-uid-1" }], "ordinary-uid");
    expect(result.current).toBe(false);
  });

  test("false when signed out", () => {
    const { result } = renderWithStore([{ id: "admin-uid-1" }], null);
    expect(result.current).toBe(false);
  });
});
