import contextBuilder from "../contextBuilder";
import { createSocketWithHandlers } from "../../../api/realtimeAPI";

let currentSocket = null;
const socketReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "initialize_socket":
      currentSocket = action.payload;
      return { errorMessage: "", socket: action.payload };
    default:
      return state;
  }
};

const actions = {
  connected: (data) => console.log("Connected with socket ID: ", data),
  error: (data) => console.log("Failed to connect socket: ", data),
  room_updated: (data) => console.log("event: 'room_updated' received: ", data),
}


const initialize_socket = (dispatch) => {
  return async () => {
    try {
      if (currentSocket) {
        if (currentSocket.connected) {
          return;
        }
        currentSocket.connect();
        return;
      }
      currentSocket = createSocketWithHandlers(actions);
      await dispatch({
        type: "initialize_socket",
        payload: currentSocket,
      });
    } catch (error) {
      console.log("ERROR >> ", error.message)
    }
  };
};

const join_room = (dispatch) => {
  return async (data) => {
    try {
      if (currentSocket) {
        currentSocket.emit("joinRoom", data);
      }
    } catch (error) {
      console.log("ERROR >> ", error.message)
    }
  };
};

const create_room = (dispatch) => {
  return async (data) => {
    try {
      if (currentSocket) {
        currentSocket.emit("createRoom", data);
      }
    } catch (error) {
      console.log("ERROR >> ", error.message)
    }
  };
};

export const { Context, Provider } = contextBuilder(
  socketReducer,
  { initialize_socket, create_room, join_room },
  { socket: null, errorMessage: "" }
);
