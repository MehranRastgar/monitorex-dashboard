import React, { useEffect, useState, ChangeEvent, useRef } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import { useTranslation } from "react-i18next";
import Item from "../../atoms/Item/Item";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  selectSelectedDevice,
  setSelectedDevice,
} from "../../../store/slices/devicesSlice";
import {
  Autocomplete,
  AutocompleteInputChangeReason,
  Badge,
  Button,
  dialogClasses,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  useFormControl,
} from "@mui/material";
import { DevicesReceiveType } from "../../../store/api/devicesApi";
import { Icon } from "@iconify/react";
import { prototype } from "chart.js";
import { sensor } from "../../../interfaces/Sensor";
import { SensorsReceiveTpe } from "../../../components/pages/sensors/sensorsTable";
import { options } from "../../../components/chart/LineChart";

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: "var(--bgc)",
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: "center",
//   color: "var(--primary)",
// }));
const style = {
  width: 250,
  boxShadow: 2,
  bgcolor: "var(--card-bgc)",
  ".MuiFormLabel-root": {
    color: "var(--approved-bgc)",
  },
  ".MuiInputBase-input": {
    color: "var(--text-color)",
    fontSize: 16,
  },
  ".MuiInputLabel-filled": {
    color: "var(--text-color)",
    fontSize: 16,
  },
};
const StyleDisable = {
  ...style,
  ".MuiInputBase-input": {
    color: "var(--text-color)",
    userSelect: "none",
    "&.Mui-disabled": {
      // background: "initial",
      color: "white",
      opacity: 0.7,
    },
  },

  ".MuiFilledInput-input": {
    textDecorationColor: "var(--text-color)",
  },
  ".Mui-disabled": {
    // background: "initial",
    ".MuiFilledInput-input": {
      color: "var(--text-color)",
    },
    "-webkit-text-fill-color": "var(--text-color)",
    opacity: 0.8,
  },
};
const idPrefix = "device_";
export default function DeviceForm() {
  // const refTitle = useRef<React.MutableRefObject<HTMLInputElement>>();
  const { t } = useTranslation();
  //itemShouldRender
  const selectedDevice = useAppSelector(selectSelectedDevice);
  const dispatch = useAppDispatch();

  // setDevice(selectedDevice);
  // setNumberOfPorts(selectedDevice?.numberOfPorts?.toString());
  // setMultiPort(selectedDevice?.address?.multiPort?.toString());
  // setSMultiPort(selectedDevice?.address?.sMultiPort?.toString());
  // setDeviceType(selectedDevice?.type?.toString());
  // if (selectedDevice !== undefined) pushChange();
  useEffect(() => {}, [selectedDevice]);

  if (selectedDevice !== undefined)
    return (
      <Box className={"select-none"} sx={{ flexGrow: 1 }}>
        <Box sx={{ p: 1 }}>
          <Item>
            <div className="font-Vazir-Medium text-[20px]">
              {t("deviceName")} {selectedDevice?.title ?? ""}
            </div>
          </Item>
        </Box>
        <Box sx={{ p: 1 }}>
          <Item>
            <h2 className="flex w-full p-2 text-xl font-Vazir-Medium">
              {t("specifications")}
            </h2>
            <Box sx={{ p: 1, flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid>
                  <TextField
                    // ref={refTitle}
                    // id={idPrefix + "title"}
                    value={selectedDevice.title}
                    onChange={(e) => {
                      dispatch(
                        setSelectedDevice({
                          ...selectedDevice,
                          title: e.target.value,
                        })
                      );
                    }}
                    variant="filled"
                    sx={style}
                    label={t("title")}
                  />
                </Grid>
                <Grid>
                  <FormControl variant="filled" sx={style}>
                    <InputLabel id="type">type</InputLabel>
                    <Select
                      // id={idPrefix + "type"}
                      labelId="type"
                      value={selectedDevice?.type?.toString()}
                      onChange={(e) => {
                        dispatch(
                          setSelectedDevice({
                            ...selectedDevice,
                            type: e.target.value,
                          })
                        );
                      }}
                      label="type"
                    >
                      <MenuItem value=""></MenuItem>
                      {typesOfDevies.map((nPSe, index) => (
                        <MenuItem key={index} value={nPSe}>
                          {nPSe.toString()}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid>
                  <FormControl variant="filled" sx={{ ...style, width: 150 }}>
                    <InputLabel id="demo-simple-select-standard-label">
                      numberOfPorts
                    </InputLabel>
                    <Select
                      // id={idPrefix + "numberOfPorts"}
                      labelId="demo-simple-select-standard-label"
                      value={selectedDevice?.numberOfPorts?.toString()}
                      onChange={(e) => {
                        dispatch(
                          setSelectedDevice({
                            ...selectedDevice,
                            numberOfPorts: Number(e.target.value),
                          })
                        );
                      }}
                      label="numberOfPorts"
                    >
                      <MenuItem value=""></MenuItem>
                      {selectNumberOfPorts.map((nPSe, index) => (
                        <MenuItem key={index} value={nPSe}>
                          {nPSe.toString()}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid>
                  <DeviceShowWhat
                    type={selectedDevice.type}
                    port={selectedDevice.numberOfPorts}
                  />
                </Grid>
              </Grid>
            </Box>
          </Item>
        </Box>
        <Box sx={{ p: 1 }}>
          <Item>
            <h2 className="flex w-full p-2 text-xl font-Vazir-Medium">
              {t("configuration")}
            </h2>
            <Box sx={{ p: 1, flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid>
                  <FormControl variant="filled" sx={{ ...style, width: 150 }}>
                    <InputLabel id="demo-simple-select-standard-label">
                      Super multiPort
                    </InputLabel>
                    <Select
                      id={idPrefix + "address.sMultiPort"}
                      labelId="demo-simple-select-standard-label"
                      value={selectedDevice?.address?.sMultiPort?.toString()}
                      onChange={(e) => {
                        dispatch(
                          setSelectedDevice({
                            ...selectedDevice,
                            address: {
                              ...selectedDevice.address,
                              sMultiPort: Number(e.target.value),
                            },
                          })
                        );
                      }}
                      label="Super MultiPort"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {selectMultiport.map((nPSe, index) => (
                        <MenuItem key={index} value={nPSe}>
                          {nPSe.toString()}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid>
                  <FormControl variant="filled" sx={{ ...style, width: 150 }}>
                    <InputLabel id="demo-simple-select-standard-label">
                      multiPort
                    </InputLabel>
                    <Select
                      id={idPrefix + "address.multiPort"}
                      labelId="demo-simple-select-standard-label"
                      value={selectedDevice?.address?.multiPort?.toString()}
                      onChange={(e) => {
                        dispatch(
                          setSelectedDevice({
                            ...selectedDevice,
                            address: {
                              ...selectedDevice.address,
                              multiPort: Number(e.target.value),
                            },
                          })
                        );
                      }}
                      label="multiPort"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {selectMultiport.map((nPSe, index) => (
                        <MenuItem key={index} value={nPSe}>
                          {nPSe.toString()}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Box>
          </Item>
        </Box>
        <DevicesPart
          type={selectedDevice.type}
          port={selectedDevice.numberOfPorts}
        />
        <Box sx={{ p: 1 }}>
          <Item>
            <h2 className="flex w-full p-2 text-xl font-Vazir-Medium">
              {t("info")}
            </h2>
            <Box sx={{ p: 1, flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid>
                  <TextField
                    id={idPrefix + "_id"}
                    disabled
                    variant="filled"
                    sx={{
                      ...StyleDisable,

                      width: 250,
                    }}
                    label={t("db_id")}
                    value={selectedDevice?._id}
                  />
                </Grid>
                <Grid>
                  <TextField
                    disabled
                    variant="filled"
                    value={new Date(
                      selectedDevice?.createdAt ?? 0
                    )?.toLocaleString()}
                    sx={{
                      ...StyleDisable,

                      width: 250,
                    }}
                    label={t("createdAt")}
                  />
                </Grid>
                <Grid>
                  <TextField
                    value={new Date(
                      selectedDevice?.updatedAt ?? 0
                    )?.toLocaleString()}
                    disabled
                    variant="filled"
                    sx={{
                      ...StyleDisable,

                      width: 250,
                    }}
                    label={t("updatedAt")}
                  />
                </Grid>
                <Grid>
                  <TextField
                    value={selectedDevice?.__v}
                    disabled
                    variant="filled"
                    sx={{
                      ...StyleDisable,
                      width: 100,
                    }}
                    label={t("schema version")}
                  />
                </Grid>
              </Grid>
            </Box>
          </Item>
        </Box>
        <Button onClick={(e) => console.log(selectedDevice)}>
          Save Changes
        </Button>
      </Box>
    );
  else return <></>;
}

export const selectMultiport: number[] = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
  // '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16',
];
export const selectNumberOfPorts: number[] = [4, 8];
export const typesOfDevies: string[] = [
  "Sensor Cotroller",
  "Electric panel",
  // '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16',
];
const selectPort: object[] = [
  {
    label: "4",
    value: 4,
  },
];

function DeviceShowWhat({ port, type }: { port?: number; type?: string }) {
  useEffect(() => {}, [port, type]);
  return (
    <>
      <div className="mr-10">
        {port === 4 && type === "Sensor Cotroller" ? (
          <div>
            <Icon fontSize={64} icon={"arcticons:deviceinfohw"}></Icon>
            <Badge className="flex translate-x-2 -translate-y-4">4</Badge>
          </div>
        ) : (
          <>
            {port === 8 && type === "Sensor Cotroller" ? (
              <div>
                <Icon fontSize={64} icon={"arcticons:deviceinfohw"}></Icon>
                <Badge className="flex translate-x-6 -translate-y-4">8</Badge>
              </div>
            ) : (
              <div>
                <Icon fontSize={50} icon={"ic:outline-electric-meter"}></Icon>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}

function DevicesPart({ port, type }: { port?: number; type?: string }) {
  const { t } = useTranslation();
  const selectedDevice = useAppSelector(selectSelectedDevice);
  const [sensorsL, setSensorsL] = useState<{ sensor: number }[]>([]);
  const [unitstate, setUnitstate] = useState<string>("");

  function makeSensors() {
    let s: { sensor: number }[] = [];
    if (port && type) {
      for (let i = 1; i <= port; i++) {
        s.push({ sensor: i });
      }
      setSensorsL(s);
    }
  }
  const topUnits = [
    { title: "temperature Centigrade", unit: "°C" },
    { title: "temperature Fahrenheit ", unit: "°F" },
    { title: "temperature Kelvin", unit: "K" },
    { title: "Humidity percentage", unit: "%" },
    { title: "Luminous intensity candela", unit: "cd" },
    { title: "kiloo grams", unit: "kg" },
    { title: "point per milions", unit: "ppm" },
    { title: "mm/hg", unit: "mm/hg" },
  ];
  const topType = [
    { title: "Temperature" },
    { title: "Humidity" },
    { title: "Luminosity" },
    { title: "Velucity" },
    { title: "Density" },
  ];
  // function MyFormHelperText() {
  //   // const { focused } = useFormControl() || {};

  //   // const helperText = React.useMemo(() => {
  //   //   if (focused) {
  //   //     return "This field is being focused";
  //   //   }

  //   //   return "Helper text";
  //   // }, [focused]);

  //   return <FormHelperText>{unitstate}</FormHelperText>;
  // }
  useEffect(() => {
    if (port && type) makeSensors();
  }, [port, unitstate]);
  return (
    <>
      {sensorsL?.map((sensorNum, index) => (
        <>
          <Box sx={{ p: 1 }}>
            <Item>
              <h2 className="flex w-full p-2 text-xl font-Vazir-Medium">
                {t("Sensor - ") + sensorNum.sensor}
                {selectedDevice?.sensors?.[index]?.title}
              </h2>
              <Box sx={{ p: 1, flexGrow: 1 }}>
                <Grid container spacing={2}>
                  <Grid>
                    <TextField
                      id={idPrefix + `sensor?.[${index}]?.title`}
                      variant="filled"
                      sx={{
                        ...style,
                        width: 180,
                      }}
                      label={t("title")}
                    />
                  </Grid>
                  <Grid>
                    <Autocomplete
                      id={idPrefix + `sensor?.[${index}]?.type`}
                      freeSolo
                      onInputChange={(
                        event: React.SyntheticEvent<Element, Event>,
                        value: string,
                        reason: AutocompleteInputChangeReason
                      ) => {}}
                      options={topType.map((option) => option.title)}
                      popupIcon={unitstate}
                      renderInput={(params) => (
                        <>
                          <TextField
                            sx={{
                              ...style,
                              width: 220,
                              ".MuiFormHelperText-root": {
                                color: "var(--text-color)",
                              },
                            }}
                            variant="filled"
                            {...params}
                            label={t("type" ?? "")}
                          />
                        </>
                      )}
                    />
                  </Grid>
                  <Grid>
                    <Autocomplete
                      id={idPrefix + `sensor?.[${index}]?.unit`}
                      freeSolo
                      onInputChange={(
                        event: React.SyntheticEvent<Element, Event>,
                        value: string,
                        reason: AutocompleteInputChangeReason
                      ) => {
                        setUnitstate(
                          topUnits?.[
                            topUnits?.findIndex((it) => it.unit === value)
                          ]?.title
                        );
                      }}
                      options={topUnits.map((option) => option.unit)}
                      popupIcon={unitstate}
                      renderInput={(params) => (
                        <>
                          <TextField
                            sx={{
                              ...style,
                              width: 220,
                              ".MuiFormHelperText-root": {
                                color: "var(--text-color)",
                              },
                            }}
                            variant="filled"
                            {...params}
                            label={t("unit" ?? "")}
                            helperText={
                              topUnits?.[
                                topUnits?.findIndex(
                                  (it) =>
                                    it.unit ===
                                    (
                                      document?.getElementById(
                                        idPrefix + "sensor_" + index + "_unit"
                                      ) as HTMLInputElement
                                    )?.value
                                )
                              ]?.title
                            }
                          />
                        </>
                      )}
                    />
                  </Grid>
                  <Grid>
                    <TextField
                      id={idPrefix + `sensor?.[${index}]?._id`}
                      disabled
                      variant="filled"
                      sx={{
                        ...style,
                        ".MuiInputBase-input": {
                          color: "var(--text-color)",
                          userSelect: "none",
                        },
                        ".MuiFilledInput-input": {
                          textDecorationColor: "var(--text-color)",
                          "::Mui-disabled": {
                            userSelect: "none",
                            textDecorationColor: "var(--text-color)",
                          },
                        },
                        ".Mui-disabled": {
                          userSelect: "none",
                          textDecorationColor: "var(--text-color)",
                        },
                        width: 250,
                      }}
                      label={t("db_id")}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Item>
          </Box>
        </>
      ))}
    </>
  );
}

// deviceId: mongoose.Schema.Types.ObjectId;
// superMultiport: number;
// multiport: number;

interface SensorT {
  port: number;
  title: string;
  type: string;
  unit: string;
  sensorUniqueName: string;
  resolution: "second" | "minute" | "hour";
  // sensorLastSerie: sensorseries;
  // sensorRealtimeValues: SensorRealtimeValues;
}
export interface SensorRealtimeValuesT {
  value: number;
  updateTime: Date;
}

export function TitleHandler() {
  return <></>;
}
