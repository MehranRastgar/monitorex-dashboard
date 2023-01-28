import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { selectDevicesData } from "../../../store/slices/devicesSlice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { DevicesReceiveType } from "../../../store/api/devicesApi";
import { Button, Grid, Typography } from "@mui/material";
import { SensorsReceiveTpe } from "../../../components/pages/sensors/sensorsTable";
import { Box } from "@mui/system";
import SensorObject from "../sensor/SensorObject";
import ScrollContainer from "react-indiana-drag-scroll";
import { selectSelectedSensors } from "../../../store/slices/sensorsSlice";
import { Icon } from "@iconify/react";
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
  const [moreIsTrue, setMoreIsTrue] = React.useState<boolean>(false);

  return (
    <>
      <Box className="flex flex-wrap justify-start w-full mt-1">
        <Item className="flex flex-wrap w-full max-w-full ">
          <div className="font-Vazir-Medium text-[15px] w-full">
            {t("chooseDevice")}
          </div>
          <button
            className=""
            onClick={() => {
              setMoreIsTrue((val) => !val);
            }}
          >
            {moreIsTrue ? (
              <Icon
                className="mx-1"
                fontSize={25}
                icon={"mdi:collapse-horizontal"}
              ></Icon>
            ) : (
              <Icon
                className="mx-1"
                fontSize={25}
                icon={"bi:arrows-expand"}
              ></Icon>
            )}
          </button>
          <div className="my-0  product-slider-one-container items-center ">
            <ScrollContainer
              vertical={false}
              hideScrollbars={false}
              className="scroll-container h-fit product-slider-one-items overflow-y-hidden "
            >
              {selectDevices.map((item, index) => (
                <div className="h-fit" key={index}>
                  <DeviceObject
                    more={moreIsTrue}
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
    </>
  );
}

export function DeviceObject({
  item,
  setdeviceItem,
  deviceItem,
  more,
}: {
  item: DevicesReceiveType;
  setdeviceItem: any;
  deviceItem: DevicesReceiveType;
  more?: boolean;
}) {
  const { t } = useTranslation();
  return (
    <>
      <div
        onClick={() => {
          setdeviceItem(item);
        }}
        className={`mx-2 p-1 flex justify-start flex-wrap w-[120px] h-fit rounded-lg border  ${
          deviceItem._id === item._id
            ? "bg-[var(--approved-bgc)]"
            : "bg-[var(--pending-bgc)]"
        }`}
      >
        <h1 className="w-full p-0">{item.title}</h1>
        {more ? (
          <>
            <h2 className="w-full p-0">
              {t("numberOfPorts")}
              <span className="mx-2">{item.sensors?.length}</span>
            </h2>
            <h3 className="w-full p-1">
              {t("type")}
              <span className="mx-2">{item.type}</span>
            </h3>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

export function SensorObjectSelector({ item }: { item: SensorsReceiveTpe }) {
  const { t } = useTranslation();
  const selectedsensor = useAppSelector(selectSelectedSensorsAnalize);
  const dispatch = useAppDispatch();
  const [isExistInList, setIsExistInList] = React.useState(true);

  React.useEffect(() => {
    if (
      selectedsensor !== undefined &&
      selectedsensor?.findIndex((sen) => sen._id === item._id) > -1
    ) {
      setIsExistInList(false);
    } else {
      setIsExistInList(true);
    }
  }, [selectedsensor]);
  return (
    <>
      <section className="flex">
        <div
          onClick={() => {}}
          className={`mx-2 p-1 flex w-fit h-fit rounded-lg border bg-gray-400/30 `}
        >
          <div className="flex flex-wrap">
            <div className="w-full text-[10px]">{item.title}</div>
            <div className="w-full text-[10px]">{item?.type}</div>
            <div className="w-full text-[10px]">{item?.unit}</div>
          </div>
          {isExistInList ? (
            <button
              className="p-2 flex rounded-lg opacity-75 h-fit w-fit"
              onClick={(e) => {
                dispatch(addSelectedSensors(item));
              }}
            >
              <Icon
                className="mx-1"
                fontSize={25}
                icon={"material-symbols:add-comment-rounded"}
              ></Icon>{" "}
            </button>
          ) : (
            <>
              <button
                className="p-2 flex rounded-lg opacity-75 h-fit w-fit"
                onClick={(e) => {
                  {
                    item?._id !== undefined ? (
                      dispatch(removeSelectedSensors(item?._id))
                    ) : (
                      <></>
                    );
                  }
                }}
              >
                <Icon
                  color="red"
                  className="mx-1"
                  fontSize={25}
                  icon={"material-symbols:bookmark-remove-sharp"}
                ></Icon>
              </button>
            </>
          )}
        </div>
      </section>
    </>
  );
}

export function SensorSelectedForReport() {
  const selectedSensorsSlice = useAppSelector(selectSelectedSensorsAnalize);
  const { t } = useTranslation();

  return (
    <Box className="flex flex-wrap justify-start w-full mt-1">
      <Grid
        container
        spacing={1}
        className="flex flex-wrap justify-start w-full "
      >
        {selectedSensorsSlice?.length ? (
          selectedSensorsSlice?.map((sensor, index) => (
            <>
              <Grid>
                <SensorObject sensor={sensor} key={index} />
              </Grid>
            </>
          ))
        ) : (
          <>
            <Box sx={{ p: 1 }}>
              <Typography className="font-Vazir-Medium">
                {t("deviceNotExist")}
              </Typography>
            </Box>
          </>
        )}
      </Grid>
    </Box>
  );
}
