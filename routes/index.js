const express = require('express');
const router = express.Router();

const passport = require('passport');
require('../config/passportConfig')(passport);
const bcrypt = require('bcryptjs');
const middleware = require('../middleware/index.js');
const { isUserAdmin } = middleware;

const Users = require('../models/Users');
const ACCGrid = require('../models/ACCGrid');
const NG = require('../models/NG');
const DR = require('../models/DR');
const Text = require('../models/Text');
const Groups = require('../models/Groups');
// const { multerUpload, dataUri, parser } = require('../middleware/multer');
const multer = require('multer');
const fs = require('fs');
const pdf = require('pdf-parse');
// const ACCGrid = require('../models/ACCGrid');

// SET STORAGE
const storage = multer.diskStorage({
	destination : function(req, file, cb){
		cb(null, 'uploads');
	},
	filename    : function(req, file, cb){
		cb(null, file.fieldname + '-' + Date.now());
	}
});

const upload = multer({ storage: storage });

const populateText = async () => {
	try {
		const grids = await ACCGrid.find({});
		grids.forEach(async (gridEl) => {
			gridEl.NG.forEach(async (ngEl) => {
				const ng = await NG.findOne({ _id: ngEl });
				ng.dr.forEach(async (drEl) => {
					const dr = await DR.findOne({ _id: drEl });
					const text1 = await Text.create({
						dr   : dr._id,
						text : { fullText: `Full text ${gridEl.acc} NG${ng.number}DR${dr.number} - 1` }
					});
					const text2 = await Text.create({
						dr   : dr._id,
						text : { fullText: `Full text ${gridEl.acc} NG${ng.number}DR${dr.number} - 2` }
					});
					await DR.findOneAndUpdate(
						{ _id: dr._id },
						{ $push: { texts: { $each: [ text1._id, text2._id ] } } }
					);
				});
			});
		});
	} catch (error) {
		console.log(error);
	}
};

// populateText();

// const EasyDocx = require('node-easy-docx');

// const easyDocx = new EasyDocx({
// 	path : './public/pdf/teste.docx'
// });

// const fs = require('fs');

// easyDocx
// 	.parseDocx()
// 	.then((data) => {
// 		// JSON data as result
// 		let write = JSON.stringify(data);
// 		fs.writeFile('./public/pdf/data.json', write, (err) => {
// 			if (err) throw err;
// 			return console.log('data written to json file');
// 		});
// 	})
// 	.catch((err) => {
// 		console.error(err);
// 	});

router.post('/login', (req, res, next) => {
	passport.authenticate('local', { session: true }, (err, user, info) => {
		if (err) throw err;
		if (!user) res.send('No User Exists');
		else {
			req.logIn(user, (err) => {
				if (err) throw err;
				if (user) {
					return res.send({ msg: 'Successfully Authenticated', user: user });
				}
				res.send({ msg: 'User not found', user: null });
			});
		}
	})(req, res, next);
});

router.get('/allusers/:userID', async (req, res) => {
	try {
		const { userID } = req.params;
		const user = await Users.findById(userID);
		if (user.isAdmin) {
			let allUsers = await Users.find({});
			return res.send({ msg: 'Todos os utilizadores', allUsers: allUsers });
		} else {
			let allUsers = await Users.find({ isAdmin: true });
			return res.send({ msg: 'Todos os utilizadores', allUsers: allUsers });
		}
	} catch (error) {
		console.log(error);
		return res.send({ msg: 'Something went wrong' });
	}
});

router.post('/register', async (req, res) => {
	try {
		const allUsers = await Users.find({});
		const userID = parseInt(allUsers.reduce((a, c) => (a.userID > c.userID ? a.userID : c.userID), {})) + 1;
		const { isAdmin, isCandidate } = req.body;
		const userBody = { ...req.body, isAdmin: isAdmin, isCandidate: isCandidate };
		if (isAdmin) delete userBody.group;
		// const userToBeCreated = await userTypeHandler(userBody);
		const newUser = new Users({ ...userBody, userID: userID.toString() });
		const hashedPassword = await bcrypt.hash(userBody.password, 10);
		newUser.password = hashedPassword;
		const user = await Users.register(newUser, hashedPassword);
		if (user.isCandidate) {
			await Groups.findOneAndUpdate({ _id: req.body.group }, { $push: { candidates: user._id } });
			const admins = await Users.find({ isAdmin: true });
			const cpAccGrid2BeCreated = { acc: 'cp', candidate: user._id, admins: admins };
			const cpGrid = await ACCGrid.create(cpAccGrid2BeCreated);
			const clcAccGrid2BeCreated = { acc: 'clc', candidate: user._id, admins: admins };
			const clcGrid = await ACCGrid.create(clcAccGrid2BeCreated);
			const stcAccGrid2BeCreated = { acc: 'stc', candidate: user._id, admins: admins };
			const stcGrid = await ACCGrid.create(stcAccGrid2BeCreated);
			const populateGrid = async (grid, ngNum, drNum) => {
				for (let i = 0; i < ngNum; i++) {
					let ng = await NG.create({ number: (i + 1).toString(), grid: grid._id });
					for (let j = 0; j < drNum; j++) {
						let dr = await DR.create({ number: (j + 1).toString(), ng: ng._id });
						await NG.findOneAndUpdate({ _id: ng._id }, { $push: { dr: dr } });
					}
					await ACCGrid.findOneAndUpdate({ _id: grid._id }, { $push: { NG: ng } });
				}
			};
			populateGrid(cpGrid, 8, 4);
			populateGrid(clcGrid, 7, 4);
			populateGrid(stcGrid, 7, 4);
			return res.send({ msg: 'User registered' });
		} else {
			return res.send({ msg: 'User registered' });
		}
	} catch (error) {
		console.error(error);
		res.send({ msg: 'Something went wrong!' });
	}
});

router.get('/:acc/:candidateParam/usergrid', async (req, res) => {
	try {
		const { acc, candidateParam } = req.params;
		const candidate = await Users.findOne({ username: candidateParam });
		const grid = await ACCGrid.findOne({ acc: acc, candidate: candidate._id });
		const ng = await NG.find({ grid: grid._id });
		const dr = [];
		const texts = [];
		for (let i = 0; i < ng.length; i++) {
			for (let j = 0; j < ng[i].dr.length; j++) {
				let drEl = await DR.findById(ng[i].dr[j]);
				dr.push(drEl);
			}
		}
		for (let i = 0; i < dr.length; i++) {
			const drEl = dr[i];
			for (let j = 0; j < drEl.texts.length; j++) {
				let txtEl = await Text.findOne({ _id: drEl.texts[j] });
				texts.push(txtEl);
			}
		}
		res.send({ msg: 'grid', grid: grid, ng: ng, dr: dr, texts: texts });
	} catch (error) {
		console.log(error);
		res.send({ msg: 'something went wrong', grid: grid, ng: ng, dr: dr });
	}
});

router.post('/postdrtext/:drID', async (req, res) => {
	try {
		const { drID } = req.params;
		const { inputValue } = req.body;
		const first = inputValue.replace(/^(.{20}[^\s]*).*/, '$1');
		const last = inputValue.substring(inputValue.length - 40).trim().split(' ').slice(1).join(' ');
		const text = await Text.create({ dr: drID, text: { fullText: inputValue, first: first, last: last } });
		const dr = await DR.findOneAndUpdate({ _id: drID }, { $push: { texts: text._id } }, { new: true });
		res.send({ msg: 'Text added successfuly', dr: dr, text: text });
	} catch (error) {
		console.log(error);
		res.send({ msg: 'something went wrong' });
	}
});

router.post('/editgrade/:drID', async (req, res) => {
	try {
		console.log(req.body);
		const { drID } = req.params;
		const dr = await DR.findOneAndUpdate({ _id: drID }, { $set: { grade: req.body.newGrade } });
		res.send({ msg: 'Grade updated' });
	} catch (error) {
		console.log(error);
		res.send({ msg: 'something went wrong' });
	}
});

router.post('/postfile', upload.single('file'), async (req, res) => {
	console.log(req.body.data);
	try {
		if (req.file) {
			// console.log('req.body.data: ', req.body.dat, req.body.data[1]);
			console.log('req.data: ', req.data);
			const gridID = req.body.data;
			const userGrid = await ACCGrid.findOne({ _id: gridID });
			const src = fs.readFileSync(req.file.path);
			pdf(req.file.path)
				.then(async function(data){
					let dataArray = [];
					const { text } = data;
					let pdfArr = [];
					for (let i = 2; i < data.numpages; i++) {
						let str = text.substring(text.indexOf(`- ${i} -`), text.indexOf(`- ${i + 1} -`));
						pdfArr.push({ page: i, text: str.replace(/(\r\n|\n|\r)/gm, '') });
					}
					for (let i = 0; i < userGrid.NG.length; i++) {
						// let element = userGrid.NG[i];
						let ngEl = await NG.findOne({ _id: userGrid.NG[i] });
						for (let j = 0; j < ngEl.dr.length; j++) {
							let drEl = await DR.findOne({ _id: ngEl.dr[j] });
							// console.log(drEl);
							for (let k = 0; k < drEl.texts.length; k++) {
								let txtEl = await Text.findOne({ _id: drEl.texts[k] });
								console.log(txtEl);
								let { first, last } = txtEl.text;
								console.log(first, last);
								const pagI = pdfArr.find((el) => {
									return el.text.includes(first);
								});
								const pagF = pdfArr.find((el) => {
									return el.text.includes(last);
								});
								dataArray.push({ textID: txtEl._id, pagI: pagI.page, pagF: pagF.page });
								if (pagF && pagI) {
									await Text.findOneAndUpdate(
										{ _id: txtEl._id },
										{ pagI: pagI.page, pagF: pagF.page }
									);
								}
							}
						}
					}
					res.send({ msg: 'ufa', data: dataArray, pdfArr: pdfArr });
				})
				.catch((error) => {
					console.log(error);
					res.send({ error: error });
				});
		}
	} catch (error) {
		console.log(error);
		res.send({ msg: 'something went wrong' });
	}
});

// Admin routes

router.post('/addgroup', async (req, res) => {
	try {
		const { groupName } = req.body;
		const newGroup = await Groups.create({ name: groupName });
		console.log(newGroup);
		res.send({ msg: 'Group created', newGroup: newGroup });
	} catch (error) {
		console.log(error);
		res.send({ msg: 'Something went wrong', error: error });
	}
});

router.get('/allgroups/', async (req, res) => {
	const allGroups = await Groups.find({});
	if (req.user.isAdmin) {
		return res.send({ msg: 'All Groups', allGroups: allGroups });
	} else {
		const userGroup = allGroups.filter((el) => el.candidates.find(user._id));
		return res.send({ msg: 'All Groups', allGroups: userGroup });
	}
});

module.exports = router;
