import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Summary from "../src/components/summary/Summary";
import SaleChart from "../src/components/chart/Chart";
import DashboardTables from "../src/components/tables/DashboardTables";
import Layout from "../src/components/layout/Layout";

function Settings() {
  const [value, setValue] = useState(0);
  const { t } = useTranslation();
  useEffect(() => {}, [,]);

  return (
    <Layout>
      <section>
        <h2 className="title">{t("management")}</h2>
        <BasicTabs value={value} setValue={setValue} />
        <Box sx={{ p: 3 }}>
          {value === 0 ? <DeviceManagement /> : <></>}
          {value === 1 ? <SensorList props={{ title: "sensors" }} /> : <></>}
          {value === 2 ? <DeviceList /> : <></>}
        </Box>
      </section>
    </Layout>
  );
}

export default Settings;

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import SettingsSensors from "../src/components/pages/settings/sensors";
import SettingsDevices from "../src/components/pages/settings/device/devices";
import DeviceList from "../src/atomic/organisms/device/DeviceList";
import DeviceManagement from "../src/atomic/templates/DeviceManagement";
import SensorList from "../src/atomic/organisms/sensor/SensorList";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  other?: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  useEffect(() => {}, [value, index]);

  return (
    <>
      <div
        role="tabpanel"
        hidden={props.value !== props.index}
        id={`simple-tabpanel-${props.index}`}
        aria-labelledby={`simple-tab-${props.index}`}
        {...props.other}
      >
        {props.value === props.index && (
          <Box sx={{ p: 3 }}>
            <Typography>{props.children}</Typography>
          </Box>
        )}
      </div>
    </>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function BasicTabs({ setValue, value }: { setValue: any; value: number }) {
  const { t } = useTranslation();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          variant="fullWidth"
          textColor="inherit"
          TabIndicatorProps={{
            children: <span className="MuiTabs-indicatorSpan" />,
          }}
        >
          <StyledTab label={t("devices")} {...a11yProps(0)} />
          <StyledTab label={t("sensors")} {...a11yProps(1)} />
          <StyledTab label={t("users")} {...a11yProps(2)} />
        </Tabs>
      </Box>
    </Box>
  );
}

interface StyledTabsProps {
  children?: React.ReactNode;
  value: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
}

const StyledTabs = styled((props: StyledTabsProps) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  "& .MuiTabs-indicator": {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  "& .MuiTabs-indicatorSpan": {
    maxWidth: 40,
    width: "100%",
    backgroundColor: "#635ee7",
  },
});

interface StyledTabProps {
  label: string;
}

const StyledTab = styled((props: StyledTabProps) => (
  <Tab disableRipple {...props} />
))(({ theme }) => ({
  textTransform: "none",
  fontWeight: theme.typography.fontWeightRegular,
  fontSize: theme.typography.pxToRem(15),
  fontFamily: "inherit",
  marginRight: theme.spacing(1),
  color: "rgba(255, 255, 255, 0.7)",
  "&.Mui-selected": {
    color: "#fff",
  },
  "&.Mui-focusVisible": {
    backgroundColor: "rgba(100, 95, 228, 0.32)",
  },
}));
