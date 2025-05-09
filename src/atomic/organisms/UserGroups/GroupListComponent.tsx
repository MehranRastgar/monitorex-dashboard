import { Typography } from '@mui/material';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  selectGroupNumber,
  selectSelectionType,
  setSelectedGroupNumber,
  setSelectionType,
} from '../../../store/slices/analizeSlice';
import { selectDevicesData } from '../../../store/slices/devicesSlice';
import { selectUserGroups } from '../../../store/slices/userSlice';
import Item from '../../atoms/Item/Item';

export interface GroupListComponentProps {
  type: 'device' | 'group';
}

const GroupListComponent: React.FC<GroupListComponentProps> = (props) => {
  const { t } = useTranslation();
  const selectUserGr = useAppSelector(selectUserGroups);
  const GpNumber = useAppSelector(selectGroupNumber);
  const Devices = useAppSelector(selectDevicesData);
  const selectionType = useAppSelector(selectSelectionType);
  const dispatch = useAppDispatch();

  function handleScrollToSelectedItem(index: number) {
    if (document !== undefined) {
      const el = document?.getElementById(
        'GpItem-' + index.toString(),
      ) as HTMLElement;
      el?.scrollIntoView();
    }
  }

  useEffect(() => {
    if (GpNumber === undefined) {
      dispatch(setSelectedGroupNumber(0));
    }
  }, [GpNumber]);
  useEffect(() => {
    handleScrollToSelectedItem(GpNumber ?? 0);
  }, []);
  return (
    <>
      <div className="flex w-full h-[300px] ">
        <Item className="w-full m-2 border border-gray-600 overflow-hidden  ">
          <Typography
            style={{
              fontFamily: 'var(--fontFamily)'
            }}
            className=" ">
            {t(props.type === 'group' ? 'groups' : 'devices')}
          </Typography>
          <section className=" h-[230px] overflow-y-scroll">
            {props.type === 'device' ? (
              <>
                {Devices?.map((device, Index) => (
                  <div
                    key={'dveice-' + Index}
                    id={'dveice-' + Index}
                    onClick={() => {
                      dispatch(setSelectedGroupNumber(Index));
                      dispatch(setSelectionType('device'));
                    }}
                    className={`flex border border-gray-500 p-1 w-full cursor-pointer  ${GpNumber === Index && selectionType === 'device'
                        ? 'bg-green-500/80 text-gray-800'
                        : ''
                      }`}
                  >
                    {/* <Typography className="w-4 font-Vazir-Bold">
                      {Index + 1}
                    </Typography> */}
                    <Typography className=" font-Vazir-Medium">
                      {device?.title}
                    </Typography>
                  </div>
                ))}
              </>
            ) : (
              <>
                {selectUserGr?.map((GpItem, Index) => (
                  <div
                    key={'GpItem-' + Index}
                    id={'GpItem-' + Index}
                    onClick={() => {
                      dispatch(setSelectedGroupNumber(Index));
                      dispatch(setSelectionType('group'));
                    }}
                    className={`flex border border-gray-500 p-1 w-full cursor-pointer  ${GpNumber === Index && selectionType === 'group'
                        ? 'bg-green-500/80 text-gray-800'
                        : ''
                      }`}
                  >
                    {/* <Typography className="w-4 font-Vazir-Bold">
                      {Index + 1}
                    </Typography> */}
                    <Typography className=" font-Vazir-Medium">
                      {GpItem.groupTitle}
                    </Typography>
                  </div>
                ))}
              </>
            )}
          </section>
        </Item>
      </div>
    </>
  );
};
export default GroupListComponent;
