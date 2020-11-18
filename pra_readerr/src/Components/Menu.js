import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import ListItem from '@material-ui/core/ListItem';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import Drawer from '@material-ui/core/Drawer';
import { Link } from 'react-router-dom';

import { useStyles } from '../styles/MenuStyles.js';

import { isEmpty } from '../utils/utils';
import { List } from '@material-ui/core';

export default function SimpleMenu(props){
	const { user } = props;
	const classes = useStyles();
	const [ anchorEl, setAnchorEl ] = useState(false);
	const [ drawerSt, handleDrawerSt ] = useState(false);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<div
			style={{
				display             : 'grid',
				gridTemplateColumns : '80px auto',
				gridGap             : '1rem',
				alignItems          : 'center',
				height              : '110px'
			}}
		>
			<Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
				<MenuRoundedIcon />
			</Button>
			<img className={classes.MenuLogo} src="/cqadrimag_logo.png" alt="cqadrimag_logo" />
			<Drawer anchor={'left'} open={anchorEl} onClose={handleClose}>
				<div className={classes.Menu}>
					<List>
						<ListItem onClick={handleClose}>
							<Link to="/">Home</Link>
						</ListItem>
						{isEmpty(user) && (
							<ListItem onClick={handleClose}>
								<Link to="/login">Login</Link>
							</ListItem>
						)}
						{!isEmpty(user) &&
						user.isAdmin && (
							<ListItem onClick={handleClose}>
								<Link to="/registo">Registo</Link>
							</ListItem>
						)}
						{!isEmpty(user) && (
							<ListItem onClick={handleClose}>
								<Link to={`/utilizador/${user.username}`}>{user.name}</Link>
							</ListItem>
						)}
						{!isEmpty(user) &&
						user.isAdmin && (
							<ListItem onClick={handleClose}>
								<Link to="/admin">Painel de Administrador</Link>
							</ListItem>
						)}
						{!isEmpty(user) &&
						user.isAdmin && (
							<ListItem onClick={handleClose}>
								<Link to={`/utilizadores`}>Utilizadores</Link>
							</ListItem>
						)}
					</List>
				</div>
			</Drawer>
		</div>
	);
}
