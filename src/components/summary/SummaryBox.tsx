import React from "react";
import { useTranslation } from "react-i18next";
import { IsummData as Props } from "../../interfaces/IsummData";
import { Icon } from "@iconify/react";
import Card from "../UI/card/Card";
import classes from "./SummaryBox.module.scss";
import { selectDevicesAlarms } from "../../store/slices/devicesSlice";
import { useAppSelector } from "../../store/hooks";
const SummaryBox: React.FC<{ item: Props; open?: boolean }> = (props) => {
  const { t } = useTranslation();

  return (
    <div className={classes.summary__box}>
      <Card>
        <div className={classes.summary__box__wrapper}>
          <div className={classes.summary__box__info}>
            <div className={classes.summary__box__icon}>
              <Icon icon={props.item.icon} width="22" />
            </div>
            <p>{t(props.item.text)}</p>
            <div className={classes.summary__box__info__amount}>
              <h4>{t(props.item.amount)}</h4>
              <sup>{t(props.item.currency)}</sup>
            </div>
          </div>
        </div>
        {props?.open === true ? <div className="flex h-[500px]"></div> : <></>}
      </Card>
    </div>
  );
};

export default SummaryBox;
