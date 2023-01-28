import { Button, Grid, ToggleButton, ToggleButtonGroup } from "@mui/material";
import Box from "@mui/material/Box";
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
  useTransition,
} from "react";
import Item from "../../atoms/Item/Item";
import DateTimePickerComponent from "../../molecules/DateTime/DateTimePicker";
import dayjs, { Dayjs } from "dayjs";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  selectEndDate,
  selectStartDate,
  setEndDate,
  setStartDate,
} from "../../../store/slices/analizeSlice";
import SelectDevicesForAnalize from "../SelectDevicesForAnalize";
import { useTranslation } from "react-i18next";

const dateTimeStartProps = {
  label: "startDate",
};
const dateTimeEndProps = {
  label: "endDate",
};
const locales = ["en", "fa"] as const;
export default function DateTimeAnalytic() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const selectSD = useAppSelector(selectStartDate);
  const selectED = useAppSelector(selectEndDate);
  const [locale, setLocale] = useState<typeof locales[number]>("fa");
  const [value, setValue] = useState<Dayjs | null>(null);
  const [value2, setValue2] = useState<Dayjs | null>(dayjs());
  useEffect(() => {
    if (value !== null) {
      let publishDate = new Date(1000 * dayjs(value).unix());
      console.log(publishDate.toJSON());
      dispatch(setStartDate(publishDate.toJSON()));
    }
  }, [value]);
  useEffect(() => {
    if (value2 !== null) {
      let publishDate = new Date(1000 * dayjs(value2).unix());

      console.log("toJSON", publishDate.toJSON());
      dispatch(setEndDate(publishDate.toJSON()));
    }
  }, [value2]);
  return (
    <>
      {/* {selectSD !== undefined && selectED !== undefined
          ? new Date(selectSD).getDate() - new Date(selectED).getDate() + " D"
          : ""} */}
      {/* <div
          style={{ direction: "ltr" }}
          className="flex justify-end border border-white/50 rounded-md w-fit m-3 p-2 items-center hover:bg-white/10 backdrop-blur-lg text-lg mb-8"
        >
          <ToggleButtonGroup
            value={locale}
            exclusive
            sx={{ mb: 2, display: "block" }}
          >
            {locales.map((localeItem) => (
              <ToggleButton
                sx={{
                  color: "var(--pending-bgc)",
                  "&.Mui-selected": {
                    color: "var(--text-color)",
                  },
                }}
                key={localeItem}
                value={localeItem}
                onClick={() => {
                  setValue(null);
                  setValue2(null);
                  setLocale(localeItem);
                }}
              >
                {localeItem}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
          <h3 className="flex p-2">{t("calendar")}</h3>
        </div> */}
      <Box className="flex m-2">
        <Grid container spacing={2}>
          <Grid>
            <DateTimePickerComponent
              {...dateTimeEndProps}
              locale={locale}
              value={value2}
              setValue={setValue2}
            />
          </Grid>
          <Grid className="flex">
            <HowMuchBefor
              setValue={setValue}
              str={["hour", "24"]}
              hourValue={24}
            />
            <HowMuchBefor
              setValue={setValue}
              str={["day", "7"]}
              hourValue={24 * 7}
            />
            <HowMuchBefor
              setValue={setValue}
              str={["day", "15"]}
              hourValue={15 * 24}
            />
            <HowMuchBefor
              setValue={setValue}
              str={["month", "1"]}
              hourValue={30 * 24}
            />
            <HowMuchBefor
              setValue={setValue}
              str={["month", "3"]}
              hourValue={3 * 30 * 24}
            />
          </Grid>
          <Grid>
            <DateTimePickerComponent
              {...dateTimeStartProps}
              locale={locale}
              value={value}
              setValue={setValue}
            />
          </Grid>
          {/* <Grid>
              <HowManyDays SD={selectSD} ED={selectED} />
            </Grid> */}
        </Grid>
      </Box>
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

  const { t } = useTranslation();
  function handleClick() {
    if (selectED !== undefined) {
      setValue(dayjs(new Date(selectED).getTime() - hourValue * 3600 * 1000));
    }
    // dispatch(setStartDate(new Date().toString()));
  }
  return (
    <>
      <Box sx={{ p: 1, flexGrow: 1 }}>
        <Button
          onClick={() => {
            handleClick();
          }}
          variant="contained"
          type="button"
          className="border bg-[var(--primaryColor)] py-4"
        >
          <div className="mx-2">{t(str?.[0])}</div>{" "}
          <div className="mx-2">{t(str?.[1])}</div>
        </Button>
      </Box>
    </>
  );
}
