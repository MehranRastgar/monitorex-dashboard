import React, { useEffect, useContext, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { isMobile, deviceDetect } from "react-device-detect";
import { LangContextProvider } from "../../store/langContext";
import TopNav from "../topnav/TopNav";

const eventScreenSize: number = 800;
import useSWR from "swr";
import type { SWRConfiguration } from "swr";
import Script from "next/script";
import axios from "axios";
import { Settings } from "../../types/types";
import {
  fetchSettingsAsync,
  selectSettingsStatus,
  selectSettings,
  crmStatus,
  crmChangeState,
} from "../../store/slices/settingsSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import imageLoader from "../../imageLoader";
// import FooterMain from "./footers/footer";
import { signInCheck } from "../../store/slices/clientSlice";
import { BsHeadset } from "react-icons/bs";
import classes from "./MainLayout.module.scss";
import SidebarContext, {
  SidebarContextProvider,
} from "../../store/sidebarContext";

const fetcher = (URL: string) => axios.get(URL).then((res) => res.data);
const config: SWRConfiguration = {
  fallbackData: "fallback",
  revalidateOnMount: false,
  // ...
};

import Router, { useRouter } from "next/router";
import LoadingOne, { LoadingTwo } from "../loader/default";
import { setDeviceType } from "../../store/slices/themeSlice";
import Sidebar from "../sidebar/Sidebar";

var changeRoute: boolean = false;

// function changeRoute() {
//   changePro = true;
// }
// function changeRoute2() {
//   changePro = false;
// }

// Router.events.on("routeChangeStart", changeRoute);
// Router.events.on("routeChangeError", changeRoute2);
// Router.events.on("routeChangeComplete", changeRoute2);
Router.events.on("routeChangeStart", isLoader);
Router.events.on("hashChangeComplete", isComplete);
Router.events.on("routeChangeError", isComplete);

function isLoader() {
  changeRoute = true;
}
function isComplete() {
  changeRoute = false;
}

var scrollBefore = 0;

function LayoutLogin({ children }: { children: any }) {
  // const { data, error } = useSWR<Settings[]>(
  //   process.env.NEXT_PUBLIC_BASE_API_URL + "/settings/name/categories",
  //   fetcher,
  //   config
  // );
  const dispatch = useAppDispatch();
  const crmRequest = useAppSelector(crmStatus);
  const [ismob, setIsmob] = useState<string>("undefined");
  const [updateSize, setUpdateSize] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [navHidden, setNavHidden] = useState<boolean>(false);
  const [lastNumber, setLastNumber] = useState<number>(500);
  const [config, setConfig] = useState<boolean>(false);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  //================================================
  function configPage() {
    dispatch(fetchSettingsAsync());
    console.log("justOne time");
    dispatch(signInCheck());
  }
  useEffect(() => {
    if (!config) {
      setConfig(true);
      configPage();
    }
  }, []);
  //================================================
  function scrollFunction() {
    var offsetY: number = window.pageYOffset;
    setLastNumber(window.pageYOffset);
    if (offsetY > 1) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }

    if (scrollBefore - offsetY < 0) {
      setNavHidden(true);
    } else {
      setNavHidden(false);
    }
    scrollBefore = window.pageYOffset;
  }
  //================================================
  function sizeComponent() {
    var width = document.body.clientWidth;
    if (width < eventScreenSize) {
      setIsmob("true");
    } else if (width > eventScreenSize) {
      setIsmob("false");
    }
    setUpdateSize((pervValue) => !pervValue);
  }

  useEffect(() => {
    window.addEventListener("scroll", scrollFunction);
    window.addEventListener("resize", sizeComponent);

    return () => {
      window.removeEventListener("scroll", scrollFunction);
      window.removeEventListener("resize", sizeComponent);
    };

    // configPage();
  }, []);
  //================================================
  useEffect(() => {
    if (isMobile === true) {
      dispatch(setDeviceType("mobile"));
    } else {
      dispatch(setDeviceType("pc"));
    }
  }, [isMobile]);

  useEffect(() => {
    const handleStartChange = () => {
      setIsLoading(true);
    };
    const handleEndChange = () => {
      setIsLoading(false);
    };

    router.events.on("routeChangeStart", handleStartChange);
    router.events.on("routeChangeComplete", handleEndChange);
    router.events.on("routeChangeError", handleEndChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off("routeChangeStart", handleStartChange);
      router.events.off("routeChangeComplete", handleEndChange);
      router.events.off("routeChangeError", handleEndChange);
    };
  }, []);

  //================================================
  function checkHoteKey(key: string) {
    console.time(key);
    // if()
  }
  const sidebarCtx = useContext(SidebarContext);

  return (
    <>
      {crmRequest === "open" ? (
        <Script
          id="goftino"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
        
          !function(){var i="mW4ieC",a=window,d=document;function g(){var g=d.createElement("script"),s="https://www.goftino.com/widget/"+i,l=localStorage.getItem("goftino_"+i);g.async=!0,g.src=l?s+"?o="+l:s;d.getElementsByTagName("head")[0].appendChild(g);}"complete"===d.readyState?g():a.attachEvent?a.attachEvent("onload",g):a.addEventListener("load",g,!1);}();
        
        `,
          }}
        />
      ) : (
        <></>
      )}
      {isLoading ? (
        <div className="fixed flex-wrap flex items-center justify-center z-[1000] bg-transparent top-0 left-0 h-[100%] w-[100%]">
          <div className="flex flex-wrap h-fit">
            <div className="flex h-fit justify-center w-full">
              <Image
                className=""
                loader={imageLoader}
                alt="InoMal Logo"
                src={"/Monitorex.png"}
                unoptimized
                width={160}
                height={100}
              />
            </div>
            <div className="flex h-fit justify-center w-full">
              <LoadingTwo />
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}

      <div className="flex bg-transparent h-[100%] w-[100%]">
        {/* <Sidebar /> */}
        {/* <div className={classes.main}> */}

        {/* <TopNav /> */}
        {/* <Outlet /> */}
        {children}
        {/* </div> */}
      </div>
    </>
  );
}

export default LayoutLogin;
