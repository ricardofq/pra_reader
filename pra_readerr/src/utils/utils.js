const getApiUrl = () => {
	if (process.env.NODE_ENV === 'production') {
		return '/api';
	} else {
		return 'http://localhost:5000/api';
	}
};
export const apiUrl = getApiUrl();
const getBEUrl = () => {
	if (process.env.NODE_ENV === 'production') {
		return '/';
	} else {
		return 'http://localhost:5000';
	}
};
export const BEUrl = getBEUrl();

export const isEmpty = (obj) => {
	return Object.keys(obj).length === 0;
};

export const gradeColors = {
	1 : '#F73939',
	2 : '#F57E7E',
	3 : '#FFBC42',
	4 : '#FFBC42',
	// 4 : '#94E8B4',
	5 : 'rgb(88, 249, 120)'
};
