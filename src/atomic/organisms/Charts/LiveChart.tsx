import { Typography } from "@mui/material";
import Item from "../../atoms/Item/Item";
import DashboardLiveChart from "../../molecules/AmChart/DashboardLiveChart";
import { selectUserGroups } from "../../../store/slices/userSlice";
import { selectGroupNumber } from "../../../store/slices/analizeSlice";
import { useAppSelector } from "../../../store/hooks";
import dynamic from "next/dynamic";
const AmStockLive = dynamic(
  () => import("../../organisms/AmChartsStock/AmStockLive"),
  { ssr: false }
);
interface Props {
  id?: string;
}

const LiveChart: React.FC<Props> = (props) => {
  const selectUserGr = useAppSelector(selectUserGroups);
  const GpNumber = useAppSelector(selectGroupNumber);
  return (
    <>
      <Item className="flex flex-wrap w-full h-fit  p-2">
        <section className="flex w-full items-start justify-end">
          <Typography className="flex m-4 font-Vazir-Medium">
            {GpNumber !== undefined && selectUserGr !== undefined
              ? selectUserGr[GpNumber].groupTitle
              : ""}
          </Typography>
          <Typography className="flex m-2">
            Live
            <div className="flex m-2 rounded-full bg-red-600 w-[10px] h-[10px]"></div>
          </Typography>
        </section>
        <section className="flex w-full">
          {/* <DashboardLiveChart id={"id-" + props.id} /> */}
          <AmStockLive dataReal={[...[]]} id={"id225"} />
        </section>
      </Item>
    </>
  );
};

export default LiveChart;
