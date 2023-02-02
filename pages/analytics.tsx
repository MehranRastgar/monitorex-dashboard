import { Box, Button, Modal, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { GetDevices } from "../src/api/devices";
import ButtonRegular from "../src/atomic/atoms/ButtonA/ButtonRegular";
import Item from "../src/atomic/atoms/Item/Item";
import GaugeDevice from "../src/atomic/molecules/AmChart/GaugeDevice";
import { SensorSelectedForReport } from "../src/atomic/molecules/SelectDevice/SelectDevice";
import DateTimeAnalytic from "../src/atomic/organisms/analytics/DateTimeAnalytic";
import MultiReportChartContainer from "../src/atomic/organisms/analytics/MultiReportChartContainer";
import DeviceList from "../src/atomic/organisms/device/DeviceList";
import DeviceSummary from "../src/atomic/organisms/device/deviceSummary";
import SelectDevicesForAnalize from "../src/atomic/organisms/SelectDevicesForAnalize";
import UserGroupsContainer, {
  UserGroupsSaveContainer,
} from "../src/atomic/organisms/UserGroups/UserGroupsContainer";
import Layout from "../src/components/layout/Layout";
import { useAppDispatch, useAppSelector } from "../src/store/hooks";
import {
  reportSensorsAsync,
  selectEndDate,
  selectSelectedSensorsAnalize,
  selectStartDate,
} from "../src/store/slices/analizeSlice";
import {
  selectSelectedDevice,
  setDevicesData,
  setDevicesStatus,
} from "../src/store/slices/devicesSlice";
import { selectOwnUser, updateUserData } from "../src/store/slices/userSlice";
import { GroupItemType, UserType } from "../src/types/types";

export default function Analytics() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { t } = useTranslation();
  const selectedDevice = useAppSelector(selectSelectedDevice);
  const [elem, setElem] = useState(false);
  const [nameofGp, setNameofGp] = useState("unname");
  const selectedSensorsSlice = useAppSelector(selectSelectedSensorsAnalize);
  const startDate = useAppSelector(selectStartDate);
  const endDate = useAppSelector(selectEndDate);
  const userData = useAppSelector(selectOwnUser);

  const dispatch = useAppDispatch();
  const queryDevices = useQuery("devices", GetDevices);
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "var(--bgc)",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const handleSaveToGroup = async () => {
    const start = startDate !== undefined ? new Date(startDate).getTime() : 0;
    const end = endDate !== undefined ? new Date(endDate).getTime() : 0;
    const time = end - start;
    const userD = await JSON.parse(localStorage.getItem("user") ?? "");
    const arr: GroupItemType[] = userD?.groups ?? [];
    if (selectedSensorsSlice !== undefined)
      arr.push({
        groupTitle: nameofGp ?? "unnamed",
        sensors: [...selectedSensorsSlice],
        timeRange: time,
      });
    const user: UserType = { ...userD, groups: [...arr] };
    console.log(userD);
    dispatch(updateUserData(user));
  };

  const handleReport = () => {
    const arr: string[] = [];
    selectedSensorsSlice?.map((sensor) => {
      if (sensor._id !== undefined) arr.push(sensor?._id);
    });
    dispatch(
      reportSensorsAsync({
        sensors: arr,
        start: startDate !== undefined ? new Date(startDate).toISOString() : "",
        end: endDate !== undefined ? new Date(endDate).toISOString() : "",
      })
    );
  };
  useEffect(() => {
    console.log(queryDevices);
    if (queryDevices.status === "success") {
      dispatch(setDevicesData(queryDevices.data));
      dispatch(setDevicesStatus("success"));
    }
  }, [queryDevices.isFetching, queryDevices.isSuccess]);
  return (
    <Layout>
      <section>
        <Box sx={{ py: 0 }}>
          <div className="font-Vazir-Medium text-[16px]">{t("analytics")}</div>
        </Box>
        <Box sx={{ py: 1 }}>
          <UserGroupsContainer />
        </Box>
        <Box sx={{ py: 1 }}>
          <SelectDevicesForAnalize />
        </Box>
        <Item className="flex justify-start flex-wrap w-full ">
          <Box className="flex justify-start flex-wrap w-[95%] rounded-lg p-2 m-2">
            <SensorSelectedForReport />
          </Box>
          <Box className="flex flex-wrap justify-start">
            <DateTimeAnalytic />
            <div className="flex h-fit w-1/3 justify-start mx-4">
              <ButtonRegular className="p-5" onClick={handleReport}>
                <Typography className="text-lg font-Vazir-Bold">
                  {t("takeReport")}
                </Typography>
              </ButtonRegular>
            </div>
            <div className="flex h-fit w-1/3 justify-start">
              <ButtonRegular className="p-5  mx-2" onClick={handleOpen}>
                <Typography className="text-lg font-Vazir-Bold ">
                  {t("saveToThisGroup")}
                </Typography>
              </ButtonRegular>
              <ButtonRegular className="p-5 mx-2" onClick={handleOpen}>
                <Typography className="text-lg font-Vazir-Bold ">
                  {t("saveAsNewGroup")}
                </Typography>
              </ButtonRegular>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    {t("saveToGroups")}
                  </Typography>
                  <UserGroupsSaveContainer />
                </Box>
              </Modal>
              {/* <ButtonRegular className="p-5" onClick={handleSaveToGroup}>
                <Typography className="text-lg font-Vazir-Bold">
                  {t("saveToGroup")}
                </Typography>
              </ButtonRegular> */}
            </div>
          </Box>
        </Item>
      </section>
      <section className="my-2">
        <MultiReportChartContainer />
      </section>
    </Layout>
  );
}

{
  /* <DeviceList moreItems={true} /> */
}
{
  /* <DeviceSummary /> */
}
