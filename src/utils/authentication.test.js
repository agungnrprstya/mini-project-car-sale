import authentication from "./authentication";
import Cookies from "js-cookie";

jest.mock("js-cookie", () => ({
  get: jest.fn(),
  set: jest.fn(),
  remove: jest.fn(),
}));

jest.mock("../configs/firebase", () => ({
  auth: { currentUser: null },
}));

jest.mock("firebase/auth", () => ({
  signOut: jest.fn().mockResolvedValue(undefined),
}));

jest.mock("../store", () => ({
  persistor: { purge: jest.fn().mockResolvedValue(undefined) },
}));

describe("authentication", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("logOut", () => {
    test("clears all legacy credential cookies and purges persisted state", async () => {
      await authentication.logOut();
      expect(Cookies.remove).toHaveBeenCalledWith("idToken");
      expect(Cookies.remove).toHaveBeenCalledWith("oauthAccessToken");
      expect(Cookies.remove).toHaveBeenCalledWith("localId");
    });
  });
});
