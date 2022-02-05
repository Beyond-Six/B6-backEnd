const dbConn = require('../controller');

function crAccount(id, pw, role_id) {
    let q = "insert into sanjose.ACCOUNT (id, pw, point, role_id) " +
        "values($0, $1, 0, $2)";
    q = dbConn.sqlBuilder(q, [id,pw, role_id]);

    dbConn.ExcuteQuery(q, [], function (err, data){
        return;
    })
}

function getAccount(callback) {
    let q = "select * from sanjose.ACCOUNT;";

    dbConn.ExcuteQuery(q, [], function (err, data){
        return callback(err, data);
    })
}

module.exports.crAccount = crAccount;
module.exports.getAccount = getAccount;
