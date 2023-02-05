import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  reportSensorsAsync,
  selectEndDate,
  selectSelectedSensorsAnalize,
  selectStartDate,
  setEndDate,
  setSelectedSensors,
  setStartDate,
  setStartDayjs,
} from "../../../store/slices/analizeSlice";
import { GroupItemType } from "../../../types/types";
import dayjs, { Dayjs } from "dayjs";
import {
  BottomNavigationAction,
  Fab,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import {
  selectGroupNumber,
  selectOwnUser,
  setSelectedGroupNumber,
} from "../../../store/slices/userSlice";
import Item from "../../atoms/Item/Item";
import { Icon } from "@iconify/react";
import ThingDevice, {
  devicethingmodes,
  DeviceThingProps,
} from "../Thing/Device";
import { useTranslation } from "react-i18next";

export interface UserGroupItemProps {
  gpitem?: GroupItemType;
  index?: number;
}

const UserGroupItem: React.FC<UserGroupItemProps> = (props) => {
  const { t } = useTranslation();
  const [date, setDate] = useState<Date | undefined>(undefined);
  const selectED = useAppSelector(selectEndDate);
  const selectSD = useAppSelector(selectStartDate);
  const selectedSensors = useAppSelector(selectSelectedSensorsAnalize);
  const selectGpNum = useAppSelector(selectGroupNumber);
  const dispatch = useAppDispatch();
  const [mode, setMode] = useState<devicethingmodes>("diselected");
  const handleClick = () => {
    if (props?.gpitem?.sensors !== undefined) {
      if (props?.index !== undefined)
        dispatch(setSelectedGroupNumber(props?.index));
      let publishDate = new Date(1000 * dayjs(dayjs()).unix());
      console.log(publishDate.toJSON());
      // dispatch(setStartDate(publishDate.toJSON()));
      dispatch(
        setStartDayjs(
          dayjs(
            new Date(selectED ?? 0).getTime() - (props?.gpitem?.timeRange ?? 0)
          ).toJSON()
        )
      );
      dispatch(setSelectedSensors(props?.gpitem?.sensors));
      const arr: string[] = [];
      props?.gpitem?.sensors.map((item) => arr.push(item?._id ?? ""));
      dispatch(
        reportSensorsAsync({
          sensors: arr,
          start:
            dayjs(
              new Date(selectED ?? 0).getTime() -
                (props?.gpitem?.timeRange ?? 0)
            ).toJSON() ?? "",
          end: selectED ?? "",
        })
      );
    }
  };

  useEffect(() => {
    var dates = new Date();
    setDate(dates);
  }, []);

  const thingOption: DeviceThingProps = {
    mode: selectGpNum === props.index ? "selected" : "diselected",
    arrOfAttributes: [
      `${(props?.gpitem?.timeRange ?? 0) / 1000 / 60 / 24 / 60} روز`,
    ],
    width: 130,
    height: 70,
    title: props?.gpitem?.groupTitle ?? "noname",
    badge: t("group") ?? undefined,
    icon: "mdi:select-group",
    iconSize: 40,
  };
  return (
    <>
      <div onClick={handleClick} className="flex m-2 w-fit">
        <ThingDevice {...thingOption} />
      </div>
      {/* <Typography className="flex border-b items-center w-full">
          <Icon className="m-1" fontSize={25} icon={"mdi:select-group"}></Icon>
          {props?.gpitem?.groupTitle}
        </Typography>
        <h2 className="flex m-1 border-b justify-start w-fit">
          {(props?.gpitem?.timeRange ?? 0) / 1000 / 60 / 24 / 60} روز
        </h2> */}
    </>
  );
};

const UserGroupForm: React.FC<UserGroupItemProps> = (props) => {
  const dispatch = useAppDispatch();
  const ownUser = useAppSelector(selectOwnUser);

  return (
    <>
      <FormControl variant="filled" sx={style}></FormControl>
    </>
  );
};

export default UserGroupItem;

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
