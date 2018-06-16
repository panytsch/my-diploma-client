import React from "react";
import { css } from "react-emotion";

const cardStyle = css({
	padding: "20px",
	fontFamily: "Ubuntu",
	backgroundColor: "rgba(0, 231, 65, 0.8)",
	borderRadius: "0.7em",
	"& .title": {
		color: "red"
	},
	"& .count": {
		color: "green"
	}
});

class Card extends React.Component {
	render() {
		if (!this.props.data) {
			return;
		}
		const { title } = this.props.data;
		const count = this.props.data.cards.length;
		return (
			<div className={cardStyle}>
				<h3>Card name:</h3>
				<p className="title">{title}</p>
				<br />
				<h5>Count of lines</h5>
				<p className="count">{count}</p>
			</div>
		);
	}
}

export default Card;
