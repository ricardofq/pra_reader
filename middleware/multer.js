const multer = require('multer');
const path = require('path');
const DataUriParser = require('datauri/parser');
const parser = new DataUriParser();

const storage = multer.memoryStorage();

const multerUpload = multer({ storage }).single('myImage');

const dataUri = (req) => parser.format(path.extname(req.file.originalname).toString(), req.file.buffer);

module.exports = { multerUpload, dataUri, parser };
