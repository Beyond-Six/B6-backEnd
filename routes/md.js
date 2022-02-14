const express = require('express');
const router = express.Router();

require('dotenv').config();

const db = require('../module/database/sql/md');

router.get('/', async (req, res) => {
    res.send("(GET) /getMdReview?md_id=&uid=<br>" +
        "(GET) /getMdList<br>" +
        "(GET) /getBrands?brand_id=<br>")
});

router.get('/getBrands', async (req, res) => {
    try {
        let BRAND_ID = req.query.brand_id;

        db.getBrands(BRAND_ID,function (err, data) {
            if (data[0]!=undefined) {
                res.json({message:"200", list:data});
            }
            else res.json( {message:"500", data:"err"});
        });
    } catch (e) {
        res.json( {message:"500", data:e})
    }
});

router.get('/getMdList', async (req, res) => {
    try {
        db.getMdList(function (err, data) {
            if (data[0]!=undefined) {
                res.json({message:"200", list:data});
            }
            else res.json( {message:"500", data:"err"});
        });
    } catch (e) {
        res.json( {message:"500", data:e})
    }
});

router.get('/getMdReview', async (req, res) => {
    try {
        let md_id = req.query.md_id;
        let uid = req.query.uid;

        db.getMdReview(md_id, uid, function (err, data) {
            if (data[0]!=undefined) {
                res.json({message:"200", list:data});
            }
            else res.json( {message:"500", data:"err"});
        });
    } catch (e) {
        res.json( {message:"500", data:e})
    }
});

module.exports = router;
