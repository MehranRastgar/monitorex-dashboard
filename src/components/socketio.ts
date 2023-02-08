// service/socket.js
import { io, Socket } from "socket.io-client";
export const socket = io("http://localhost:3051");
