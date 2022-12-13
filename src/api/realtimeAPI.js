import { io } from 'socket.io-client';

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

  socket.on('realtime_error', () => {
    console.log(`Failed to connect socket`);

  });

  socket.on('room_updated', (room) => {
    console.log('event: "poll_updated" received', room);
  });

  return socket;
};
