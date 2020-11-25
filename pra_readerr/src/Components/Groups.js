import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';

import { apiUrl } from '../utils/utils';

const Groups = (props) => {
	const { groupID } = useParams();
	const history = useHistory();
	const [ fetchedGroup, setFetchedGroup ] = useState({});
	useEffect(
		() => {
			let didCancel = false;
			const fetchGroup = async () => {
				const result = await axios.get(`${apiUrl}/getgroup/${groupID}`, { withCredentials: true });
				const { fetchedGroup } = result.data;
				if (!didCancel) {
					setFetchedGroup(fetchedGroup);
				} else {
					history.push('/');
				}
			};
			fetchGroup();
			return () => (didCancel = true);
		},
		[ groupID, history ]
	);
	return <div>{fetchedGroup && <p>{fetchedGroup.name}</p>}</div>;
};

export default Groups;
