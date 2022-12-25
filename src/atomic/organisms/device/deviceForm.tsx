import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import { useTranslation } from "react-i18next";
import Item from "../../atoms/Item/Item";

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: "var(--bgc)",
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: "center",
//   color: "var(--primary)",
// }));

export default function DeviceForm({
  props,
}: {
  props: {
    data?: string[];
  };
}) {
  const { t } = useTranslation();
  //itemShouldRender
  React.useEffect(() => {}, []);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid xs={4}>
          {/* <Item sx={{ fontSize: 24 }}>{t(props.data ?? "")}</Item> */}
        </Grid>
        <Grid xs={8}></Grid>
      </Grid>
    </Box>
  );
}
