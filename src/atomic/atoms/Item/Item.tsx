import * as React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "var(--bgc)",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: "var(--primary)",
  boxShadow:
    " -6px 7px 4px -1px rgb(0 0 0 / 20%), -8px 10px 7px 4px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
}));
export default Item;

// "-6px 7px 4px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
