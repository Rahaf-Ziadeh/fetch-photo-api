import React, {useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../services/firebase";
import "./style.css";
import "../../i18n";
import { useTranslation } from "react-i18next";

import { sendEmailVerification } from "firebase/auth";
import LanguageBtn from "../../components/LanguageBtn";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const { t } = useTranslation();


  const handleSignUp = async (e) => {
    e.preventDefault();
    setMsg("");
    setError("");

    if (password !== repeatPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await sendEmailVerification(userCredential.user);

      setMsg(t("Verification email sent. Please check your inbox."));
      console.log("User created:", userCredential.user);

      await auth.signOut();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="container">
      <LanguageBtn />
      <h1>{t("Sign up")}</h1>
      <p>{t("Please fill in this form to create an account.")}</p>
      <hr />
      <div className="container">
        {error && <p className="error">{error}</p>}
        {msg && <p className="success">{msg}</p>}
        {}
      </div>

      <form onSubmit={handleSignUp}>
        <label>
          <b>{t("Email")}</b>
        </label>
        <input
          type="email"
          placeholder={t("Enter Email")}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>
          <b>{t("Password")}</b>
        </label>
        <input
          type="password"
          placeholder={t("Enter Password")}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label>
          <b>{t("Repeat Password")}</b>
        </label>
        <input
          type="password"
          placeholder="Repeat Password"
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
          required
        />

        <div className="clearfix">
          <button type="button" className="cancelbtn">
            {t("Cancel")}
          </button>
          <button type="submit" className="signupbtn">
            {t("Sign up")}
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
