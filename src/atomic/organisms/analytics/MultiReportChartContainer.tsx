import Item from "../../atoms/Item/Item";
import MultiLineChart from "../../molecules/AmChart/MultiLineChart";

export default function MultiReportChartContainer() {
  return (
    <>
      <Item>
        <MultiLineChart id={"multilineChart-1"} />
      </Item>
    </>
  );
}
