import React, { useEffect, useState, ChangeEvent } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import { useTranslation } from "react-i18next";
import Item from "../../atoms/Item/Item";
import { useAppSelector } from "../../../store/hooks";
import { selectSelectedDevices } from "../../../store/slices/devicesSlice";
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

const idPrefix = "device_";
export default function DeviceForm() {
  const { t } = useTranslation();
  //itemShouldRender
  const selectedDevices = useAppSelector(selectSelectedDevices);
  const [device, setDevice] = useState(selectedDevices?.[0] ?? undefined);
  const [numberOfPorts, setNumberOfPorts] = useState<string | undefined>(
    selectedDevices?.[0]?.numberOfPorts?.toString()
  );
  const [multiPort, setMultiPort] = useState<string | undefined>(
    selectedDevices?.[0]?.address?.multiPort?.toString()
  );
  const [sMultiPort, setSMultiPort] = useState<string | undefined>(
    selectedDevices?.[0]?.address?.sMultiPort?.toString()
  );
  const [deviceType, setDeviceType] = useState<string | undefined>(
    selectedDevices?.[0]?.type
  );
  const [sensors, setSensors] = useState<SensorsReceiveTpe[] | undefined>(
    selectedDevices?.[0]?.sensors
  );
  function getThisElement(elementID: string) {
    const elem = document.getElementById(
      idPrefix + elementID
    ) as HTMLInputElement;
    return elem?.value;
  }
  function setThisElement(elementID: string) {
    const elem = document.getElementById(elementID) as HTMLInputElement;
    elem?.value !== undefined
      ? eval(
          `(elem.value = selectedDevices[0]?.${elementID.replace(
            idPrefix,
            ""
          )} ?? "")`
        )
      : (elem.value = "");
  }
  function pushChange() {
    console.log("component will update:::pushChange");
    if (
      (document?.getElementById(idPrefix + "title") as HTMLInputElement)
        .value !== undefined &&
      selectedDevices?.[0] !== undefined
    ) {
      console.log("component will update:::pushChange::first if");

      if (selectedDevices?.[0] !== undefined)
        Object.keys(selectedDevices?.[0])?.map((items, index) => {
          console.log("component will update:::pushChange::second if");

          if (
            (document?.getElementById(idPrefix + items) as HTMLInputElement)
              ?.value !== undefined
          )
            setThisElement(idPrefix + items);
          if (Object.keys(idPrefix + items).length) {
            Object.keys(selectedDevices?.[0])?.map((itemi, indexi) => {
              if (
                (document?.getElementById(idPrefix + itemi) as HTMLInputElement)
                  ?.value !== undefined
              )
                setThisElement(idPrefix + itemi);
            });
          }
        });
      device?.__v;
      console.log("component will update:::pushChange::out");
      // const itwillwork = document?.getElementById(
      //   "numberOfPorts"
      // ) as HTMLInputElement;
      // itwillwork.value = "4";
    }
  }

  function putNewChange() {
    console.log(getThisElement("title"));
    console.log(getThisElement("type"));
    console.log(getThisElement("_id"));
    console.log(getThisElement("title"));
  }

  useEffect(() => {
    setDevice(selectedDevices?.[0]);
    setNumberOfPorts(selectedDevices?.[0]?.numberOfPorts?.toString());
    setMultiPort(selectedDevices?.[0]?.address?.multiPort?.toString());
    setSMultiPort(selectedDevices?.[0]?.address?.sMultiPort?.toString());
    setDeviceType(selectedDevices?.[0]?.type?.toString());
    if (selectedDevices?.[0] !== undefined) pushChange();
  }, [selectedDevices]);

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const valueOfDeviceForm: DevicesReceiveType = {
      ...device,
    };
    console.log(e.target.id);
    eval(`valueOfDeviceForm.${e.target.id} = e.target.value`);
    setDevice(valueOfDeviceForm);
  }

  const handleChangethat = (event: SelectChangeEvent) => {
    setNumberOfPorts(event?.target?.value?.toString());
  };
  const handleChangeMultiPort = (event: SelectChangeEvent) => {
    setMultiPort(event?.target?.value?.toString());
  };
  const handleChangeSMultiPort = (event: SelectChangeEvent) => {
    setSMultiPort(event?.target?.value?.toString());
  };
  const handleChangeTypeOfDevice = (event: SelectChangeEvent) => {
    setDeviceType(event?.target?.value);
  };
  if (selectedDevices?.[0] !== undefined)
    return (
      <Box className={"select-none"} sx={{ flexGrow: 1 }}>
        <Box sx={{ p: 1 }}>
          <Item>
            <div className="font-Vazir-Medium text-[20px]">
              {t("deviceName")} {selectedDevices?.[0]?.title ?? ""}
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
                    id={idPrefix + "title"}
                    variant="filled"
                    sx={style}
                    label={t("title")}
                  />
                </Grid>
                <Grid>
                  <FormControl variant="filled" sx={style}>
                    <InputLabel id="type">type</InputLabel>
                    <Select
                      id={idPrefix + "type"}
                      labelId="type"
                      value={
                        deviceType ?? selectedDevices?.[0]?.type?.toString()
                      }
                      onChange={handleChangeTypeOfDevice}
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
                      id={idPrefix + "numberOfPorts"}
                      labelId="demo-simple-select-standard-label"
                      value={
                        numberOfPorts ??
                        selectedDevices?.[0]?.numberOfPorts?.toString()
                      }
                      onChange={handleChangethat}
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
                    type={deviceType ?? ""}
                    port={Number(numberOfPorts)}
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
                      value={
                        sMultiPort ??
                        selectedDevices?.[0]?.address?.sMultiPort?.toString()
                      }
                      onChange={handleChangeSMultiPort}
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
                      value={
                        multiPort ??
                        selectedDevices?.[0]?.address?.multiPort?.toString()
                      }
                      onChange={handleChangeMultiPort}
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
          setSensorInput={setSensors}
          sensorsInput={sensors}
          type={deviceType ?? ""}
          port={Number(numberOfPorts)}
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
                <Grid>
                  <TextField
                    disabled
                    id={idPrefix + "createdAt"}
                    variant="filled"
                    sx={{ ...style, width: 250 }}
                    label={t("createdAt")}
                  />
                </Grid>
                <Grid>
                  <TextField
                    disabled
                    id={idPrefix + "updatedAt"}
                    variant="filled"
                    sx={{ ...style, width: 250 }}
                    label={t("updatedAt")}
                  />
                </Grid>
                <Grid>
                  <TextField
                    disabled
                    id={idPrefix + "__v"}
                    variant="filled"
                    sx={{ ...style, width: 110 }}
                    label={t("schema version")}
                  />
                </Grid>
              </Grid>
            </Box>
          </Item>
        </Box>
        <Button onClick={putNewChange}>Save Changes</Button>
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

function DeviceShowWhat({ port, type }: { port: number; type: string }) {
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

function DevicesPart({
  port,
  type,
  sensorsInput,
  setSensors,
}: {
  port: number;
  type: string;
  sensorsInput: sensor[];
  setSensors: any;
}) {
  const { t } = useTranslation();
  const [sensorsL, setSensorsL] = useState<{ sensor: number }[]>([]);
  const [unitstate, setUnitstate] = useState<string>("");

  function makeSensors() {
    let s: { sensor: number }[] = [];
    for (let i = 1; i <= port; i++) {
      s.push({ sensor: i });
    }
    setSensorsL(s);
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
  function MyFormHelperText() {
    // const { focused } = useFormControl() || {};

    // const helperText = React.useMemo(() => {
    //   if (focused) {
    //     return "This field is being focused";
    //   }

    //   return "Helper text";
    // }, [focused]);

    return <FormHelperText>{unitstate}</FormHelperText>;
  }
  useEffect(() => {
    makeSensors();
  }, [port, unitstate]);
  return (
    <>
      {sensorsL?.map((sensorNum, index) => (
        <>
          <Box sx={{ p: 1 }}>
            <Item>
              <h2 className="flex w-full p-2 text-xl font-Vazir-Medium">
                {t("Sensor - ") + sensorNum.sensor}
                {sensorsInput?.[index]?.title}
              </h2>
              <Box sx={{ p: 1, flexGrow: 1 }}>
                <Grid container spacing={2}>
                  <Grid>
                    <TextField
                      id={idPrefix + "sensor_" + index + "_title"}
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
                      id={idPrefix + "sensor_" + index + "_type"}
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
                      id={idPrefix + "sensor_" + index + "_unit"}
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
                      id={idPrefix + "_sensor_" + index + "_id"}
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
