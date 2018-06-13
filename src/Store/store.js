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
    case "FETCH_USER":
      state.data = state.data.concat(action.payload);
      return { ...state };
    case "CLEAR_DATA":
      state.data = [];
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
