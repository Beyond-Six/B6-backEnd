const express = require('express');
const router = express.Router();
const db = require('../module/database/sql/board');

router.get('/getList', async (req, res) => {
    try {
        const TAG_ID = req.query.TAG_ID;
        const PET_ID = req.query.PET_ID;
        const LOCATION_ID = req.query.LOCATION_ID;

        db.getBoard(LOCATION_ID, PET_ID, TAG_ID, function (err, data) {
            if (data[0]!=undefined) {
                res.json({message:"200", list:data});
            }
            else res.json( {message:"500", data:"err"});
        });
    } catch (e) {
        res.json( {message:"500", data:e})
    }
});

router.get('/upBoard', async (req, res) => {
    try {
        const TITLE = req.query.TITLE;
        const CONTENT = req.query.CONTENT;
        const ROLL_ID = req.query.ROLL_ID;
        const UID = req.query.UID;
        const LIKES = req.query.LIKES;
        const COMMENT_ID = req.query.COMMENT_ID;
        const LOCATION_ID = req.query.LOCATION_ID;
        const PET_ID = req.query.PET_ID;
        db.upBoard(TITLE, CONTENT, ROLL_ID, UID, LIKES, COMMENT_ID, LOCATION_ID, PET_ID)
        res.json({message:"200"});
    } catch (e) {
        res.json( {message:"500", data:e})
    }
});

module.exports = router;
