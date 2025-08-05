import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import Login from "./Login";
import SignUp from "./signup";
import { onAuthStateChanged, signOut } from "firebase/auth";
import HomeScreen from "./Homepage";

function Register() {
  const [user, setUser] = useState(null);
  const [showSignUp, setShowSignUp] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <div>
      {user ? (
        user.emailVerified ? (
          <>
            <h2>Welcome, {user.email}</h2>
            <button onClick={handleLogout}>Logout</button>
            <HomeScreen />
          </>
        ) : (
          <>
            <h2>Please verify your email to access the app.</h2>
            <button onClick={handleLogout}>Logout</button>
          </>
        )
      ) : (
        <>
          {showSignUp ? (
            <>
              <SignUp />
              <p>
                Already have an account?{" "}
                <button
                  onClick={() => setShowSignUp(false)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "blue",
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                >
                  Login
                </button>
              </p>
            </>
          ) : (
            <>
              <Login />
              <p>
                Don’t have an account?{" "}
                <button
                  onClick={() => setShowSignUp(true)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "blue",
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                >
                  Sign Up
                </button>
              </p>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default Register;
