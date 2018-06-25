import React from "react";
import axios from "axios";
import styled from "react-emotion";

import config from "../../Configs/mainConfig";
import ButtonTR from "../Small/Button/ButtonTR";

const Wrap = styled("div")`
  display: block;
  ${"small"} {
    font-size: 0.8em;
    color: rgb(82, 88, 72);
    display: block;
  }
  ,
  ${"input"} {
    margin: 5px;
		padding: 0.2em 0.5em;
		${"&:focus"} {
	    outline: none;
	  }
  },
`;

class AsideAddUser extends React.Component {
  sendInvite() {
    const { token, boardId, nickname } = this.props;
    const input = this.input.value;
    const condition = this.input && token && boardId && nickname && true;
    if (condition) {
      axios
        .post(`${config.host}users/invite`, {
          nickname: nickname,
          token: token,
          boardId: boardId,
          email: input
        })
        .then(({ data }) => {
          console.log(data);
        });
    }
  }
  render() {
    return (
      <Wrap>
        <p>Invite friend to our Trello</p>
        <small>Non register users</small>
        <div>
          <input type="email" ref={e => (this.input = e)} placeholder="email" />
        </div>
        <ButtonTR
          text="add"
          color="#d7d7c5"
          onClick={this.sendInvite.bind(this)}
        />
      </Wrap>
    );
  }
}

export default AsideAddUser;
