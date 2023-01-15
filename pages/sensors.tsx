import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Summary from "../src/components/summary/Summary";
import SaleChart from "../src/components/chart/Chart";
import DashboardTables from "../src/components/tables/DashboardTables";
import Layout from "../src/components/layout/Layout";
import CustomTable from "../src/components/tables/customTable/CustomTable";
import data from "../src/constants/sensors";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";
import { Button, PaginationItem } from "@mui/material";
import SensorsTable from "../src/components/pages/sensors/sensorsTable";
import ChartSensor from "../src/components/pages/sensors/SensorChart";
import { useAppSelector } from "../src/store/hooks";
import { selectSelectedSensors } from "../src/store/slices/sensorsSlice";
import Template from "../src/components/canvas/views/Template";
const DemoTinyLine = dynamic(
  () => import("../src/atomic/molecules/AntChart/LineChartAnt"),
  { ssr: false }
);
function Sensors() {
  const { t } = useTranslation();
  const selectedsensors = useAppSelector(selectSelectedSensors);
  const [elem, setElem] = useState(false);

  useEffect(() => {
    if (document.createElement("havij")) setElem(true);
  }, []);
  return (
    <Layout>
      <section>
        <h2 className="title">{t("sensors")}</h2>
        <Summary />
        {/* <DemoTinyLine /> */}

        {/* <SensorsTable /> */}

        <div className="flex flex-wrap my-10">
          <h2 className="title">{t("sensorsSelected")}</h2>
          <div className="flex w-full">
            <SelectedSensorsAcording />
          </div>
        </div>
        <div className="flex flex-wrap w-full justify-center my-20">
          {/* {selectedsensors?.map((itemSelected) => (
            <>
              <ChartSensor itemSelected={itemSelected} />
            </>
          ))} */}
          {/* {selectedsensors?.map((itemSelected) => (
            <>
              <Chart itemSelected={itemSelected} />
            </>
          ))} */}
          <div
            style={{
              width: "800px",
            }}
          ></div>
        </div>
      </section>
    </Layout>
  );
}

export default Sensors;

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Chart from "../src/components/pages/sensors/Chart";
import ChartWithZoom from "../src/components/canvas/views/overview/Chart with Zoom";
import dynamic from "next/dynamic";
const AreaAndRange = dynamic(
  () => import("../src/components/canvas/views/area charts/AreaAndRange"),
  { ssr: false }
);

function SelectedSensorsAcording() {
  const selectedsensors = useAppSelector(selectSelectedSensors);

  return (
    <div className="flex flex-wrap justify-center w-full">
      {selectedsensors?.map((item, index) => (
        <>
          <div className=" flex flex-wrap justify-center w-[90%]">
            <h2 className="flex">{item.title}</h2>
            <AreaAndRange itemSelected={item} />
          </div>
        </>
        // <>
        //   <Accordion
        //     key={index}
        //     sx={{
        //       width: "100%",
        //     }}
        //   >
        //     <AccordionSummary
        //       expandIcon={<ExpandMoreIcon />}
        //       aria-controls="panel1a-content"
        //       id="panel1a-header"
        //     >
        //       <Typography>{item.title}</Typography>
        //     </AccordionSummary>
        //     <AccordionDetails>
        //       <Typography>{item._id}</Typography>
        //       <Typography>{item.multiport}</Typography>
        //       <Typography>{item.type}</Typography>
        //       <Typography>{item.unit}</Typography>
        //       <Typography>{item.resolution}</Typography>
        //       <Typography>
        //         {item?.sensorLastSerie?.metaField?.value ?? ""}
        //       </Typography>
        //       {/* <Chart itemSelected={item} /> */}

        //       <AreaAndRange itemSelected={item} />
        //     </AccordionDetails>
        //   </Accordion>
        // </>
      ))}
    </div>
  );
}
