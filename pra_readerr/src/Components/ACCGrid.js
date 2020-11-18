import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import NativeSelect from '@material-ui/core/NativeSelect';
import Box from '@material-ui/core/Box';
import CancelIcon from '@material-ui/icons/Cancel';

import { useStyles } from '../styles/ACCGridStyles';

import { apiUrl, gradeColors } from '../utils/utils';

import axios from 'axios';

function TabPanel(props){
	const { dr, value, index, texts, fetchGrid, username, acc, setDr, classes, ...other } = props;

	const displayDRtext = dr.texts.map((el, idx) => {
		const txtRef = React.createRef();
		let txt = texts.find((txt) => {
			return txt._id === el;
		});
		if (txtRef.current) txtRef.current.textContent = `${txt.text.fullText}`;
		let fullTxt = false;
		const handleClick = (e) => {
			e.preventDefault();
			console.log(fullTxt);
			console.log(txtRef.current);
			if (!fullTxt) {
				txtRef.current.textContent = `${txt.text.fullText}`;
				fullTxt = !fullTxt;
			} else {
				txtRef.current.textContent = `${txt.text.first} (...) ${txt.text.last}`;
				fullTxt = !fullTxt;
			}
		};
		const handleDeleteText = async (e, txtID) => {
			e.preventDefault();
			console.log(txtID);
			const result = await axios.post(`${apiUrl}/deletetxt/${txtID}`);
			if (result.data.msg === 'Text deleted') {
				const source = axios.CancelToken.source();
				fetchGrid(source, acc, username).then((data) => {
					setDr(data.dr);
					setEditGrade(false);
					source.cancel('cancel');
				});
			}
		};
		return (
			<Typography
				// className={classes.ACCGridTxtEl}

				key={`${dr._id}dr${index + 1}${idx}`}
				gutterBottom
				paragraph
			>
				<span className={classes.ACCGridTxtElBullet} style={{ color: '#7d6fe4' }}>
					{'\u2B24'}
				</span>
				<span onClick={(e) => handleClick(e)} className={classes.ACCGridTxtEl} ref={txtRef}>
					<span>{txt && `${txt.text.first} (...) ${txt.text.last}`}</span>
				</span>
				<span className={txt && txt.pagI && txt.pagF ? classes.withPage : classes.noPage}>
					{txt && ` - Pág. ${txt.pagI} a Pág. ${txt.pagF}`}
				</span>
				<span>
					<CancelIcon onClick={(e) => handleDeleteText(e, txt._id)} />
				</span>
			</Typography>
		);
	});
	const [ editGrade, setEditGrade ] = useState(false);
	const handleEditGrade = (e) => {
		console.log(e);
		setEditGrade(true);
	};
	const [ drGrade, setDrGrade ] = useState(dr.grade);
	const handleSaveGrade = async (e) => {
		const source = axios.CancelToken.source();
		console.log(e);
		const result = await axios.post(
			`${apiUrl}/editgrade/${dr._id}`,
			{ newGrade: drGrade },
			{ withCredentials: true }
		);
		if (result.status === 200) {
			fetchGrid(source, acc, username).then((data) => {
				setDr(data.dr);
				setEditGrade(false);
				source.cancel('cancel');
			});
		}
	};
	const handleDrGrade = (e) => {
		e.preventDefault();
		setDrGrade(e.target.value);
	};
	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`vertical-tabpanel-${index}`}
			aria-labelledby={`vertical-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box
					style={{
						border     : '1px solid #7d6fe4',
						borderLeft : 'none',
						paddingTop : '0',
						fontWeight : '900'
					}}
					p={3}
				>
					<div
						style={{
							margin          : '0 -1.5rem 1rem',
							backgroundColor : '#161925',
							padding         : '1rem',
							color           : 'white'
						}}
					>
						<Typography variant="h6">{`DR${dr.number}`}</Typography>
						<div style={{ display: 'flex' }}>
							{!editGrade ? (
								<React.Fragment>
									<Typography
										style={{ color: gradeColors[dr.grade] }}
										variant="subtitle1"
									>{`Nota: ${dr.grade}`}</Typography>
									<EditIcon
										onClick={(e) => handleEditGrade(e)}
										style={{ margin: '0 1rem', color: '#7d6fe4' }}
									/>
								</React.Fragment>
							) : (
								<React.Fragment>
									<Typography style={{ color: gradeColors[dr.grade] }} variant="subtitle1">
										Nota
									</Typography>
									<NativeSelect
										style={{
											width           : '50px',
											fontSize        : '1rem',
											height          : '50px',
											margin          : '0 0.75rem',
											backgroundColor : '#fff'
										}}
										value={drGrade}
										onChange={handleDrGrade}
									>
										<option value="1">1</option>
										<option value="2">2</option>
										<option value="3">3</option>
										<option value="4">4</option>
										<option value="5">5</option>
									</NativeSelect>
									<SaveIcon
										style={{ margin: '0 1rem', color: '#7d6fe4' }}
										onClick={(e) => handleSaveGrade(e)}
									/>
								</React.Fragment>
							)}
						</div>
					</div>
					<div>{displayDRtext}</div>
				</Box>
			)}
		</div>
	);
}

TabPanel.propTypes = {
	children : PropTypes.node,
	index    : PropTypes.any.isRequired,
	value    : PropTypes.any.isRequired
};

function a11yProps(index){
	return {
		id              : `vertical-tab-${index}`,
		'aria-controls' : `vertical-tabpanel-${index}`
	};
}

export default function VerticalTabs(props){
	// eslint-disable-next-line
	const { acc, grid, ng, dr, texts, fetchGrid, username, setDr } = props;
	// console.log(texts);
	const classes = useStyles();
	const [ value, setValue ] = useState(0);
	// const [ editingGrade, setEditingGrade ] = useState(false);
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	const displayNG = ng.map((el) => <Tab key={el._id} label={`NG${el.number}`} {...a11yProps(el.number - 1)} />);
	const displayDR = dr.map((el) => {
		let index = ng.find((ngEl) => ngEl._id === el.ng).number - 1;
		return (
			<TabPanel
				fetchGrid={fetchGrid}
				username={username}
				setDr={setDr}
				acc={acc}
				key={el._id}
				dr={el}
				value={value}
				index={index}
				texts={texts}
				classes={classes}
			/>
		);
	});
	return (
		<div className={classes.root}>
			<Tabs
				orientation="vertical"
				variant="scrollable"
				value={value}
				onChange={handleChange}
				aria-label="Vertical tabs example"
				className={classes.tabs}
			>
				{displayNG}
			</Tabs>
			<div style={{ height: '536px', maxHeight: '700px', overflowY: 'scroll', width: '100%' }}>{displayDR}</div>
		</div>
	);
}
