import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
	ACComponentContainer  : {
		width  : '100%',
		'& h1' : {
			padding : '2rem',
			margin  : '0'
		}
	},
	ACComponent           : {
		padding                       : '2rem',
		display                       : 'grid',
		gridGap                       : '3rem',
		gridTemplateColumns           : '400px auto',
		[theme.breakpoints.down(960)]: {
			gridTemplateColumns : 'auto'
		}
		// '& .MuiNativeSelect-select.MuiNativeSelect-select' : {
		// 	width    : '100px',
		// 	height   : '43px',
		// 	fontSize : '1.42rem'
		// }
	},
	selectedNGDRContainer : {
		display      : 'grid',
		gridTemplate : 'auto 50px / auto auto',
		gridGap      : '3rem',
		margin       : '2.5rem 0',
		width        : '100%'
	}
}));
