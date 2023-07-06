import { ExcelFactoryMode } from "ag-grid-community";
import { useEffect } from "react";
import ExcelShape from "src/atomic/molecules/Table/ExcelShape";
import { SensorWebsocketRealTimeDataType } from "src/components/pages/sensors/sensorsTable";
import { useAppSelector } from "src/store/hooks";
import { selectSensorReports } from "src/store/slices/analizeSlice";
import { selectSocketDatas, selectSocketObject } from "src/store/slices/socketSlice";

interface Props {

}


const LiveSensorValue: React.FC<Props> = (props) => {
    const SocketData = useAppSelector(selectSocketDatas);
    const SocketObject = useAppSelector(selectSocketObject);

    useEffect(() => {
        // console.log("SocketObject:::==", SocketObject)

        return () => {

        }
    }, [SocketObject,])
    useEffect(() => {
        // console.log("SocketData:::==", SocketData)

        return () => {

        }
    }, [SocketData,])
    return (<section>
        {Object.keys(SocketObject)?.map((sensor, index) =>
            <div className="flex flex-wrap" key={index}>:
                {/* <ExcelShape {...{ width: '200', height: '80', color: 'red' }} />
                {Object.values(SocketObject)[index].value} */}
                <div className="flex border p-2"> {SocketObject[sensor].value}</div>
                <div className="flex border p-2"> {SocketObject[sensor].createdAt}</div>
                <div className="flex border p-2"> {SocketObject[sensor].sensorTitle}</div>
            </div>)
        }
    </section>)
}

export default LiveSensorValue;