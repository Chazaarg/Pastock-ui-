import { NOTIFY_USER } from "../actions/types";

const initialState = {
  errors: {},
  message: null,
  messageType: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case NOTIFY_USER:
      return {
        ...state,
        errors: action.payload.errors,
        message: action.payload.message,
        messageType: action.payload.messageType
      };
    default:
      return state;
  }
}
