import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

function userData(
  state = {
    data: []
  },
  action
) {
  switch (action.type) {
    case "FETCH_DATA_SUCCESS":
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
