import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { GetDevices } from "../../../api/devices";
import { DevicesReceiveType } from "../../../store/api/devicesApi";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  selectDevicesData,
  selectSelectedDevice,
  setDevicesData,
  setDevicesStatus,
} from "../../../store/slices/devicesSlice";
import Item from "../../atoms/Item/Item";
import OneEPanel from "../../organisms/electrical/OneEPanel";

export default function EbDeviceObject({
  device,
}: {
  device?: DevicesReceiveType;
}) {
  const { t } = useTranslation();
  const selectDevices = useAppSelector(selectDevicesData);
  useEffect(() => {
    //console.log(selectDevices);
  });

  return (
    <>
      <section className="flex flex-wrap w-full">
        {selectDevices?.map(({ _id, title, type }) => (
          <div key={_id} className="flex flex-wrap w-full">
            {/* <h2>{title}</h2> */}
            {type === "Electrical panel" && _id !== undefined ? (
              <Item className="flex flex-wrap justify-center m-4 w-full">
                <OneEPanel idOfSub={_id} />
              </Item>
            ) : (
              <></>
            )}
          </div>
        ))}
      </section>
    </>
  );
}
