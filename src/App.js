import React, { useEffect } from "react";
import RouteManagement from "./routers";
import { useDispatch } from "react-redux";
import { setAuthUser } from "./store/authSlice";
import { auth } from "./configs/firebase";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      dispatch(setAuthUser(user));
    });
    return unsubscribe;
  }, [dispatch]);

  return <RouteManagement />;
}

export default App;
