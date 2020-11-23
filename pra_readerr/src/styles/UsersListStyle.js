import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
	UsersList          : {
		padding : '0'
	},
	UsersListContainer : {
		padding                : '1rem',
		'& input'              : { width: '100%' },
		'& .MuiTextField-root' : {
			width : '100%'
		}
	},
	UsersListRow       : {
		display                        : 'grid',
		gridTemplateColumns            : '160px 120px 50px 50px 50px',
		padding                        : '0',
		'& li'                         : {
			padding : '.5rem'
		},
		[theme.breakpoints.down('xs')]: {
			gridTemplateColumns : '120px 90px 37px 37px 37px',
			'& li'              : {
				fontSize : '.8rem',
				padding  : '.25rem'
			}
		}
	}
}));
