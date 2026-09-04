import React, { useEffect } from "react";
import RouteManagement from "./routers";
import { useDispatch } from "react-redux";
import { resetAdmins, fetchGetAdmins } from "./store/adminsSlice";
import { auth } from "./configs/firebase";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // Only signed-in users may read the admins collection, so fetch it
      // here instead of at boot (a boot fetch always fails for visitors).
      if (user) {
        dispatch(fetchGetAdmins());
      } else {
        dispatch(resetAdmins());
      }
    });
    return unsubscribe;
  }, [dispatch]);

  return <RouteManagement />;
}

export default App;
