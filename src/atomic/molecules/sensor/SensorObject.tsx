import { SensorsReceiveTpe } from "../../../components/pages/sensors/sensorsTable";
import Item from "../../atoms/Item/Item";

export default function SensorObject({
  sensor,
}: {
  sensor: SensorsReceiveTpe;
}) {
  return (
    <>
      <Item className="flex w-20 m-2 h-10 rounded-lg ">
        <h1>{sensor?.title}</h1>
      </Item>
    </>
  );
}
