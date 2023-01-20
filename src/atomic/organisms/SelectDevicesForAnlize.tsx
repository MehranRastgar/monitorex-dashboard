import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectDevicesData } from "../../store/slices/devicesSlice";
import SelectDeviceFromSelector from "../molecules/SelectDevice/SelectDevice";

export default function SelectDevicesForAnlize() {
  const dispatch = useAppDispatch();
  const selectSD = useAppSelector(selectDevicesData);

  return (
    <>
      <SelectDeviceFromSelector />
    </>
  );
}
