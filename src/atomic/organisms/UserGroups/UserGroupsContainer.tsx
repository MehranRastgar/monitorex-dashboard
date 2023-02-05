import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../../store/hooks";
import { selectUserGroups } from "../../../store/slices/userSlice";
import Item from "../../atoms/Item/Item";
import UserGroupItem from "../../molecules/UserGroups/UserGroupItem";

export interface UserGroupsContainerProps {}

const UserGroupsContainer: React.FC<UserGroupsContainerProps> = (props) => {
  const selectUserGr = useAppSelector(selectUserGroups);
  const { t } = useTranslation();
  return (
    <>
      <Item>
        <section className="flex flex-wrap w-full h-auto min-h-[100px] font-Vazir-Medium rounded-[5px]">
          <h1 className="flex w-full justify-center text-xl">{t("groups")}</h1>
          {selectUserGr?.map((gpitem, index) => (
            <>
              <UserGroupItem key={index} index={index} gpitem={gpitem} />
            </>
          ))}
        </section>
      </Item>
    </>
  );
};

const UserGroupsSaveContainer: React.FC<UserGroupsContainerProps> = (props) => {
  const selectUserGr = useAppSelector(selectUserGroups);
  const { t } = useTranslation();
  return (
    <>
      <section className="flex flex-wrap w-full h-[100px]  rounded-[5px]"></section>
    </>
  );
};

export { UserGroupsSaveContainer };
export default UserGroupsContainer;
