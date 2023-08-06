import React, { useState, useEffect, useRef } from "react";
import { socket } from "../../../components/socketio";

interface LogBoxProps {
  //   interval: number;
  id: string;
  title: string;
}

const LogBox: React.FC<LogBoxProps> = ({ id, title }) => {
  const [logs, setLogs] = useState<string[]>([]);
  const [stop, setStop] = useState<boolean>(false);
  const logsRef = useRef<HTMLUListElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<string | null>(null);

  function handleScroll(event: any) {
    const currentPosition = event.target.scrollTop;
    if (currentPosition > scrollPosition) {
      setScrollDirection("down");
      setStop(false);
    } else if (currentPosition < scrollPosition) {
      setScrollDirection("up");
      setStop(true);
    }
    setScrollPosition(currentPosition);
  }
  //   const addLog = (message: string) => {
  //     setLogs((prevLogs) => [...prevLogs, message]);
  //   };

  const addLog = (message: string) => {
    setLogs((prevLogs) => {
      const newLogs = [...prevLogs, message];
      return newLogs.slice(-200);
    });
  };

  useEffect(() => {
    // const intervalId = setInterval(() => {
    //   addLog(`${new Date().toISOString()}`);
    // }, interval);

    socket.on(id, (data) => {
      if (stop === false) {
        addLog(`${new Date().toLocaleString()}`);
        addLog(`${JSON.stringify(data)}`);
      }
    });

    return () => {
      socket.off(id);
    };

    // clearInterval(intervalId);
  }, [stop]);

  useEffect(() => {
    handleScrollToSelectedItem(logs.length);
    // if (logsRef.current) {
    //   logsRef.current.scrollTop = logsRef.current.scrollHeight;
    // }
  }, [logs]);

  function handleScrollToSelectedItem(index: number) {
    stop;
    if (document !== undefined && stop === false) {
      const el = document?.getElementById(
        "log" + id + "-" + (index - 2).toString()
      ) as HTMLElement;
      el?.scrollIntoView();
    }
  }

  return (
    <>
      <section className="flex font-light flex-wrap w-full">
        <div className="flex w-full sticky m-8">
          <h2 className="flex w-full">{title}</h2>
          {stop ? (
            <h2 className="flex  w-full">
              scroll down to continue{" - "}
              <span className="flex text-red-600">
                {" "}
                terminal puased
              </span>
            </h2>
          ) : (
            <h2 className="flex  w-full"></h2>
          )}
        </div>
        <div
          onScroll={handleScroll}
          className="flex flex-wrap justify-start  overflow-y-auto w-2/3 h-[200px]"
        >
          <ul className="flex flex-wrap " ref={logsRef}>
            {logs.map((log, index) => (
              <li
                className="flex justify-center w-full"
                key={index}
                id={"log" + id + "-" + index.toString()}
              >
                <div className="flex w-full mx-24 justify-start">{log}</div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
};

export default LogBox;
