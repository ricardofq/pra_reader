import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
	Menu     : {
		display : 'flex',
		padding : '2rem',
		'& a'   : {
			width : '100%'
		}
	},
	MenuLogo : {
		padding : '0 1rem'
	}
}));
