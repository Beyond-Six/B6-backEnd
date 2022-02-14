const dbConn = require('../controller');

function getMdList(callback) {
    let q = "select * from sanjose.MD";

    dbConn.ExcuteQuery(q, [], function (err, data){
        return callback(err, data);
    });
}

function getMdReview(md_id, uid, callback){
    let q = "select * from sanjose.MD_REVIEW where md_id like $0 and uid like $1";

    q = dbConn.sqlBuilder(q, [md_id, uid]);

    dbConn.ExcuteQuery(q, [], function (err,data){
        return callback(err, data);
    });
}

function getBrands(BRAND_ID, callback) {
    let q = "select * from sanjose.BRAND where BRAND_ID like $0 order by POINT desc\n"

    q = dbConn.sqlBuilder(q, [BRAND_ID]);

    dbConn.ExcuteQuery(q, [], function (err,data){
        return callback(err, data);
    });
}

module.exports.getMdList = getMdList;
module.exports.getMdReview = getMdReview;
module.exports.getBrands = getBrands;
