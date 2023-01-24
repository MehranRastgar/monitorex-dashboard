import { Icon } from "@iconify/react";
import { Button, Paper } from "@mui/material";

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
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 1,
            width: 128,
            height: 140,
          },
        }}
      >
        <Paper
          sx={{
            background: "rgb(67 56 202 )",
          }}
          elevation={3}
        >
          {" "}
          <aside className="flex items-center text-wipro-cream ">
            <Icon
              className="mx-2 "
              fontSize={60}
              icon={"material-symbols:motion-sensor-active-rounded"}
            ></Icon>
            <h1 className="flex w-full">sensor</h1>{" "}
          </aside>
          <h1 className="w-full text-wipro-cream m-2">{sensor?.title}</h1>
          <button
            // variant="contained"
            // size="small"
            type="button"
            className="flex rounded-lg m-1 w-[35px] h-[35px] "
            onClick={(e) => {
              dispatch(removeSelectedSensors(sensor._id ?? ""));
            }}
          >
            <div className="text-[8px] hover:text-red-800  text-red-600">
              <Icon
                className=" "
                fontSize={30}
                icon={"material-symbols:delete-outline-sharp"}
              ></Icon>
            </div>
          </button>
        </Paper>
      </Box>
    </>
  );
}
