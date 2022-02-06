const dbConn = require('../controller');

function getMdList(callback) {
    let q = "select * from sanjose.MD";

    dbConn.ExcuteQuery(q, [], function (err, data){
        return callback(err, data);
    })
}

module.exports.getMdList = getMdList;
