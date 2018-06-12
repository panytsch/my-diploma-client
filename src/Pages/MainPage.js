import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import Header from "../Components/Big/HeaderMainPage";

class MainPage extends React.Component {
  render() {
    console.log(1);
    return (
      <div>
        <Header />
        here
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({});

const mapStateToProps = state => ({});

export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(MainPage)
);
