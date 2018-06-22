import React from "react";
import axios from "axios";
import styled from "react-emotion";

import config from "../../Configs/mainConfig";
import ButtonTR from "../Small/Button/ButtonTR";

class AsideSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  search() {
    if (this.input.value) {
      axios
        .get(`${config.host}users/getall`, {
          params: {
            token: this.props.token,
            nickname: this.props.nickname,
            text: this.input.value
          }
        })
        .then(({ data }) => {
          this.setState(Object.assign(this.state, { data: data }));
        });
    } else {
      this.setState(Object.assign(this.state, { data: [] }));
    }
  }

  addUserOnBoard(id, boardId) {
    axios
      .put(`${config.host}users/add`, {
        token: this.props.token,
        nickname: this.props.nickname,
        id: id, // User idea
        boardId: boardId
      })
      .then(({ data }) => {
        if (data.status) {
          console.log("OK");
        }
      });
  }

  render() {
    return (
      <div>
        <div className="inputUser">
          <p>Add user on the board</p>
          <input
            type="text"
            ref={e => (this.input = e)}
            onChange={this.search.bind(this)}
          />
        </div>
        {this.state.data.map((i, k) => (
          <div className="option" key={k}>
            <div className="checkText">{i.nickname}</div>
            <ButtonTR
              text="&#9989;"
              onClick={() => {
                this.addUserOnBoard(i.id, this.props.boardId);
              }}
            />
          </div>
        ))}
      </div>
    );
  }
}

export default AsideSearch;
