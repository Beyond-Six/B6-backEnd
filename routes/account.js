const express = require('express');
const router = express.Router();
const db = require('../module/database/sql/account');

router.get('/getAccount', async (req, res) => {
    const UID = req.query.uid;
    try {
        db.getAccount(UID, function (err, data){
            res.json({message:"200", list:data});
        });
    } catch (e) {
        res.json(({message:"200", data:e}))
    }
});

module.exports = router;
