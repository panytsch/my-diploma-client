import axios from "axios";

const config = {
	// host: "http://my-trello-api/",
	host: "http://api.trello.st.php-academy.org/",
	postLine: (token, nickname, title, boardId) => dispatch => {
		let newState = {};
		let _this = this.a;
		return axios
			.post(`${_this.host}sticks`, {
				token: token,
				nickname: nickname,
				title: title,
				board: boardId
			})
			.then(({ data }) => {
				newState = {
					id: data.id.toString(),
					title: data.title,
					cards: data.item,
					position: data.position
				};
				dispatch({
					type: "ADD_CARD",
					key: boardId,
					payload: newState
				});
			});
	},
	getBoards: (token, nickname) => dispatch => {
		let _this = this.a;
		return axios
			.get(`${_this.host}boards`, {
				params: {
					nickname: nickname,
					token: token
				}
			})
			.then(({ data }) => {
				let obj = {};
				data.map(i => {
					obj[i.id] = i;
				});
				dispatch({
					type: "FETCH_DATA_SUCCESS",
					data: obj
				});
			});
	},
	removeLine: (token, nickname, lineId, boardId) => dispatch => {
		let _this = this.a;
		return axios
			.delete(`${_this.host}sticks`, {
				params: {
					nickname: nickname,
					token: token,
					id: lineId
				}
			})
			.then(({ data }) => {
				if (data.status) {
					dispatch({
						type: "REMOVE_LINE",
						lineId: lineId,
						boardId: boardId
					});
				}
			});
	},
	removeCard: (token, nickname, lineId, cardId, boardId) => dispatch => {
		let _this = this.a;
		return axios
			.delete(`${_this.host}cards`, {
				params: {
					nickname: nickname,
					token: token,
					id: cardId,
					line: lineId
				}
			})
			.then(({ data }) => {
				if (data.status) {
					dispatch({
						type: "REMOVE_CARD",
						lineId: lineId,
						cardId: cardId,
						boardId: boardId
					});
				}
			});
	},
	addBoard: (token, nickname, title) => dispatch => {
		let _this = this.a;
		return axios
			.post(`${_this.host}boards`, {
				token: token,
				nickname: nickname,
				title: title
			})
			.then(({ data }) => {
				if (data) {
					dispatch({
						type: "ADD_BOARD",
						payload: data
					});
				}
			});
	},
	addItem: (token, nickname, title, description, lineId) => dispatch => {
		let _this = this.a;
		return axios
			.post(`${_this.host}cards`, {
				token: token,
				nickname: nickname,
				title: title,
				description: description,
				lineId: lineId
			})
			.then(({ data }) => {
				if (data) {
					dispatch({
						type: "ADD_CARD_ITEM",
						payload: data
					});
				}
			});
	},
	changeCardPosition: (
		token,
		nickname,
		itemId,
		lineId,
		newLineId,
		position,
		boardId
	) => dispatch => {
		let _this = this.a;
		return axios
			.put(`${_this.host}cards`, {
				token: token, //back
				nickname: nickname, //back
				itemId: itemId,
				lineId: lineId,
				newLineId: newLineId,
				position: position + 1,
				board: boardId
			})
			.then(({ data }) => {
				dispatch({
					type: "CHANGE_ITEM_POSITION",
					payload: JSON.parse(data),
					board: boardId
				});
			});
	}
};
export default config;
