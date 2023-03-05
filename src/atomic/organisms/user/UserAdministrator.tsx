import { Icon } from "@iconify/react";
import { Box, Button, Modal, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { GetUsers } from "../../../api/users";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  selectAllUsersData,
  selectSelectedUser,
  setAllUsersData,
  setSignInFlag,
  setUsersData,
  setSelectedUser,
  updateUserData,
  selectUpdateFlag,
  createUser,
  selectOwnUser,
} from "../../../store/slices/userSlice";
import { UserType } from "../../../types/types";
import Item from "../../atoms/Item/Item";
import DataGridSimple from "../../molecules/DataGrid/DataGridSimple";
import UserForm from "./UserForm";

interface Props {}

const UserAdministrator: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const ownuser = useAppSelector(selectOwnUser);
  const [users, setUsers] = useState<UserType[]>([]);
  const [open, setOpen] = useState<boolean>(false);

  const [selectedUserState, setSelectedUserState] = useState<UserType | null>(
    null
  );
  const selectedUser = useAppSelector(selectSelectedUser);
  const dispatch = useAppDispatch();
  const usersdata = useAppSelector(selectAllUsersData);
  const userUpdateFlag = useAppSelector(selectUpdateFlag);
  const queryUsers = useQuery("users", GetUsers);
  useEffect(() => {
    if (queryUsers.status === "success") {
      dispatch(setAllUsersData(queryUsers.data));
      dispatch(setSignInFlag("initial"));
    }
  }, [queryUsers.isFetching, queryUsers.isSuccess]);

  useEffect(() => {
    // const loadData = async () => {
    //   const response = await fetch("users.json");
    //   const data = await response.json();
    //   setUsers(data);
    // };
    // loadData();
  }, []);

  const handleUserSelect = (user: UserType) => {
    setSelectedUserState(null);
    dispatch(setSelectedUser(user));
  };

  const handleUserSave = (user: UserType) => {
    // setUsers((prevState) =>
    //   prevState.map((prevUser) =>
    //     prevUser?._id === user?._id ? { ...prevUser, ...user } : prevUser
    //   )
    // );
    // console.log(user);
    if (selectedUser._id !== undefined) {
      dispatch(updateUserData(selectedUser));
    } else {
      const user: UserType = { ...selectedUser, groups: [] };
      dispatch(createUser(user));
    }
    // setSelectedUserState(null);
  };

  useEffect(() => {
    if (userUpdateFlag === "success") queryUsers.refetch();
  }, [userUpdateFlag]);

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
    <Item key={selectedUser?._id} className="my-2">
      <div className="flex text-xl text-[var(--text-ultimate-color)] font-Vazir-Bold m-2">
        <h1 className="mx-3 ">{t("user")}</h1>:
        <h2 className="mx-3 ">{selectedUser?._id ?? t("new")}</h2>
        <h3 className="mx-3 flex">
          {selectedUser?.username && <span className="mx-3 ">-</span>}
          {selectedUser?.username}
        </h3>
      </div>
      {/* <DataGridSimple
        selectedUserId={selectedUser?._id ?? ""}
        users={usersdata ?? []}
        onRowSelect={handleUserSelect}
      /> */}
      {selectedUser && <UserForm user={selectedUser} onSave={handleUserSave} />}

      {ownuser.isAdmin && selectedUser._id !== ownuser._id && (
        <Button
          onClick={() => {
            setOpen(true);
          }}
          className=" border text-white font-Vazir-Bold rounded-lg p-2 flex translate-y-14 z-[3] bg-red-600 hover:bg-red-700"
        >
          <Icon
            icon={"material-symbols:delete-outline"}
            color={"white"}
            fontSize={25}
          ></Icon>{" "}
          removeUser
        </Button>
      )}
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
                console.log("removeUSER");
                setOpen(false);
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
        </Box>
      </Modal>
    </Item>
  );
};

export default UserAdministrator;
