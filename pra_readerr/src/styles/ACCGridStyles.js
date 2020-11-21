import { makeStyles } from '@material-ui/core/styles';

import { colors } from '../utils/utils';

export const useStyles = makeStyles((theme) => ({
	root                  : {
		flexGrow                                  : 1,
		backgroundColor                           : theme.palette.background.paper,
		display                                   : 'flex',
		border                                    : `1px solid ${colors.red}`,
		borderRadius                              : '5px',
		'& .MuiTab-textColorInherit.Mui-selected' : {
			backgroundColor : colors.red,
			fontWeight      : '900',
			color           : colors.white,
			fontSize        : '1.1rem',
			transition      : 'all ease-in-out .3s',
			'&:hover'       : {
				backgroundColor : 'rgba(230, 57, 70, .9)',
				color           : colors.white
			}
		},
		'& .MuiButtonBase-root'                   : {
			transition : 'all ease-in-out .3s',
			'&:hover'  : {
				backgroundColor : 'rgba(230, 57, 70, .9)',
				color           : colors.white
			}
		},
		'& .MuiTabs-scrollable'                   : {
			backgroundColor : colors.darkblue
		},
		'& .MuiTabs-flexContainerVertical'        : {
			alignItems : 'center'
		},
		'& .MuiTab-wrapper'                       : {
			color : '#fff'
		},
		'& button'                                : {
			height : '67px'
		},
		'& .MuiCircularProgress-colorPrimary'     : {
			color : colors.lightblue
		}
	},
	tabs                  : {
		borderRight : `1px solid ${theme.palette.divider}`
	},
	ACCGridTxtElContainer : {
		display             : 'grid',
		gridTemplateColumns : '40px auto'
	},
	ACCGridTxtEl          : {
		color      : colors.darkblue,
		cursor     : 'pointer',
		// display   : 'inline-block',
		transition : 'color ease-in-out .3s',
		'&:hover'  : {
			color : '#464646'
		}
	},
	ACCGridTxtElBullet    : {
		cursor      : 'pointer',
		marginRight : '.5rem'
	},
	withPage              : {
		color      : colors.darkblue,
		fontWeight : '900'
	},
	noPage                : {
		display : 'none'
	},
	BoxContainer          : {
		// border     : '1px solid #7d6fe4',
		borderLeft : 'none',
		paddingTop : '0',
		fontWeight : '900',
		padding    : '0 24px',
		minHeight  : '134px'
	},
	Box                   : {
		margin          : '0 -1.5rem 1rem',
		backgroundColor : colors.red,
		padding         : '1rem',
		color           : colors.white,
		fontWeight      : '900',
		height          : 'calc(67px - 1rem)',
		// display         : 'grid',
		// gridTemplate    : 'auto auto / 200px',
		// gridGap         : '1.5rem'
		display         : 'flex',
		justifyContent  : 'space-between'
	},
	BoxGradeContainer     : {
		backgroundColor : '#fff',
		// display             : 'grid',
		// gridTemplateColumns : 'auto auto auto',
		borderRadius    : '5px',
		padding         : '0.5rem',
		// alignItems          : 'center'
		display         : 'flex',
		justifyContent  : 'space-evenly',
		alignItems      : 'center',
		transition      : 'width 1s ease-in-out'
	}
}));

// {

// }
