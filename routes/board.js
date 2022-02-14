const express = require('express');
const router = express.Router();
const db = require('../module/database/sql/board');

router.get('/getList', async (req, res) => {
    try {
        const TAG_ID = req.query.TAG_ID;
        const PET_ID = req.query.PET_ID;
        const LOCATION_ID = req.query.LOCATION_ID;

        let obj = [];
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

module.exports = router;
