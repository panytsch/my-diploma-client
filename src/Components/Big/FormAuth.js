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
    let query = {
      email: "",
      boardId: null
    };
    if (this.props.location.search) {
      let prop = this.props.location.search.split("?")[1].split("&");
      let one = prop[0].split("=");
      let two = prop[1].split("=");
      query = {
        [one[0]]: one[1],
        [two[0]]: two[1]
      };
    }
    return (
      <div>
        <Header autorize={!this.props.auth} registration={this.props.auth} />
        <Styles>
          <h1>{this.props.auth ? "Welcome Back!" : "Try it!"}</h1>
          <Form
            initialValues={{
              email: query.email || "",
              boardId: query.boardId || null
            }}
            validate={_val => {
              const errors = {};
              if (!_val.nickname) {
                errors.nickname = "Required field";
              }
              if (!_val.password) {
                errors.password = "Required field";
              }
              if (!this.props.auth && !_val.email) {
                errors.email = "Required field";
              }
              return errors;
            }}
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
                <Field
                  name="nickname"
                  type="text"
                  placeholder="Nickname"
                  label="Login"
                >
                  {props => (
                    <div>
                      <label>{props.label}</label>
                      <input
                        {...props.input}
                        type={props.type}
                        placeholder={props.placeholder}
                      />
                      {props.meta.error &&
                        props.meta.touched && <span>{props.meta.error}</span>}
                    </div>
                  )}
                </Field>
                <Field
                  name="password"
                  component="input"
                  type="password"
                  placeholder="Password"
                  label="Password"
                >
                  {props => (
                    <div>
                      <label>{props.label}</label>
                      <input
                        {...props.input}
                        type={props.type}
                        placeholder={props.placeholder}
                      />
                      {props.meta.error &&
                        props.meta.touched && <span>{props.meta.error}</span>}
                    </div>
                  )}
                </Field>
                {!this.props.auth && (
                  <Field
                    name="email"
                    component="input"
                    type="email"
                    placeholder="Email"
                    label="Email"
                  >
                    {props => (
                      <div>
                        <label>{props.label}</label>
                        <input
                          {...props.input}
                          type={props.type}
                          placeholder={props.placeholder}
                        />
                        {props.meta.error &&
                          props.meta.touched && <span>{props.meta.error}</span>}
                      </div>
                    )}
                  </Field>
                )}
                <div className="buttons">
                  <button type="submit" disabled={submitting}>
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
      </div>
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
