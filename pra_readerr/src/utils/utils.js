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

export const colors = {
	red       : '#e63946',
	blue      : '#457b9d',
	lightblue : '#a8dadc',
	darkblue  : '#1d3557',
	white     : '#f1faee'
};

// let z = [ 5, 1, 1, 1 ];
// let y = [ 5, 3, 1, 1 ];
// let x = [ 5, 3, 2, 1 ];

const hasFive = (arr) => {
	return arr.some((el) => el === 5);
};

export const isValidated = (arr) => {
	if (hasFive(arr)) {
		let tmp = arr.filter((el) => el !== 5);
		if (tmp.length <= 2) {
			return true;
		} else {
			return tmp.some((el) => el >= 3);
		}
	} else {
		return false;
	}
};

// let cenas = [ isValidated(z), isValidated(y), isValidated(x) ];

// console.log(cenas);
