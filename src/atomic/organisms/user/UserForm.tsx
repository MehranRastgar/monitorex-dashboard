import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setSelectedDevice } from "../../../store/slices/devicesSlice";
import {
  selectSelectedUser,
  setSelectedUser,
} from "../../../store/slices/userSlice";
import { UserType } from "../../../types/types";
import ButtonRegular from "../../atoms/ButtonA/ButtonRegular";

interface UserFormProps {
  user: UserType;
  onSave: (user: UserType) => void;
}

const UserForm: React.FC<UserFormProps> = ({ user, onSave }) => {
  const [formValues, setFormValues] = useState<any>(user);
  const { t } = useTranslation();
  const selectedUser = useAppSelector(selectSelectedUser);
  const dispatch = useAppDispatch();

  // Create fields array from JSON file or User interface
  const fields = [
    // { name: "_id", label: "ID", type: "text", size: 250 },
    { name: "username", label: "username", type: "text" },
    { name: "password", label: "password", type: "password" },
    { name: "name", label: "Name", type: "text" },
    { name: "family", label: "Family", type: "text" },
    {
      name: "isAdmin",
      label: "isAdmin",
      type: "select",
      options: ["true", "false"],
    },
    { name: "email", label: "Email", type: "email", size: 250 },
    { name: "phoneNumber", label: "Phone Number", type: "tel" },
  ];

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues((prevState: any) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSave(formValues);
  };
  useEffect(() => {
    setFormValues(selectedUser ?? {});
  }, [selectedUser]);
  useEffect(() => {}, [formValues]);

  return (
    <form className="flex flex-wrap" onSubmit={handleSubmit}>
      {fields.map(({ name, label, type, options, size }) => (
        <div className="m-2" key={name}>
          {type !== "select" ? (
            <>
              {/* <label htmlFor={name}>{t(label)}</label> */}
              <TextField
                value={formValues?.[name] ?? ""}
                // id={idPrefix + `sensor?.[${index}]?.name`}
                variant="filled"
                onChange={(e) => {
                  dispatch(
                    setSelectedUser({
                      ...selectedUser,
                      [name]: e.target.value,
                    })
                  );
                }}
                sx={{
                  ...style,
                  width: size ?? 180,
                }}
                type={type}
                label={t(label)}
              />
            </>
          ) : (
            <></>
          )}
        </div>
      ))}
      <div className="flex w-full">
        <UserPermissions />
      </div>
      <div className="flex w-full my-4 m-2">
        <ButtonRegular
          className="flex p-4 text-larg font-Vazir  "
          type="submit"
        >
          {t("save")}
        </ButtonRegular>
      </div>
    </form>
  );
};

export default UserForm;

const UserPermissions: React.FC = () => {
  const selectedUser = useAppSelector<any>(selectSelectedUser);
  const [showitems, setShowitems] = useState(false);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const permisionOptions = ["manage", "create", "read", "update", "delete"];
  const fields = [
    { name: "devices", label: "devices", type: "text", size: 150 },
    { name: "profile", label: "profile", type: "text", size: 150 },
    { name: "reports", label: "reports", type: "text", size: 150 },
    { name: "users", label: "users", type: "text", size: 150 },
  ];

  useEffect(() => {}, [selectedUser]);

  return (
    <>
      {fields?.map(({ name, label, type, size }, index) => (
        <>
          <div key={index} className="m-2">
            {selectedUser && name && (
              <FormControl
                variant="filled"
                sx={{ ...style, width: size ?? 150 }}
              >
                <InputLabel id="demo-simple-select-standard-label">
                  {t(label)}
                </InputLabel>
                <Select
                  // id={idPrefix + "numberOfPorts"}
                  labelId="demo-simple-select-standard-label"
                  value={selectedUser?.accessControll?.[name] ?? ""}
                  onChange={(e) => {
                    dispatch(
                      setSelectedUser({
                        ...selectedUser,
                        accessControll: {
                          ...selectedUser?.accessControll,
                          [name]: e?.target?.value?.toString(),
                        },
                      })
                    );
                  }}
                  label={label}
                >
                  {/* <MenuItem value=""></MenuItem> */}
                  {permisionOptions?.map((nPSe, index) => (
                    <MenuItem key={index} value={nPSe}>
                      {nPSe.toString()}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          </div>
        </>
      ))}
    </>
  );
};

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
