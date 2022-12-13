import contextBuilder from "../contextBuilder";
import { createSocketWithHandlers } from "../../../api/realtimeAPI";

let currentSocket = null;

const socketReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "initialize_socket":
      currentSocket = action.payload;
      return { ...state, errorMessage: "", socket: action.payload };
    case "updated_room":
      return { ...state, errorMessage: "", room: action.payload };
    default:
      return state;
  }
};


const initialize_socket = (dispatch) => {
  return async (actions) => {
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

const updated_room = (dispatch) => {
  return async (data) => {
    try {
      await dispatch({
        type: "updated_room",
        payload: data,
      });
    } catch (error) {
      console.log("ERROR >> ", error.message)
    }
  };
};

const submit_answer = (dispatch) => {
  return async (data) => {
    try {
      if (currentSocket) {
        currentSocket.emit("submitAnswer", data);
      }
    } catch (error) {
      console.log("ERROR >> ", error.message)
    }
  };
};

const change_slide = (dispatch) => {
  return async (data) => {
    try {
      if (currentSocket) {
        currentSocket.emit("changeSlide", data);
      }
    } catch (error) {
      console.log("ERROR >> ", error.message)
    }
  };
};
export const { Context, Provider } = contextBuilder(
  socketReducer,
  { initialize_socket, create_room, join_room, updated_room, submit_answer, change_slide },
  { socket: null, errorMessage: "", room: null }
);
