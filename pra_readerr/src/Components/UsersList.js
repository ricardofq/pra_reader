import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { List, ListItem, TextField } from '@material-ui/core';

import { useStyles } from '../styles/UsersListStyle';

// import { isEmpty } from '../utils/utils';

const UsersList = (props) => {
	const { allUsers, allGroups } = props;
	const classes = useStyles();
	const [ allUserTmp, setAllUsersTmp ] = useState(allUsers);
	const handleFilter = (e) => {
		e.preventDefault();
		const { value } = e.target;
		const filterList = allUsers.filter((user) => {
			let fullName = `${user.name} ${user.lname}`;
			return (
				user.username.toLowerCase().includes(value.toLowerCase()) ||
				(user.group &&
					allGroups.find((el) => el._id === user.group).name.toLowerCase().includes(value.toLowerCase())) ||
				user.name.toLowerCase().includes(value.toLowerCase()) ||
				fullName.toLowerCase().includes(value.toLowerCase())
			);
		});
		setAllUsersTmp(filterList);
	};
	const displayAllUsers = allUserTmp.map((userEl) => (
		<React.Fragment key={userEl._id}>
			<ListItem className={classes.UsersList}>
				<List className={classes.UsersListRow}>
					<ListItem>
						<Link to={`/utilizador/${userEl.username}`}>{`${userEl.name} ${userEl.lname
							.split(' ')
							.splice(-1)}`}</Link>
					</ListItem>
					<ListItem>
						<Link to={`/utilizador/${userEl.username}`}>{userEl.username}</Link>
					</ListItem>
					{userEl.isCandidate && (
						<React.Fragment>
							{userEl.group && (
								<ListItem>
									<Link to={`/grupo/${allGroups.find((el) => el._id === userEl.group)._id}`}>
										{allGroups.find((el) => el._id === userEl.group).name}
									</Link>
								</ListItem>
							)}
							<ListItem>
								<Link to={`/utilizador/${userEl.username}/cp`}>CP</Link>
							</ListItem>
							<ListItem>
								<Link to={`/utilizador/${userEl.username}/clc`}>CLC</Link>
							</ListItem>
							<ListItem>
								<Link to={`/utilizador/${userEl.username}/stc`}>STC</Link>
							</ListItem>
						</React.Fragment>
					)}
				</List>
			</ListItem>
		</React.Fragment>
	));
	return (
		<div className={classes.UsersListContainer}>
			<div className={classes.UsersListFilter}>
				<TextField
					autoComplete="off"
					id="allUsersFilter"
					type="text"
					onChange={handleFilter}
					variant="filled"
					label="Procurar por nome, username ou grupo"
				/>
			</div>
			<List className={classes.UsersListContainer}>
				<ListItem className={classes.UsersList}>
					<List className={classes.UsersListRow}>
						<ListItem style={{ fontWeight: '900' }}>Nome</ListItem>
						<ListItem style={{ fontWeight: '900' }}>Username</ListItem>
						<ListItem style={{ fontWeight: '900' }}>Grupo</ListItem>
						<ListItem style={{ fontWeight: '900' }}>CP</ListItem>
						<ListItem style={{ fontWeight: '900' }}>CLC</ListItem>
						<ListItem style={{ fontWeight: '900' }}>STC</ListItem>
					</List>
				</ListItem>
			</List>
			<List className={classes.UsersListContainer}>{displayAllUsers}</List>
		</div>
	);
};

export default UsersList;
