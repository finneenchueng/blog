/*var MongoClient = require('mongodb').MongoClient,  
    Server      = require('mongodb').server;

// 创建客户端连接对象
var client = new MongoClient( new Server('localhost', 27017, {
                                            socketOpations: { connectTimeoutMS: 500 },
                                            poolSize: 5,
                                            auto_reconnect: true
                                        }, {
                                            numberOfRetries: 3,
                                            retryMilliSeconds: 500
                                        }));

// 打开对服务器端MongoDB数据库的连接
client.open(function(err, client) {
    if ( err ) {
        console.log('连接失败！');
    } else {
        var db = client.db('blogdb');  // 建立到数据库blogdb的连接
        if ( db ) {
            console.log('连接成功');
            db.authenticate('username', 'pwd', function(err, result) {   // 对用户数据库身份进行验证
                if ( err ) {
                    console.log('数据库用户身份验证失败');
                    client.close();  // 关闭对MongoDB的连接
                    console.log('连接已关闭......');
                } else {
                    console.log('用户身份验证通过');
                    db.logout(function (err, result) {  // 关闭对数据库的连接，即退出数据库
                        if ( !err ) {
                            console.log('退出数据库出错');
                        }

                        client.close();  // 关闭对MongoDB的连接
                        console.log( '已关闭连接......' );
                    });
                }
            });
        }
    }
});*/

/*
选项					描述
replicaSet=name			验证replica set的名称。 Impliesconnect=replicaSet.
slaveOk=true|false		true:在connect=direct模式下，驱动会连接第一台机器，即使这台服务器不是主。在connect=replicaSet模式下，驱动会发送所有的写请求到主并且把读取操作分布在其他从服务器。
						false: 在 connect=direct模式下，驱动会自动找寻主服务器. 在connect=replicaSet 模式下，驱动仅仅连接主服务器，并且所有的读写命令都连接到主服务器。
safe=true|false			true: 在执行更新操作之后，驱动都会发送getLastError命令来确保更新成功。(还要参考 wtimeoutMS).
						false: 在每次更新之后，驱动不会发送getLastError来确保更新成功。
w=n						驱动添加 { w : n } 到getLastError命令. 应用于safe=true。
wtimeoutMS=ms			驱动添加 { wtimeout : ms } 到 getlasterror 命令. 应用于 safe=true.
fsync=true|false		true: 驱动添加 { fsync : true } 到 getlasterror 命令.应用于 safe=true.
						false: 驱动不会添加到getLastError命令中。
journal=true|false		如果设置为 true, 同步到 journal (在提交到数据库前写入到实体中). 应用于 safe=true
connectTimeoutMS=ms		可以打开连接的时间。
socketTimeoutMS=ms		发送和接受sockets的时间。
*/
/*
选 项			说 明
mongodb://		指定字符串使用mongodb的连接格式
username		验证时使用的用户名。可选
password		身份验证时使用的密码。可选
host			MongoDB服务器主机名或者域名。它可以是多个host:port组合来连接多个MongoDB服务器。 例如：mongodb://host1:270017, host2://270017, host3:270017/testDB
port			连接MongoDB服务器时使用的端口。默认值是27017
database		要连接的数据库的名字。 默认为admin
options			连接时所使用的选项的键值对。可以在dbOpt和serverOpt参数上指定这些选项
*/
//mongodb://username:password@host:port/database?opations
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var dbConfig = require("./config");
// console.log(require('mongodb'))
module.exports = function(callback) {
	MongoClient.connect(dbConfig.getMongodbPath(), {
		// db: {
		// 	w: 1,
		// 	native_parser: false
		// },
		// server: {
		// 	poolSize: 5,
		// 	socketOptions: {
		// 		connectTimeoutMS: 500
		// 	},
		// 	poolSize: 5,
		// 	auto_reconnect: true
		// },
		// replSet: {},
		// mongos: {}
		native_parser: true,
		// useMongoClient: true,
		keepAlive: 200000,
		connectTimeoutMS: 6000,
		// auto_reconnect: true,
		poolSize: 10

	}, function(err, db) {
		if (err) {
			console.log('连接失败！');
		} else {
			// console.log('连接成功！');
			callback(db, assert);
			// db.collection("doc_demo").insert({
			// 	"name": "mack"
			// }, function(err, result) {
			// 	assert.equal(null, err);
			// 	console.log(result);
			// 	db.close();
			// });
			/*
			// 注销数据库
			db.logout(function(err, result) {
				if (err) {
					console.log('注销失败...');
				}

				db.close(); // 关闭连接
				console.log('连接已经关闭！');
			});
			*/
		}

	});
}