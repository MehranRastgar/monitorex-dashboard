import React from 'react';
import ThemeBox from './themeBox/ThemeBox';
import LangBox from './langBox/LangBox';
import Profile from './profile/Profile';

import classes from './TopNavRightBox.module.scss';
import Messages from './Messages/Messages';
import TimeBox from './langBox/TimeBox';

function TopNavRightBox() {
  return (
    <div className="flex w-1/4">
      <div className={classes.wrapper}>
        {/* <Messages /> */}
        <TimeBox />
        <LangBox />
        <ThemeBox />
        <Profile />
      </div>
    </div>
  );
}

export default TopNavRightBox;
