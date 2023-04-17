// service/socket.js
import { io, Socket } from "socket.io-client";
export const socket = io(
  process.env.NEXT_PUBLIC_BASE_WEBSOCKET ?? "http://localhost:3051"
);
