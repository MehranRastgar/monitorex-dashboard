import { Icon } from "@iconify/react";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  selectEndDate,
  selectSelectedSensorsAnalize,
  selectStartDate,
} from "../../../store/slices/analizeSlice";
import {
  selectUserGroups,
  updateUserData,
} from "../../../store/slices/userSlice";
import { GroupItemType, UserType } from "../../../types/types";
import Item from "../../atoms/Item/Item";
import UserGroupItem from "../../molecules/UserGroups/UserGroupItem";

export interface UserGroupsContainerProps {}

const UserGroupsContainer: React.FC<UserGroupsContainerProps> = (props) => {
  const selectUserGr = useAppSelector(selectUserGroups);
  const selectedSensorsSlice = useAppSelector(selectSelectedSensorsAnalize);
  const startDate = useAppSelector(selectStartDate);
  const endDate = useAppSelector(selectEndDate);
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const [nameofGp, setNameOfGp] = useState();
  const { t } = useTranslation();
  const [indexOfItem, setIndexOfItem] = useState<number | undefined>(undefined);

  const handleRemoveFromGroups = async (index: number) => {
    const start = startDate !== undefined ? new Date(startDate).getTime() : 0;
    const end = endDate !== undefined ? new Date(endDate).getTime() : 0;
    const time = end - start;
    const userD: UserType = await JSON.parse(
      localStorage.getItem("user") ?? ""
    );
    const arr: GroupItemType[] = [];
    if (selectedSensorsSlice !== undefined)
      for (
        let i = 0;
        userD?.groups?.length !== undefined &&
        i < userD?.groups?.length !== undefined;
        i++
      ) {
        if (index !== i && userD?.groups?.[i] !== undefined)
          arr.push({ ...userD?.groups?.[i] });
      }
    const user: UserType = { ...userD, groups: [...arr] };
    console.log(userD);
    dispatch(updateUserData(user));
  };
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "var(--bgc)",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  return (
    <>
      <Item>
        <section className="flex flex-wrap w-full h-auto min-h-[100px] font-Vazir-Medium rounded-[5px]">
          <h1 className="flex w-full justify-center text-xl">{t("groups")}</h1>
          {selectUserGr?.map((gpitem, index) => (
            <>
              <div className="flex w-auto justify-end">
                <UserGroupItem key={index} index={index} gpitem={gpitem} />
                <button
                  onClick={() => {
                    setOpen(true);
                    setIndexOfItem(index);
                  }}
                  className="flex translate-y-14 translate-x-10 z-[3]"
                >
                  <Icon
                    icon={"material-symbols:delete-outline"}
                    color={"red"}
                    fontSize={25}
                  ></Icon>
                </button>
              </div>
            </>
          ))}
        </section>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description "
        >
          <Box sx={{ ...style, height: "200px" }}>
            <Typography className="text-lg font-Vazir-Bold">
              {t("do_you_want_to_remove_this_group")}
            </Typography>
            <div className="flex m-4 mt-10">
              <Button
                variant="contained"
                type="button"
                className="mx-2 w-auto border-2 rounded-lg flex justify-center flex-wrap backdrop-blur-sm text-[var(--text-color)] bg-white/30 hover:bg-white/60  items-end"
                onClick={() => {
                  if (indexOfItem !== undefined)
                    handleRemoveFromGroups(indexOfItem);
                  //  if (sensor?._id !== undefined)
                  //  dispatch(remo(sensor?._id));
                }}
              >
                <Typography className="text-lg font-Vazir-Bold">
                  {t("yes")}
                </Typography>
              </Button>
              <Button
                variant="contained"
                type="button"
                className="mx-2 w-auto border-2 rounded-lg flex justify-center flex-wrap backdrop-blur-sm text-[var(--text-color)] bg-white/30 hover:bg-white/60  items-end"
                onClick={() => {
                  setOpen(false);
                }}
              >
                <Typography className="text-lg font-Vazir-Bold">
                  {t("no")}
                </Typography>
              </Button>
            </div>
            {/* <UserGroupsSaveContainer /> */}
          </Box>
        </Modal>
      </Item>
    </>
  );
};

export interface UserGroupsSaveContainerProps {
  handleSaveToGroup: (gp: string) => Promise<void>;
}

const UserGroupsSaveContainer: React.FC<UserGroupsSaveContainerProps> = (
  props
) => {
  const selectUserGr = useAppSelector(selectUserGroups);
  const { t } = useTranslation();
  const [nameofGp, setNameofGp] = useState("unname");

  return (
    <>
      <Box sx={style}>
        <section className="flex flex-wrap w-full h-[200px]  rounded-[5px]">
          <Typography className="text-lg font-Vazir-Bold">
            {t("take_a_name_for_this_group")}
          </Typography>
          <TextField
            onChange={(e) => {
              setNameofGp(e.target.value);
            }}
            variant="filled"
            sx={styleInput}
            label={t("title")}
          />
          <div className="flex h-fit">
            <Button
              className=" font-Vazir-Medium bg-green-600 hover:bg-green-800 text-white mx-2"
              onClick={() => props?.handleSaveToGroup(nameofGp)}
            >
              {t("saveToGroups")}
            </Button>
          </div>
        </section>
      </Box>
    </>
  );
};

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "var(--bgc)",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const styleInput = {
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
export { UserGroupsSaveContainer };
export default UserGroupsContainer;
