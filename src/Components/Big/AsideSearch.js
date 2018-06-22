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

  render() {
    return (
      <div>
        <div className="inputUser">
          <input
            type="text"
            ref={e => (this.input = e)}
            onChange={this.search.bind(this)}
          />
        </div>
        {this.state.data.map((i, k) => (
          <div className="option" key={k}>
            <div className="checkText">{i.nickname}</div>
            <ButtonTR text="&#9989;" />
          </div>
        ))}
      </div>
    );
  }
}

export default AsideSearch;
