import { useTranslation } from "react-i18next";

export default function SettingsSensors() {
  const { t } = useTranslation();

  return (
    <>
      <h2 className="title">{t("sensors")}</h2>
    </>
  );
}
