import { makeStyles } from '@material-ui/core/styles';
import { colors } from '../utils/utils';

// import { colors } from '../utils';

export const useStyles = makeStyles((theme) => ({
	RegisterFormContainer              : {
		width          : '100%',
		display        : 'flex',
		alignItems     : 'center',
		justifyContent : 'center',
		alignSelf      : 'center',
		padding        : '1.5rem'
	},
	RegisterForm                       : {
		display                        : 'flex',
		alignItems                     : 'center',
		maxWidth                       : '750px',
		justifyContent                 : 'center',
		border                         : '1px solid #000',
		boxShadow                      : '0px 0px 2px 1px #000',
		borderRadius                   : '5px',
		margin                         : '3em 0',
		// backgroundColor                : colors.white75,
		[theme.breakpoints.down('sm')]: {
			width : '100%'
		},
		'& label'                      : {
			color : '#000 !important'
		}
	},
	RegisterFormForm                   : {
		padding         : '1em',
		width           : '100%',
		backgroundColor : colors.lightblue,
		'& h1'          : {
			padding : '0 .5em'
		}
	},
	RegisterFormFieldContainer         : {
		display                        : 'grid',
		gridTemplateColumns            : 'repeat(2, minmax(360px, 1fr))',
		[theme.breakpoints.down('sm')]: {
			gridTemplateColumns : '1fr'
		}
	},
	RegisterFormFieldContainerAddress  : {
		gridColumn : '1 / -1'
	},
	RegisterFormFieldContainerBirthday : {
		[theme.breakpoints.up('md')]: {
			gridColumn          : '1 / -1',
			gridTemplateColumns : '.5fr !important',
			marginRight         : '2.25rem !important'
		}
	},
	RegisterFormField                  : {
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
	RegisterBtn                        : {
		// backgroundColor : colors.black,
		// color           : colors.yellow,
		borderRadius : '5px',
		fontSize     : '1.25rem',
		fontWeight   : '700',
		boxShadow    : '0px 0px 0px .5px rgba(255, 255, 255, .37)',
		padding      : '1rem'
	},
	formControl                        : {
		margin   : theme.spacing(1),
		minWidth : 120
	},
	SelectEmpty                        : {
		marginTop : theme.spacing(2)
	}
}));
