import React, { useEffect } from "react";
import RouteManagement from "./routers";
import { useDispatch } from "react-redux";
import { setAuthUser } from "./store/authSlice";
import { auth } from "./configs/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { fetchGetAdmins } from "./store/adminsSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      dispatch(setAuthUser(user));
    });
    return unsubscribe;
  }, [dispatch]);

  // Load admin list at boot so Navbar/AdminRoute know who is admin
  useEffect(() => {
    dispatch(fetchGetAdmins());
  }, [dispatch]);

  return <RouteManagement />;
}

export default App;
