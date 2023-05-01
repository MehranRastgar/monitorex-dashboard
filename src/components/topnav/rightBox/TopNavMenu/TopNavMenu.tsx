import { Icon } from "@iconify/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useWindowSize } from "usehooks-ts";
import SidebarContext from "../../../../store/sidebarContext";
import ThemeContext from "../../../../store/themeContext";
import sidebarNav from "../../../config/sidebarNav";
import langContextObj from "src/store/langContext";

function TopNavMenu() {
  // const [theme, setTheme] = useState("light");
  const { t } = useTranslation();
  const themeCtx = useContext(ThemeContext);
  const [activeIndex, setActiveIndex] = useState(0);
  const langCtx = useContext(langContextObj);
  const { width } = useWindowSize();
  const router = useRouter();
  // const location = useLocation();

  function openSidebarHandler() {
    //for width>768(tablet size) if sidebar was open in width<768 was opened too.
    //just in case of tablet size and smaller then, sidebar__open can added.
    if (width <= 768) document.body.classList.toggle("sidebar__open");
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
  function logoutHandler() {
    localStorage.removeItem("access_token");
    openSidebarHandler();
    // loginCtx.toggleLogin();
  }
  const sidebarCtx = useContext(SidebarContext);
  let theme = themeCtx.theme;
  return (
    <div className="flex overflow-auto">
      {sidebarNav.map((nav, index) => (
        <Link
          href={nav.link}
          key={`nav-${index}`}
          className={`flex border border-[var(--bgc)] hover:bg-[var(--approved-bgc)] rounded-xs p-2 hover:text-[var(--text-accepted)] mx-2 ${
            activeIndex === index ? "bg-[var(--approved-bgc)]" : ""
          }`}
          onClick={openSidebarHandler}
        >
          {/* <Icon icon={nav.icon} /> */}
          <div className={""}>{t(nav.text)}</div>
        </Link>
      ))}
      <Link
        href="/login"
        className={"flex items-center"}
        onClick={logoutHandler}
      >
        <div className={""}>
          <Icon icon="tabler:logout" />
        </div>
        <div className={""}>{t("logout")}</div>
      </Link>
    </div>
  );
}

export default TopNavMenu;
