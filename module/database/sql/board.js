const dbConn = require('../controller');

function getBoard(LOCATION_ID, PET_ID, TAG_ID, callback) {
    let temp = "";
    let i;
    if (TAG_ID!=undefined) {
        for (i=0;i<TAG_ID.length-1;i++) {
            temp += TAG_ID[i] + ","
        }
        temp += TAG_ID[i];
    }
    else temp = "1,2,3,4,5,6";

    let q = "select * from sanjose.BOARD_V where LOCATION_NAME in (select NAME from sanjose.LOCATION where LOCATION.LOCATION_ID like $0) and "
        + "PET_CATEGORY in (select NAME from sanjose.PET where PET_ID like $1) and "
        + "BID in (select BID from sanjose.TAG_BOARD where TAG_ID in (" + temp + "));";
    q = dbConn.sqlBuilder(q, [LOCATION_ID, PET_ID]);

    dbConn.ExcuteQuery(q, [], function (err, data){
        return callback(err,data);
    });
}

function upBoard(TITLE, CONTENT, ROLL_ID, UID, LIKES, COMMENT_ID, LOCATION_ID, PET_ID, callback) {
    let q = "insert into sanjose.BOARD(TITLE, CONTENT, ROLL_ID, UID, `WRITE`, LIKES, COMMENT_ID, LOCATION_ID, PET_ID) values($0, $1, $2, $3, now(), $4, $5, $6, $7)";
    q = dbConn.sqlBuilder(q, [TITLE, CONTENT, ROLL_ID, UID, LIKES, COMMENT_ID, LOCATION_ID, PET_ID])

    dbConn.ExcuteQuery(q, [], function (err, data){
        q = "select last_insert_id() as BID";
        dbConn.ExcuteQuery(q, [], function (err, data){
            return callback(err, data)
        });
    });
}

function upTag(BID, TAG_ID) {
    for (let i=0;i<TAG_ID.length;i++){
        let q = "insert into sanjose.TAG_BOARD values($0, $1)";
        q = dbConn.sqlBuilder(q, [BID, TAG_ID[i]]);
        dbConn.ExcuteQuery(q, [], function (err, data){
        });
    }
    return;
}

function getComment(BID, callback) {
    let q = "select * from sanjose.COMMENTS_V where BID=$0";
    q = dbConn.sqlBuilder(q, [BID]);
    dbConn.ExcuteQuery(q, [], function (err, data){
       return callback(err,data);
    });
}


module.exports.getComment = getComment;
module.exports.getBoard = getBoard;
module.exports.upBoard = upBoard;
module.exports.upTag = upTag;
