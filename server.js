const express = require('express');
const multer = require('multer');
const sdk = require('api')('@verbwire/v1.0#cfbl71zelo76w7am');
const fs = require('fs');
const path = require('path');

const app = express();

const cors = require('cors');
app.use(cors());

sdk.auth('sk_live_4bcddacd-e17c-40a9-9399-75c9af11bae5');


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'images');
    },
    filename: function(req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const fileExtension = path.extname(file.originalname);
        const fileName = 'image-' + uniqueSuffix + fileExtension;
        cb(null, fileName);
    },
});


const fileFilter = (req, file, cb) => {
    const allowedFileTypes = /jpeg|jpg|png|gif/;
    const mimeType = allowedFileTypes.test(file.mimetype);
    const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());

    if (mimeType && extname) {
        return cb(null, true);
    }

    cb(new Error('Only image files are allowed!'));
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

app.use(express.static('public'));

app.post('/upload', upload.single('image'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    const filePath = path.join(__dirname, 'images', req.file.filename);

    try {
        const response = await sdk.postNftStoreFile({
            filePath: filePath
        })
        console.log(response.data);
        fs.unlinkSync(filePath);
        res.json({
            success: true,
            data: response.data
        });
        
    } catch (error) {
        console.error('Error uploading file to IPFS:', error);
        res.status(500).send('Error uploading file to IPFS.');
    }
});

app.get('/', (req, res) => {
  res.send('Server is UP and Running!')
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
