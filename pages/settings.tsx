import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Summary from "../src/components/summary/Summary";
import SaleChart from "../src/components/chart/Chart";
import DashboardTables from "../src/components/tables/DashboardTables";
import Layout from "../src/components/layout/Layout";

function Settings() {
  const { t } = useTranslation();
  useEffect(() => {}, []);
  const [state, setState] = useState<any>();
  const [values, setValues] = useState<string[]>([]);

  useEffect(() => {}, []);
  return (
    <Layout>
      <section>
        <h2 className="title">{t("settings")}</h2>
        {/* <BasicTabs /> */}
        <div className="flex w-full ">
          <input
            type="text"
            className="flex w-full"
            onChange={(e) => {
              setValues(e.target.value.split(" "));
            }}
          ></input>
        </div>
        <div className="w-full flex-wrap flex items-start justify-center h-screen">
          {/* <Test /> */}
        </div>
      </section>
    </Layout>
  );
}
const values = ["1", "2", "5", "3", "4", "6", "7", "8", "9", "10"];

export default Settings;

interface DerakhtProps {
  value?: string;
  left?: any;
  right?: any;
}
const DerakhtKesh: React.FC<DerakhtProps> = ({ value, left, right }) => {
  return (
    <div className="flex flex-wrap w-auto items-start justify-center">
      <div className="flex items-start justify-center">
        <div className="w-20 rounded-full border-2 border-gray-400 h-20 flex items-center justify-center m-2">
          {value}
        </div>
      </div>
      <div className="flex flex-wrap w-full items-start justify-center">
        <div className="flex flex-wrap w-1/2 items-center justify-center ">
          {left && <DerakhtKesh {...left} />}
        </div>
        <div className="flex flex-wrap w-1/2 items-center justify-center ">
          {right && <DerakhtKesh {...right} />}
        </div>
      </div>
    </div>
  );
};

// function BinaryTreeNode(props) {
//   const { value, left, right, values } = props;

//   return (
//     <div className="flex flex-wrap w-auto  items-start justify-center">
//       <div className="flex items-start justify-center">
//         <div className="w-[60px] rounded-full border-2 border-gray-400 h-[60px] flex items-center justify-center m-2">
//           {value}
//         </div>
//       </div>
//       <div className="flex flex-wrap w-full items-start justify-center">
//         <div className="flex flex-wrap w-1/2 items-center justify-center ">
//           {left && <BinaryTreeNode {...left} />}
//         </div>
//         <div className="flex flex-wrap w-1/2 items-center justify-center ">
//           {right && <BinaryTreeNode {...right} />}
//         </div>
//       </div>
//     </div>
//   );
// }
interface DerakhtKeshContainerProps {
  values?: string[];
}
const DerakhtKeshContainer: React.FC<DerakhtKeshContainerProps> = ({
  values,
}) => {
  if (values !== undefined) {
    const obj = buildObject(values, 0);
    return <>{values && <DerakhtKesh {...(obj ?? {})} />}</>;
  }
  return <></>;
};

type Props = {
  values: string[];
};

type objType = {
  value: string;
  left?: objType;
  right?: objType;
};
const buildObject = (values: string[], index: number): objType | undefined => {
  if (index >= values.length) {
    return undefined;
  }
  const value = values[index];
  const node: objType = {
    value,
    left: buildObject(values, 2 * index + 1),
    right: buildObject(values, 2 * index + 2),
  };
  return node;
};

const tree = {
  value: 1,
  left: {
    value: 2,
    left: {
      value: 3,
    },
    right: {
      value: 4,
    },
  },
  right: {
    value: 5,
    left: {
      value: 6,
    },
    right: {
      value: 7,
    },
  },
};

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import SettingsSensors from "../src/components/pages/settings/sensors";
import SettingsDevices from "../src/components/pages/settings/device/devices";
import DeviceList from "../src/atomic/organisms/device/DeviceList";
import Test from "../testbahar";

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

function BasicTabs() {
  const [value, setValue] = React.useState(0);
  const { t } = useTranslation();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {}, [value]);

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
      <TabPanel value={value} index={0}>
        {/* <SettingsDevices /> */}
        <DeviceList />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <SettingsDevices />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <SettingsSensors />
      </TabPanel>
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
