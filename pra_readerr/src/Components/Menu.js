import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import { Link } from 'react-router-dom';

import { useStyles } from '../styles/MenuStyles.js';

import { isEmpty } from '../utils/utils';

export default function SimpleMenu(props){
	const { user } = props;
	const classes = useStyles();
	const [ anchorEl, setAnchorEl ] = React.useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<div className={classes.Menu}>
			<Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
				<MenuRoundedIcon />
				<img className={classes.MenuLogo} src="/cqadrimag_logo.png" alt="cqadrimag_logo" />
			</Button>
			<Menu
				style={{ top: '60px' }}
				id="simple-menu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				<MenuItem onClick={handleClose}>
					<Link to="/">Home</Link>
				</MenuItem>
				{isEmpty(user) && (
					<MenuItem onClick={handleClose}>
						<Link to="/login">Login</Link>
					</MenuItem>
				)}
				{!isEmpty(user) &&
				user.isAdmin && (
					<MenuItem onClick={handleClose}>
						<Link to="/registo">Registo</Link>
					</MenuItem>
				)}
				{!isEmpty(user) && (
					<MenuItem onClick={handleClose}>
						<Link to={`/utilizador/${user.username}`}>{user.name}</Link>
					</MenuItem>
				)}
				{!isEmpty(user) &&
				user.isAdmin && (
					<MenuItem onClick={handleClose}>
						<Link to="/admin">Painel de Administrador</Link>
					</MenuItem>
				)}
				{!isEmpty(user) &&
				user.isAdmin && (
					<MenuItem onClick={handleClose}>
						<Link to={`/utilizadores`}>Utilizadores</Link>
					</MenuItem>
				)}
			</Menu>
		</div>
	);
}
