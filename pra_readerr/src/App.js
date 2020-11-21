import React, { useState } from 'react';

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
	};
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
					<Route exact path="/login" component={() => <LoginForm handleLogin={handleLogin} />} />
					<Route
						exact
						path="/registo"
						component={() => (
							<RegisterForm user={user} fetchAllUsers={fetchAllUsers} allGroups={allGroups} />
						)}
					/>
					<Route
						exact
						path="/utilizador/:username"
						component={() => <UserProfile user={user} allUsers={allUsers} allGroups={allGroups} />}
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
				</Switch>
			</div>
		</div>
	);
}

export default App;
