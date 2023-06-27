import { images } from '../../../../constants';
import classes from './Profile.module.scss';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../../store/hooks';
import { selectOwnUser } from '../../../../store/slices/userSlice';
import Avatar from 'react-avatar';
import { useRouter } from 'next/router';

function Profile() {
  const router = useRouter()
  const user = useAppSelector(selectOwnUser);
  const { t } = useTranslation();
  const [isPth, setIsPth] = useState(false)
  useEffect(() => {
    //console.log(images.avt);
    const path = router.asPath
    if (path.includes('settings')) {
      setIsPth(true)

    } else setIsPth(false)
  }, [router]);
  return (
    <div
      onClick={() => { router.push('/settings') }}
      className={classes.profile + ' mx-4 flex cursor-pointer '}>
      <div className={classes.profile__avatar}>
        {/* <img src={"Rectangle2.png"} alt="avatar" /> */}
        <Avatar name={`${user?.family} `} size="30" round={true} />
        {router.basePath}
      </div>
      <div className={classes.profile__info}>
        <p className={classes.profile__userName}>
          {/* {user?.family} */}
          {user?.name ?? user?.username}
        </p>
        {/* <span className={classes.profile__role}>{t("admin")}</span> */}
      </div>
    </div>
  );
}

export default Profile;
