const express = require('express');
const router = express.Router();
const db = require('../module/database/sql/board');

router.get('/getList', async (req, res) => {
    try {
        const TAG_ID = req.query.tag_id;
        const PET_ID = req.query.pet_id;
        const LOCATION_ID = req.query.location_id;

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
        const TITLE = req.query.title;
        const CONTENT = req.query.content;
        const ROLL_ID = req.query.roll_id;
        const UID = req.query.uid;
        const LIKES = req.query.likes;
        const COMMENT_ID = req.query.comment_id;
        const LOCATION_ID = req.query.location_id;
        const PET_ID = req.query.pet_id;


        db.upBoard(TITLE, CONTENT, ROLL_ID, UID, LIKES, COMMENT_ID, LOCATION_ID, PET_ID, function (err, data){
            res.json( {message:"200", list:data})
        });
    } catch (e) {
        res.json( {message:"500", data:e})
    }
});

router.get('/upTag', async (req, res) => {
    const TAG_ID = req.query.tag_id;
    const BID = req.query.bid;
    try {
        db.upTag(BID, TAG_ID);
        res.json({message:"200"});
    }
    catch (e) {
        res.json( {message:"500", data:e});
    }
});

router.get('/getComment', async (req, res) => {
    const BID = req.query.bid;
    try {
        db.getComment(BID, function (err, data){
           res.json({message:"200", list:data});
        });
    } catch (e) {
        res.json(({message:"200", data:e}))
    }
});

module.exports = router;
