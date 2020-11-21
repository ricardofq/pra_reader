import React from 'react';
import { Link } from 'react-router-dom';
import { List, ListItem } from '@material-ui/core/';

const AdminPanel = () => {
	return (
		<div>
			<h1>Admin Panel</h1>
			<List>
				<ListItem>
					<Link to="/admin/addgroup">Adicionar Grupo</Link>
				</ListItem>
				<ListItem>
					<Link to="/registo">Registar Utilizador</Link>
				</ListItem>
			</List>
		</div>
	);
};

export default AdminPanel;
