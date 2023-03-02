import { images } from "../../../../constants";
import classes from "./Profile.module.scss";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { useAppSelector } from "../../../../store/hooks";
import { selectOwnUser } from "../../../../store/slices/userSlice";
import Avatar from "react-avatar";

function Profile() {
  const user = useAppSelector(selectOwnUser);
  const { t } = useTranslation();
  useEffect(() => {
    console.log(images.avt);
  }, []);
  return (
    <div className={classes.profile}>
      <div className={classes.profile__avatar}>
        {/* <img src={"Rectangle2.png"} alt="avatar" /> */}
        <Avatar name={`${user?.family} ${user?.name}`} size="40" round={true} />
      </div>
      <div className={classes.profile__info}>
        <p className={classes.profile__userName}>
          {user?.family}
          {user?.name ?? user?.username}
        </p>
        {/* <span className={classes.profile__role}>{t("admin")}</span> */}
      </div>
    </div>
  );
}

export default Profile;
