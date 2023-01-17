import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { selectDevicesData } from "../../../store/slices/devicesSlice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { DevicesReceiveType } from "../../../store/api/devicesApi";
import { Button, Grid } from "@mui/material";
import { SensorsReceiveTpe } from "../../../components/pages/sensors/sensorsTable";
import { Box } from "@mui/system";
import SensorObject from "../sensor/SensorObject";
import { selectSelectedSensors } from "../../../store/slices/sensorsSlice";
import {
  addSelectedSensors,
  removeSelectedSensors,
  selectSelectedSensorsAnalize,
} from "../../../store/slices/analizeSlice";
import { useTranslation } from "react-i18next";

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

export default function SelectDeviceFromSelector() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const selectDevices = useAppSelector(selectDevicesData);
  const selectedSensorsSlice = useAppSelector(selectSelectedSensorsAnalize);

  const [deviceName, setdeviceName] = React.useState<string[]>([]);
  const [sensorName, setSensorName] = React.useState<string[]>([]);

  const [selectedSensors, setSelectedSensors] = React.useState<
    SensorsReceiveTpe[]
  >([]);
  const [selectedDevice, setSelectedDevice] =
    React.useState<DevicesReceiveType>();

  const OnClickSelectSensor = () => {
    console.log(deviceName);
    console.log(sensorName);
    const ind1 = selectDevices.findIndex(
      (item) => item._id === deviceName?.[0]
    );
    const ind2 = selectDevices?.[ind1]?.sensors?.findIndex(
      (item) => item._id === sensorName?.[0]
    );
    const arr: SensorsReceiveTpe[] = [...selectedSensors];
    if (
      ind2 !== undefined &&
      selectDevices?.[ind1]?.sensors?.[ind2] !== undefined
    ) {
      arr.push(selectDevices?.[ind1]?.sensors?.[ind2] as SensorsReceiveTpe);
      dispatch(
        addSelectedSensors(
          selectDevices?.[ind1]?.sensors?.[ind2] as SensorsReceiveTpe
        )
      );
    }
    setSelectedSensors(arr);
    console.log("selectedSensorsSlice", selectedSensorsSlice);
  };

  const handleChangeMultiple = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { options } = event.target;
    const value: string[] = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setdeviceName(value);
    const ind = selectDevices.findIndex((item) => item._id === value?.[0]);
    if (ind >= 0) setSelectedDevice(selectDevices[ind]);
    console.log("selectDevices", value);
  };
  const handleChangeSelectSensor = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { options } = event.target;
    const value: string[] = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setSensorName(value);
  };

  return (
    <Box className="flex justify-start w-full mt-10">
      <FormControl
        color={"secondary"}
        sx={{
          ".MuiFormControl-root": {
            borderSize: "5px",
          },
          m: 4,
          minWidth: 120,
          maxWidth: 300,
        }}
      >
        <InputLabel
          sx={{ color: "var(--text-color)" }}
          shrink
          htmlFor="select-multiple-native"
        >
          {t("devices")}
        </InputLabel>
        <Select
          sx={{ color: "var(--text-color)" }}
          multiple
          native
          value={deviceName}
          // @ts-ignore Typings are not considering `native`
          onChange={handleChangeMultiple}
          label="Native"
          inputProps={{
            id: "select-multiple-native",
          }}
        >
          {selectDevices.map((item, index) => (
            <option key={index} value={item._id}>
              {item.title}
            </option>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ m: 4, minWidth: 120, maxWidth: 300 }}>
        <InputLabel
          sx={{ color: "var(--text-color)" }}
          shrink
          htmlFor="select-multiple-native"
        >
          {t("sensors")}
        </InputLabel>
        <Select
          sx={{ color: "var(--text-color)" }}
          multiple
          native
          value={sensorName}
          // @ts-ignore Typings are not considering `native`
          onChange={handleChangeSelectSensor}
          label="Native"
          inputProps={{
            id: "select-multiple-native",
          }}
        >
          {selectedDevice?.sensors?.map((item, index) => (
            <option key={index} value={item._id}>
              {item.title}
            </option>
          ))}
        </Select>
      </FormControl>
      <Button
        onClick={(e) => {
          OnClickSelectSensor();
        }}
      >
        +add to analize
      </Button>
      <Box>
        <Grid container spacing={2}>
          {selectedSensorsSlice?.map((sensor, index) => (
            <>
              <Grid>
                <SensorObject sensor={sensor} key={index} />
                <Button
                  onClick={(e) => {
                    dispatch(removeSelectedSensors(sensor._id ?? ""));
                  }}
                >
                  -
                </Button>
              </Grid>
            </>
          ))}
        </Grid>
      </Box>
      {selectedSensorsSlice?.length}
    </Box>
  );
}
