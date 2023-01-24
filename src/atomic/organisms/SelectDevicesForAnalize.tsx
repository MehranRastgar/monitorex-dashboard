import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectDevicesData } from "../../store/slices/devicesSlice";
import SelectDeviceFromSelector, {
  SensorSelectedForReport,
} from "../molecules/SelectDevice/SelectDevice";

export default function SelectDevicesForAnalize() {
  const dispatch = useAppDispatch();
  const selectSD = useAppSelector(selectDevicesData);

  return (
    <>
      <SelectDeviceFromSelector />
    </>
  );
}
