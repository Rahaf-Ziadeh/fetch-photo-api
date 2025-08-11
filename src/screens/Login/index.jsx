import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../services/firebase";
import { useTranslation } from "react-i18next";
import "./style.css";
import LanguageBtn from "../../components/LanguageBtn";
import "../../i18n";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const { t } = useTranslation();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      if (!user.emailVerified) {
        setMsg(t("Please verify your email to access the app."));
        return;
      }

      setMsg(`${t("Login")} ${t("successful")}!`);
    } catch (error) {
      setMsg(error.message);
    }
  };

  return (
    <div className="container">
      <LanguageBtn />
      <h1>{t("Login")}</h1>
      <p>{t("Enter your credentials to log in.")}</p>
      <hr />

      {msg && (
        <p
          className={
            msg.includes("successful") ? "message-success" : "message-error"
          }
        >
          {msg}
        </p>
      )}

      <form onSubmit={handleLogin}>
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

        <div className="clearfix">
          <button type="submit" className="signupbtn">
            {t("Login")}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
