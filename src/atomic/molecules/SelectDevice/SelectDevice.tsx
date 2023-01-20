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
import ScrollContainer from "react-indiana-drag-scroll";
import { selectSelectedSensors } from "../../../store/slices/sensorsSlice";
import {
  addSelectedSensors,
  removeSelectedSensors,
  selectSelectedSensorsAnalize,
} from "../../../store/slices/analizeSlice";
import { useTranslation } from "react-i18next";
import Item from "../../atoms/Item/Item";

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

  const [deviceItem, setdeviceItem] = React.useState<DevicesReceiveType>({});
  const [sensorName, setSensorName] = React.useState<string>("");

  const [selectedSensors, setSelectedSensors] = React.useState<
    SensorsReceiveTpe[]
  >([]);
  const [selectedDevice, setSelectedDevice] =
    React.useState<DevicesReceiveType>();

  return (
    <>
      <Box className="flex flex-wrap justify-start w-full mt-1">
        <Item className="flex flex-wrap w-full max-w-full ">
          <div className="my-2  product-slider-one-container items-center ">
            <ScrollContainer
              vertical={false}
              hideScrollbars={false}
              className="scroll-container h-fit product-slider-one-items overflow-y-hidden "
            >
              {selectDevices.map((item, index) => (
                <div key={index}>
                  <DeviceObject
                    item={item}
                    setdeviceItem={setdeviceItem}
                    deviceItem={deviceItem}
                  />
                </div>
              ))}
            </ScrollContainer>
          </div>
          <div className="my-2 bg-black/30 product-slider-one-container items-center">
            <ScrollContainer
              vertical={false}
              hideScrollbars={false}
              className="scroll-container h-fit product-slider-one-items overflow-y-hidden "
            >
              {deviceItem?.sensors?.map((item, index) => (
                <div key={index}>
                  <SensorObjectSelector item={item} />
                </div>
              ))}
            </ScrollContainer>
          </div>
        </Item>
      </Box>
      <SensorSelectedForReport />
    </>
  );
}

export function DeviceObject({
  item,
  setdeviceItem,
  deviceItem,
}: {
  item: DevicesReceiveType;
  setdeviceItem: any;
  deviceItem: DevicesReceiveType;
}) {
  const { t } = useTranslation();
  return (
    <>
      <div
        onClick={() => {
          setdeviceItem(item);
        }}
        className={`mx-2 p-2 flex flex-wrap w-[150px] h-[140px] rounded-lg border  ${
          deviceItem._id === item._id
            ? "bg-[var(--approved-bgc)]"
            : "bg-[var(--pending-bgc)]"
        }`}
      >
        <h1 className="w-full p-1">{item.title}</h1>
        <h2 className="w-full p-1">
          {t("numberOfPorts")}
          <span className="mx-2">{item.sensors?.length}</span>
        </h2>
        <h3 className="w-full p-1">
          {t("type")}
          <span className="mx-2">{item.type}</span>
        </h3>
      </div>
    </>
  );
}

export function SensorObjectSelector({ item }: { item: SensorsReceiveTpe }) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  return (
    <>
      <div
        onClick={() => {}}
        className={`mx-2 p-2 flex flex-wrap w-[100px] h-[100px] rounded-lg border bg-gray-400/30 `}
      >
        <div className="w-full text-[10px]">{item.title}</div>
        <div className="w-full text-[10px]">{item?.type}</div>
        <div className="w-full text-[10px]">{item?.unit}</div>
        <Button
          variant="contained"
          size="small"
          className="border bg-[var(--approved-bgc)] "
          onClick={(e) => {
            dispatch(addSelectedSensors(item));
          }}
        >
          <div className="text-[8px]">addToReportList</div>
        </Button>
      </div>
    </>
  );
}

export function SensorSelectedForReport() {
  const selectedSensorsSlice = useAppSelector(selectSelectedSensorsAnalize);

  return (
    <Box className="flex flex-wrap justify-start w-full mt-10">
      <Grid container spacing={2}>
        {selectedSensorsSlice?.map((sensor, index) => (
          <>
            <Grid>
              <SensorObject sensor={sensor} key={index} />
            </Grid>
          </>
        ))}
      </Grid>
    </Box>
  );
}

{
  /* <FormControl
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
      </FormControl> */
}
{
  /* <FormControl sx={{ m: 4, minWidth: 120, maxWidth: 300 }}>
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
      </FormControl> */
}
{
  /* <Button
        onClick={(e) => {
          OnClickSelectSensor();
        }}
      >
        +add to analize
      </Button> */
}

// const OnClickSelectSensor = () => {
//   console.log(deviceName);
//   console.log(sensorName);
//   const ind1 = selectDevices.findIndex(
//     (item) => item._id === deviceName?.[0]
//   );
//   const ind2 = selectDevices?.[ind1]?.sensors?.findIndex(
//     (item) => item._id === sensorName?.[0]
//   );
//   const arr: SensorsReceiveTpe[] = [...selectedSensors];
//   if (
//     ind2 !== undefined &&
//     selectDevices?.[ind1]?.sensors?.[ind2] !== undefined
//   ) {
//     arr.push(selectDevices?.[ind1]?.sensors?.[ind2] as SensorsReceiveTpe);
//     dispatch(
//       addSelectedSensors(
//         selectDevices?.[ind1]?.sensors?.[ind2] as SensorsReceiveTpe
//       )
//     );
//   }
//   setSelectedSensors(arr);
//   console.log("selectedSensorsSlice", selectedSensorsSlice);
// };

// const handleChangeMultiple = (
//   event: React.ChangeEvent<HTMLSelectElement>
// ) => {
//   const { options } = event.target;
//   const value: string[] = [];
//   for (let i = 0, l = options.length; i < l; i += 1) {
//     if (options[i].selected) {
//       value.push(options[i].value);
//     }
//   }
//   setdeviceName(value);
//   const ind = selectDevices.findIndex((item) => item._id === value?.[0]);
//   if (ind >= 0) setSelectedDevice(selectDevices[ind]);
//   console.log("selectDevices", value);
// };
// const handleChangeSelectSensor = (
//   event: React.ChangeEvent<HTMLSelectElement>
// ) => {
//   const { options } = event.target;
//   const value: string[] = [];
//   for (let i = 0, l = options.length; i < l; i += 1) {
//     if (options[i].selected) {
//       value.push(options[i].value);
//     }
//   }
//   setSensorName(value);
// };
