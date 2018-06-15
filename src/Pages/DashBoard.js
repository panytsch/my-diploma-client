import React from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import axios from "axios";

import config from "../Configs/mainConfig";

class DashBoard extends React.Component {
	componentWillMount() {
		const { nickname } = this.props.match.params;
		const { data } = this.props.data;
		if (data[[nickname]]) {
			console.log(1);
		} else {
			axios
				.get(`${config.host}boards`, {
					params: {
						nickname: nickname,
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
		let { data } = this.props.data || {};
		let { nickname } = this.props.match.params;
		return (
			<div>
				{data[nickname] &&
					Object.keys(data[nickname]).map(i => (
						<Link to={`/board/${i}`} key={i}>
							<div className="">{data[nickname][i].title}</div>
						</Link>
					))}
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

export default connect(mapStateToProps, mapDispatchToProps)(
	withRouter(DashBoard)
);
