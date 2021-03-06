import React from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { css } from "react-emotion";

import config from "../Configs/mainConfig";
import Header from "../Components/Big/HeaderMainPage";
import Card from "../Components/Small/Card/CardOnBoard";
import NewBoard from "../Components/Small/NewBoard/NewBoard";

const flexWrap = css({
	display: "flex",
	flexDirection: "row",
	flexFlow: "wrap",
	justifyContent: "flex-start",
	alignItems: "stratch",
	"& a": {
		margin: "1.5em",
		textTransform: "none",
		textDecoration: "none"
	}
});

class DashBoard extends React.Component {
	componentWillMount() {
		if (!this.props.data || !this.props.data.user) {
			this.props.history.push("/");
		}
		const { nickname } = this.props.match.params;
		const { data } = this.props.data;
		if (data[nickname]) {
			console.log("no fetch");
			return;
		} else {
			this.props.fetchData(
				this.props.data.user.token,
				this.props.data.user.nickname
			);
		}
	}
	render() {
		let { data } = this.props.data || {};
		let { nickname } = this.props.match.params;
		return (
			<div>
				<div>
					<Header autorize={false} registration={false} logout={true} />
				</div>
				<div className={flexWrap}>
					{data[nickname] &&
						Object.keys(data[nickname]).map(i => (
							<Link to={`/board/${i}`} key={i}>
								<Card data={data[nickname][i]} />
							</Link>
						))}
					<NewBoard
						handleAdd={title => {
							this.props.addOneBoard(
								this.props.data.user.token,
								nickname,
								title
							);
						}}
					/>
				</div>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	fetchData: (token, nickname) => dispatch(config.getBoards(token, nickname)),
	addOneBoard: (token, nickname, title) =>
		dispatch(config.addBoard(token, nickname, title))
});

const mapStateToProps = state => ({
	data: state.userData
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(DashBoard));
