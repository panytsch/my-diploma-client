import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import Header from "../Components/Big/HeaderMainPage";

class MainPage extends React.Component {
  componentWillMount() {
    if (
      this.props.data.user &&
      this.props.data.user.nickname &&
      this.props.data.user.token
    ) {
      this.props.history.push(`/dashboard/${this.props.data.user.nickname}`);
    }
  }
  render() {
    return (
      <div>
        <Header autorize={true} registration={true} logout={false} />
        <div className="">here will be content</div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({});

const mapStateToProps = state => ({
  data: state.userData
});

export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(MainPage)
);
