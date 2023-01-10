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
    case "disconnect_socket":
      return { ...state, errorMessage: "", socket: null };
    default:
      return state;
  }
};


const initialize_socket = (dispatch) => {
  return async (actions) => {
    try {
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

const public_chat = (dispatch) => {
  return async (data) => {
    try {
      if (currentSocket) {
        currentSocket.emit("publicChat", data);
      }
    } catch (error) {
      console.log("ERROR >> ", error.message)
    }
  };
};
const add_question = (dispatch) => {
  return async (data) => {
    try {
      if (currentSocket) {
        currentSocket.emit("addQuestion", data);
      }
    } catch (error) {
      console.log("ERROR >> ", error.message)
    }
  };
};
const disconnect_socket = (dispatch) => {
  return async () => {
    try {
      if (currentSocket) {
        currentSocket.disconnect();
        currentSocket = null;
      }
      await dispatch({
        type: "disconnect_socket",
      });
    } catch (error) {
      console.log("ERROR >> ", error.message)
    }
  };
};

const vote_question = (dispatch) => {
  return async (data) => {
    try {
      if (currentSocket) {
        currentSocket.emit("voteQuestion", data);
      }
    } catch (error) {
      console.log("ERROR >> ", error.message)
    }
  };
};

const mark_as_read = (dispatch) => {
  return async (data) => {
    try {
      if (currentSocket) {
        currentSocket.emit("markAsReadQuestion", data);
      }
    } catch (error) {
      console.log("ERROR >> ", error.message)
    }
  };
};

const end_presentation = (dispatch) => {
  return async (data) => {
    try {
      if (currentSocket) {
        currentSocket.emit("endPresentation", data);
      }
    } catch (error) {
      console.log("ERROR >> ", error.message)
    }
  };
};
const check_user_can_join_room = (dispatch) => {
  return async (data) => {
    try {
      if (currentSocket) {
        currentSocket.emit("checkUserCanJoinRoom", data);
      }
    }
    catch (error) {
      console.log("ERROR >> ", error.message)
    }
  }
}
export const { Context, Provider } = contextBuilder(
  socketReducer,
  {
    initialize_socket, vote_question,
    create_room, join_room,
    updated_room, submit_answer,
    change_slide, public_chat,
    add_question, disconnect_socket,
    mark_as_read, end_presentation,
    check_user_can_join_room,
  },
  { socket: null, errorMessage: "", room: null }
);
