import { useMemo } from "react";
import { auth } from "../configs/firebase";
import { useSelector } from "react-redux";
import { selectAdmins } from "../store/adminsSlice";

// True when the signed-in Firebase user's UID exists in the `admins`
// collection. Firestore rules are the real enforcement — this only gates the UI.
export default function useIsAdmin() {
  const admins = useSelector(selectAdmins);
  return useMemo(
    () => admins.data?.some((admin) => admin.id === auth.currentUser?.uid) || false,
    [admins.data]
  );
}
