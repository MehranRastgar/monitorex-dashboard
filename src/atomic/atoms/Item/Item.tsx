import * as React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "var(--blur-bg-bl)",
  // backdropFilter: "blur( 8px )",
  // "-webkit-backdrop-filter": "blur( 8px )",
  margin: ' 1,3 ,1 ,3',
  borderRadius: '1rem',
  ...theme.typography.body2,
  padding: theme.spacing(3),
  border: "var(--text-color)",
  textAlign: "center",
  color: "var(--primary)",
  boxShadow:
    "rgba(255, 255, 255, 0.3) 0px 0px 15px 0px, rgba(255, 255, 255, 0.3) 0px 0px 2px 0px;",
}));
export default Item;

// "-6px 7px 4px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",

// backgroundColor: "rgba( 255, 255, 255, 0.15 )",
//   boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
//   backdropFilter: "blur( 4px )",
//   "-webkit-backdrop-filter": "blur( 4px )",
//   borderRadius: "5px",
//   border: "1px solid rgba( 255, 255, 255, 0.25 )",
