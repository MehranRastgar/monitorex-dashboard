import { Icon } from '@iconify/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useWindowSize } from 'usehooks-ts';
import SidebarContext from '../../../../store/sidebarContext';
import ThemeContext from '../../../../store/themeContext';
import sidebarNav from '../../../config/sidebarNav';
import langContextObj from 'src/store/langContext';
import logoutIcon from '@iconify/icons-tabler/logout';

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
    if (width <= 768) document.body.classList.toggle('sidebar__open');
  }

  useEffect(() => {
    const curPath = router.asPath.split('/')[1];
    var activeItem = sidebarNav.findIndex((item) => item.section === curPath);
    //console.log(curPath);
    if (!sidebarNav.findIndex((item) => item.section === curPath)) {
      activeItem = 0;
    }
    setActiveIndex(curPath.length === 0 ? 0 : activeItem);
  }, [router]);
  function logoutHandler() {
    localStorage.removeItem('access_token');
    openSidebarHandler();
    // loginCtx.toggleLogin();
  }
  const sidebarCtx = useContext(SidebarContext);
  let theme = themeCtx.theme;
  return (
    <div className="flex items-end overflow-auto">
      {sidebarNav.map((nav, index) => (
        <Link
          href={nav.link}
          key={`nav-${index}`}
          className={`flex items-end border border-[var(--bgc)] rounded-xs p-2  px-4 hover:border-b-[var(--border-color)] ${activeIndex === index
              ? 'bg-[var(--button-primary)] border-b-[var(--border-color)]'
              : ''
            }`}
          onClick={openSidebarHandler}
        >
          {/* <Icon icon={nav.icon} /> */}
          <div className={''}>{t(nav.text)}</div>
        </Link>
      ))}
      <Link
        href="/login"
        className={`flex items-end border border-[var(--bgc)] hover:bg-[var(--rejected-bgc)] rounded-xs p-2 hover:text-[var(--text-accepted)] mx-2`}
        onClick={logoutHandler}
      >
        <div className={'flex items-center mx-1'}>
          <Icon icon={logoutIcon} />
        </div>
        <div className={''}>{t('logout')}</div>
      </Link>
    </div>
  );
}

export default TopNavMenu;
