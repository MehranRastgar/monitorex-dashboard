import React, { useContext } from "react";
import { Icon } from "@iconify/react";
import { useWindowSize } from "usehooks-ts";
import SearchBox from "./searchBox/SearchBox";
import TopNavRightBox from "./rightBox/TopNavRightBox";
import SidebarContext from "../../store/sidebarContext";

import classes from "./TopNav.module.scss";
import TopNavMenu from "./rightBox/TopNavMenu/TopNavMenu";

function TopNav() {
  const sideOpenCtx = useContext(SidebarContext);
  const { width } = useWindowSize();

  function openSidebarHandler() {
    sideOpenCtx.toggleSidebar();
    if (width <= 768) document.body.classList.toggle("sidebar__open");
  }

  return (
    <div
      className={
        "items-end fixed bg-[var(--header-bgc)] flex w-full z-[200] "
      }
    >
      <div className={'flex '}>
        {/* <div
          className={classes.topNav_left_menu_icon}
          onClick={openSidebarHandler}
        >
          <Icon icon="ci:menu-alt-03" width="24" />
        </div>
        <div className={classes.topNav_left_menu} onClick={openSidebarHandler}>
          <div className="topNav_left_menu_open">
            <Icon icon="ci:menu-alt-03" width="24" />
          </div>
          <div className="topNav_left_menu_close">
            <Icon icon="eva:close-fill" width="24" />
          </div>
        </div> */}
        {/* <div className={classes.search_desktop_wrapper}>
          <SearchBox />

        </div> */}
      </div>
      <div className="items-end w-3/5 xl:w-3/4 hidden md:flex">
        <TopNavMenu />
      </div>
      <div className="flex w-fit mx-4"></div>
      {/* <br /> */}
      <TopNavRightBox />
      {/* <div className={classes.search_tablet_wrapper}>
        <SearchBox />
      </div> */}
    </div>
  );
}

export default TopNav;
