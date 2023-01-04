import { io } from 'socket.io-client';
import { message } from "antd";
export const socketIOUrl = process.env.REACT_APP_SOCKET_IO_URL;
export const createSocketWithHandlers = (actions) => {
  console.log(`Creating socket `);
  const socket = io(socketIOUrl, {
    transports: ['websocket', 'rooms'],
  });

  socket.on('connect', () => {
    console.log(
      `Connected with socket ID: ${socket.id}.`
    );
    actions.connected(socket.id);
  });

  socket.on('realtime_error', (data) => {
    console.log(`Failed to connect socket`);
    message.error(data);
  });

  socket.on('room_updated', (room) => {
    actions.room_updated(room);
  });

  socket.on('disconnect', () => {
    console.log(`Disconnected from socket`);
  });

  return socket;
};
