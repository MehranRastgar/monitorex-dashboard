import React, { useEffect } from "react";
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

function Sensors() {
  const { t } = useTranslation();
  const selectedsensors = useAppSelector(selectSelectedSensors);
  return (
    <Layout>
      <section>
        <h2 className="title">{t("sensors")}</h2>
        <Summary />

        <SensorsTable />
        <div className="flex flex-wrap my-10">
          <h2 className="title">{t("sensorsSelected")}</h2>
          <div className="flex w-full">
            <SelectedSensorsAcording />
          </div>
        </div>
        <div className="flex flex-wrap w-full justify-center my-20">
          {selectedsensors?.map((itemSelected) => (
            <>
              <ChartSensor itemSelected={itemSelected} />
            </>
          ))}
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

function SelectedSensorsAcording() {
  const selectedsensors = useAppSelector(selectSelectedSensors);

  return (
    <div className="flex flex-wrap  w-1/3">
      {selectedsensors?.map((item, index) => (
        <>
          <Accordion
            sx={{
              width: "100%",
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>{item.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{item._id}</Typography>
              <Typography>{item.multiport}</Typography>
              <Typography>{item.type}</Typography>
              <Typography>{item.unit}</Typography>
              <Typography>{item.resolution}</Typography>
              <Typography>
                {item?.sensorLastSerie?.metaField?.value ?? ""}
              </Typography>
            </AccordionDetails>
          </Accordion>
        </>
      ))}
    </div>
  );
}
