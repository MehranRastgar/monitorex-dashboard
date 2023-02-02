import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../../store/hooks";
import { selectSensorReports } from "../../../store/slices/analizeSlice";
import TitleDesc from "./TitleDesc";

export default function ModulesReports() {
  const selectedsensors = useAppSelector(selectSensorReports);
  const { t } = useTranslation();

  return (
    <>
      {selectedsensors?.map((item, index) => (
        <>
          <TitleDesc
            ct="flex w-full justify-start font-Vazir-Bold border"
            cx="flex mx-1 font-Vazir-Medium text-[14px]"
            title={t("slectedSensorNumber") + " " + (Number(index) + 1)}
            desc={
              item?.sensor?.title +
              " " +
              t(item?.sensor?.type ?? "") +
              ", " +
              item.device.title +
              " ," +
              t("numberOfPoints") +
              ":" +
              item?.data?.length
            }
          />
        </>
      ))}
    </>
  );
}
