import React, { useState, useEffect } from 'react';

import { Select, MenuItem, TextField, FormHelperText } from '@material-ui/core/';

import { useStyles } from '../styles/RegisterFormStyles';

import { useHistory, useParams } from 'react-router-dom';

// import './RegisterForm.css';

import axios from 'axios';

import { apiUrl } from '../utils/utils';

const RegisterForm = (props) => {
	const { user, fetchAllUsers, allGroups } = props;
	const { usernameParam } = useParams();
	const history = useHistory();
	const classes = useStyles();
	const [ userType, setuserType ] = useState('');
	const [ name, setName ] = useState('');
	const [ lname, setlName ] = useState('');
	const [ username, setUsername ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ confirmPassword, setConfirmPassword ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ telephone, setTelephone ] = useState('');
	const [ birthday, setBirthday ] = useState('');
	const [ group, setGroup ] = useState('');
	const handleInput = (e, input) => {
		e.preventDefault();
		input(e.target.value);
	};
	const handleSubmit = async (e) => {
		try {
			e.preventDefault();
			if (user.isAdmin) {
				if (confirmPassword === password) {
					let data = {
						user_type   : userType,
						name        : name,
						lname       : lname,
						username    : username,
						password    : password,
						birthday    : new Date(birthday),
						email       : email,
						telephone   : telephone,
						isAdmin     : userType === 'admin',
						isCandidate : userType === 'candidate',
						group       : group
					};
					const response = await axios.post(`${apiUrl}/register`, data, {
						withCredentials : true
					});
					if (response.status === 200 && response.data.msg === 'User registered') {
						console.log('user registered');
						fetchAllUsers(user._id);
						history.push('/registo');
					} else {
						history.push('/registo');
					}
				} else {
					console.log('password does not match');
					// handleAppMessage('Password e Confirmar Password não coincidem!');
					// history.push('/register');
				}
			}
		} catch (error) {
			console.log(error);
		}
	};
	const [ fetchedUserID, setFetchedUserID ] = useState('');
	useEffect(() => {
		let didCancel = false;
		axios.get(`${apiUrl}/getuserbyusername/${usernameParam}`, { withCredentials: true }).then((res) => {
			console.log(res);
			const { fetchedUser } = res.data;
			setFetchedUserID(fetchedUser._id);
		});
		return () => {
			didCancel = true;
		};
	}, []);
	return (
		<div className={classes.RegisterFormContainer}>
			{user.isAdmin && (
				<div className={classes.RegisterForm}>
					<form className={classes.RegisterFormForm} onSubmit={(e) => handleSubmit(e)}>
						<h1>Novo Utilizador</h1>
						<div className={classes.RegisterFormFieldContainer}>
							<div className={classes.RegisterFormField} style={{ gridColumn: '-1 / 1' }}>
								<Select
									value={userType}
									name="user_type"
									id="user_type"
									onChange={(e) => handleInput(e, setuserType)}
									displayEmpty
									required
								>
									<MenuItem value={''}>Selecionar</MenuItem>
									<MenuItem value="candidate">Candidato</MenuItem>
									<MenuItem value="admin">Admin</MenuItem>
								</Select>
								<FormHelperText>Tipo de Utilizador</FormHelperText>
							</div>
							{userType === 'candidate' && (
								<div className={classes.RegisterFormField} style={{ gridColumn: '-1 / 1' }}>
									<Select
										value={group}
										name="user_type"
										id="user_type"
										onChange={(e) => handleInput(e, setGroup)}
										displayEmpty
									>
										{allGroups.map((el) => (
											<MenuItem key={el._id} value={el._id}>
												{el.name}
											</MenuItem>
										))}
									</Select>
									<FormHelperText>Grupo</FormHelperText>
								</div>
							)}
							<div className={classes.RegisterFormField}>
								<TextField
									autoComplete="off"
									onChange={(e) => handleInput(e, setName)}
									name="name"
									id="name"
									variant="filled"
									label="Primeiro Nome"
									type="text"
									value={name}
								/>
							</div>
							<div className={classes.RegisterFormField}>
								<TextField
									autoComplete="off"
									onChange={(e) => handleInput(e, setlName)}
									id="lName"
									name="lName"
									variant="filled"
									label="Sobrenome(s)"
									type="text"
									value={lname}
								/>
							</div>
							<div className={classes.RegisterFormField}>
								<TextField
									autoComplete="off"
									onChange={(e) => handleInput(e, setUsername)}
									id="username"
									variant="filled"
									label="Nome de Utilizador"
									type="text"
									value={username}
								/>
							</div>
							<div className={classes.RegisterFormField}>
								<TextField
									autoComplete="off"
									onChange={(e) => handleInput(e, setEmail)}
									id="email"
									name="email"
									variant="filled"
									label="Email"
									type="email"
									value={email}
								/>
							</div>
							<React.Fragment>
								<div className={classes.RegisterFormField}>
									<TextField
										autoComplete="off"
										onChange={(e) => handleInput(e, setPassword)}
										id="password"
										name="password"
										variant="filled"
										label="Password"
										type="password"
										value={password}
									/>
								</div>
								<div className={classes.RegisterFormField}>
									<TextField
										autoComplete="off"
										onChange={(e) => handleInput(e, setConfirmPassword)}
										id="confirm_password"
										name="confirm_password"
										variant="filled"
										label="Confirmar Password"
										type="password"
										value={confirmPassword}
									/>
								</div>
							</React.Fragment>

							<div className={classes.RegisterFormField}>
								<TextField
									autoComplete="off"
									onChange={(e) => handleInput(e, setBirthday)}
									id="birthday"
									variant="filled"
									type="date"
									name="birthday"
									value={birthday}
								/>
								<FormHelperText>Data de Nascimento</FormHelperText>
							</div>
							<div className={classes.RegisterFormField}>
								<TextField
									autoComplete="off"
									onChange={(e) => handleInput(e, setTelephone)}
									id="telephone"
									variant="filled"
									label="Telefone"
									type="text"
									value={telephone}
								/>
							</div>
							<div className={classes.RegisterFormField}>
								<button className={classes.RegisterBtn} type="submit">
									Criar Conta
								</button>
							</div>
						</div>
						<div />
					</form>
				</div>
			)}
		</div>
	);
};

export default RegisterForm;
