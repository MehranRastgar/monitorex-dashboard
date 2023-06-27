import { Icon } from "@iconify/react";
import addCommentOutlineSharp from '@iconify/icons-material-symbols/add-comment-outline-sharp';

import {
  Button,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { ClassAttributes, ClassType, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import classes from "./Device.module.scss";

export default function SettingsDevices() {
  const { t } = useTranslation();
  const [newOne, setNewOne] = useState(false);
  function handleAddItem() {
    setNewOne(true);
  }
  return (
    <>
      {/* <h2 className="title">{t("devices")}</h2> */}
      <AddItemButton handleClick={handleAddItem} />
      {newOne ? <NewItem title="دستگاه جدید" /> : <></>}
    </>
  );
}

const AddItemButton = ({ handleClick }: { handleClick: any }) => {
  const { t } = useTranslation();

  return (
    <Button onClick={handleClick} size={"small"} variant="outlined">
      <h3 className="flex font-Vazir-Bold">
        {t("addnew")}
        <div className="mx-2">
          <Icon
            fontSize={20}
            icon={addCommentOutlineSharp}
          />
        </div>
      </h3>
    </Button>
  );
};

interface Device {
  name: string;
  type: "tablo" | "module";
}
export interface NewItemInterface {
  title: string;
  itemSchema?: Device;
  // onChange: (event: React.SyntheticEvent, newValue: number) => void;
}

class DeviceClass {
  // list the propeties here, ONLY WRITTEN ONCE
  deviceTb: object;
  id: string;
  title: string;
  type: deviceTypes;
  dateCreated: Date;
  deviceTypeArray: string[];

  constructor(
    id: string = "*************",
    title: string = "type a name",
    type: deviceTypes = "Sensors Module",
    dateCreated: Date = new Date(),
    deviceTypeArray: string[] = ["Sensors Module", "Electrical panel"]
  ) {
    this.deviceTb = {
      id: id,
      title: title,
      type: type,
      dateCreated: dateCreated,
    };
    this.id = id;
    this.title = title;
    this.type = type;
    this.dateCreated = dateCreated;
    this.deviceTypeArray = deviceTypeArray;
  }
  changeDeviceType(types: deviceTypes) {
    this.type = types;
  }
  addNew() { }
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// This is the pure interface version, to be used/exported
type deviceTypes = "Sensors Module" | "Electrical panel";

interface DeviceInterface extends DeviceClass { }

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// Props type as an array, to be exported
type DeviceProperties = Array<keyof DeviceInterface>;

type DeviceTypeProperties = Array<keyof deviceTypes>;

// Props array itself!.

const propsArray: DeviceProperties = Object.keys(
  new DeviceClass()
) as DeviceProperties;
const AnopdeviceClass = new DeviceClass();
const K1 = Array<keyof Device>;
const NewItem = (props: NewItemInterface) => {
  const [dataShow, setDataShow] = useState<DeviceInterface>(new DeviceClass());
  const handleChange = (event: SelectChangeEvent) => {
    AnopdeviceClass.changeDeviceType(event?.target?.value as deviceTypes);
    // setDataShow(deviceClass);
    //console.log(AnopdeviceClass.type);
  };
  const { t } = useTranslation();
  return (
    <>
      <section className="flex my-2 select-none">
        <h3>{t(props.title)}</h3>
        <table className={classes.table}>
          <thead>
            <tr>
              {Object.keys(AnopdeviceClass.deviceTb).map(
                (theadItems, index) => (
                  <>
                    <th id={index + "-id"} key={index + "-key"}>
                      {theadItems}
                    </th>
                  </>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {/* <TableBody
              deviceClass={AnopdeviceClass}
              index={1}
              handleChange={handleChange}
            /> */}
          </tbody>
        </table>
      </section>
    </>
  );
};

// function TableBody({
//   handleChange,
//   deviceClass,
//   index,
// }: {
//   handleChange: any;
//   deviceClass: DeviceInterface;
//   index: number;
// }) {
//   // const handleChange = (event: SelectChangeEvent) => {
//   //   deviceClass.changeDeviceType(event?.target?.value as deviceTypes);
//   //   setDataShow(deviceClass);
//   //  //console.log(deviceClass.type);
//   // };
//   return (
//     <tr key={index + "-tr"}>
//       <td>{deviceClass.id}</td>
//       <td>{deviceClass.title}</td>
//       <td>
//         {/* <InputLabel id="demo-simple-select-label">{item.type}</InputLabel> */}
//         <Select
//           labelId="demo-simple-select-label"
//           id="demo-simple-select"
//           value={deviceClass.type}
//           label={"type"}
//           onChange={handleChange}
//         >
//           {deviceClass.deviceTypeArray?.map((type, indexes) => (
//             <MenuItem key={indexes + "-55"} value={type}>
//               {type}
//             </MenuItem>
//           ))}
//         </Select>
//       </td>
//       <td>
//         {
//           (deviceClass.dateCreated.toLocaleTimeString(),
//           deviceClass.dateCreated.toLocaleString())
//         }
//       </td>
//     </tr>
//   );
// }

////console.log(propsArray); // prints out  ["id", "title", "isDeleted"]

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// Example of creating a pure instance as an object
// const tableInstance: DeviceClass = {
//   // works properly!
//   id: "3",
//   title: "hi",
//   type: "device",
//   date: true,
// };
