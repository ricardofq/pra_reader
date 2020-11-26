import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
	UserProfileContainer : {
		padding : '2rem'
	},
	UserProfileLinks     : {
		display             : 'grid',
		gridTemplateColumns : 'auto auto auto'
	},
	UserProfileActions   : {
		'& span' : {
			marginRight : '.5rem'
			// padding : '.5rem'
		},
		'& a'    : {
			display : 'flex'
		}
	}
}));
