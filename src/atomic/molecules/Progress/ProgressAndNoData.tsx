import { CircularProgress } from "@mui/material";
import { useTranslation } from "react-i18next";

interface Props {
  isLoading: boolean;
}

const ProgressAndNoData: React.FC<Props> = (props) => {
  const { t } = useTranslation();

  return (
    <>
      <div className="flex h-full w-full items-center">
        <div className="flex flex-wrap font-Vazir-Medium items-center justify-center w-full text-[60px] ">
          <div className="flex items-center justify-center w-full">
            {props.isLoading === true ? (
              <CircularProgress size={60} color="secondary" />
            ) : (
              <>
                <div className="opacity-25">{t("nodata")}</div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default ProgressAndNoData;
