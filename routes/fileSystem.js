const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs')
const upload = multer({ dest: 'uploadedFiles/' });
const { verifyToken } = require('../module/token/check');
const token = require('../module/token/token');

function GetFilePath(dir, target) {
    let stream;
    let path = require('path');
    const filePath = path.join(__dirname,'..', dir, target);
    const fileExist = fs.existsSync(filePath)
    if (fileExist){
        stream = fs.createReadStream(filePath);
    }
    return stream;
}

router.get('/imgDownload', function(req,res){
    try {
        const dir = req.query.dir
        const stream = GetFilePath('uploadedFiles', dir);
        if (stream){
            res.writeHead(200, {
                'Content-Type': 'application/octet-stream',
                'Content-Disposition': 'attachment; filename=img.jpg'
            });
            stream.pipe(res);
        }
        else res.render('fail');
    }catch (e) { res.render('error')}
});

router.get('/', function(req, res, next) {
    res.render('upload', { title: 'Express' });
});

router.post('/fileUpload', upload.single('file'), function(req,res){
    const file_name = req.file.filename;
    res.send("success");
});

module.exports = router;
