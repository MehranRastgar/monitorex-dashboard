import { images } from "../../../../constants";
import classes from "./Profile.module.scss";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

function Profile() {
  const { t } = useTranslation();
  useEffect(() => {
    console.log(images.avt);
  }, []);
  return (
    <div className={classes.profile}>
      <div className={classes.profile__avatar}>
        <img src={"Rectangle2.png"} alt="avatar" />
      </div>
      <div className={classes.profile__info}>
        <p className={classes.profile__userName}>{t("mehranRastgar")}</p>
        {/* <span className={classes.profile__role}>{t("admin")}</span> */}
      </div>
    </div>
  );
}

export default Profile;
