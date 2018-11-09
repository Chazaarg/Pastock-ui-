import { NOTIFY_USER } from "../actions/types";

const initialState = {
  message: null,
  messageType: null,
  values: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case NOTIFY_USER:
      return {
        ...state,
        message: action.message,
        messageType: action.messageType,
        values: action.values
      };
    default:
      return state;
  }
}
