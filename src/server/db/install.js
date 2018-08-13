var mongodb = require('mongodb');
var dbConfig = require('./config');
var path = require('path');
var doFile = require('../logicCheck/operateFile');
var init_sql_arr = require('./collectionSql');
var MongoClient = mongodb.MongoClient;

function inputInitalData (newDb, db) {
    init_sql_arr.forEach(function (item, i) {
        var current_col = item;
        var col_name = current_col.collectionName;
        var col_db = current_col.dbSort;
        newDb.createCollection(col_name, {
            autoIndexId: true
        });
        var _len = col_db.length;
        for (var j = 0; j < _len; j++) {
            var cur_items = col_db[j];
            // 插入一个新的文档。
            newDb.collection(col_name).insert(col_db, function (err, result) {
                if (i == init_sql_arr.length - 1) {
                    newDb.close();
                    db.close();
                }
                if (j == _len - 1) {
                    console.log(col_name + ',插入完毕！');
                }
                console.log('throw err:', err);
            });
        }
        // 插入一个新的文档。
        // newDb.collection(col_name).insertMany(col_db, function(err, result) {
        // 	if (i == init_sql_arr.length - 1) {
        // 		newDb.close();
        // 		db.close();
        // 	}
        // 	console.log(col_name + ',插入完毕！');
        // });
    });
}

module.exports = function () {
    if (dbConfig.initial) {
        doFile.modConfig(path.join(__dirname, './config.js'));
    } else {
        return;
    }
    // 连接到admin数据库
    MongoClient.connect(dbConfig.getMongodbPath('admin'), function (err, db) {
        if (err) {
            console.log(err);
            return;
        } else {
            // 新建一个数据库实例
            // 但在插入一个实际、有效的文档前，该数据库并未存在于磁盘上，也就是还没有创建。
            var newSrv = new mongodb.Server(dbConfig.serveraddr, dbConfig.dbPort, {
                auto_reconnect: true
            });
            var newDb = new mongodb.Db(dbConfig.dbName, newSrv, {
                safe: true
            });
            newDb.open(function (err, newdb) {
                if (err) {
                    console.log(err);
                    return;
                } else {
                    inputInitalData(newDb, db);
                    // var collName = newDb.collection("testCollection");
                    // var doc = {
                    // 	time: Date()
                    // };
                    // 插入一个新的文档。
                    // collName.insert(doc, function(err, result) {
                    // 	newdb.close();
                    // 	db.close();
                    // });
                    /*
                    // 切换到admin数据库，并验证超级管理员"sa"（如果还没有超级管理员，就自己添加一个）
                    // 因为往数据库添加一个User必须有管理员权限。
                    var adminDb = newDb.admin();
                    adminDb.authenticate(dbConfig.pcAdmin, dbConfig.pcPwd, function(err, ret) {
                        if (err) {
                            console.log(2)
                            console.log(err);
                            return;
                        }
                        // 为新增的数据库添加用户名和密码
                        newDb.addUser("venchia", "forvenchia", function(err, result) {
                            if (err) {
                                console.log(3)
                                console.log(err);
                                return;
                            } else {
                                // 验证刚才新增的数据库用户名和密码。
                                newDb.authenticate("venchia", "forvenchia", function(err, result) {
                                    if (err) {
                                        console.log(4)
                                        console.log(err);
                                        return;
                                    } else {
                                        var collName = newDb.collection("CRC");
                                        var doc = {
                                            time: Date()
                                        };
                                        // 插入一个新的文档。
                                        collName.insert(doc, function(err, result) {
                                            newdb.close();
                                            db.close();
                                        })
                                    }
                                });
                            }
                        });

                    });

                    */
                }
            });
        }
    });
};
