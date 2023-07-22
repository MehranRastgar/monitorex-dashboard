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
import DateTimeAnalytic from "src/atomic/organisms/analytics/DateTimeAnalytic";
import { selectCalendarMode } from "src/store/slices/themeSlice";
import ThemeButton from "src/atomic/atoms/ThemeButton/ThemeButton";
import { Icon } from "@iconify/react";
import documentList from '@iconify/icons-line-md/document-list';
import { reportEbAsync, selectEbReports, selectEndDate, selectStartDate } from "src/store/slices/analizeSlice";
import EbChart from "src/atomic/organisms/HighCharts/EbChart";


export default function EbDeviceObject({
  device,
}: {
  device?: DevicesReceiveType;
}) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const selectDevices = useAppSelector(selectDevicesData);
  const selectLocale = useAppSelector(selectCalendarMode)
  const startDate = useAppSelector(selectStartDate);
  const endDate = useAppSelector(selectEndDate);
  const selectEb = useAppSelector(selectEbReports)

  const handleReport = (id: string) => {
    dispatch(
      reportEbAsync({
        deviceId: id,
        start: startDate !== undefined ? new Date(startDate).toISOString() : '',
        end: endDate !== undefined ? new Date(endDate).toISOString() : '',
      }),
    );
  };
  useEffect(() => {
    //console.log(selectDevices);

  });

  return (
    <>
      <section className="flex flex-wrap w-full">
        <Item className="flex flex-wrap justify-center m-4 w-full">
          {selectLocale === 'fa' ?
            <DateTimeAnalytic key={selectLocale} localeT={'fa'} /> :
            <DateTimeAnalytic key={selectLocale} localeT={'en'} />}
        </Item>
        {selectDevices?.map(({ _id, title, type, electricals }) => (
          <div key={_id} className="flex flex-wrap w-full">
            {/* <h2>{title}</h2> */}
            {type === "Electrical panel" && _id !== undefined ? (
              <Item className="flex flex-wrap justify-center m-4 w-full">
                <OneEPanel idOfSub={_id} />
                <ThemeButton
                  disabled={
                    _id === undefined ||

                      startDate === undefined
                      ? true
                      : false
                  }
                  type="submit"
                  className="flex items-center h-[30px]"
                  onClick={() => { handleReport(_id) }}
                >
                  <div className="flex items-center justify-center">
                    <span className="flex mx-1 text-xs ">{t('takeReport')}</span>
                    <Icon fontSize={20} icon={documentList} ></Icon>
                  </div>
                </ThemeButton>
                {selectEb?.[0]?._id === _id && <div className="flex w-full ">

                  <EbChart ebNames={[...electricals?.map((elec) => elec?.deviceName ?? '') ?? []]} />
                </div>}
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
