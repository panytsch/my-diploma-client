import React from "react";
import { css } from "react-emotion";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

// import config from "../../Configs/mainConfig";
import ButtonTR from "../Small/Button/ButtonTR";

const navClass = css({
  display: "flex",
  justifyContent: "flex-end",
  "& li": {
    listStyleType: "none",
    margin: "0 10px"
  }
});

const container = css({
  display: "flex",
  justifyContent: "space-between",
  padding: "20px",
  backgroundColor: "rgb(166, 198, 241)",
  "& a": {
    textTransform: "none",
    textDecoration: "none"
  }
});

const place = css({
  font: "700 20px Ubuntu, sans-serif"
});

class HeaderMainPage extends React.Component {
  render() {
    return (
      <div className={container}>
        <Link to="/">
          <div className={place}>Trello Alpha</div>
        </Link>
        <div>
          <nav className={navClass}>
            {this.props.autorize && (
              <li>
                <ButtonTR link="/authorize" text="Autorize" />
              </li>
            )}
            {this.props.registration && (
              <li>
                <ButtonTR
                  link="/registration"
                  text="Registration"
                  color="rgb(142, 157, 218)"
                  hover="rgb(103, 68, 126)"
                />
              </li>
            )}
            {this.props.logout && (
              <li>
                <ButtonTR
                  onClick={() => {
                    this.props.clearUser();
                    this.props.history.push("/");
                  }}
                  text="Logout"
                  color="rgb(142, 157, 218)"
                  hover="rgb(103, 68, 126)"
                />
              </li>
            )}
            {this.props.logout && (
              <li>
                <ButtonTR
                  onClick={() => {
                    this.props.history.push(
                      `/dashboard/${this.props.data.user.nickname}`
                    );
                  }}
                  text="My DashBoard"
                  color="rgba(#b2b681, 0.81)"
                  hover="rgb(77, 182, 93)"
                />
              </li>
            )}
          </nav>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  clearUser: () =>
    dispatch({
      type: "USER_CLEAR"
    })
});

const mapStateToProps = state => ({
  data: state.userData
});

export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(HeaderMainPage)
);
