import React, { useState } from "react";

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
import {
  selectAmountOfConnectSensors,
  selectAmountOfDisconnectSensors,
  selectDevicesAlarms,
} from "../../store/slices/devicesSlice";
import { Button } from "@mui/material";

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
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  const selectAmountSensorHasnotWork = useAppSelector(
    selectAmountOfDisconnectSensors
  );
  const selectAmountSensors = useAppSelector(selectAmountOfConnectSensors);
  const selectAlarms = useAppSelector(selectDevicesAlarms);

  summaryData[0].amount = String(selectAmountSensors?.toLocaleString());
  summaryData[1].amount = String(
    selectAmountSensorHasnotWork?.toLocaleString()
  );
  summaryData[2].amount = String(selectAlarms?.length?.toLocaleString());
  return (
    <section className={classes.summary}>
      <Button
        onClick={() => {
          setIsOpen((val) => !val);
        }}
      >
        +
      </Button>
      <p className="subTitle">{t("summary")}</p>
      <div className={classes.summary__box}>
        {summaryData.map((item) => (
          <SummaryBox open={isOpen} key={item.text} item={item} />
        ))}
      </div>
    </section>
  );
}

export default Summary;
