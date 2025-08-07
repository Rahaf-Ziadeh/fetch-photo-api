import React, { useEffect, useState } from "react";
import { auth } from "../../services/firebase";
import Login from "../Login";
import SignUp from "../Signup";
import { onAuthStateChanged, signOut } from "firebase/auth";
import HomeScreen from "../HomePage";
import "../../i18n";
import { useTranslation } from "react-i18next";
import "./style.css";


function Register() {
  const [user, setUser] = useState(null);
  const [showSignUp, setShowSignUp] = useState(false);
  const { t, i18n } = useTranslation();

 useEffect(() => {
  i18n.changeLanguage("ar");
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });
  return () => unsubscribe();
}, []); 


  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <div className="register-container">
      <div className="language-toggle">
        <button onClick={() => i18n.changeLanguage("en")}>EN</button>
        <button onClick={() => i18n.changeLanguage("ar")}>AR</button>
      </div>
      
      {user ? (
        user.emailVerified ? (
          <>
            <h2>
              {t("Welcome")}, {user.email}
            </h2>
            <button onClick={handleLogout}>{t("Logout")}</button>
            <HomeScreen />
          </>
        ) : (
          <>
            <h2>{t("Please verify your email to access the app.")}</h2>
            <button onClick={handleLogout}>Logout</button>
          </>
        )
      ) : (
        <>
          {showSignUp ? (
            <>
              <SignUp />
              <p>
                {t("Already have an account?")}
                <button
                  onClick={() => setShowSignUp(false)}
                  className="link-button"
                >
                  {t("Login")}
                </button>
              </p>
            </>
          ) : (
            <>
              <Login />
              <p>
                {t("Don’t have an account?")}
                <button
                  onClick={() => setShowSignUp(true)}
                  className="link-button"
                >
                  {t("Sign Up")}
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
