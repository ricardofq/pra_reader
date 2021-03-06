import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import NativeSelect from '@material-ui/core/NativeSelect';
import Box from '@material-ui/core/Box';
import CancelIcon from '@material-ui/icons/Cancel';
import CircularProgress from '@material-ui/core/CircularProgress';
import FileCopyIcon from '@material-ui/icons/FileCopy';

import NGLabel from './NGLabel';
import { useStyles } from '../styles/ACCGridStyles';

import { apiUrl, gradeColors, colors } from '../utils/utils';

import axios from 'axios';

function TabPanel(props){
	const { dr, value, index, texts, fetchGrid, username, acc, setDr, classes, setLoadingOverlay, ...other } = props;

	const displayDRtext = dr.texts.map((el, idx) => {
		const txtRef = React.createRef();
		let txt = texts.find((txt) => {
			return txt._id === el;
		});
		if (txtRef.current) txtRef.current.childNodes[0].textContent = `"${txt.text.fullText}"`;
		let fullTxt = false;
		const handleClick = (e) => {
			e.preventDefault();
			console.log(txtRef.current);
			if (!fullTxt) {
				txtRef.current.childNodes[0].textContent = `"${txt.text.fullText}"`;
				fullTxt = !fullTxt;
			} else {
				txtRef.current.childNodes[0].textContent = `"${txt.text.first} (...) ${txt.text.last}"`;
				fullTxt = !fullTxt;
			}
		};
		const handleDeleteText = async (e, txtID) => {
			e.preventDefault();
			setLoadingOverlay(true);
			if (window.confirm('Deseja apagar este texto?')) {
				const result = await axios.post(`${apiUrl}/deletetxt/${txtID}`);
				if (result.data.msg === 'Text deleted') {
					const source = axios.CancelToken.source();
					fetchGrid(source, acc, username).then((data) => {
						setDr(data.dr);
						setEditGrade(false);
						source.cancel('cancel');
						setLoadingOverlay(false);
					});
				}
			} else {
				setLoadingOverlay(false);
			}
		};
		return (
			<Typography
				className={classes.ACCGridTxtElContainer}
				key={`${dr._id}dr${index + 1}${idx}`}
				gutterBottom
				paragraph
			>
				{/* <span className={classes.ACCGridTxtElBullet}>{'\u2B24'}</span> */}
				<span>
					<CancelIcon
						onClick={(e) => handleDeleteText(e, txt._id)}
						style={{ marginRight: '1rem', color: gradeColors[1] }}
					/>
				</span>
				<span onClick={(e) => handleClick(e)} className={classes.ACCGridTxtEl} ref={txtRef}>
					<span>"{txt && `${txt.text.first} (...) ${txt.text.last}`}"</span>
					<span className={txt && txt.pagI && txt.pagF ? classes.withPage : classes.noPage}>
						{txt && ` - Pág. ${txt.pagI}`} {txt && txt.pagF !== txt.pagI ? `a Pág. ${txt.pagF}` : null}
					</span>
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
		setLoadingGrade(true);
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
				setLoadingGrade(false);
				source.cancel('cancel');
			});
		} else {
			setLoadingGrade(false);
		}
	};
	const handleDrGrade = (e) => {
		e.preventDefault();
		setDrGrade(e.target.value);
	};
	const [ loadingGrade, setLoadingGrade ] = useState(false);
	const handleCopy = (e, DRRf) => {
		// console.log(DRRef.current.childNodes);
		let childNodeArray = [ ...DRRef.current.childNodes ];
		let txtArray = childNodeArray.map((el) => el.textContent);
		let txtStr = txtArray.join('\n');
		navigator.clipboard.writeText(txtStr);
	};
	const DRRef = useRef();
	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`vertical-tabpanel-${index}`}
			aria-labelledby={`vertical-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box className={classes.BoxContainer} p={3}>
					<div className={classes.Box}>
						<div style={{ display: 'flex', alignItems: 'center' }}>
							<Typography style={{ fontWeight: '900' }} variant="h6">{`DR${dr.number}`}</Typography>
							<FileCopyIcon style={{ marginLeft: '.25rem' }} onClick={(e) => handleCopy(e, DRRef)} />
						</div>
						<div style={{ width: editGrade ? '200px' : null }} className={classes.BoxGradeContainer}>
							{!loadingGrade ? !editGrade ? (
								<React.Fragment>
									<Typography
										style={{ color: gradeColors[dr.grade], fontWeight: '900' }}
										variant="subtitle1"
									>{`Nota: ${dr.grade}`}</Typography>
									<EditIcon
										onClick={(e) => handleEditGrade(e)}
										style={{ margin: '0 1rem', color: colors.darkblue }}
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
										style={{ margin: '0 1rem', color: colors.darkblue }}
										onClick={(e) => handleSaveGrade(e)}
									/>
								</React.Fragment>
							) : (
								<CircularProgress />
							)}
						</div>
					</div>
					<div ref={DRRef}>{displayDRtext}</div>
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
	const { acc, grid, ng, dr, texts, fetchGrid, username, setDr, setLoadingOverlay } = props;
	// console.log(texts);
	const classes = useStyles();
	const [ value, setValue ] = useState(0);
	// const [ editingGrade, setEditingGrade ] = useState(false);
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	const displayNG = ng.map((el) => {
		let grades = [];
		if (el.dr.length && dr.length) {
			grades = el.dr.map((drID) => parseInt(dr.find((dr) => dr._id === drID).grade));
		}
		return (
			<Tab
				key={el._id}
				label={<NGLabel num={el.number} grades={grades} elID={el.id} />}
				{...a11yProps(el.number - 1)}
			/>
		);
	});

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
				setLoadingOverlay={setLoadingOverlay}
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
			<div style={{ maxHeight: '552px', overflowY: 'scroll', width: '100%' }}>{displayDR}</div>
		</div>
	);
}
