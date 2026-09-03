import authentication from "./authentication";
import Cookies from "js-cookie";
import { auth } from "../configs/firebase";

jest.mock("js-cookie", () => ({
  get: jest.fn(),
  set: jest.fn(),
  remove: jest.fn(),
}));

jest.mock("../configs/firebase", () => ({
  auth: { currentUser: null },
  signOut: undefined,
}));

jest.mock("firebase/auth", () => ({
  signOut: jest.fn().mockResolvedValue(undefined),
}));

// The admin UID list comes from env vars
const ADMIN_1 = "yRtgPLDGpPSpZitUsIKJ0rNVFVg2";
const ADMIN_2 = "kwCxQSYuysSFB5rKeOeaTu5tZOM2";

describe("authentication", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    auth.currentUser = null;
    Cookies.get.mockReturnValue(undefined);
  });

  describe("isAuthorizedAdmin", () => {
    test("true when signed-in Firebase user is an admin", () => {
      auth.currentUser = { uid: ADMIN_1 };
      expect(authentication.isAuthorizedAdmin()).toBe(true);
    });

    test("true for the second admin UID", () => {
      auth.currentUser = { uid: ADMIN_2 };
      expect(authentication.isAuthorizedAdmin()).toBe(true);
    });

    // Regression guard: the old implementation trusted the cookie alone,
    // so setting localId=<admin uid> in DevTools granted admin access.
    test("false when cookie is forged but no matching Firebase session", () => {
      auth.currentUser = { uid: "some-ordinary-user-uid" };
      Cookies.get.mockReturnValue(ADMIN_1);
      expect(authentication.isAuthorizedAdmin()).toBe(false);
    });

    test("false for a non-admin signed-in user", () => {
      auth.currentUser = { uid: "ordinary-uid" };
      expect(authentication.isAuthorizedAdmin()).toBe(false);
    });

    test("falls back to cookie while Firebase restores the session", () => {
      auth.currentUser = null;
      Cookies.get.mockReturnValue(ADMIN_2);
      expect(authentication.isAuthorizedAdmin()).toBe(true);
    });

    test("false when signed out and no cookie", () => {
      auth.currentUser = null;
      Cookies.get.mockReturnValue(undefined);
      expect(authentication.isAuthorizedAdmin()).toBe(false);
    });
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
    test("clears all credential cookies", async () => {
      await authentication.logOut();
      expect(Cookies.remove).toHaveBeenCalledWith("idToken");
      expect(Cookies.remove).toHaveBeenCalledWith("oauthAccessToken");
      expect(Cookies.remove).toHaveBeenCalledWith("localId");
    });
  });
});
