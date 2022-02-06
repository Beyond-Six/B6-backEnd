const express = require('express');
const router = express.Router();

require('dotenv').config();

const db = require('../module/database/sql/test');

router.get('/', async (req, res) => {
    res.send("/crAccount<br>/getAccount")
});

router.get('/crAccount', async (req, res)=> {
    try {
        const id = req.query.id;
        const pw = req.query.pw;
        const role_id = 1;

        db.crAccount(id,pw, role_id);
        res.json({message:"200"});

    } catch (e) {
        res.json({message:"500", data:e});
    }
});

router.get('/getAccount', async (req, res) => {
    try {
        let obj = [];
        db.getAccount(function (err, data) {
           if (data[0]!=undefined) {
               for(let i=0; i<data.length; i++){
                   obj.push({uid:data[i].UID,
                       id:data[i].ID,
                       pw:data[i].PW,
                       point:data[i].POINT,
                       role_id:data[i].ROLE_ID
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
