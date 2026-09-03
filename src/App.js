import React, { useEffect } from "react";
import RouteManagement from "./routers";
import { useDispatch } from "react-redux";
import { fetchGetAdmins } from "./store/adminsSlice";

function App() {
  const dispatch = useDispatch();

  // Load the admin list once at boot so Navbar / AdminRoute know who is admin
  // without a per-page fetch. Firestore rules stay the real enforcement.
  useEffect(() => {
    dispatch(fetchGetAdmins());
  }, [dispatch]);

  return <RouteManagement />;
}

export default App;
