import React, { useState } from 'react';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import { Link } from 'react-router-dom';

import { useStyles } from '../styles/MenuStyles.js';

import { isEmpty, colors } from '../utils/utils';
import { List, ListItem, Drawer, Button } from '@material-ui/core';

export default function SimpleMenu(props){
	const { user } = props;
	const classes = useStyles();
	// const [ anchorEl, setAnchorEl ] = useState(false);
	const [ drawerSt, setDrawerSt ] = useState(false);
	const handleClick = (e) => {
		e.preventDefault();
		// setAnchorEl(event.currentTarget);
		setDrawerSt(!drawerSt);
	};

	const handleClose = () => {
		setDrawerSt(false);
	};

	return (
		<div
			style={{
				display         : 'grid',
				// gridTemplateColumns : '80px auto',
				gridGap         : '1rem',
				alignItems      : 'center',
				height          : '140px',
				backgroundColor : colors.darkblue
			}}
		>
			<div style={{ display: 'flex', justifyContent: 'space-between' }}>
				<div style={{ display: 'flex', alignItems: 'center' }}>
					<Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
						<MenuRoundedIcon style={{ color: colors.red }} />
					</Button>
					<Link to="/">
						<img className={classes.MenuLogo} src="/cqadrimag_logo.png" alt="cqadrimag_logo" />
					</Link>
				</div>
				<div style={{ display: 'flex', alignItems: 'center', margin: '1rem' }}>
					{isEmpty(user) ? (
						<Link style={{ color: colors.white }} to="/login">
							Login
						</Link>
					) : (
						<Link style={{ color: colors.white }} to={`/utilizador/${user.username}`}>
							{user.name}
						</Link>
					)}
				</div>
			</div>
			<Drawer className={classes.Drawer} anchor={'left'} open={drawerSt} onClose={handleClose}>
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
						{/* {!isEmpty(user) &&
						user.isAdmin && (
							<ListItem onClick={handleClose}>
								<Link to="/registo">Registo</Link>
							</ListItem>
						)} */}
						{!isEmpty(user) && (
							<ListItem onClick={handleClose}>
								<Link to={`/utilizador/${user.username}`}>Meu Perfil</Link>
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
