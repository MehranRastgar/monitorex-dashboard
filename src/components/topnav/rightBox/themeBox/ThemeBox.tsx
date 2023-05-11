import { Icon } from '@iconify/react';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import ThemeContext from '../../../../store/themeContext';
import classes from './ThemeBox.module.scss';

function ThemeBox() {
  // const [theme, setTheme] = useState("light");
  const { t } = useTranslation();
  const themeCtx = useContext(ThemeContext);
  let theme = themeCtx.theme;
  return (
    <div>
      {theme !== 'dark' ? (
        <button className="" onClick={() => themeCtx.toggleTheme()}>
          <Icon fontSize={20} icon={'ph:moon-stars-fill'} />
        </button>
      ) : (
        <button className="" onClick={() => themeCtx.toggleTheme()}>
          <Icon fontSize={20} icon={'ph:sun-duotone'} />
        </button>
      )}
    </div>
  );
}

export default ThemeBox;
