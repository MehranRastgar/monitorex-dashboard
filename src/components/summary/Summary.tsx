import React from "react";

import SummaryBox from "./SummaryBox";
import { useTranslation } from "react-i18next";
import classes from "./Summary.module.scss";
import { IsummData } from "../../interfaces/IsummData";
import { useAppSelector } from "../../store/hooks";
import {
  selectSensorsHasNotWork,
  selectSensorsHasWork,
  selectSensorsLength,
} from "../../store/slices/sensorsSlice";

var summaryData: IsummData[] = [
  {
    icon: "material-symbols:nest-thermostat-sensor-eu-outline",
    text: "numberOfAvailableSensors",
    amount: "loading",
    currency: "pieces",
  },
  {
    icon: "material-symbols:motion-sensor-urgent",
    text: "numberOfCurreptedSensors",
    amount: "loading",
    currency: "pieces",
  },
  {
    icon: "material-symbols:add-alert",
    text: "numberOfAlarms",
    amount: "loading",
    currency: "",
  },
];

function Summary() {
  const { t } = useTranslation();
  const selectAmountSensors = useAppSelector(selectSensorsHasWork);
  const selectAmountSensorHasnotWork = useAppSelector(selectSensorsHasNotWork);
  summaryData[0].amount = String(selectAmountSensors?.toLocaleString());
  summaryData[1].amount = String(
    selectAmountSensorHasnotWork?.toLocaleString()
  );
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
