import React from "react";
import { useTranslation } from "react-i18next";
import Summary from "../src/components/summary/Summary";
import SaleChart from "../src/components/chart/Chart";
import DashboardTables from "../src/components/tables/DashboardTables";
import Layout from "../src/components/layout/Layout";
import {
  AccordionDetails,
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  List,
  Stack,
  Typography,
} from "@mui/material";

function Users() {
  const { t } = useTranslation();
  return (
    <>
      <Layout>
        <section>{t("users")}</section>
      </Layout>
    </>
  );
}

export default Users;

const miles = [
  {
    milestoneId: 684,
    name: "cfghvjh",
    status: "COMPLETED",
  },
  {
    milestoneId: 685,
    name: "jknjkjn 1",
    status: "COMPLETED",
  },
  {
    milestoneId: 785,
    name: "hkjbkn",
    status: "COMPLETED",
  },
  {
    milestoneId: 786,
    name: "hkjbkn",
    status: "COMPLETED",
  },
];
