import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import axios from "axios";
import Board from "react-trello";

import config from "../Configs/mainConfig";
import Header from "../Components/Big/HeaderMainPage";

const bardData = {
	lanes: [
		{
			id: "lane1",
			title: "Planned Tasks",
			label: "2/2",
			cards: [
				{
					id: "Card1",
					title: "Write Blog",
					description: "Can AI make memes",
					label: "30 mins"
				},
				{
					id: "Card2",
					title: "Pay Rent",
					description: "Transfer via NEFT",
					label: "5 mins",
					metadata: { sha: "be312a1" }
				}
			]
		},
		{
			id: "lane2",
			title: "Completed",
			label: "0/0",
			cards: []
		}
	]
};

class StickBoard extends React.Component {
	componentWillMount() {
		if (!this.props.data || !this.props.data.user) {
			this.props.history.push("/");
		} else if (
			!this.props.data.data ||
			!this.props.data.data[this.props.data.user.nickname]
		) {
			axios
				.get(`${config.host}boards`, {
					params: {
						nickname: this.props.data.user.nickname,
						token: this.props.data.user.token
					}
				})
				.then(({ data }) => {
					let obj = {};
					data.map(i => {
						obj[i.id] = i;
					});
					this.props.fetchData(obj);
				});
		}
	}
	render() {
		const id = this.props.match.params.board;
		const { nickname } = this.props.data.user || null;
		const obj =
			(nickname &&
				this.props.data.data &&
				this.props.data.data[nickname] &&
				this.props.data.data[nickname][id]) ||
			null;
		console.log(obj);
		return (
			<div>
				<Header autorize={false} registration={false} logout={true} />
				<Board data={bardData} draggable editable />
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	fetchData: data =>
		dispatch({
			type: "FETCH_DATA_SUCCESS",
			data: data
		})
});

const mapStateToProps = state => ({
	data: state.userData
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(StickBoard));
