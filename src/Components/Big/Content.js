import React from "react";
import { withRouter, Link } from "react-router-dom";
import styled from "react-emotion";

const Main = styled("div")`
  text-align: center;
  font-family: Ubuntu;
  line-height: 3;
  background-color: rgb(234, 240, 249);
  height: 100vh;
  ${"h2"} {
    font-size: 3em;
  }
  ${"h4"} {
    font-size: 1.3em;
  }
  ${"a"} {
    text-decoration: none;
    text-transform: none;
    color: rgb(104, 126, 121);
  }
`;

const Content = props => (
  <Main>
    <h2>Welcome dear user</h2>
    <h4>
      If you've never been here, you can{" "}
      <Link to="/registration">registration</Link>
    </h4>
    <h4>
      If tou're not new user, please <Link to="/authorize">autorize</Link>
    </h4>
  </Main>
);

export default withRouter(Content);
