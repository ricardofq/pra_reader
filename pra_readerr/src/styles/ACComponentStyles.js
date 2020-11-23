import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
	ACComponentContainer      : {
		width  : '100%',
		'& h1' : {
			padding : '2rem',
			margin  : '0'
		}
	},
	ACComponent               : {
		padding                        : '2rem',
		display                        : 'grid',
		gridGap                        : '2rem',
		gridTemplate                   : '552px / 400px auto',
		[theme.breakpoints.down(1024)]: {
			gridTemplateColumns : 'auto'
		}
		// '& .MuiNativeSelect-select.MuiNativeSelect-select' : {
		// 	width    : '100px',
		// 	height   : '43px',
		// 	fontSize : '1.42rem'
		// }
	},
	ACComponentInputContainer : {
		// display       : 'flex',
		// flexDirection : 'column'
		display : 'grid',
		gridGap : '2rem'
		// minWidth      : '300px',
		// maxWidth      : '400px'
		// [theme.breakpoints.down('md')]: {
		// 	width : 'auto'
		// },
		// [theme.breakpoints.up('md')]: {
		// 	minWidth : '0px'
		// }
	},
	selectedNGDRContainer     : {
		display      : 'grid',
		gridTemplate : 'auto 50px / auto auto',
		gridGap      : '3rem',
		// margin       : '2.5rem 0',
		width        : '100%'
	},
	ACComponentGridContainer  : {
		// minWidth                       : '600px',
		// [theme.breakpoints.up('sm')]: {
		// 	minWidth : '500px'
		// },
		// [theme.breakpoints.down('xs')]: {
		// 	minWidth : 'auto'
		// }
	}
}));
