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
				i.stick.length &&
					i.stick.map(j => {
						j.cards = j.item;
						delete j.item;
					});
			});
			state.data[state.user.nickname] = obj;
			return { ...state };
		case "USER_CLEAR":
			state.user = {};
			return { ...state };
		case "SET_USER":
			state.user = action.user;
			window.localStorage.trelloUser = JSON.stringify(action.user);
			return { ...state };
		case "ADD_CARD":
			state.data[state.user.nickname][action.key].stick.push({
				id: Math.floor(Math.random() * 100000).toString(),
				title: action.title,
				cards: []
			});
			axios.post(`${config.host}sticks`, {
				token: state.user.token,
				nickname: state.user.nickname,
				title: action.title,
				board: action.key
			});
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
