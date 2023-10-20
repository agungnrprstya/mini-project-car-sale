import React from "react";
import { APIAuth } from "../../apis/APIAuth";
import { Link } from "react-router-dom";

const logout = async () => {
  await APIAuth.signOut();
};

function LandingPage() {
  return (
    <>
      <h1>Landing Page</h1>
      <Link to="/login">
        <button>Login</button>
      </Link>
      <button onClick={logout}>Logout</button>
    </>
  );
}

export default LandingPage;
