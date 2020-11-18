import React, { useEffect, useState, useRef, useCallback } from 'react';

import ACCGrid from './ACCGrid';
import { apiUrl } from '../utils/utils';

import axios from 'axios';
import { useParams } from 'react-router-dom';

import { useStyles } from '../styles/ACComponentStyles';

import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
// import FormHelperText from '@material-ui/core/FormHelperText';
import LoadingOverlay from 'react-loading-overlay';

const ACComponent = (props) => {
	const { acc, allUsers } = props;
	const classes = useStyles();
	const { username } = useParams();
	const user = allUsers.find((el) => el.username === username);
	const [ grid, setGrid ] = useState({});
	const [ ng, setNg ] = useState([]);
	const [ dr, setDr ] = useState([]);
	const [ texts, setTexts ] = useState([]);
	const [ loadingOverlay, setLoadingOverlay ] = useState(false);
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
				console.log(response);
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
		setDRSelectValue(drSelectRef.current.children[0].value);
	};
	const handleDRSelectChange = (e) => {
		e.preventDefault();
		setDRSelectValue(e.target.value);
	};
	const [ drOpts, setDROpts ] = useState([]);
	const handleAddText = async (e) => {
		e.preventDefault();
		if (ngSelectValue !== '' && drSelectValue !== '') {
			const result = await axios.post(
				`${apiUrl}/postdrtext/${drSelectValue}`,
				{ inputValue: inputValue },
				{ withCredentials: true }
			);
			console.log(result);
			if (result.status === 200) {
				const source = axios.CancelToken.source();
				const grid = await fetchGrid(source, acc, username);
				console.log(grid);
				setTexts(grid.texts);
				setDr(grid.dr);
				source.cancel('cancel');
			}
		} else {
			window.alert('NG e DR não podem estar vazios');
		}
	};
	useEffect(
		() => {
			let selectedNG = ngSelectRef.current.children[0].value;
			let drOpts = dr.filter((el) => el.ng === selectedNG);
			setDROpts(drOpts);
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
			<h1 style={{ padding: '0 2rem' }}>
				{acc.toUpperCase()} - {`${user.name} ${user.lname.split(' ').splice(-1)}`}
			</h1>
			<div className={classes.ACComponent}>
				<div style={{ display: 'flex', flexDirection: 'column' }}>
					<textarea
						style={{ height: '200px', padding: '2rem' }}
						value={inputValue}
						onChange={(e) => handleChange(e)}
					/>
					<div className={classes.selectedNGDRContainer}>
						<div style={{ display: 'flex', flexDirection: 'column' }}>
							<InputLabel>NG</InputLabel>
							<NativeSelect
								value={ngSelectValue}
								ref={ngSelectRef}
								onChange={handleNGSelectChange}
								required
							>
								<option value=""> - </option>
								{ngOpts}
							</NativeSelect>
						</div>
						<div style={{ display: 'flex', flexDirection: 'column' }}>
							{drOpts && (
								<React.Fragment>
									<InputLabel>DR</InputLabel>
									<NativeSelect
										ref={drSelectRef}
										// defaultValue={dr[0] && dr[0]._id}
										value={drSelectValue}
										onChange={handleDRSelectChange}
										required
									>
										<option value=""> - </option>
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
							<button onClick={handleAddText}>Adicionar Texto</button>
							<button onClick={handleReset}>Limpar</button>
						</div>
					</div>
					<div>
						<input onChange={handleFile} ref={picUploadRef} id="selectImage" type="file" />
					</div>
					{isFile && (
						<div>
							<button onClick={fileSelectHandler}>Obter Páginas</button>
						</div>
					)}
				</div>
				<div>
					<LoadingOverlay active={loadingOverlay} spinner text="A fazer magia...">
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
					</LoadingOverlay>
				</div>
			</div>
		</div>
	);
};

export default ACComponent;
