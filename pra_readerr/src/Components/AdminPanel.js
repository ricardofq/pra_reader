import React from 'react';
import { Link } from 'react-router-dom';
const AdminPanel = () => {
	return (
		<div>
			<h1>Admin Panel</h1>
			<Link to="/admin/addgroup">Adicionar Grupo</Link>
		</div>
	);
};

export default AdminPanel;
