import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

function userData(
  state = {
    data: {},
    user:
      (window.localStorage.trelloUser &&
        JSON.parse(window.localStorage.trelloUser)) ||
      null
  },
  action
) {
  switch (action.type) {
    case "FETCH_DATA_SUCCESS":
      state.data[state.user.nickname] = action.data;
      return { ...state };
    case "USER_CLEAR":
      state.user = {};
      return { ...state };
    case "SET_USER":
      state.user = action.user;
      return { ...state };
    default:
      return state;
  }
}

const reducers = combineReducers({ userData });

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
