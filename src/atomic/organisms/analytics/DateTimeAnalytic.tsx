import { Button, Grid, ToggleButton, ToggleButtonGroup } from '@mui/material';
import Box from '@mui/material/Box';
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
  useTransition,
} from 'react';
import Item from '../../atoms/Item/Item';
import DateTimePickerComponent from '../../molecules/DateTime/DateTimePicker';
import dayjs, { Dayjs } from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  selectEndDate,
  selectStartDate,
  selectStartDayjs,
  setEndDate,
  setStartDate,
} from '../../../store/slices/analizeSlice';
import SelectDevicesForAnalize from '../SelectDevicesForAnalize';
import { useTranslation } from 'react-i18next';
import ButtonRegular from '../../atoms/ButtonA/ButtonRegular';
import { selectCalendarMode } from 'src/store/slices/themeSlice';
import { Icon } from '@iconify/react';
import calendarIcon from '@iconify/icons-bx/calendar';

const dateTimeStartProps = {
  label: 'startDate',
};
const dateTimeEndProps = {
  label: 'endDate',
};
const locales = ['en', 'fa'] as const;
export default function DateTimeAnalytic({ localeT }: { localeT: 'en' | 'fa' }) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const selectSD = useAppSelector(selectStartDate);
  const selectED = useAppSelector(selectEndDate);
  const [locale, setLocale] = useState<(typeof locales)[number]>(localeT);
  const [value, setValue] = useState<Dayjs | null>(null);
  const [value2, setValue2] = useState<Dayjs | null>(dayjs());
  const selectLocale = useAppSelector(selectCalendarMode)




  useEffect(() => {
    if (value !== null) {
      let publishDate = new Date(1000 * dayjs(value).unix());
      //console.log(publishDate.toJSON());
      dispatch(setStartDate(publishDate.toJSON()));
    }
  }, [value]);
  useEffect(() => {
    if (value2 !== null) {
      let publishDate = new Date(1000 * dayjs(value2).unix());

      //console.log("toJSON", publishDate.toJSON());
      dispatch(setEndDate(publishDate.toJSON()));
    }
  }, [value2]);

  useEffect(() => {
    if (selectED !== undefined) setValue2(dayjs(selectED));
    console.log('selectSD', selectED);
  }, [selectED]);
  useEffect(() => {
    if (selectSD !== undefined) setValue(dayjs(selectSD));
    console.log('selectSD', selectSD);
  }, [selectSD]);

  return (
    <>
      <section className="flex flex-wrap m-2 justify-center scale-75 lg:scale-100 ">
        <div className='flex w-full justify-center mb-2 '><p className='border rounded-md p-2'>{selectLocale === 'fa' ?
          <div className='flex'><Icon icon={calendarIcon} width="20" /><span className='mx-2'>شمسی</span></div> : <div className='flex'><span className='mx-2'>Julian</span><Icon icon={calendarIcon} width="20" /></div>}</p></div>
        <div className="flex">
          <div>
            <DateTimePickerComponent
              {...dateTimeEndProps}
              locale={locale}
              value={value2}
              setValue={setValue2}
            />
          </div>
          <div className="flex">
            <HowMuchBefor
              setValue={setValue}
              str={['hour', '24']}
              hourValue={24}
            />
            <HowMuchBefor
              setValue={setValue}
              str={['day', '7']}
              hourValue={24 * 7}
            />
            <HowMuchBefor
              setValue={setValue}
              str={['day', '15']}
              hourValue={15 * 24}
            />
            <HowMuchBefor
              setValue={setValue}
              str={['month', '1']}
              hourValue={30 * 24}
            />
            <HowMuchBefor
              setValue={setValue}
              str={['month', '3']}
              hourValue={3 * 30 * 24}
            />
          </div>
          <div>
            <DateTimePickerComponent
              {...dateTimeStartProps}
              locale={locale}
              value={value}
              setValue={setValue}
            />
          </div>

          {/* <Grid>
              <HowManyDays SD={selectSD} ED={selectED} />
            </Grid> */}
        </div>
      </section>
    </>
  );
}

function HowManyDays({ SD, ED }: { SD?: string; ED?: string }) {
  return (
    <Item>
      <div className="p-1">{ED}</div>
      <div className="p-1">{SD}</div>
    </Item>
  );
}
function HowMuchBefor({
  setValue,
  str,
  hourValue,
}: {
  str: string[];
  setValue: Dispatch<SetStateAction<dayjs.Dayjs | null>>;
  hourValue: number;
}) {
  const dispatch = useAppDispatch();
  const selectED = useAppSelector(selectEndDate);
  const selectSDJS = useAppSelector(selectStartDayjs);
  const { t } = useTranslation();
  function handleClick() {
    if (selectED !== undefined) {
      setValue(dayjs(new Date(selectED).getTime() - hourValue * 3600 * 1000));
    }
    // dispatch(setStartDate(new Date().toString()));
  }
  useEffect(() => {
    if (selectSDJS !== undefined) {
      setValue(dayjs(selectSDJS));
    }
  }, [selectSDJS]);

  return (
    <>
      <Box sx={{ p: 1, flexGrow: 1 }}>
        <button
          onClick={() => {
            handleClick();
          }}
          type="button"
          className="hover:bg-cyan-400/30 rounded-lg flex border border-black py-4 bg-black/30 text-white"
        >
          <div className="mx-2">{t(str?.[1])}</div>
          <div className="mx-2">{t(str?.[0])}</div>{' '}
        </button>
      </Box>
    </>
  );
}
