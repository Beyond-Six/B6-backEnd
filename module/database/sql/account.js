const dbConn = require('../controller');

function getAccount(UID, callback) {
    let q = "select * from ACCOUNT where UID=$0"

    q = dbConn.sqlBuilder(q, [UID]);

    dbConn.ExcuteQuery(q, [], function (err, data){
        return callback(err,data);
    });
}

function getPet(UID, callback) {
    let q = "select PET_NAME, AGE, HEALTH, WEIGHT, BREED, NAME from OWN_PET Inner JOIN PET on OWN_PET.PET_ID = PET.PET_ID where UID=$0";

    q = dbConn.sqlBuilder(q, [UID]);

    dbConn.ExcuteQuery(q, [], function (err, data){
        return callback(err,data);
    });
}

module.exports.getAccount = getAccount;
module.exports.getPet = getPet;
