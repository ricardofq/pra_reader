import { makeStyles } from '@material-ui/core/styles';

import { colors } from '../utils/utils';

export const useStyles = makeStyles((theme) => ({
	Drawer   : {
		'& .MuiDrawer-paper' : {
			backgroundColor : colors.red
		}
	},
	Menu     : {
		display : 'flex',
		padding : '2rem',
		'& a'   : {
			width      : '100%',
			color      : colors.white,
			fontWeight : '900'
		}
	},
	MenuLogo : {
		backgroundColor : colors.white,
		borderRadius    : '5px',
		height          : '70px',
		padding         : '1rem'
	}
}));
