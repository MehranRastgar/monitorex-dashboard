import { Button } from "@mui/material";
import { useState } from "react";
import ButtonRegular from "../../atoms/ButtonA/ButtonRegular";

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
        <button
          onClick={() => {
            setTerminalOpen((val) => !val);
          }}
          className={`border  z-[100] ${
            terminalOpen ? "translate-y-[35px]" : ""
          } translate-x-[400px] w-[160px]  h-fit  ${
            terminalOpen === true
              ? "bg-red-600/80 hover:bg-red-700 rounded-t-none rounded-b-lg "
              : "bg-black/75 rounded-t-lg rounded-b-none hover:bg-green-700 "
          }`}
        >
          {!terminalOpen ? props.title : "close"}
        </button>
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
