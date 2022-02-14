const express = require('express');
const router = express.Router();

require('dotenv').config();

const db = require('../module/database/sql/md');

function mdData(data){
    return {
        MD_ID:data.MD_ID,
        UID:data.UID,
        PET_ID:data.PET_ID,
        NAME:data.NAME,
        BRAND:data.BRAND,
        CONTENT_TEXT:data.CONTENT_TEXT,
        CONTENT_IMG:data.CONTENT_IMG,
        ROLL_ID:data.ROLL_ID,
        LC_ID:data.LC_ID,
        RATE:data.RATE
    }
}

router.get('/', async (req, res) => {
    res.send("(GET) /getMdReview?md_id=&uid=<br>" +
        "(GET) /getMdList<br>" +
        "(GET) /getBrands?brand_id=<br>")
});

router.get('/getBrands', async (req, res) => {
    try {
        let obj = [];
        let BRAND_ID = req.query.brand_id;

        db.getBrands(BRAND_ID,function (err, data) {
            if (data[0]!=undefined) {
                for(let i=0; i<data.length; i++){
                    obj.push({
                        BRAND_ID:data[i].BRAND_ID,
                        NAME:data[i].NAME,
                        POINT:data[i].POINT,
                        LOGO:data[i].LOGO
                    });
                }
                res.json({message:"200", list:obj});
            }
            else res.json( {message:"500", data:"err"});
        });
    } catch (e) {
        res.json( {message:"500", data:e})
    }
});

router.get('/getMdList', async (req, res) => {
    try {
        let obj = [];
        db.getMdList(function (err, data) {
            if (data[0]!=undefined) {
                for(let i=0; i<data.length; i++){
                    obj.push(mdData(data[i]));
                }
                res.json({message:"200", list:obj});
            }
            else res.json( {message:"500", data:"err"});
        });
    } catch (e) {
        res.json( {message:"500", data:e})
    }
});

router.get('/getMdReview', async (req, res) => {
    try {
        let obj = [];
        let md_id = req.query.md_id;
        let uid = req.query.uid;

        db.getMdReview(md_id, uid, function (err, data) {
            if (data[0]!=undefined) {
                for(let i=0; i<data.length; i++){
                    obj.push({MDRV_ID:data[i].MDRV_ID,
                        UID:data[i].UID,
                        MD_ID:data[i].MD_ID,
                        TITLE:data[i].TITLE,
                        CONTENT_TEXT:data[i].CONTENT_TEXT,
                        WRITE:data[i].WRITE
                    });
                }
                res.json({message:"200", list:obj});
            }
            else res.json( {message:"500", data:"err"});
        });
    } catch (e) {
        res.json( {message:"500", data:e})
    }
});

module.exports = router;
