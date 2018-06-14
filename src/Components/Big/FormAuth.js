import React from "react";
import { Form, Field } from "react-final-form";
import axios from "axios";

import Styles from "../../styles/FormStyles";
import config from "../../Configs/mainConfig";

const FormAuth = props => (
	<Styles>
		<h1>Welcome Back!</h1>
		<Form
			onSubmit={_values => {
				console.log(_values);
				if (props.auth) {
					axios
						.get(`${config.host}users/authorize`, {
							params: _values
						})
						.then(response => {
							console.log(response);
						});
				} else {
					console.log("post");
					axios
						.post(`${config.host}users/registration`, _values)
						.then(response => {
							console.log(response);
						});
				}
			}}
			render={({ handleSubmit, form, submitting, pristine, values }) => (
				<form onSubmit={handleSubmit}>
					<div>
						<label>Login</label>
						<Field
							name="nickname"
							component="input"
							type="text"
							placeholder="Nickname"
						/>
					</div>
					<div>
						<label>Password</label>
						<Field
							name="password"
							component="input"
							type="password"
							placeholder="Password"
						/>
					</div>
					{!props.auth && (
						<div>
							<label>Email</label>
							<Field
								name="email"
								component="input"
								type="email"
								placeholder="Email"
							/>
						</div>
					)}
					<div className="buttons">
						<button type="submit" disabled={submitting || pristine}>
							Submit
						</button>
						<button
							type="button"
							onClick={form.reset}
							disabled={submitting || pristine}
						>
							Reset
						</button>
					</div>
					{/* <pre>{JSON.stringify(values, 0, 2)}</pre> */}
				</form>
			)}
		/>
	</Styles>
);

export default FormAuth;
