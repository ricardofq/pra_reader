import React, { useState } from 'react';
import axios from 'axios';

import { useStyles } from '../styles/LoginFormStyles';

import { useHistory } from 'react-router-dom';

import TextField from '@material-ui/core/TextField';

import { apiUrl } from '../utils/utils';

const LoginForm = (props) => {
	const classes = useStyles();
	const history = useHistory();
	const { handleLogin } = props;
	const [ username, setUsername ] = useState(process.env.REACT_APP_USERNAME || '');
	const [ password, setPassword ] = useState(process.env.REACT_APP_PASSWORD || '');
	const handleInput = (e, input) => {
		input(e.target.value);
	};
	const handleSubmit = async (e) => {
		try {
			e.preventDefault();
			let data = {
				username : username,
				password : password
			};
			const response = await axios.post(`${apiUrl}/login`, data, { withCredentials: true });
			if (response.status === 200 && response.data.msg === 'Successfully Authenticated') {
				let { user } = response.data;
				handleLogin(user);
				if (user.isAdmin) {
					history.push(`/utilizadores`);
				} else {
					history.push(`/utilizador/${user.username}`);
				}
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className={classes.LoginFormContainer}>
			<div className={classes.LoginForm}>
				<form onSubmit={(e) => handleSubmit(e)} className={classes.LoginFormForm}>
					<h1>Login</h1>
					<div className={classes.LoginFormFieldContainer}>
						<div className={classes.LoginFormField}>
							<TextField
								autoComplete="off"
								id="username"
								type="text"
								onChange={(e) => handleInput(e, setUsername)}
								variant="filled"
								label="Nome de Utilizador"
								value={username}
							/>
						</div>
						<div className={classes.LoginFormField}>
							<TextField
								autoComplete="off"
								id="password"
								type="password"
								onChange={(e) => handleInput(e, setPassword)}
								variant="filled"
								label="Password"
								value={password}
							/>
						</div>
					</div>
					<div className={classes.LoginFormFieldContainer}>
						<div className={classes.LoginFormField}>
							<input className={classes.LogInBtn} type="submit" value="Iniciar Sessão" />
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default LoginForm;
