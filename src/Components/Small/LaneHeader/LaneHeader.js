import React from "react";
import styled from "react-emotion";

import ButtonTR from "../Button/ButtonTR";

const Cont = styled("div")`
  display: flex;
  justify-content: space-between;
`;

class HeadButton extends React.Component {
  render() {
    return (
      <Cont>
        <div>{this.props.title}</div>
        <ButtonTR
          onClick={() => {
            this.props.handleClick(
              this.props.token,
              this.props.nickname,
              this.props.id,
              this.props.boardId
            );
          }}
          text="X"
          color="rgb(250, 206, 206)"
          hover="rgb(236, 22, 22)"
        />
      </Cont>
    );
  }
}

export default HeadButton;
