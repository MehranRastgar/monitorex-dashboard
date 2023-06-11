import { selectFormData, selectFormDataInit, setFormikDataInit } from "src/store/slices/formikSlice";
import FormMeUser from "../forms/FormMeUser";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "src/store/hooks";
import { UserType } from "src/types/types";
import { useTranslation } from "react-i18next";
import { selectSelectedUser } from "src/store/slices/userSlice";

const UserFormMolecule = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  // const formdataRedux: UserType | undefined =
  //   useAppSelector(selectFormData);
  const selectedUser = useAppSelector(selectSelectedUser);
  // const selectformdatainit = useAppSelector(selectFormDataInit);
  // useEffect(() => {
  //   dispatch(setFormikDataInit(selectedUser));
  // }, [selectedUser]);
  // useEffect(() => {
  //   console.log('port changes');
  //   const user: UserType = selectedUser as UserType
  //   formdataRedux && dispatch(setFormikDataInit(selectedUser));
  // }, [selectedUser]);

  return (
    <div className="flex flex-wrap items-start min-w-[800px] mx-2 -mt-1 p-2 border border-[var(--border-color)] rounded-md">
      {selectedUser.username}
      {/* {selectformdatainit?.username} */}
      <FormMeUser />
    </div>
  );
};

export default UserFormMolecule;