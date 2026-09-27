import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../configs/firebase";

// Satu-satunya sumber status login adalah sesi Firebase. Cookie kredensial
// tidak dipakai lagi: cookie adalah session cookie (hilang saat browser
// ditutup) sementara Firebase memakai IndexedDB, sehingga keduanya bisa
// berbeda dan UI memberi sinyal "belum login" padahal sesi masih hidup.
export default function useAuthUser() {
  const [user, setUser] = useState(() => auth.currentUser);
  // Selama pemulihan sesi, `auth.currentUser` masih null. Tanpa flag ini UI
  // akan menampilkan "Sign In" sekejap sebelum berubah menjadi "Logout".
  const [initializing, setInitializing] = useState(() => auth.currentUser == null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (nextUser) => {
      setUser(nextUser);
      setInitializing(false);
    });
    return unsubscribe;
  }, []);

  return { user, initializing };
}
