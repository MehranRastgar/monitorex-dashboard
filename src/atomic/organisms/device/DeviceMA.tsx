import * as React from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';
import DeviceUnit from 'src/atomic/molecules/device/DeviceUnit';
import DeviceUnitOffline from 'src/atomic/molecules/device/DeviceTable';
import { useAppSelector } from 'src/store/hooks';
import { selectDevicesData } from 'src/store/slices/devicesSlice';
import DeviceTable from 'src/atomic/molecules/device/DeviceTable';

interface Props {}
const DeviceMA: React.FC<Props> = () => {
  return (
    <div>
      <DeviceTable />
    </div>
  );
};
export default DeviceMA;
