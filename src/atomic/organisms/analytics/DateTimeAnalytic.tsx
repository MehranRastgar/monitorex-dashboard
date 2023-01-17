import { Grid, ToggleButton, ToggleButtonGroup } from "@mui/material";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
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
import SelectDevicesForAnlize from "../SelectDevicesForAnlize";

const dateTimeStartProps = {
  label: "startDate",
};
const dateTimeEndProps = {
  label: "endDate",
};
const locales = ["en", "fa"] as const;
export default function DateTimeAnalytic() {
  const dispatch = useAppDispatch();
  const selectSD = useAppSelector(selectStartDate);
  const selectED = useAppSelector(selectEndDate);
  const [locale, setLocale] = useState<typeof locales[number]>("fa");
  const [value, setValue] = useState<Dayjs | null>(null);
  const [value2, setValue2] = useState<Dayjs | null>(null);
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
      <Item>
        {selectSD !== undefined && selectED !== undefined
          ? new Date(selectSD).getDate() - new Date(selectED).getDate() + " D"
          : ""}

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
        <Box>
          <Grid container spacing={2}>
            <Grid>
              <DateTimePickerComponent
                {...dateTimeEndProps}
                locale={locale}
                value={value2}
                setValue={setValue2}
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
          </Grid>
          <Grid>
            <SelectDevicesForAnlize />
          </Grid>
        </Box>
      </Item>
    </>
  );
}
