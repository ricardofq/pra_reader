import React, { useState, useEffect } from 'react';
import ErrorIcon from '@material-ui/icons/Error';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

import { isValidated } from '../utils/utils';

const NGLabel = (props) => {
	const { grades, num } = props;
	const [ ngSt, setNgSt ] = useState(false);
	useEffect(
		() => {
			if (isValidated(grades)) {
				setNgSt(true);
			} else {
				setNgSt(false);
			}
		},
		[ grades ]
	);
	return (
		<div style={{ display: 'grid', gridTemplateColumns: 'auto auto', alignItems: 'center', gridGap: '1rem' }}>
			NG {num}
			{ngSt ? <CheckCircleIcon style={{ color: '#c1fba4' }} /> : <ErrorIcon style={{ color: '#ffe66d' }} />}
		</div>
	);
};

export default NGLabel;
