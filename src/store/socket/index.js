import { createSlice } from "@reduxjs/toolkit";
import { createSocketWithHandlers } from "../../api/realtimeAPI";

const socketSlice = createSlice({
  name: "socket",
  initialState: {
    socket: null,
    errorMessage: "",
    room: null,
  },
  reducers: {
    socketConnect: (state, action) => {
      if (state.socket) {
        if (state.socket.connected) {
          return;
        }
        state.socket.connect();
        return;
      }
      state.socket = createSocketWithHandlers(action.payload);
    },
    createRoom: (state, action) => {
      if (state.socket) {
        console.log("createRoom: ", action.payload)
        state.socket.emit("createRoom", action.payload);
      }
    },
    joinRoom: (state, action) => {
      if (state.socket) {
        state.socket.emit("joinRoom", action.payload);
      }
    },
    submitAnswer: (state, action) => {
      if (state.socket) {
        state.socket.emit("submitAnswer", action.payload);
      }
    },
    changeSlide: (state, action) => {
      if (state.socket) {
        state.socket.emit("changeSlide", action.payload);
      }
    },
    updateRoom: (state, action) => {
      state.room = action.payload;
    },
    publicChat: (state, action) => {
      if (state.socket) {
        state.socket.emit("publicChat", action.payload);
      }
    },
  }
});

export const {
  socketConnect,
  createRoom,
  joinRoom,
  submitAnswer,
  changeSlide,
  updateRoom,
  publicChat,
} = socketSlice.actions;

export default socketSlice.reducer;
