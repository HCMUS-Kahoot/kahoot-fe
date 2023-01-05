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

  Object.keys(actions)?.forEach((key) => {
    console.log(`Registering event ${key} with action ${actions[key].name}`);
    socket.on(key, (data) => {
      actions[key](data);
    });
  });

  // socket.on('disconnect', () => {
  //   console.log(`Disconnected from socket`);
  // });

  // socket.on('room_updated', (room) => {
  //   actions.room_updated(room);
  // });

  // socket.on('public_chat', (data) => {
  //   actions?.public_chat(data);
  // });

  // socket.on('add_question', (data) => {
  //   actions?.add_question(data);
  // });

  // socket.on('remove_question', (data) => {
  //   actions?.remove_question(data);
  // });

  // socket.on('vote_question', (data) => {
  //   actions?.vote_question(data);
  // });

  return socket;
};
