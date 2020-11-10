import { TextField } from '@material-ui/core';
import React, { useState } from 'react';

import axios from 'axios';

import { apiUrl } from '../utils/utils';

const AddGroup = (props) => {
	const { user, fetchAllGroups } = props;
	const [ groupName, setGroupName ] = useState('');
	const handleGroupName = (e) => {
		e.preventDefault();
		setGroupName(e.target.value);
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		const result = await axios.post(`${apiUrl}/addgroup`, { groupName: groupName }, { withCredentials: true });
		console.log(result);
		fetchAllGroups(user);
	};
	return (
		<div>
			<TextField
				autoComplete="off"
				id="groupName"
				type="text"
				onChange={(e) => handleGroupName(e)}
				variant="filled"
				label="Nome do Grupo"
				value={groupName}
			/>{' '}
			<button onClick={handleSubmit}>Adicionar</button>
		</div>
	);
};

export default AddGroup;
