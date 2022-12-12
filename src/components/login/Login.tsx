import React, { useContext, useRef } from "react";

import LoginContext from "../../store/loginContext";
import langContextObj from "../../store/langContext";
import { images } from "../../constants";
import Input from "../UI/input/Input";
import Button from "../UI/button/Button";
import { useTranslation } from "react-i18next";
import classes from "./Login.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import { Icon } from "@iconify/react";
import LangBox from "../topnav/rightBox/langBox/LangBox";
// import { Link, useNavigate } from "react-router-dom";

function LoginBox() {
  const loginCtx = useContext(LoginContext);
  const langCtx = useContext(langContextObj);
  const userNameRef = useRef<HTMLInputElement>(null);
  const errorMessageRef = useRef<HTMLSpanElement>(null);
  // const navigate = useNavigate();
  const router = useRouter();
  const { t } = useTranslation();

  function changesLanguage() {
    if (langCtx.lang === "fa") langCtx.toggleLanguage("en");
    else langCtx.toggleLanguage("fa");
  }
  let isValid = true;
  function loginHandler(e: React.FormEvent) {
    e.preventDefault();
    isValid = userNameRef.current?.value === "admin";
    if (userNameRef.current) {
      if (isValid) {
        loginCtx.toggleLogin();
        router.push("/");
      } else {
        userNameRef.current.focus();
        errorMessageRef.current?.setAttribute(
          "style",
          "display: inline-block;opacity: 1"
        );
      }
    }
  }

  return (
    <div
      className={`${classes.container} ${
        langCtx.lang === "fa" ? classes.rtl : ""
      }`}
    >
      <div className={classes.loginBox}>
        <div className={classes.logo}>
          <img src={"./Monitorex.png"} alt="digikala" />
        </div>
        <h2 className={classes.title}>{t("loginPage")}</h2>
        <form onSubmit={loginHandler}>
          <Input
            ref={userNameRef}
            type={"text"}
            id={"userName"}
            placeholder={"admin"}
          />
          <span ref={errorMessageRef} className={classes.errorMessage}>
            {t("errorMessage")}
          </span>
          <Input
            type={"password"}
            id={"pass"}
            value={"admin"}
            readonly={true}
          />
          <Button type="submit">{t("login")}</Button>
          <Link className={classes.forgat_pass} href="/">
            {t("forgetPass")}
          </Link>
          <div className={classes.checkbox}>
            <input type="checkbox" id="rememberMe" />
            <label htmlFor="rememberMe">{t("rememberMe")}</label>
          </div>
        </form>
        <div className={classes.langbox}>
          <LangBox />
        </div>
      </div>

      {/* <div className={classes.keyPic}>
        <img
          src={require("../../assets/images/Revenue-cuate.svg").default}
          alt="illustrator key"
        />
      </div> */}
    </div>
  );
}

export default LoginBox;
