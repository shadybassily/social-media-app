import React, { useContext, useEffect } from "react";
import { appContext } from "../App";
import { auth, provider } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { Navigate } from "react-router-dom";

export default function Login() {
  const handleLogin = async () => {
    await signInWithPopup(auth, provider);
    <Navigate to="/" replace />;
  };

  const {user} = useContext(appContext)
  if(user){
    return <Navigate to='/' replace /> 
  }
  return (
    <div>
      <button onClick={handleLogin} className="mt-5">
        Continue with Google
      </button>
    </div>
  );
}
