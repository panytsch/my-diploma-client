import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import axios from "axios";
import Board from "react-trello";
import styled from "react-emotion";

import config from "../Configs/mainConfig";
import Header from "../Components/Big/HeaderMainPage";
import ButtonTR from "../Components/Small/Button/ButtonTR";

const defaultData = [
	{
		id: "kaka",
		title: "loading...",
		cards: []
	}
];

const Contain = styled("div")`
	display: flex;
	${".aside"} {
		background-color: rgb(196, 45, 141);
		flex-grow: 1;
		flex-shrink: 0;
	}
`;

class StickBoard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			addCardVisible: true
		};
	}
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
	setVisibleCancel() {
		this.setState(
			Object.assign(this.state, {
				addCardVisible: !this.state.addCardVisible
			})
		);
	}
	render() {
		const id = this.props.match.params.board;
		const { nickname } = this.props.data.user || null;
		let obj =
			(nickname &&
				this.props.data.data &&
				this.props.data.data[nickname] &&
				this.props.data.data[nickname][id]) ||
			null;
		return (
			<div>
				<Header autorize={false} registration={false} logout={true} />
				<Contain>
					<Board
						data={{
							lanes: (obj && [...obj.stick]) || defaultData
						}}
						style={{ flexGrow: 3, flexShrink: 0, flexBasis: "70%" }}
						draggable
						editable
					/>
					<div className="aside">
						{!this.state.addCardVisible && (
							<input type="text" ref={e => (this.addCardInput = e)} />
						)}
						<ButtonTR
							onClick={() => {
								!this.state.addCardVisible &&
									this.props.addCard(
										id,
										(this.addCardInput && this.addCardInput.value) || "default"
									);
								this.setVisibleCancel();
							}}
							text={this.state.addCardVisible ? "Add Card" : "Add"}
							color="#03aa37"
							hover="#067328"
						/>
					</div>
				</Contain>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	fetchData: data =>
		dispatch({
			type: "FETCH_DATA_SUCCESS",
			data: data
		}),
	addCard: (key, title) =>
		dispatch({
			type: "ADD_CARD",
			key: key,
			title: title
		})
});

const mapStateToProps = state => ({
	data: state.userData
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(StickBoard));
