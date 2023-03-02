import React, { useEffect, useState } from "react";

const Test: React.FC = () => {
  const [values, setValues] = useState<string[]>([]);

  return (
    <>
      <section>
        <div className="flex w-full ">
          <input
            type="text"
            className="flex w-full"
            onChange={(e) => {
              setValues(e.target.value.split(" "));
            }}
          ></input>
        </div>
        <div className="w-full flex-wrap flex items-start justify-center h-screen">
          <DerakhtKeshContainer values={values} />
        </div>
      </section>
    </>
  );
};

export default Test;

//create file for this sections and import here
interface DerakhtKeshContainerProps {
  values: string[];
}
const DerakhtKeshContainer: React.FC<DerakhtKeshContainerProps> = ({
  values,
}) => {
  const obj = buildObject(values, 0);

  return <>{values && <DerakhtKesh {...obj} />}</>;
};

type Props = {
  values: string[];
};

type objType = {
  value: string;
  left?: objType;
  right?: objType;
};
const buildObject = (values: string[], index: number): objType | undefined => {
  if (index >= values.length) {
    return undefined;
  }
  const value = values[index];
  const node: objType = {
    value,
    left: buildObject(values, 2 * index + 1),
    right: buildObject(values, 2 * index + 2),
  };
  return node;
};
//create file for this sections and import here
interface DerakhtProps {
  value?: string;
  left?: any;
  right?: any;
}

const DerakhtKesh: React.FC<DerakhtProps> = ({ value, left, right }) => {
  return (
    <div className="flex flex-wrap w-auto items-start justify-center">
      <div className="flex items-start justify-center">
        <div className="w-20 rounded-full border-2 border-gray-400 h-20 flex items-center justify-center m-2">
          {value}
        </div>
      </div>
      <div className="flex flex-wrap w-full items-start justify-center">
        <div className="flex flex-wrap w-1/2 items-center justify-center ">
          {left && <DerakhtKesh {...left} />}
        </div>
        <div className="flex flex-wrap w-1/2 items-center justify-center ">
          {right && <DerakhtKesh {...right} />}
        </div>
      </div>
    </div>
  );
};
