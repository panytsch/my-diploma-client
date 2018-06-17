import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import axios from "axios";
import Board from "react-trello";
import styled from "react-emotion";

import config from "../Configs/mainConfig";
import Header from "../Components/Big/HeaderMainPage";
import ButtonTR from "../Components/Small/Button/ButtonTR";
import LaneHeader from "../Components/Small/LaneHeader/LaneHeader";

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
		console.log("contsructor");
	}
	componentWillMount() {
		if (!this.props.data || !this.props.data.user) {
			this.props.history.push("/");
		} else if (
			!this.props.data.data ||
			!this.props.data.data[this.props.data.user.nickname]
		) {
			this.props.fetchData(
				this.props.data.user.token,
				this.props.data.user.nickname
			);
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
						customLaneHeader={
							<LaneHeader
								handleClick={this.props.deleteLine}
								token={this.props.data.user.token}
								nickname={nickname}
								boardId={id}
							/>
						}
						handleDragEnd={(cardId, sourceLaneId, targetLaneId, position) => {
							console.log(cardId, sourceLaneId, targetLaneId, position);
						}}
					/>
					<div className="aside">
						<div>
							{!this.state.addCardVisible && (
								<div>
									<input type="text" ref={e => (this.addCardInput = e)} />
								</div>
							)}
							<ButtonTR
								onClick={() => {
									!this.state.addCardVisible &&
										this.props.addCard(
											this.props.data.user.token,
											nickname,
											(this.addCardInput && this.addCardInput.value) ||
												"default",
											id
										);
									this.setVisibleCancel();
								}}
								text={this.state.addCardVisible ? "Add Card" : "Add"}
								color="#03aa37"
								hover="#067328"
							/>
							<ButtonTR
								onClick={this.setVisibleCancel.bind(this)}
								text="Cancel"
								color="#fe5f5f"
								hover="#ad0505"
								display={this.state.addCardVisible ? "none" : "inline-block"}
							/>
						</div>
						<div />
					</div>
				</Contain>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	fetchData: (token, nickname) => dispatch(config.getBoards(token, nickname)),
	addCard: (token, nickname, title, boardId) => {
		dispatch(config.postLine(token, nickname, title, boardId));
	},
	deleteLine: (token, nickname, lineId, boardId) =>
		dispatch(config.removeLine(token, nickname, lineId, boardId))
});

const mapStateToProps = state => ({
	data: state.userData
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(StickBoard));
