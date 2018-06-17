import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import axios from "axios";

import config from "../Configs/mainConfig";

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
