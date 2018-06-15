import React from "react";
import { Form, Field } from "react-final-form";
import axios from "axios";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import Styles from "../../styles/FormStyles";
import config from "../../Configs/mainConfig";
import Header from "./HeaderMainPage";

class FormAuth extends React.Component {
  render() {
    return (
      <Styles>
        <div>
          <Header autorize={!this.props.auth} registration={this.props.auth} />
        </div>
        <h1>{this.props.auth ? "Welcome Back!" : "Try it!"}</h1>
        <Form
          onSubmit={_values => {
            if (this.props.auth) {
              axios
                .get(`${config.host}users/authorize`, {
                  params: _values
                })
                .then(({ data }) => {
                  this.props.setUserToState({
                    nickname: data.nickname,
                    token: data.token
                  });
                  this.props.history.push("/");
                });
            } else {
              axios
                .post(`${config.host}users/registration`, _values)
                .then(({ data }) => {
                  this.props.setUserToState({
                    nickname: data.nickname,
                    token: data.token
                  });
                  this.props.history.push("/");
                });
            }
          }}
          render={({ handleSubmit, form, submitting, pristine, values }) => (
            <form onSubmit={handleSubmit}>
              <div>
                <label>Login</label>
                <Field
                  name="nickname"
                  component="input"
                  type="text"
                  placeholder="Nickname"
                />
              </div>
              <div>
                <label>Password</label>
                <Field
                  name="password"
                  component="input"
                  type="password"
                  placeholder="Password"
                />
              </div>
              {!this.props.auth && (
                <div>
                  <label>Email</label>
                  <Field
                    name="email"
                    component="input"
                    type="email"
                    placeholder="Email"
                  />
                </div>
              )}
              <div className="buttons">
                <button type="submit" disabled={submitting || pristine}>
                  Submit
                </button>
                <button
                  type="button"
                  onClick={form.reset}
                  disabled={submitting || pristine}
                >
                  Reset
                </button>
              </div>
            </form>
          )}
        />
      </Styles>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setUserToState: user =>
    dispatch({
      type: "SET_USER",
      user: user
    })
});

const mapStateToProps = state => ({
  data: state.userData
});

export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(FormAuth)
);
