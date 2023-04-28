import React, { useState, useEffect, useContext } from "react";
// import { Link, useLocation } from "react-router-dom";
import { useWindowSize } from "usehooks-ts";
import { useTranslation } from "react-i18next";
import { images } from "../constants";
import sidebarNav from "../config/sidebarNav";
import langContextObj from "../../store/langContext";

// import SidebarContext from "../../store/sidebarContext";
// import LoginContext from "../../store/loginContext";
import { Icon } from "@iconify/react";
import classes from "./Sidebar.module.scss";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import SidebarContext from "../../store/sidebarContext";
import LoginContext from "../../store/loginContext";
import Image from "next/image";
import imageLoader from "../imageLoader";

function Sidebar() {
  const [activeIndex, setActiveIndex] = useState(0);
  const langCtx = useContext(langContextObj);
  const { width } = useWindowSize();
  const router = useRouter();
  // const location = useLocation();
  const sidebarCtx = useContext(SidebarContext);
  const loginCtx = useContext(LoginContext);
  const { t } = useTranslation();

  function openSidebarHandler() {
    //for width>768(tablet size) if sidebar was open in width<768 was opened too.
    //just in case of tablet size and smaller then, sidebar__open can added.
    if (width <= 768) document.body.classList.toggle("sidebar__open");
  }

  function logoutHandler() {
    localStorage.removeItem("access_token");
    openSidebarHandler();
    // loginCtx.toggleLogin();
  }

  function changesLanguage() {
    if (langCtx.lang === "fa") langCtx.toggleLanguage("en");
    else langCtx.toggleLanguage("fa");
  }
  useEffect(() => {
    const curPath = router.asPath.split("/")[1];
    var activeItem = sidebarNav.findIndex((item) => item.section === curPath);
    //console.log(curPath);
    if (!sidebarNav.findIndex((item) => item.section === curPath)) {
      activeItem = 0;
    }
    setActiveIndex(curPath.length === 0 ? 0 : activeItem);
  }, [router]);

  return (
    <div
      className={`${classes.sidebar} ${
        !sidebarCtx.isOpen && classes.sidebar_close
        // false && classes.sidebar_close
      }`}
    >
      <div className={classes.sidebar__logo}>
        <Image
          className={`${classes.sidebar__logo_img} `}
          loader={imageLoader}
          src={"Monitorex.png"}
          alt="monitorex"
          width={100}
          height={50}
        />
      </div>
      <div className={classes.sidebar__menu}>
        {sidebarNav.map((nav, index) => (
          <Link
            href={nav.link}
            key={`nav-${index}`}
            className={`${classes.sidebar__menu__item} ${
              activeIndex === index && classes.active
            }`}
            onClick={openSidebarHandler}
          >
            <div className={classes.sidebar__menu__item__icon}>
              <Icon icon={nav.icon} />
            </div>
            <div className={classes.sidebar__menu__item__txt}>
              {t(nav.text)}
            </div>
          </Link>
        ))}
      </div>
      <div className={[classes.sidebar__menu, classes.logout].join("")}>
        <div className={classes.sidebar__menu__item} onClick={changesLanguage}>
          <div className={classes.sidebar__menu__item__icon}>
            <Icon icon="tabler:language" />
          </div>
          <div className={classes.sidebar__menu__item__txt + " cursor-pointer"}>
            {t("change") + " " + t("language")}
          </div>
        </div>
      </div>
      <div className={[classes.sidebar__menu, classes.logout].join("")}>
        <Link
          href="/login"
          className={classes.sidebar__menu__item}
          onClick={logoutHandler}
        >
          <div className={classes.sidebar__menu__item__icon}>
            <Icon icon="tabler:logout" />
          </div>
          <div className={classes.sidebar__menu__item__txt}>{t("logout")}</div>
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
