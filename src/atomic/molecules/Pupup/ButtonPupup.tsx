import { Button } from "@mui/material";
import { useState } from "react";

interface Props {
  children?: React.ReactNode;
  title: string;
}

const ButtonPupup: React.FC<Props> = (props) => {
  const [terminalOpen, setTerminalOpen] = useState(false);
  return (
    <>
      <section
        className={`overflow-hidden w-full bottom-[1px]  fixed flex justify-center flex-wrap items-start  z-[999]`}
      >
        <Button
          onClick={() => {
            setTerminalOpen((val) => !val);
          }}
          variant={"contained"}
          className={`border-4 border-red-600 z-[100] ${
            terminalOpen ? "translate-y-[35px]" : ""
          } translate-x-[400px] w-[160px]  h-fit  ${
            terminalOpen === true
              ? "bg-red-600/80 hover:bg-red-700 rounded-t-none rounded-b-lg "
              : "bg-black/75 rounded-t-lg rounded-b-none hover:bg-green-700 "
          }`}
        >
          {!terminalOpen ? props.title : "close"}
        </Button>
        {terminalOpen === true ? (
          <div className="flex w-full bg-transparent items-center justify-center">
            {props.children}
          </div>
        ) : (
          <></>
        )}
      </section>
    </>
  );
};
export default ButtonPupup;
