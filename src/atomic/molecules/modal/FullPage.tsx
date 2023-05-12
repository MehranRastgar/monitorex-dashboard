import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { useReactToPrint } from 'react-to-print';
import { useTranslation } from 'react-i18next';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Item from '../../atoms/Item/Item';
import ThemeButton from 'src/atomic/atoms/ThemeButton/ThemeButton';

const theme = createTheme({
  typography: {
    h2: {
      fontSize: '1rem',
      fontWeight: 700,
      borderBottom: '2px solid black',
      '@media print': {
        fontSize: '2rem',
        borderBottom: '14px solid red',
        color: 'gray',
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
    documentTitle: 'report-data',
    onAfterPrint: () => alert('Print Success'),
  });
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <button
        type={'button'}
        onClick={handleClickOpen}
        className="button-82-pushable"
        role="button"
      >
        <span className="button-82-shadow"></span>
        <span className="button-82-edge"></span>
        <span className="button-82-front text">{t('printPreview')}</span>
      </button>
      {/* <button
        className="button-82-pushable"
       
      >
        {t('printPreview')}
      </button> */}

      <Dialog
        fullWidth={true}
        maxWidth={'lg'}
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar
          sx={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            backgroundColor: 'white',
          }}
        >
          <Toolbar
            sx={{
              backgroundColor: 'white',
            }}
          >
            <ThemeButton type="reject" className=" mx-2" onClick={handleClose}>
              <CloseIcon />
            </ThemeButton>
            {/* <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              close
            </Typography> */}
            <ThemeButton type="submit" className="mx-2" onClick={handlePrint}>
              print
            </ThemeButton>
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
