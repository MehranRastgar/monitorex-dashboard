import React, { useState } from "react";
import { faker } from "@faker-js/faker";

import { useTranslation } from "react-i18next";
import LineChart from "./LineChart";
import classes from "./Chart.module.scss";
import data from "../../constants/data";
import Card from "../UI/card/Card";

const SaleChart = () => {
  const { t } = useTranslation();
  const labels = data.revenueByMonths.labels.map((month) => t(month));
  const [userData] = useState({
    labels,
    datasets: [
      {
        label: t("summaryOfSale"),
        data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),

        borderColor: "#ee3",
        backgroundColor: "#3c4b6d",
      },
    ],
  });

  const [orderData] = useState({
    labels,
    datasets: [
      {
        label: t("summaryOfOrders"),
        data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        backgroundColor: "rgba(255, 99, 132, 0.9)",
      },
    ],
  });

  const [revenueData] = useState({
    labels,
    datasets: [
      {
        label: t("summaryOfRevenue"),
        data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  });

  return (
    <section className={classes.chart}>
      <p className="subTitle">{t("quickAnalysis")}</p>
      <div className={classes.charts__container}>
        <div className={classes.charts__wrapper}>
          <Card>
            <div className={classes.chart__wrapper}></div>
          </Card>
          <Card>
            <div className={classes.chart__wrapper}></div>
          </Card>
        </div>
        <Card>
          <div className={classes.chart__wrapper}>
            <LineChart chartData={userData} />
          </div>
        </Card>
      </div>
    </section>
  );
};

export default SaleChart;
