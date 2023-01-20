import { Icon } from "@iconify/react";
import { Button } from "@mui/material";

import { Box } from "@mui/system";
import { SensorsReceiveTpe } from "../../../components/pages/sensors/sensorsTable";
import { useAppDispatch } from "../../../store/hooks";
import { removeSelectedSensors } from "../../../store/slices/analizeSlice";
import Item from "../../atoms/Item/Item";

export default function SensorObject({
  sensor,
}: {
  sensor: SensorsReceiveTpe;
}) {
  const dispatch = useAppDispatch();

  return (
    <>
      <Box>
        <Item className="flex flex-wrap justify-center  m-4 h-auto rounded-lg ">
          <aside className="flex items-center">
            <Icon
              className="mx-2 "
              fontSize={40}
              icon={"material-symbols:motion-sensor-active-rounded"}
            ></Icon>
            <h1 className="flex w-full">sensor</h1>{" "}
          </aside>
          <h1 className="w-full">{sensor?.title}</h1>
          <Button
            variant="contained"
            size="small"
            type="button"
            className="border bg-[var(--rejected-bgc)] "
            onClick={(e) => {
              dispatch(removeSelectedSensors(sensor._id ?? ""));
            }}
          >
            <div className="text-[8px] ">remove</div>
          </Button>
        </Item>
      </Box>
    </>
  );
}
