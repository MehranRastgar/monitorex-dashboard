// export function DateTimePicker2({
//   timeLabel,
//   dateLabel,
//   locale,
// }: {
//   timeLabel?: string;
//   dateLabel?: string;
//   locale?: string;
// }) {
//   const [timeValue, setTimeValue] = useState<Date>();

//   return (
//     <>
//       <Box sx={{ p: 1, flexGrow: 1 }}>
//         <Grid container spacing={2}>
//           <Grid>
//             <TimePickerOne
//               locale={locale}
//               setTimeValue={setTimeValue}
//               timeValue={timeValue}
//               label={timeLabel}
//             />
//           </Grid>
//         </Grid>
//       </Box>
//       {/* <TimePickerOne label={dateLabel} /> */}
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
  },
  ".MuiFormLabel-filled": {
    translate: "0px",
    fontSize: 22,
    fontFamily: "Vazir-Bold"
  },
  ".MuiInputBase-input": {
    color: "var(--text-color)",
    fontSize: 22,
  },
  ".MuiInputLabel-filled": {
    color: "var(--text-color)",
    fontSize: 22,
  },
  ".MuiButtonBase-root": {
    bgcolor: "var(--card-bgc)",
    color: "blue",
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
import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function DateTimePickerComponent({
  label,
  locale,
  value,
  setValue,
}: {
  label?: string;
  locale?: string;
  value?: dayjs.Dayjs | null;
  setValue?: React.Dispatch<React.SetStateAction<dayjs.Dayjs | null>>;
}) {
  const { t } = useTranslation();
  React.useEffect(() => {
    //console.log(value?.date);
  }, [value]);

  return (
    <Box sx={{ p: 1, flexGrow: 1 }}>
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
          label={t(label ?? "")}
          value={value}
          onChange={(newValue) => {
            if (
              setValue !== undefined &&
              newValue !== undefined &&
              newValue !== null
            ) {
              setValue(newValue);
            }
          }}
          renderInput={(params) => <TextField sx={style} {...params} />}
        />
      </LocalizationProvider>
    </Box>
  );
}
