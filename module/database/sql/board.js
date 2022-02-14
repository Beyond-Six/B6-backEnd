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

function upBoard(TITLE, CONTENT, ROLL_ID, UID, LIKES, COMMENT_ID, LOCATION_ID, PET_ID) {
    let q = "insert into sanjose.BOARD(TITLE, CONTENT, ROLL_ID, UID, `WRITE`, LIKES, COMMENT_ID, LOCATION_ID, PET_ID) values($0, $1, $2, $3, now(), $4, $5, $6, $7)";
    q = dbConn.sqlBuilder(q, [TITLE, CONTENT, ROLL_ID, UID, LIKES, COMMENT_ID, LOCATION_ID, PET_ID])

    dbConn.ExcuteQuery(q, [], function (err, data){
        return;
    });
}

module.exports.getBoard = getBoard;
module.exports.upBoard = upBoard;
