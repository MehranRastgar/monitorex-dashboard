import * as React from "react";
import TextField from "@mui/material/TextField";
import AdapterJalali from "@date-io/date-fns-jalali";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

export default function DatePickerOne() {
  const [value, setValue] = React.useState<Date | null>(new Date(2022, 3, 7));

  return (
    <LocalizationProvider dateAdapter={AdapterJalali}>
      <DatePicker
        mask="____/__/__"
        value={value}
        onChange={(newValue) => setValue(newValue)}
        renderInput={(params) => <TextField sx={style} {...params} />}
      />
    </LocalizationProvider>
  );
}
const style = {
  width: 250,
  boxShadow: 2,
  bgcolor: "var(--card-bgc)",
  ".MuiFormLabel-root": {
    color: "var(--approved-bgc)",
    "-webkit-text-fill-color": "var(--text-color)",
    opacity: 0.8,
  },
  ".MuiInputBase-input": {
    color: "var(--text-color)",
    fontSize: 16,
  },
  ".MuiInputLabel-filled": {
    color: "var(--text-color)",
    fontSize: 16,
  },
  ".MuiButtonBase-root": {
    bgcolor: "var(--card-bgc)",
    color: "var(--text-color)",
  },
};
