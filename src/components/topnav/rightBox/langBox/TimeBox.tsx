import React, {
    useState,
    useEffect,
    useRef,
    useCallback,
    useContext,
} from 'react';
import { Icon } from '@iconify/react';
import { useOnClickOutside } from 'usehooks-ts';
import LangContext from '../../../../store/langContext';
import calendarIcon from '@iconify/icons-bx/calendar';
import arrowDownBold from '@iconify/icons-ep/arrow-down-bold';

import classes from './LangBox.module.scss';
import { selectCalendarMode, setCalendar } from 'src/store/slices/themeSlice';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';

function TimeBox() {
    const [showLangBox, setShowLangBox] = useState(false);
    const langBoxRef = useRef<HTMLDivElement>(null);
    const langCtx = useContext(LangContext);
    const lang = langCtx.lang;
    const dispatch = useAppDispatch()
    const calselect = useAppSelector(selectCalendarMode)

    const showBoxHandler = function toDo() {
        setShowLangBox((prev) => !prev);
    };
    useEffect(() => {
        document.documentElement.dir = lang === 'en' ? 'ltr' : 'rtl';
        document.documentElement.lang = lang === 'en' ? 'en' : 'fa';
    }, [lang]);
    const checkIfClickedOutside = useCallback(() => {
        // If the menu is open and the clicked target is not within the menu,
        // then close the menu
        if (showLangBox && langBoxRef.current) {
            setShowLangBox(false);
        }
    }, [showLangBox]);

    //custom hook - when click outside of langbox, it will close.
    useOnClickOutside(langBoxRef, checkIfClickedOutside);

    return (
        <div className={classes.lang} ref={langBoxRef}>
            <div className={classes.lanBox} onClick={showBoxHandler}>
                <Icon icon={calendarIcon} width="20" />

                <div className={classes.lang_slc}>{calselect === 'fa' ? 'شمسی' : 'Julian'}</div>

                <Icon icon={arrowDownBold} width="10" />
            </div>
            <div
                className={`${classes.lang_menu} ${showLangBox ? classes.show : 'hidden'
                    }`}
            >
                <div
                    onClick={() => {
                        dispatch(setCalendar('en'))
                        showBoxHandler();
                    }}
                >
                    Julian (en)
                </div>
                <div
                    onClick={() => {
                        dispatch(setCalendar('fa'))
                        showBoxHandler();
                    }}
                >
                    شمسی (fa)
                </div>
            </div>
        </div>
    );
}

export default TimeBox;
