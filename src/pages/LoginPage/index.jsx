import React, { useState } from "react";
import { auth } from "../../configs/firebase";
import { APIAuth } from "../../apis/APIAuth";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  console.log(auth?.currentUser?.email);
  const signIn = async () => {
    try {
      await APIAuth.signInWithCredentials({ email, password });
      message.success("login successful");
      navigate("/");
    } catch (error) {
      console.log("test");
      message.error("login failed. your email or password is wrong!");
    }
  };

  const signInWithGoogle = async () => {
    try {
      await APIAuth.signInWithGoogleOAuth();
      message.success("login successful");
      navigate("/");
    } catch (error) {
      console.log("test");
      message.error("login failed. google oauth is failed");
    }
  };

  return (
    <div>
      <input placeholder="Email.." onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password.." onChange={(e) => setPassword(e.target.value)} />
      <button onClick={signIn}> Signin </button>
      <button onClick={signInWithGoogle}> Signin with google </button>
    </div>
  );
}
