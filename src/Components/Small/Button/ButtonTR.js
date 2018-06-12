import React from "react";
import { Link } from "react-router-dom";
import styled from "react-emotion";

const Diva = styled("div")`
  display: inline-block;
  ${"button"} {
    padding: 3px 10px;
    border-radius: 5px;
    background-color: ${props => props.color || "rgba(181, 219, 151, 0.66)"};
    font-size: ${props => props.fontSize || "1em"};
    &:hover {
      background-color: ${props => props.hover || "rgba(80, 194, 27, 0.85)"};
    }
  }
`;

class ButtonTR extends React.Component {
  render() {
    return (
      <Diva {...this.props}>
        <Link to={this.props.link}>
          <button>{this.props.text}</button>
        </Link>
      </Diva>
    );
  }
}

export default ButtonTR;
