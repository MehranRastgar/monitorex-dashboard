import { ObjectId } from "mongoose";

export interface sensor {
  _id: ObjectId;
  address1: string;
  address2: string;
  title: string;
  type: string;
}

export interface SensorType {
  name: string;
  unit: string;
  value: number;
  lastValue: number;
  alarmGte: number;
  alarmLte: number;
}
