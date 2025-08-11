import React from "react";
import { useTranslation } from "react-i18next";
import "./style.css";

function LanguageBtn({ onLanguageChange }) {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "ar" : "en";
    i18n.changeLanguage(newLang);
    if (onLanguageChange) onLanguageChange(newLang);
  };

   return (
    <div className="language-toggle"> 
      <button className="language-toggle-btn" onClick={toggleLanguage}>
        {i18n.language === "en" ? "AR" : "EN"}
      </button>
    </div>
  );

}

export default LanguageBtn;
