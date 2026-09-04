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
    Cookies.get.mockReturnValue(undefined);
  });

  describe("isAuthorized", () => {
    test("true when an idToken cookie is present", () => {
      Cookies.get.mockReturnValue("some.token.value");
      expect(authentication.isAuthorized()).toBe(true);
    });

    test("false when no token cookie", () => {
      Cookies.get.mockReturnValue(undefined);
      expect(authentication.isAuthorized()).toBe(false);
    });
  });

  describe("logOut", () => {
    test("clears all credential cookies and purges persisted state", async () => {
      await authentication.logOut();
      expect(Cookies.remove).toHaveBeenCalledWith("idToken");
      expect(Cookies.remove).toHaveBeenCalledWith("oauthAccessToken");
      expect(Cookies.remove).toHaveBeenCalledWith("localId");
    });
  });
});