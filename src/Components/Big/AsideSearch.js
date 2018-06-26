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
  }
  ,
  ${"& .option"} {
    display: flex;
    justify-content: space-around;
    flex-flow: column;
    ${"& .item"} {
      display: flex;
      justify-content: space-between;
    }
  }
`;

class AsideSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  search() {
    if (this.input.value && this.input.value.length > 2) {
      axios
        .get(`${config.host}users/getall`, {
          params: {
            token: this.props.token,
            nickname: this.props.nickname,
            text: this.input.value,
            boardId: this.props.boardId
          }
        })
        .then(({ data }) => {
          if (data) {
            this.setState(Object.assign(this.state, { data: data }));
          }
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
      <Wrap>
        <div className="inputUser">
          <p>Add user on the board</p>
          <small>Existing user</small>
          <input
            type="text"
            ref={e => (this.input = e)}
            onChange={this.search.bind(this)}
          />
        </div>
        {this.state.data.map((i, k) => (
          <div className="option" key={k}>
            <div className="item">
              <div className="checkText">{i.nickname}</div>
              <ButtonTR
                text="&#9989;"
                onClick={() => {
                  this.addUserOnBoard(i.id, this.props.boardId);
                  this.input.value = "";
                  this.setState(Object.assign(this.state, { data: [] }));
                }}
              />
            </div>
          </div>
        ))}
      </Wrap>
    );
  }
}

export default AsideSearch;
