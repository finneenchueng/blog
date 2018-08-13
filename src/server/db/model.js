var tmp_db = require('./dbhelper');
// operateKey==updateOne|find|deleteOne|insert|remove|findOne|insertMany|save
module.exports = function (collectorName, fn) {
    tmp_db(function (db, assert) {
        // console.log(db)
        var collection = db.collection(collectorName);
        fn(db, collection, assert);
    });
};
