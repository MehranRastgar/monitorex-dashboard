// import * as React from "react";
// import dayjs, { Dayjs } from "dayjs";
// import TextField from "@mui/material/TextField";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { TimePicker } from "@mui/x-date-pickers/TimePicker";
// import Stack from "@mui/material/Stack";
// import DateTimePicker from "../../molecules/DateTime/DateTimePicker";

// export default function TimePickerOne({
//   label,
//   timeValue,
//   setTimeValue,
// }: {
//   label?: string;
//   timeValue: any;
//   setTimeValue: any;
// }) {
//   // const [value, setValue] = React.useState<Dayjs | null>(null);
//   const [value, setValue] = React.useState<Dayjs | null>(dayjs("2022-04-07"));

//   return (
//     <>
//       {" ssssss"}
//       {value?.toISOString()}
//       <LocalizationProvider dateAdapter={AdapterDayjs}>

//         <TimePicker
//           ampm={false}
//           openTo="hours"
//           views={["hours", "minutes"]}
//           inputFormat="HH:mm:ss"
//           mask="__:__:__"
//           label={label}
//           value={value}
//           onChange={(newValue) => {
//             setValue(newValue);
//           }}
//           renderInput={(params) => <TextField sx={style} {...params} />}
//         />
//       </LocalizationProvider>
//     </>
//   );
// }

const style = {
  width: 250,
  boxShadow: 2,
  bgcolor: "var(--card-bgc)",
  ".MuiFormLabel-root": {
    color: "var(--approved-bgc)",
    "-webkit-text-fill-color": "var(--text-color)",
    opacity: 0.8,
    translate: "50px",
    "&.Mui-focused": {
      translate: "0px",
    },
    // "&.MuiInputLabel-formControl": {
    //   translate: "0px",
    // },
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

import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import AdapterJalali from "@date-io/date-fns-jalali";
import "dayjs/locale/fa";

export default function TimePickerOne({
  label,
  timeValue,
  setTimeValue,
  locale,
}: {
  label?: string;
  timeValue: any;
  setTimeValue: any;
  locale?: string;
}) {
  const [value, setValue] = React.useState<Dayjs | null>(null);

  React.useEffect(() => {
    console.log(value?.date);
  }, [value]);

  return (
    <LocalizationProvider
      dateAdapter={
        locale !== undefined && locale !== "fa" ? AdapterDayjs : AdapterJalali
      }
      adapterLocale={
        locale !== undefined && locale !== "fa" ? locale : undefined
      }
    >
      <DateTimePicker
        ampm={false}
        label={label}
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={(params) => <TextField sx={style} {...params} />}
      />
    </LocalizationProvider>
  );
}
