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
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import {
  selectGroupNumber,
  selectOwnUser,
  setSelectedGroupNumber,
} from "../../../store/slices/userSlice";

export interface UserGroupItemProps {
  gpitem?: GroupItemType;
  index?: number;
}

const UserGroupItem: React.FC<UserGroupItemProps> = (props) => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const selectED = useAppSelector(selectEndDate);
  const selectSD = useAppSelector(selectStartDate);
  const selectedSensors = useAppSelector(selectSelectedSensorsAnalize);
  const selectGpNum = useAppSelector(selectGroupNumber);
  const dispatch = useAppDispatch();
  const handleClick = () => {
    if (props?.gpitem?.sensors !== undefined) {
      dispatch(setSelectedGroupNumber(props.index));
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
          start: selectSD ?? "",
          end: selectED ?? "",
        })
      );
    }
  };

  useEffect(() => {
    var dates = new Date();
    setDate(dates);
  }, []);

  return (
    <>
      <section
        onClick={() => {
          handleClick();
        }}
        className={
          "flex m-2 w-fit h-fit p-3 border rounded-md cursor-pointer " +
          `${selectGpNum === props.index ? "bg-green-200 text-black" : ""}`
        }
      >
        <h1>{props?.gpitem?.groupTitle}</h1>
        <div>-</div>
        <h2>{(props?.gpitem?.timeRange ?? 0) / 1000 / 60 / 24 / 60} روز</h2>
      </section>
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
