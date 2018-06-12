import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class AuthPage extends React.Component {
  render() {
    //It's REDIREEEEECT!!!
    this.props.history.push("/");
    return <div>AuthPage</div>;
  }
}

const mapDispatchToProps = dispatch => ({});

const mapStateToProps = state => ({});

export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(AuthPage)
);
