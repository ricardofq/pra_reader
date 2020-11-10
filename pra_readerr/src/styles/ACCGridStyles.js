import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
	root               : {
		flexGrow                                  : 1,
		backgroundColor                           : theme.palette.background.paper,
		display                                   : 'flex',
		border                                    : '1px solid #000',
		'& .MuiTab-textColorInherit.Mui-selected' : {
			backgroundColor : '#7d6fe4',
			fontWeight      : '900',
			color           : '#fff',
			fontSize        : '1.1rem',
			transition      : 'all ease-in-out .6s',
			'&:hover'       : {
				backgroundColor : '#a097df'
			}
		},
		'& .MuiButtonBase-root'                   : {
			transition : 'all ease-in-out .3s',
			'&:hover'  : {
				backgroundColor : '#bbb7d7'
			}
		},
		'& .MuiTabs-scrollable'                   : {
			backgroundColor : '#dddcdc'
		},
		'& .MuiTabs-flexContainerVertical'        : {
			alignItems : 'center'
		}
	},
	tabs               : {
		borderRight : `1px solid ${theme.palette.divider}`
	},
	ACCGridTxtEl       : {
		cursor     : 'pointer',
		// display   : 'inline-block',
		transition : 'color ease-in-out .3s',
		'&:hover'  : {
			color : '#464646'
		}
	},
	ACCGridTxtElBullet : {
		cursor      : 'pointer',
		marginRight : '.5rem'
	},
	withPage           : {
		color      : 'green',
		fontWeight : '900'
	},
	noPage             : {
		display : 'none'
	}
}));
