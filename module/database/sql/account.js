const dbConn = require('../controller');

function getAccount(UID, callback) {
    let q = "select * from ACCOUNT where UID=$0"

    q = dbConn.sqlBuilder(q, [UID]);

    dbConn.ExcuteQuery(q, [], function (err, data){
        return callback(err,data);
    });
}

module.exports.getAccount = getAccount;

