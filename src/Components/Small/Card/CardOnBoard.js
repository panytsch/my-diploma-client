import React from "react";
import { css } from "react-emotion";

const cardStyle = css({
  padding: "2em 1em",
  fontFamily: "Ubuntu",
  backgroundColor: "rgb(205, 205, 201)",
  borderRadius: "0.3em",
  "& .title": {
    margin: "1em 0.5em",
    color: "rgb(16, 17, 20)"
  },
  "& .count": {
    margin: "1em 0.5em",
    color: "rgb(85, 83, 85)"
  },
  "& h3": {
    fontSize: "0.8em"
  }
});

class Card extends React.Component {
  render() {
    if (!this.props.data) {
      return;
    }
    const { title } = this.props.data;
    const count = this.props.data.stick.length;
    return (
      <div className={cardStyle}>
        <h3>Card name:</h3>
        <p className="title">{title}</p>
        <br />
        <h3>Count of lines</h3>
        <p className="count">{count}</p>
      </div>
    );
  }
}

export default Card;
