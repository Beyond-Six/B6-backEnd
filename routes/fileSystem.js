const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs')
const upload = multer({ dest: 'uploadedFiles/' });
const db = require('../module/database/sql/file');

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

router.get('/createRoll', function (req,res){
    try {
        db.createRoll(function (err, data) {
            if (data[0]!=undefined) {
                res.json({message:"200", ROLL_ID:data[0].ROLL_ID});
            }
            else res.json( {message:"500", data:"err"});
        });
    } catch (e) {
        res.json( {message:"500", data:e})
    }
});

router.get('/getRoll', function (req, res) {
    try {
        const ROLL_ID = req.query.ROLL_ID;
        let obj = [];
        db.getRoll(ROLL_ID, function (err,data){
           if (data[0]!=undefined) {
               for(let i=0; i<data.length; i++){
                   obj.push({
                       DIR:data[i].DIR,
                   });
               }
               res.json({message:"200", list:obj});
           }
           else res.json( {message:"500", data:"err"});
        });
    } catch (e){
        res.json( {message:"500", data:e})
    }
});

router.get('/upRoll', function (req, res) {
    try {
        const ROLL_ID = req.query.ROLL_ID;
        const DIR = req.query.DIR;

        db.upRoll(ROLL_ID, DIR);
        res.json({message:"200"});
    } catch (e) {
        res.json( {message:"500", data:e})
    }
});

router.get('/', function(req, res, next) {
    res.render('upload', { title: 'Express' });
});

router.post('/fileUpload', upload.single('file'), function(req,res){
    const file_name = req.file.filename;
    res.send(file_name);
});

module.exports = router;
