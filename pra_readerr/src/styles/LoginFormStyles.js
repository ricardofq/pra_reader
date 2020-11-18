// import { colors } from '../utils';

import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
	LoginFormContainer      : {
		width                        : '100%',
		display                      : 'flex',
		alignItems                   : 'center',
		justifyContent               : 'center',
		padding                      : '1.5rem',
		[theme.breakpoints.up('md')]: {
			alignSelf : 'center'
		}
	},
	LoginForm               : {
		display                        : 'flex',
		alignItems                     : 'center',
		maxWidth                       : '750px',
		justifyContent                 : 'center',
		border                         : '1px solid #000',
		boxShadow                      : '0px 0px 2px 1px #000',
		borderRadius                   : '5px',
		// margin                         : '2em',
		// backgroundColor                : colors.white,
		// alignSelf                      : 'flex-end',
		[theme.breakpoints.down('sm')]: {
			width : '100%'
		},
		'& label'                      : {
			// color : `${colors.black} !important`
		}
	},
	LoginFormForm           : {
		padding : '1vw',
		width   : '100%',
		'& h1'  : {
			padding : '0 .5em'
		}
	},
	LoginFormFieldContainer : {
		display                        : 'grid',
		gridTemplateColumns            : 'repeat(2, minmax(360px, 1fr))',
		[theme.breakpoints.down('sm')]: {
			gridTemplateColumns : '1fr'
		}
	},
	LoginFormField          : {
		display                              : 'grid',
		gridTemplateColumns                  : '1fr',
		padding                              : '0.5rem',
		margin                               : '0.5rem',
		'& .MuiInput-underline::after'       : {
			// borderBottom : `2px solid ${colors.yellow}`
		},
		'& .MuiFilledInput-underline::after' : {
			// borderBottom : `2px solid ${colors.yellow}`
		}
	},
	LogInBtn                : {
		// backgroundColor : colors.black,
		// color           : colors.yellow,
		borderRadius : '5px',
		fontSize     : '1.25rem',
		fontWeight   : '700',
		boxShadow    : '0px 0px 0px .5px rgba(255, 255, 255, .37)',
		padding      : '1rem'
	}
}));
