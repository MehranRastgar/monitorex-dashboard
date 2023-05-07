import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import ThemeContext from "../../../../store/themeContext";
import classes from "./ThemeBox.module.scss";

function ThemeBox() {
  // const [theme, setTheme] = useState("light");
  const { t } = useTranslation();
  const themeCtx = useContext(ThemeContext);
  let theme = themeCtx.theme;
  return (
    <div className={classes.themeBox}>
      <div
        onClick={() => themeCtx.toggleTheme()}
        className={`${classes.toggle + " justify-center"} ${
          theme === "dark" ? classes.darkMode : ""
        }`}
      >
        <span className="flex justify-center -translate-y-6 "></span>
      </div>
    </div>
  );
}

export default ThemeBox;
