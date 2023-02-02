import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { useReactToPrint } from "react-to-print";
import { useTranslation } from "react-i18next";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Item from "../../atoms/Item/Item";

const theme = createTheme({
  typography: {
    h2: {
      fontSize: "1rem",
      fontWeight: 700,
      borderBottom: "2px solid black",
      "@media print": {
        fontSize: "2rem",
        borderBottom: "14px solid red",
        color: "gray",
      },
    },
  },
});
export default function FullPageModal({
  children,
  setOptions,
}: {
  children: any;
  setOptions: any;
}) {
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const handlePrint = useReactToPrint({
    content: () => inputRef.current,
    documentTitle: "report-data",
    onAfterPrint: () => alert("Print Success"),
  });
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="contained"
        color={"success"}
        className="bg-green-600 font-Vazir-Medium"
        onClick={handleClickOpen}
      >
        {t("printPreview")}
      </Button>

      <Dialog
        fullWidth={true}
        maxWidth={"lg"}
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar
          sx={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Toolbar>
            <Button
              variant="contained"
              color={"success"}
              className="bg-red-600 font-Vazir-Medium"
              onClick={handleClose}
            >
              <CloseIcon />
            </Button>
            {/* <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              close
            </Typography> */}
            <Button
              variant="contained"
              color={"success"}
              className="bg-green-600 font-Vazir-Medium mx-4"
              onClick={handlePrint}
            >
              print
            </Button>
          </Toolbar>
          <div className="w-full flex justify-center">
            <Item
              ref={inputRef}
              className="bg-white print-mode max-w-[1200px] "
            >
              <ThemeProvider theme={theme}>{children}</ThemeProvider>
            </Item>
          </div>
        </AppBar>
      </Dialog>
    </div>
  );
}
