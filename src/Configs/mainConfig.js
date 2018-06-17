import axios from "axios";

const config = {
	host: "http://my-trello-api/",
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
				console.log(data);
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
	}
};
export default config;
