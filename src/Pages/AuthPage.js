import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import FormAuth from "../Components/Big/FormAuth";

class AuthPage extends React.Component {
	componentWillMount() {
		if (this.props.data.user && this.props.data.user.token) {
			this.props.history.push(`/dashboard/${this.props.data.user.nickname}`);
		}
	}
	render() {
		//It's REDIREEEEECT!!!
		// this.props.history.push("/");
		return (
			<div>
				<FormAuth auth={true} />
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => ({});

const mapStateToProps = state => ({
	data: state.userData
});

export default connect(mapStateToProps, mapDispatchToProps)(
	withRouter(AuthPage)
);
