import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
	App  : {
		'& a' : {
			textDecoration : 'none'
		}
	},
	main : {
		display        : 'flex',
		minHeight      : 'calc(100vh - 140px)',
		alignItems     : 'center',
		justifyContent : 'center'
	}
}));
