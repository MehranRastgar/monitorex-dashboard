import * as React from "react";
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
  Button,
  dialogClasses,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { DevicesReceiveType } from "../../../store/api/devicesApi";

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

const idPrefix = "device-";
export default function DeviceForm() {
  const { t } = useTranslation();
  //itemShouldRender
  const selectedDevices = useAppSelector(selectSelectedDevices);
  const [device, setDevice] = React.useState(selectedDevices?.[0] ?? undefined);
  const [numberOfPorts, setNumberOfPorts] = React.useState<string | undefined>(
    undefined
  );
  const [multiPort, setMultiPort] = React.useState<string | undefined>(
    undefined
  );
  const [sMultiPort, setSMultiPort] = React.useState<string | undefined>(
    undefined
  );
  const [deviceType, setDeviceType] = React.useState<string | undefined>(
    undefined
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

  React.useEffect(() => {
    setDevice(selectedDevices?.[0]);
    setNumberOfPorts(undefined);
    setMultiPort(undefined);
    setSMultiPort(undefined);
    setDeviceType(undefined);
    if (selectedDevices?.[0] !== undefined) pushChange();
  }, [selectedDevices]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const valueOfDeviceForm: DevicesReceiveType = {
      ...device,
    };
    console.log(e.target.id);
    eval(`valueOfDeviceForm.${e.target.id} = e.target.value`);
    setDevice(valueOfDeviceForm);
  }

  const handleChangethat = (event: SelectChangeEvent) => {
    setNumberOfPorts(event?.target?.value);
  };
  const handleChangeMultiPort = (event: SelectChangeEvent) => {
    setMultiPort(event?.target?.value);
  };
  const handleChangeSMultiPort = (event: SelectChangeEvent) => {
    setSMultiPort(event?.target?.value);
  };
  const handleChangeTypeOfDevice = (event: SelectChangeEvent) => {
    setDeviceType(event?.target?.value);
  };
  if (selectedDevices?.[0] !== undefined)
    return (
      <Box className={"select-none"} sx={{ flexGrow: 1 }}>
        <Box sx={{ p: 1 }}>
          <Item>
            {" "}
            <div className="font-Vazir-Medium text-[20px]">
              {t("deviceName")} {selectedDevices?.[0]?.title ?? ""}
            </div>
          </Item>
        </Box>
        <Box sx={{ p: 1 }}>
          {/* device?._id !== undefined */}
          <Item>
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
              </Grid>
            </Box>
          </Item>
        </Box>
        <Box sx={{ p: 1 }}>
          <Item>
            <Box sx={{ p: 1, flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid>
                  <FormControl variant="filled" sx={style}>
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
                  <FormControl variant="filled" sx={style}>
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
                <Grid>
                  <FormControl variant="filled" sx={style}>
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
        <Box sx={{ p: 1 }}>
          <Item>
            <Box sx={{ p: 1, flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid>
                  <TextField
                    id={idPrefix + "_id"}
                    disabled
                    variant="filled"
                    sx={{
                      ...style,
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
