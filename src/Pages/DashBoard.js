import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import axios from "axios";

import config from "../Configs/mainConfig";

class AuthPage extends React.Component {
  componentWillMount() {
    if (this.props.data.data[[this.props.match.params.nickname]]) {
      console.log(1);
    } else {
      axios
        .get(`${config.host}boards`, {
          params: {
            nickname: this.props.match.params.nickname,
            token: this.props.data.user.token
          }
        })
        .then(response => {
          console.log(response);
        });
    }
  }
  render() {
    console.log(this.props.match.params.nickname);
    //It's REDIREEEEECT!!!
    // this.props.history.push("/");
    return <div>dashboard</div>;
  }
}

const mapDispatchToProps = dispatch => ({});

const mapStateToProps = state => ({
  data: state.userData
});

export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(AuthPage)
);
