import React from "react";

import SummaryBox from "./SummaryBox";
import { useTranslation } from "react-i18next";
import classes from "./Summary.module.scss";
import { IsummData } from "../../interfaces/IsummData";

const summaryData: IsummData[] = [
  {
    icon: "material-symbols:nest-thermostat-sensor-eu-outline",
    text: "numberOfAvailableSensors",
    amount: "salesAmount",
    currency: "pieces",
  },
  {
    icon: "material-symbols:motion-sensor-urgent",
    text: "numberOfCurreptedSensors",
    amount: "orderAmount",
    currency: "pieces",
  },
  {
    icon: "material-symbols:add-alert",
    text: "numberOfAlarms",
    amount: "0",
    currency: "",
  },
];

function Summary() {
  const { t } = useTranslation();
  return (
    <section className={classes.summary}>
      <p className="subTitle">{t("summary")}</p>
      <div className={classes.summary__box}>
        {summaryData.map((item) => (
          <SummaryBox key={item.text} item={item} />
        ))}
      </div>
    </section>
  );
}

export default Summary;
