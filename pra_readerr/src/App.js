import React, { useEffect, useState } from 'react';

import { Switch, Route } from 'react-router-dom';

import axios from 'axios';

import './App.css';

import ACComponent from './Components/ACComponent';
import LoginForm from './Components/LoginForm';
import RegisterForm from './Components/RegisterForm';
import UsersList from './Components/UsersList';
import UserProfile from './Components/UserProfile';
import Menu from './Components/Menu';
import AdminPanel from './Components/AdminPanel';
import AddGroup from './Components/AddGroup';
import Home from './Components/Home';
import Groups from './Components/Groups';

import { apiUrl } from './utils/utils';

import { useStyles } from './styles/AppStyles';
import './App.css';

function App(){
	const classes = useStyles();
	const [ user, setUser ] = useState({});
	const [ allUsers, setAllUsers ] = useState([]);
	const [ allGroups, setAllGroups ] = useState([]);
	const handleLogin = async (user) => {
		setUser(user);
		fetchAllUsers(user._id);
		fetchAllGroups(user);
		// localStorage.setItem('currentUser', JSON.stringify(user));
		// console.log('cenas');
	};
	// useEffect(() => {
	// 	const loggedInUser = localStorage.getItem('currentUser');
	// 	if (loggedInUser) {
	// 		const foundUser = JSON.parse(loggedInUser);
	// 		setUser(foundUser);
	// 		fetchAllUsers(foundUser._id);
	// 		fetchAllGroups(foundUser);
	// 	}
	// }, []);
	useEffect(() => {
		try {
			axios.get(`${apiUrl}/currentuser`, { withCredentials: true }).then((res) => {
				let { currentUser } = res.data;
				if (currentUser) {
					setUser(currentUser);
					fetchAllUsers(currentUser._id);
					fetchAllGroups(currentUser);
				}
			});
		} catch (error) {
			console.log(error);
		}
	}, []);
	const fetchAllUsers = async (userID) => {
		const response = await axios.get(`${apiUrl}/allusers/${userID}`, { withCredentials: true });
		setAllUsers(response.data.allUsers);
	};
	const fetchAllGroups = async (user) => {
		const response = await axios.get(`${apiUrl}/allgroups/`, { withCredentials: true });
		setAllGroups(response.data.allGroups);
	};
	return (
		<div className={classes.App}>
			<Menu user={user} />
			<div className={classes.main}>
				<Switch>
					<Route exact path="/" component={() => <Home />} />
					<Route exact path="/login" component={() => <LoginForm handleLogin={handleLogin} />} />
					<Route
						exact
						path="/registo"
						component={() => (
							<RegisterForm
								user={user}
								fetchAllUsers={fetchAllUsers}
								allGroups={allGroups}
								url="register"
							/>
						)}
					/>
					<Route
						exact
						path="/utilizador/:username"
						component={() => <UserProfile user={user} allUsers={allUsers} allGroups={allGroups} />}
					/>
					<Route
						exact
						path="/utilizador/:usernameParam/edit"
						component={() => (
							<RegisterForm
								user={user}
								url="edit"
								allGroups={allGroups}
								allUsers={allUsers}
								fetchAllUsers={fetchAllUsers}
							/>
						)}
					/>
					<Route
						exact
						path="/utilizadores"
						component={() => <UsersList user={user} allUsers={allUsers} allGroups={allGroups} />}
					/>
					<Route
						exact
						path="/utilizador/:username/cp"
						component={() => (
							<ACComponent user={user} allUsers={allUsers} acc="cp" defaultProps={{ emptyValue: '' }} />
						)}
					/>
					<Route
						exact
						path="/utilizador/:username/clc"
						component={() => <ACComponent user={user} allUsers={allUsers} acc="clc" />}
					/>
					<Route
						exact
						path="/utilizador/:username/stc"
						component={() => <ACComponent allUsers={allUsers} acc="stc" />}
					/>
					<Route exact path="/admin" component={() => <AdminPanel />} />
					<Route
						exact
						path="/admin/addgroup"
						component={() => <AddGroup user={user} fetchAllGroups={fetchAllGroups} />}
					/>
					<Route exact path="/grupo/:groupID" component={() => <Groups />} />
				</Switch>
			</div>
		</div>
	);
}

export default App;
