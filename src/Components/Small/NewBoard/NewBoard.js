import React from "react";
import styled from "react-emotion";

import ButtonTR from "../Button/ButtonTR";

const Style = styled("div")`
	margin: 1.5em;
	font-family: Ubuntu;
	border-radius: 0.7em;
	display: flex;
	flex-direction: column;
	min-width: 10em;
	padding: 1em;
	${"& *"} {
		margin: 0.15em auto;
		display: block;
	}
	${"& input"} {
		display: ${props => (props.vision ? "block" : "none")};
	}
`;

class NewBoard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isInput: false
		};
	}
	setVisible() {
		this.setState(
			Object.assign(this.state, {
				isInput: !this.state.isInput
			})
		);
	}
	render() {
		return (
			<Style vision={this.state.isInput}>
				<input type="text" ref={e => (this.input = e)} />
				<div className="buttons">
					<ButtonTR
						onClick={() => {
							this.state.isInput &&
								this.props.handleAdd(
									(this.input && this.input.value) || "Have Fun!"
								);
							this.setVisible();
						}}
						text={this.state.isInput ? "Add DashBoard" : "Add"}
						color="#03aa37"
						hover="#067328"
					/>
					<ButtonTR
						onClick={this.setVisible.bind(this)}
						text="Cancel"
						color="#fe5f5f"
						hover="#ad0505"
						display={!this.state.isInput ? "none" : "inline-block"}
					/>
				</div>
			</Style>
		);
	}
}

export default NewBoard;
