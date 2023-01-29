import React, { useEffect, useState, ChangeEvent, useRef } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import { useTranslation } from "react-i18next";
import Item from "../../atoms/Item/Item";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { AiOutlineInfoCircle } from "react-icons/ai";
import {
  getDevicesAsync,
  putDeviceAsync,
  selectDevicesStatus,
  selectErrorMessage,
  selectSelectedDevice,
  setErrorMessage,
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
import { DevicesReceiveType, Factor } from "../../../store/api/devicesApi";
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
  const selectStatus = useAppSelector(selectDevicesStatus);
  const selectEM = useAppSelector(selectErrorMessage);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (selectStatus === "success" && selectEM === "success") {
      dispatch(setErrorMessage("idle"));
      dispatch(getDevicesAsync());
    }
  }, [selectEM]);
  useEffect(() => {}, [selectedDevice]);
  if (selectedDevice !== undefined)
    return (
      <form key={selectedDevice?._id ?? "newid"}>
        <Box className={"select-none"} sx={{ flexGrow: 1 }}>
          <Box sx={{ p: 1 }}>
            <Item>
              <div className="font-Vazir-Medium text-[20px]">
                {t("deviceName")} {selectedDevice?.title ?? ""}
              </div>
            </Item>
            <Item>
              <div className="flex w-full p-2 border-b font-Vazir-Medium"></div>
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
                      {t("numberOfPorts")}
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
            </Item>
          </Box>
          {selectedDevice.type === "Sensor Cotroller" ? (
            <Item sx={{ margin: 1 }}>
              <h2 className="flex w-full p-2 text-xl font-Vazir-Medium">
                {t("sensors")}
              </h2>
              <SensorsPart
                type={selectedDevice.type}
                port={selectedDevice.numberOfPorts}
              />
            </Item>
          ) : (
            <></>
          )}
          {selectedDevice.type === "Sensor Cotroller" ? (
            <Box sx={{ p: 1 }}>
              <Item>
                <h2 className="flex w-full p-2 text-xl font-Vazir-Medium">
                  {t("factors")}
                </h2>
                <FactorsPart />
              </Item>
            </Box>
          ) : (
            <></>
          )}
          <Box sx={{ p: 1 }}>
            <Item>
              <h2 className="flex w-full p-2 text-xl font-Vazir-Medium">
                {t("info")}
              </h2>
              <Box sx={{ p: 1, flexGrow: 1 }}>
                <Grid container spacing={2}>
                  <Grid>
                    <TextField
                      disabled
                      variant="filled"
                      sx={{
                        ...StyleDisable,

                        width: 250,
                      }}
                      label={t("db_id")}
                      value={selectedDevice?._id ?? ""}
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
          <Button
            onClick={(e) => {
              dispatch(putDeviceAsync(selectedDevice));
              // dispatch(getDevicesAsync());

              // console.log(selectedDevice);
            }}
          >
            Save Changes
          </Button>
        </Box>
        <div>{selectEM}</div>
        <div>{selectStatus}</div>
      </form>
    );
  else return <></>;
}

export const selectMultiport: number[] = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
  // '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16',
];
export const selectNumberOfPorts: number[] = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30, 31, 32,
];
export const typesOfDevies: string[] = [
  "Sensor Cotroller",
  "Electrical panel",
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
        {type === "Sensor Cotroller" ? (
          <div>
            <Icon fontSize={64} icon={"arcticons:deviceinfohw"}></Icon>
            <Badge className="flex translate-x-2 -translate-y-4">{port}</Badge>
          </div>
        ) : (
          <div>
            <Icon fontSize={50} icon={"ic:outline-electric-meter"}></Icon>
          </div>
        )}
      </div>
    </>
  );
}

function SensorsPart({ port, type }: { port?: number; type?: string }) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const selectedDevice = useAppSelector(selectSelectedDevice);
  const [sensorsL, setSensorsL] = useState<{ sensor: number }[]>([]);
  const [unitstate, setUnitstate] = useState<string>("");

  function makeSensors() {
    let s: SensorsReceiveTpe[] = [];
    if (port && type) {
      for (let i = 0; i <= port - 1; i++) {
        if (selectedDevice?.sensors?.[i] !== undefined)
          s.push(selectedDevice.sensors[i]);
        else s.push({ title: undefined });
      }
      dispatch(setSelectedDevice({ ...selectedDevice, sensors: s }));
    }
    console.log(s);
    // setSensorsL(s);
  }

  const topUnits = [
    { title: "temperature Centigrade", unit: "°C" },
    { title: "temperature Fahrenheit ", unit: "°F" },
    { title: "temperature Kelvin", unit: "K" },
    { title: "Humidity percentage", unit: "%" },
    { title: "Pressure Pascal", unit: "pa" },
    { title: "Luminous intensity candela", unit: "cd" },
    { title: "kiloo grams", unit: "kg" },
    { title: "point per milions", unit: "ppm" },
    { title: "Presure mmHg", unit: "mmHg" },
  ];
  const topType = [
    { title: "Temperature" },
    { title: "Humidity" },
    { title: "Pressure" },
    { title: "Luminosity" },
    { title: "Velucity" },
    { title: "Density" },
  ];
  const defaultTypeProps = {
    options: topType,
    getOptionLabel: (option: any) => option.title,
  };
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
    if (
      port &&
      type &&
      selectedDevice?.sensors !== undefined &&
      selectedDevice?.sensors?.length !== port
    )
      makeSensors();
  }, [port, unitstate, selectedDevice]);

  // useEffect(() => {}, [selectedDevice.sensors]);
  return (
    <>
      {selectedDevice?.sensors !== undefined ? (
        selectedDevice?.sensors?.map((sensor, index) => (
          <>
            <Box key={index + (sensor?._id ?? "sensor")} sx={{ p: 0 }}>
              <h2 className="flex w-full p-2 text-xs font-Vazir-Medium">
                {t("Sensor - ") +
                  index +
                  (sensor?.title ? " (" + sensor?.title + ") " : "")}
              </h2>
              <Box sx={{ p: 0, flexGrow: 1 }}>
                <Grid container spacing={1}>
                  <Grid>
                    <TextField
                      value={sensor.title}
                      id={idPrefix + `sensor?.[${index}]?.title`}
                      variant="filled"
                      onChange={(e) => {
                        let seni: SensorsReceiveTpe[] = [
                          ...(selectedDevice?.sensors ?? []),
                        ];
                        seni[index] = {
                          ...selectedDevice?.sensors?.[index],
                          title: e.target.value,
                        };
                        dispatch(
                          setSelectedDevice({
                            ...selectedDevice,
                            sensors: [...seni],
                          })
                        );
                      }}
                      sx={{
                        ...style,
                        width: 180,
                      }}
                      label={t("title")}
                    />
                  </Grid>
                  <Grid>
                    <Autocomplete
                      // {...defaultTypeProps}
                      id={idPrefix + `sensor?.[${index}]?.type`}
                      value={sensor.type ?? ""}
                      freeSolo
                      onInputChange={(
                        event: React.SyntheticEvent<Element, Event>,
                        value: string,
                        reason: AutocompleteInputChangeReason
                      ) => {
                        let seni: SensorsReceiveTpe[] = [
                          ...(selectedDevice?.sensors ?? []),
                        ];
                        seni[index] = {
                          ...selectedDevice?.sensors?.[index],
                          type: value,
                        };
                        dispatch(
                          setSelectedDevice({
                            ...selectedDevice,
                            sensors: [...seni],
                          })
                        );
                      }}
                      options={topType.map((option) => option.title)}
                      renderInput={(params) => (
                        <>
                          <TextField
                            value={sensor.type}
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
                      value={sensor.unit}
                      id={idPrefix + `sensor?.[${index}]?.unit`}
                      freeSolo
                      onInputChange={(
                        event: React.SyntheticEvent<Element, Event>,
                        value: string,
                        reason: AutocompleteInputChangeReason
                      ) => {
                        let seni: SensorsReceiveTpe[] = [
                          ...(selectedDevice?.sensors ?? []),
                        ];
                        seni[index] = {
                          ...selectedDevice?.sensors?.[index],
                          unit: value,
                        };
                        dispatch(
                          setSelectedDevice({
                            ...selectedDevice,
                            sensors: [...seni],
                          })
                        );
                      }}
                      options={topUnits.map((option) => option.unit)}
                      popupIcon={unitstate}
                      // value={sensor.unit}
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
                                  (it) => it.unit === sensor.unit
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
                      value={sensor?.maxAlarm ?? undefined}
                      onChange={(e) => {
                        let seni: SensorsReceiveTpe[] = [
                          ...(selectedDevice?.sensors ?? []),
                        ];
                        seni[index] = {
                          ...selectedDevice?.sensors?.[index],
                          maxAlarm: Number(e.target.value),
                        };
                        dispatch(
                          setSelectedDevice({
                            ...selectedDevice,
                            sensors: [...seni],
                          })
                        );
                      }}
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
                        width: 100,
                      }}
                      label={t("max")}
                    />
                  </Grid>
                  <Grid>
                    <TextField
                      value={sensor?.minAlarm ?? undefined}
                      onChange={(e) => {
                        let seni: SensorsReceiveTpe[] = [
                          ...(selectedDevice?.sensors ?? []),
                        ];
                        seni[index] = {
                          ...selectedDevice?.sensors?.[index],
                          minAlarm: Number(e.target.value),
                        };
                        dispatch(
                          setSelectedDevice({
                            ...selectedDevice,
                            sensors: [...seni],
                          })
                        );
                      }}
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
                        width: 100,
                      }}
                      label={t("min")}
                    />
                  </Grid>
                </Grid>
              </Box>
              <div className="flex w-full justify-start">
                <h2 className="text-[8px] opacity-75">{sensor?._id}</h2>
              </div>
            </Box>
          </>
        ))
      ) : (
        <></>
      )}
    </>
  );
}
function ElectricalPorts() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const selectedDevice = useAppSelector(selectSelectedDevice);
  const [sensorsL, setSensorsL] = useState<{ sensor: number }[]>([]);
  const [unitstate, setUnitstate] = useState<string>("");

  function makeFactors() {
    let f: Factor[] = [];
    if (selectedDevice?.factors !== undefined) {
      for (let i = 0; i <= selectedDevice?.factors?.length; i++) {
        if (selectedDevice?.factors?.[i] !== undefined)
          f.push(selectedDevice.factors[i]);
        else f.push({ factorName: "", factorPosition: 4, factorValue: 2.5 });
      }

      dispatch(setSelectedDevice({ ...selectedDevice, factors: f }));
    }
    console.log(f);
    // setSensorsL(s);
  }

  useEffect(() => {
    // if (selectedDevice?.factors !== undefined&& ) makeFactors();
  }, [selectedDevice]);

  // useEffect(() => {}, [selectedDevice.sensors]);
  return (
    <>
      {selectedDevice?.electricals?.map((factor: any, index) => (
        <>
          <Box key={index + (factor?._id ?? "sensor")} sx={{ p: 1 }}>
            <Item>
              <h2 className="flex w-full p-2 text-xl font-Vazir-Medium">
                {t("Factor - ") +
                  index +
                  (factor?.factorName ? " (" + factor?.factorName + ") " : "")}
              </h2>
              <Box sx={{ p: 1, flexGrow: 1 }}>
                <Grid container spacing={2}>
                  <Grid>
                    <TextField
                      value={factor.factorName}
                      // id={idPrefix + `sensor?.[${index}]?.name`}
                      variant="filled"
                      onChange={(e) => {
                        let fac: Factor[] = [
                          ...(selectedDevice?.factors ?? []),
                        ];
                        if (fac?.[index] !== undefined) {
                          fac[index] = {
                            ...factor,
                            factorName: e.target.value,
                          };
                        }
                        dispatch(
                          setSelectedDevice({
                            ...selectedDevice,
                            factors: [...fac],
                          })
                        );
                      }}
                      sx={{
                        ...style,
                        width: 180,
                      }}
                      label={t("name")}
                    />
                  </Grid>
                  <Grid>
                    <TextField
                      value={factor.factorPosition}
                      // id={idPrefix + `sensor?.[${index}]?.name`}
                      variant="filled"
                      onChange={(e) => {
                        let fac: Factor[] = [
                          ...(selectedDevice?.factors ?? []),
                        ];
                        if (fac?.[index] !== undefined) {
                          fac[index] = {
                            ...factor,
                            factorPosition: Number(e.target.value),
                          };
                        }
                        dispatch(
                          setSelectedDevice({
                            ...selectedDevice,
                            factors: [...fac],
                          })
                        );
                      }}
                      sx={{
                        ...style,
                        width: 180,
                      }}
                      label={t("factorPosition")}
                    />
                  </Grid>
                  <Grid>
                    <TextField
                      value={factor.factorValue}
                      // id={idPrefix + `sensor?.[${index}]?.name`}
                      variant="filled"
                      onChange={(e) => {
                        let fac: Factor[] = [
                          ...(selectedDevice?.factors ?? []),
                        ];
                        if (fac?.[index] !== undefined) {
                          fac[index] = {
                            ...factor,
                            factorValue: Number(e.target.value),
                          };
                        }
                        dispatch(
                          setSelectedDevice({
                            ...selectedDevice,
                            factors: [...fac],
                          })
                        );
                      }}
                      sx={{
                        ...style,
                        width: 180,
                      }}
                      label={t("factorValue")}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Item>
          </Box>
        </>
      ))}
      <Box>
        <Button
          onClick={() => {
            let fac: Factor[] = [...(selectedDevice?.factors ?? [])];
            fac.push({
              factorName: "",
              factorPosition: 4,
              factorValue: 2.5,
            });
            dispatch(
              setSelectedDevice({
                ...selectedDevice,
                factors: [...fac],
              })
            );
          }}
        >
          add Factor
        </Button>
        <Button
          onClick={() => {
            let fac: Factor[] = [...(selectedDevice?.factors ?? [])];
            fac.pop();
            dispatch(
              setSelectedDevice({
                ...selectedDevice,
                factors: [...fac],
              })
            );
          }}
        >
          clear Factor
        </Button>
      </Box>
    </>
  );
}
function FactorsPart() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const selectedDevice = useAppSelector(selectSelectedDevice);
  const [sensorsL, setSensorsL] = useState<{ sensor: number }[]>([]);
  const [unitstate, setUnitstate] = useState<string>("");

  function makeFactors() {
    let f: Factor[] = [];
    if (selectedDevice?.factors !== undefined) {
      for (let i = 0; i <= selectedDevice?.factors?.length; i++) {
        if (selectedDevice?.factors?.[i] !== undefined)
          f.push(selectedDevice.factors[i]);
        else f.push({ factorName: "", factorPosition: 4, factorValue: 2.5 });
      }

      dispatch(setSelectedDevice({ ...selectedDevice, factors: f }));
    }
    console.log(f);
    // setSensorsL(s);
  }

  useEffect(() => {
    // if (selectedDevice?.factors !== undefined&& ) makeFactors();
  }, [selectedDevice]);

  // useEffect(() => {}, [selectedDevice.sensors]);
  return (
    <>
      {selectedDevice?.factors?.map((factor: any, index) => (
        <>
          <Box key={index + (factor?._id ?? "sensor")} sx={{ p: 1 }}>
            <Item>
              <h2 className="flex w-full p-2 text-xl font-Vazir-Medium">
                {t("Factor - ") +
                  index +
                  (factor?.factorName ? " (" + factor?.factorName + ") " : "")}
              </h2>
              <Box sx={{ p: 1, flexGrow: 1 }}>
                <Grid container spacing={2}>
                  <Grid>
                    <TextField
                      value={factor.factorName}
                      // id={idPrefix + `sensor?.[${index}]?.name`}
                      variant="filled"
                      onChange={(e) => {
                        let fac: Factor[] = [
                          ...(selectedDevice?.factors ?? []),
                        ];
                        if (fac?.[index] !== undefined) {
                          fac[index] = {
                            ...factor,
                            factorName: e.target.value,
                          };
                        }
                        dispatch(
                          setSelectedDevice({
                            ...selectedDevice,
                            factors: [...fac],
                          })
                        );
                      }}
                      sx={{
                        ...style,
                        width: 180,
                      }}
                      label={t("name")}
                    />
                  </Grid>
                  <Grid>
                    <TextField
                      value={factor.factorPosition}
                      // id={idPrefix + `sensor?.[${index}]?.name`}
                      variant="filled"
                      onChange={(e) => {
                        let fac: Factor[] = [
                          ...(selectedDevice?.factors ?? []),
                        ];
                        if (fac?.[index] !== undefined) {
                          fac[index] = {
                            ...factor,
                            factorPosition: Number(e.target.value),
                          };
                        }
                        dispatch(
                          setSelectedDevice({
                            ...selectedDevice,
                            factors: [...fac],
                          })
                        );
                      }}
                      sx={{
                        ...style,
                        width: 180,
                      }}
                      label={t("factorPosition")}
                    />
                  </Grid>
                  <Grid>
                    <TextField
                      value={factor.factorValue}
                      // id={idPrefix + `sensor?.[${index}]?.name`}
                      variant="filled"
                      onChange={(e) => {
                        let fac: Factor[] = [
                          ...(selectedDevice?.factors ?? []),
                        ];
                        if (fac?.[index] !== undefined) {
                          fac[index] = {
                            ...factor,
                            factorValue: Number(e.target.value),
                          };
                        }
                        dispatch(
                          setSelectedDevice({
                            ...selectedDevice,
                            factors: [...fac],
                          })
                        );
                      }}
                      sx={{
                        ...style,
                        width: 180,
                      }}
                      label={t("factorValue")}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Item>
          </Box>
        </>
      ))}
      <Box>
        <Button
          onClick={() => {
            let fac: Factor[] = [...(selectedDevice?.factors ?? [])];
            fac.push({
              factorName: "",
              factorPosition: 4,
              factorValue: 2.5,
            });
            dispatch(
              setSelectedDevice({
                ...selectedDevice,
                factors: [...fac],
              })
            );
          }}
        >
          add Factor
        </Button>
        <Button
          onClick={() => {
            let fac: Factor[] = [...(selectedDevice?.factors ?? [])];
            fac.pop();
            dispatch(
              setSelectedDevice({
                ...selectedDevice,
                factors: [...fac],
              })
            );
          }}
        >
          clear Factor
        </Button>
      </Box>
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
