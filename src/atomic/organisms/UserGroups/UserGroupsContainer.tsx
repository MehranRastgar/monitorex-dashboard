import { Icon } from '@iconify/react';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ButtonRegular from 'src/atomic/atoms/ButtonA/ButtonRegular';
import ThemeButton from 'src/atomic/atoms/ThemeButton/ThemeButton';
import ThemeInput from 'src/atomic/atoms/ThemeInput/ThemeInput';
import ThemeInputSelect from 'src/atomic/atoms/ThemeInput/ThemeInputSelect';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  selectEndDate,
  selectSelectedSensorsAnalize,
  selectStartDate,
} from '../../../store/slices/analizeSlice';
import {
  selectUserGroups,
  updateUserData,
} from '../../../store/slices/userSlice';
import { GroupItemType, UserType } from '../../../types/types';
import Item from '../../atoms/Item/Item';
import UserGroupItem from '../../molecules/UserGroups/UserGroupItem';

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

  useEffect(() => {}, []);

  const handleRemoveFromGroups = async (index: number) => {
    const start = startDate !== undefined ? new Date(startDate).getTime() : 0;
    const end = endDate !== undefined ? new Date(endDate).getTime() : 0;
    const time = end - start;
    const userD: UserType = await JSON.parse(
      localStorage.getItem('user') ?? '',
    );
    const arr: GroupItemType[] = [];
    if (
      selectedSensorsSlice !== undefined &&
      userD?.groups?.length !== undefined
    )
      for (let i = 0; i < userD?.groups?.length; i++) {
        if (userD?.groups[i]?.groupTitle !== undefined && i !== index) {
          arr.push(userD?.groups[i]);
        }
      }
    console.log(arr);

    const user: UserType = { ...userD, groups: [...arr] };
    dispatch(updateUserData(user));
    localStorage.setItem('user', JSON.stringify(user));
  };
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'var(--bgc)',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  return (
    <>
      <Item>
        <section className="flex flex-wrap w-full h-auto min-h-[100px] font-Vazir-Medium rounded-[5px]">
          <h1 className="flex w-full justify-center text-xl">{t('groups')}</h1>
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
                    icon={'material-symbols:delete-outline'}
                    color={'red'}
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
          <Box sx={{ ...style, height: '200px' }}>
            <Typography className="text-lg font-Vazir-Bold">
              {t('do_you_want_to_remove_this_group')}
            </Typography>
            <div className="flex m-4 mt-10">
              <ThemeButton
                className="mx-2"
                type="submit"
                onClick={() => {
                  if (indexOfItem !== undefined)
                    handleRemoveFromGroups(indexOfItem);
                  setOpen(false);
                }}
              >
                {t('yes')}
              </ThemeButton>
              <ThemeButton
                className="mx-2"
                type="reject"
                onClick={() => {
                  setOpen(false);
                }}
              >
                {t('no')}
              </ThemeButton>
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
  handleUpdateToGroup: (gpId: string, gpName: string) => Promise<void>;
}

const UserGroupsSaveContainer: React.FC<UserGroupsSaveContainerProps> = (
  props,
) => {
  const selectUserGr = useAppSelector(selectUserGroups);
  const { t } = useTranslation();
  const [nameofGp, setNameofGp] = useState<string | undefined>(undefined);
  const [gpMap, setGpMap] = useState<{ id: string; title: string }[]>([]);
  const [updateGp, setUpdateGp] = useState<string | undefined>(undefined);

  useEffect(() => {
    const ppp: { id: string; title: string }[] = [];
    selectUserGr?.map((gp, index) => {
      if (gp?._id !== undefined)
        ppp.push({ id: gp?._id, title: gp.groupTitle });
    });
    setGpMap(ppp);
  }, []);
  useEffect(() => {
    setNameofGp(gpMap?.find((g) => g.id === updateGp)?.title);
  }, [updateGp]);
  return (
    <>
      <Box sx={style}>
        <section className="flex flex-wrap w-full h-[auto]  rounded-[5px]">
          <div className="flex flex-wrap w-full">
            <Typography className="text-lg font-Vazir-Bold">
              {t('take_a_name_for_this_group')}
            </Typography>
            <ThemeInput
              label={t('GPname') ?? undefined}
              onChange={setNameofGp}
              value={nameofGp}
            />
          </div>
          <div>
            or
            <Typography className="text-lg font-Vazir-Bold">
              {t('updateGroup')}
            </Typography>
            <ThemeInputSelect
              label={t('GPname') ?? undefined}
              onChange={setUpdateGp}
              value={gpMap}
            />
            {updateGp}
          </div>

          <div className="flex w-full justify-center mt-10 h-fit ">
            <ThemeButton
              disabled={
                nameofGp !== undefined && nameofGp?.length > 0 ? false : true
              }
              type="submit"
              className="mt-10 mx-2"
              onClick={() => {
                if (nameofGp?.length) props?.handleSaveToGroup(nameofGp);
              }}
            >
              {t('saveAsNewGroup')}
            </ThemeButton>
            <ThemeButton
              disabled={updateGp === undefined || updateGp === '0'}
              type="submit"
              className="mt-10  mx-2"
              onClick={() => {
                if (nameofGp?.length && updateGp)
                  props?.handleUpdateToGroup(updateGp, nameofGp);
              }}
            >
              {t('updateGroup')}
            </ThemeButton>
          </div>
        </section>
      </Box>
    </>
  );
};

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'var(--bgc)',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const styleInput = {
  width: 250,
  boxShadow: 2,
  bgcolor: 'var(--card-bgc)',
  '.MuiFormLabel-root': {
    color: 'var(--approved-bgc)',
  },
  '.MuiInputBase-input': {
    color: 'var(--text-color)',
    fontSize: 16,
  },
  '.MuiInputLabel-filled': {
    color: 'var(--text-color)',
    fontSize: 16,
  },
};
export { UserGroupsSaveContainer };
export default UserGroupsContainer;
