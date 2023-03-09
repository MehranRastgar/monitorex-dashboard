import React, { useContext, useEffect, useRef } from "react";

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
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectSignInFlag, signInAction } from "../../store/slices/userSlice";
import { SignInRequest } from "../../types/types";
// import { Link, useNavigate } from "react-router-dom";

function LoginBox() {
  const loginCtx = useContext(LoginContext);
  const langCtx = useContext(langContextObj);
  const userNameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const errorMessageRef = useRef<HTMLSpanElement>(null);
  const dispatch = useAppDispatch();
  const selectsigninflag = useAppSelector(selectSignInFlag);

  // const navigate = useNavigate();
  const router = useRouter();
  const { t } = useTranslation();

  function changesLanguage() {
    if (langCtx.lang === "fa") langCtx.toggleLanguage("en");
    else langCtx.toggleLanguage("fa");
  }
  let isValid = true;
  async function loginUser() {
    ////console.log("please write code", SelectMobile);
    // if (otpCode !== 0 && SelectMobile !== undefined) {
    //   const signIn: SignInRequest = {
    //     code: otpCode,
    //     usernamebyphone: SelectMobile,
    //   };
    //  //console.log("please write code", signIn.usernamebyphone);
    //   dipatch(signInAction(signIn)); //signIn api call
    // } else {
    //  //console.log("please write code");
    // }
  }
  function loginHandler(e: React.FormEvent) {
    e.preventDefault();
    //console.log("pass:", passwordRef.current, "userName:", userNameRef.current);
    // isValid = userNameRef.current?.value === "admin";
    if (
      userNameRef?.current?.value === undefined ||
      passwordRef?.current?.value === undefined
    ) {
      return false;
    }
    const signinreq: SignInRequest = {
      userName: userNameRef?.current?.value,
      password: passwordRef?.current?.value,
    };
    dispatch(signInAction(signinreq));
    if (userNameRef.current) {
      if (isValid) {
        loginCtx.toggleLogin();

        // router.push("/");
      } else {
        userNameRef.current.focus();
        errorMessageRef.current?.setAttribute(
          "style",
          "display: inline-block;opacity: 1"
        );
      }
    }
    return true;
  }
  useEffect(() => {
    if (selectsigninflag === "success") {
      //console.log("sign in");
      router.push("/");
    }
  }, [selectsigninflag]);
  return (
    <div
      className={`${classes.container} ${
        langCtx.lang === "fa" ? classes.rtl : ""
      }`}
    >
      <div className={classes.loginBox}>
        <div className={classes.logo}>
          <img src={"./Monitorex.png"} alt="Monitorex" />
        </div>
        <h2 className={classes.title}>{t("loginPage")}</h2>
        {selectsigninflag}
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
          <Input ref={passwordRef} type={"password"} id={"pass"} />
          <Button type="submit">{t("login")}</Button>
          {/* <Link className={classes.forgat_pass} href="/">
            {t("forgetPass")}
          </Link> */}
          {/* <div className={classes.checkbox}>
            <input type="checkbox" id="rememberMe" />
            <label htmlFor="rememberMe">{t("rememberMe")}</label>
          </div> */}
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
