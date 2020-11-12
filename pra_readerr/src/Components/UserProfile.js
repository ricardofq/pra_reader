import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { List, ListItem } from '@material-ui/core';
import { format, parseISO } from 'date-fns';

import { useStyles } from '../styles/UserProfileStyles';

const UserProfile = (props) => {
	const classes = useStyles();
	const { allUsers, allGroups } = props;
	const [ displayUser, setDisplayUser ] = useState({});
	const [ groupName, setGroupName ] = useState('');
	const { username } = useParams();
	useEffect(
		() => {
			if (allUsers.length && allGroups.length) {
				let user = allUsers.find((el) => el.username === username);
				setDisplayUser(user);
				if (user.isCandidate && user.group && allGroups.length) {
					const groupName = allGroups.find((group) => group._id === user.group).name;
					setGroupName(groupName);
				}
			}
			return () => setDisplayUser({});
		},
		[ username, allUsers, allGroups ]
	);
	return (
		<div className={classes.UserProfileContainer}>
			{displayUser && (
				<React.Fragment>
					<List className={classes.UserProfile}>
						<ListItem>
							{displayUser.name} {displayUser.lname}
						</ListItem>
						{groupName && <ListItem>Grupo: {groupName}</ListItem>}
						<ListItem>Email: {displayUser.email}</ListItem>
						<ListItem>Tel: {displayUser.telephone}</ListItem>
						<ListItem>
							Data de nascimento:{' '}
							{displayUser.birthday && format(parseISO(displayUser.birthday), 'dd/MM/yyy')}
						</ListItem>
					</List>
					{displayUser.isCandidate && (
						<List className={classes.UserProfile}>
							<ListItem>
								<Link to={`/utilizador/${displayUser.username}/cp`}>CP</Link>
							</ListItem>
							<ListItem>
								<Link to={`/utilizador/${displayUser.username}/clc`}>CLC</Link>
							</ListItem>
							<ListItem>
								<Link to={`/utilizador/${displayUser.username}/stc`}>STC</Link>
							</ListItem>
						</List>
					)}
				</React.Fragment>
			)}
		</div>
	);
};

export default UserProfile;
