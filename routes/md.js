const express = require('express');
const router = express.Router();

require('dotenv').config();

const db = require('../module/database/sql/md');

router.get('/getMdList', async (req, res) => {
    try {
        let obj = [];
        db.getMdList(function (err, data) {
            if (data[0]!=undefined) {
                for(let i=0; i<data.length; i++){
                    obj.push({MD_ID:data[i].MD_ID,
                        UID:data[i].UID,
                        PET_ID:data[i].PET_ID,
                        NAME:data[i].NAME,
                        CONTENT_TEXT:data[i].CONTENT_TEXT,
                        CONTENT_IMG:data[i].CONTENT_IMG,
                        ROLL_ID:data[i].ROLL_ID,
                        LC_ID:data[i].LC_ID,
                        RATE:data[i].RATE
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
