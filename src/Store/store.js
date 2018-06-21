import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import axios from "axios";

import config from "../Configs/mainConfig";

const sortDataOnBoard = data => {
  data.stick.map(item => {
    item.cards.sort((a, b) => a.position - b.position);
  });
  return data;
};

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
      let obj = Object.assign({}, action.data);
      Object.values(obj).map(i => {
        i.id = i.id.toString();
        i.stick.length &&
          i.stick.map(j => {
            j.id = j.id.toString();
            j.cards = j.item;
            delete j.item;
          });
        i = sortDataOnBoard(i);
      });
      state.data[state.user.nickname] = obj;
      return { ...state };
    case "USER_CLEAR":
      state.user = {};
      window.localStorage.trelloUser = "";
      return { ...state };
    case "SET_USER":
      state.user = action.user;
      window.localStorage.trelloUser = JSON.stringify(action.user);
      return { ...state };
    case "ADD_CARD":
      state.data[state.user.nickname][action.key]["stick"].push(action.payload);
      return { ...state };
    case "ADD_CARD_ITEM":
      state.data[state.user.nickname][action.payload.stick.board.id].stick[
        action.payload.stick.position - 1
      ].cards[action.payload.position - 1] = {
        id: action.payload.id.toString(),
        position: action.payload.position,
        title: action.payload.title,
        description: action.payload.description,
        laneId: action.payload.stick.id
      };
      return { ...state };
    case "CHANGE_ITEM_POSITION":
      state.data[state.user.nickname][action.board].stick =
        action.payload.stick;
      state.data[state.user.nickname][action.board].stick.map(i => {
        i.id = i.id.toString();
        i.cards = i.item;
        delete i.item;
      });
      state.data[state.user.nickname][action.board] = sortDataOnBoard(
        state.data[state.user.nickname][action.board]
      );
      return { ...state };
    case "REMOVE_LINE":
      let key;
      state.data[state.user.nickname][action.boardId]["stick"].map(
        (item, ka) => {
          if (item.id == action.lineId) {
            key = ka;
          }
        }
      );
      state.data[state.user.nickname][action.boardId]["stick"].splice(key, 1);
      return { ...state };
    case "ADD_BOARD":
      state.data[state.user.nickname][action.payload.id] = action.payload;
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
