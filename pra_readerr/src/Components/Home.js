import { Divider } from '@material-ui/core';
import React from 'react';
const Home = () => {
	return (
		<div style={{ width: '100%', height: '100%' }}>
			<div
				style={{
					with               : '100%',
					minHeight          : 'calc(100vh - 140px)',
					background         : 'url(/cover.jpg)',
					backgroundSize     : 'cover',
					backgroundPosition : 'center center'
				}}
			/>
		</div>
	);
};

export default Home;
