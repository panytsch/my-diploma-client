import React from "react";
import axios from "axios";
import styled from "react-emotion";

import config from "../../Configs/mainConfig";
import ButtonTR from "../Small/Button/ButtonTR";

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
      <div>
        <p>Invite friend to our Trello</p>
        <div>
          <input type="email" ref={e => (this.input = e)} placeholder="email" />
        </div>
        <ButtonTR
          text="add"
          color="#d7d7c5"
          onClick={this.sendInvite.bind(this)}
        />
      </div>
    );
  }
}

export default AsideAddUser;
