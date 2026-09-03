import reducer, { fetchGetProfiles } from "./index";
import { APIProfiles } from "../../apis/APIProfiles";

jest.mock("../../apis/APIProfiles", () => ({
  APIProfiles: {
    getProfiles: jest.fn(),
  },
}));

// Mock the Firebase config so importing the slice does not try to
// initialise a real Firebase app (which needs env vars).
jest.mock("../../configs/firebase", () => ({
  db: {},
}));

const initialState = { message: "", status: "idle", data: null };

describe("profilesSlice", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("pending sets loading status", () => {
    const state = reducer(initialState, { type: "fetch/getProfiles/pending" });
    expect(state.status).toBe("loading");
  });

  test("fulfilled stores the returned profiles", () => {
    const profiles = [{ id: "a1", name: "Agung" }];
    const state = reducer(initialState, {
      type: "fetch/getProfiles/fulfilled",
      payload: profiles,
    });
    expect(state.status).toBe("success");
    expect(state.data).toEqual(profiles);
  });

  // Regression guard for the white-screen bug: rejected used to store
  // error.stack (a string) in data, and ListUser calls .map() on it.
  test("rejected stores an empty array, not error.stack", () => {
    const state = reducer(initialState, {
      type: "fetch/getProfiles/rejected",
      error: { message: "boom", stack: "Error: boom\n at somewhere" },
    });

    expect(state.status).toBe("failed");
    expect(Array.isArray(state.data)).toBe(true);
    expect(state.data).toEqual([]);
    expect(state.message).toBe("boom");
  });

  test("rejected data is array even when error has no stack", () => {
    const state = reducer(initialState, {
      type: "fetch/getProfiles/rejected",
      error: { message: "network down" },
    });
    expect(state.data).toEqual([]);
    expect(state.message).toBe("network down");
  });

  test("rejected falls back to a default message", () => {
    const state = reducer(initialState, {
      type: "fetch/getProfiles/rejected",
      error: {},
    });
    expect(state.data).toEqual([]);
    expect(state.message).toBe("Failed to get profiles");
  });

  test("thunk calls the API layer", async () => {
    APIProfiles.getProfiles.mockResolvedValue([{ id: "a1" }]);
    const dispatch = jest.fn();
    const getState = jest.fn();

    await fetchGetProfiles()(dispatch, getState, undefined);

    expect(APIProfiles.getProfiles).toHaveBeenCalled();
  });
});
