import * as React from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';
import DeviceUnit from 'src/atomic/molecules/device/DeviceUnit';
import DeviceUnitOffline from 'src/atomic/molecules/device/DeviceTable';
import { useAppSelector } from 'src/store/hooks';
import { selectDevicesData } from 'src/store/slices/devicesSlice';
import DeviceTable from 'src/atomic/molecules/device/DeviceTable';
import ThemeButton from 'src/atomic/atoms/ThemeButton/ThemeButton';
import { useTranslation } from 'react-i18next';
import GroupTable from '../Group/GroupTable';

interface Props { }
const DeviceMA: React.FC<Props> = () => {
  const { t } = useTranslation();
  const [groupOrDevice, setGroupOrDevice] = React.useState<'group' | 'device'>(
    'device',
  );
  return (
    <div className="flex flex-wrap justify-center w-full border border-[var(--border-color)] pt-2 p-2 overflow-auto rounded-md">
      <div className="flex w-full justify-center mb-2">
        <ThemeButton
          onClick={() => setGroupOrDevice('device')}
          type={groupOrDevice === 'device' ? 'activate' : 'deactivate'}
        >
          {t('devices')}
        </ThemeButton>
        <ThemeButton
          onClick={() => setGroupOrDevice('group')}
          type={groupOrDevice === 'group' ? 'activate' : 'deactivate'}
        >
          {t('groups')}
        </ThemeButton>
      </div>
      <div className="flex w-full justify-center mb-1">
        {groupOrDevice === 'device' ? <DeviceTable /> : <GroupTable />}
      </div>
    </div>
  );
};
export default DeviceMA;
