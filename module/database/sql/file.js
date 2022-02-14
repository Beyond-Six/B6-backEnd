const dbConn = require('../controller');

function createRoll(callback) {
    let q = "insert into ROLL_IMG value()";

    dbConn.ExcuteQuery(q, [], function (err, data){
        q = "select last_insert_id() as ROLL_ID";
        dbConn.ExcuteQuery(q, [], function (err, data){
            return callback(err, data);
        })
    });
}

function upRoll(ROLL_ID, DIR) {
    let q = "insert into ROLL_LIST values($0, $1)";
    q = dbConn.sqlBuilder(q, [ROLL_ID, DIR]);

    dbConn.ExcuteQuery(q, [], function (err,data){
        return;
    });
}

module.exports.createRoll = createRoll;
module.exports.upRoll = upRoll;
