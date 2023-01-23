import { DevicesReceiveType } from "../../../store/api/devicesApi";
import Item from "../../atoms/Item/Item";

export default function EbDeviceObject({
  device,
}: {
  device: DevicesReceiveType;
}) {
  return (
    <>
      <section>
        <Item>
          <h2>{device.title}</h2>
        </Item>
      </section>
    </>
  );
}
