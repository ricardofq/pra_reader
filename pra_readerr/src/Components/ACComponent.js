import React, { useEffect, useState, useRef, useCallback } from 'react';

import ACCGrid from './ACCGrid';
import { apiUrl, colors } from '../utils/utils';

import axios from 'axios';
import { useParams } from 'react-router-dom';

import { useStyles } from '../styles/ACComponentStyles';

import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import PublishIcon from '@material-ui/icons/Publish';
// import FormControl from '@material-ui/core/FormControl';
// import option from '@material-ui/core/option';
// import FormHelperText from '@material-ui/core/FormHelperText';
import LoadingOverlay from 'react-loading-overlay';
import CircularProgress from '@material-ui/core/CircularProgress';

const ACComponent = (props) => {
	const { acc, allUsers } = props;
	const classes = useStyles();
	const { username } = useParams();
	const user = allUsers.find((el) => el.username === username);
	const [ grid, setGrid ] = useState({});
	const [ ng, setNg ] = useState([]);
	const [ dr, setDr ] = useState([]);
	const [ texts, setTexts ] = useState([]);
	const [ loadingOverlay, setLoadingOverlay ] = useState(true);
	// const [ gridOverlay, setGridOverlay ] = useState(true);
	const gridRef = useRef();
	const handleGrid = (grid) => {
		gridRef.current = grid;
		setGrid(grid);
	};
	const [ inputValue, setInputValue ] = useState('');
	// const [ pageI, setPageI ] = useState('');
	// const [ pageF, setPageF ] = useState('');
	const picUploadRef = useRef();
	const handleChange = (e) => {
		e.preventDefault();
		setInputValue(e.target.value.replace(/(\r\n|\n|\r)/gm, ''));
	};
	const [ isFile, setIsFile ] = useState(false);
	const fileSelectHandler = (e) => {
		e.preventDefault();
		setLoadingOverlay(true);
		const files = picUploadRef.current.files;
		const formData = new FormData();
		formData.append('file', files[0]);
		formData.append('data', grid._id);
		axios
			.post(`${apiUrl}/postfile`, formData, { withCredentials: true })
			.then((response) => {
				// const { pageI, pageF } = response.data;
				const source = axios.CancelToken.source();
				fetchGrid(source, acc, username).then((data) => {
					handleGrid(data.grid);
					setNg(data.ng);
					setDr(data.dr);
					setTexts(data.texts);
					setLoadingOverlay(false);
				});
			})
			.catch((error) => {
				console.log(error);
				setLoadingOverlay(false);
			});
	};
	const handleFile = (e) => {
		e.preventDefault();
		console.log(picUploadRef.current);
		if (e.target.value) {
			setIsFile(true);
		}
	};
	const fetchGrid = useCallback(async (source, acc, username) => {
		const result = await axios.get(`${apiUrl}/${acc}/${username}/usergrid`, {
			withCredentials : true,
			cancelToken     : source.token
		});
		return result.data;
	}, []);
	useEffect(
		() => {
			const source = axios.CancelToken.source();
			fetchGrid(source, acc, username).then((data) => {
				handleGrid(data.grid);
				setNg(data.ng);
				setDr(data.dr);
				setTexts(data.texts);
				setLoadingOverlay(false);
			});
			return () => {
				handleGrid({});
				setNg([]);
				setDr([]);
				source.cancel('cancel getgrid axios');
			};
		},
		[ fetchGrid, acc, username ]
	);
	const [ ngSelectValue, setNGSelectValue ] = useState('');
	const [ drSelectValue, setDRSelectValue ] = useState('');
	const handleReset = (e) => {
		e.preventDefault();
		setNGSelectValue('');
		setDRSelectValue('');
		setInputValue('');
	};
	const ngSelectRef = useRef();
	const drSelectRef = useRef();
	const ngOpts = ng.map((el, idx) => {
		return (
			<option key={el._id} value={el._id}>
				{el.number}
			</option>
		);
	});
	const handleNGSelectChange = (e) => {
		e.preventDefault();
		setNGSelectValue(e.target.value);
		// setDRSelectValue(drSelectRef.current.children[0].value);
	};
	const handleDRSelectChange = (e) => {
		e.preventDefault();
		// e.stopPropagation();
		setDRSelectValue(e.target.value);
	};
	const [ drOpts, setDROpts ] = useState([]);
	const handleAddText = async (e) => {
		e.preventDefault();
		if (ngSelectValue !== '' && drSelectValue !== '' && inputValue !== '') {
			setAddingTxt(true);
			const result = await axios.post(
				`${apiUrl}/postdrtext/${drSelectValue}`,
				{ inputValue: inputValue },
				{ withCredentials: true }
			);
			if (result.status === 200) {
				const source = axios.CancelToken.source();
				const grid = await fetchGrid(source, acc, username);
				setTexts(grid.texts);
				setDr(grid.dr);
				setAddingTxt(false);
				source.cancel('cancel');
			}
		} else {
			setAddingTxt(false);
			window.alert('Área de Texto, NG e DR não podem estar vazios');
		}
	};

	const [ addingTxt, setAddingTxt ] = useState(false);

	useEffect(
		() => {
			console.log(ngSelectRef.current.children[0].value);
			console.log(ngOpts);
			if (ngSelectRef.current) {
				let selectedNG = ngSelectRef.current.children[0].value;
				let drOpts = dr.filter((el) => el.ng === selectedNG);
				console.log(drOpts[0]);
				setDROpts(drOpts);
				setDRSelectValue('');
				// setDRSelectValue(drOpts[0]);
			}
		},
		[ dr, ngSelectValue ]
	);
	const displayDROpts = drOpts.map((el) => (
		<option key={el._id} value={el._id}>
			{el.number}
		</option>
	));
	return (
		<div className={classes.ACComponentContainer}>
			{user && (
				<LoadingOverlay active={loadingOverlay} spinner text="A fazer magia...">
					<h1>
						{acc.toUpperCase()} - {`${user.name} ${user.lname.split(' ').splice(-1)}`}
					</h1>
					<div className={classes.ACComponent}>
						<div className={classes.ACComponentInputContainer}>
							<textarea
								style={{
									height       : '200px',
									padding      : '2rem',
									border       : `1px solid ${colors.red}`,
									borderRadius : '5px'
								}}
								value={inputValue}
								onChange={(e) => handleChange(e)}
							/>
							<div className={classes.selectedNGDRContainer}>
								<div style={{ display: 'flex', flexDirection: 'column' }}>
									<InputLabel style={{ color: colors.darkblue, fontWeight: '900' }}>NG</InputLabel>
									<NativeSelect
										// defaultValue={ng[0] && ng[0]._id}
										value={ngSelectValue}
										ref={ngSelectRef}
										onChange={handleNGSelectChange}
										required
										variant="filled"
									>
										<option value="" disabled>
											{' '}
											-{' '}
										</option>
										{ngOpts}
									</NativeSelect>
								</div>
								<div style={{ display: 'flex', flexDirection: 'column' }}>
									{drOpts && (
										<React.Fragment>
											<InputLabel style={{ color: colors.darkblue, fontWeight: '900' }}>
												DR
											</InputLabel>
											<NativeSelect
												ref={drSelectRef}
												// defaultValue={dr[0] && dr[0]._id}
												value={drSelectValue}
												onChange={handleDRSelectChange}
												required
												variant="filled"
											>
												<option value="" disabled>
													{' '}
													-{' '}
												</option>
												{displayDROpts}
											</NativeSelect>
										</React.Fragment>
									)}
								</div>
								<div
									style={{
										display        : 'flex',
										alignItems     : 'center',
										justifyContent : 'space-between',
										gridColumn     : '-1 / 1'
									}}
								>
									{!addingTxt ? (
										<button onClick={handleAddText}>Adicionar Texto</button>
									) : (
										<CircularProgress />
									)}
									<button onClick={handleReset}>Limpar</button>
								</div>
							</div>
							<div
								style={{
									display      : 'grid',
									gridTemplate : ' auto auto / 150px auto',
									alignItems   : 'center'
								}}
							>
								<h3 style={{ color: colors.darkblue }}>Submeter PDF</h3>
								<label
									htmlFor="selectImage"
									style={{
										display             : 'grid',
										gridTemplateColumns : '50px auto',
										alignItems          : 'center',
										gridGap             : '0 1rem',
										cursor              : 'pointer'
									}}
								>
									<PublishIcon style={{ color: colors.red, fontSize: '3rem' }} />
									<input onChange={handleFile} ref={picUploadRef} id="selectImage" type="file" />
								</label>
								{picUploadRef.current &&
								picUploadRef.current.files[0] && (
									<p style={{ gridColumn: '-1 / 1' }}>{`${picUploadRef.current.files[0]
										.name} carregado.`}</p>
								)}
							</div>
							{isFile && (
								<div>
									<button onClick={fileSelectHandler}>Obter Páginas</button>
								</div>
							)}
						</div>
						<div className={classes.ACComponentGridContainer}>
							<ACCGrid
								acc={acc}
								grid={grid}
								ng={ng}
								dr={dr}
								texts={texts}
								fetchGrid={fetchGrid}
								username={username}
								setDr={setDr}
								setLoadingOverlay={setLoadingOverlay}
							/>
						</div>
					</div>
				</LoadingOverlay>
			)}
		</div>
	);
};

export default ACComponent;
