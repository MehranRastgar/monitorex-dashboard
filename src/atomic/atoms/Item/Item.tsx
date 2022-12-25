import * as React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "var(--bgc)",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: "var(--primary)",
}));
export default Item;
