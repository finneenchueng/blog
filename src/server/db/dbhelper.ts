
import mongodb from 'mongodb';
import * as assert from 'assert';
import { getMongodbPath } from './config';

const MongoClient = mongodb.MongoClient;

function getConnection(callback) {
	MongoClient.connect(getMongodbPath(), {
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

export function operateDb(collectorName, fn) {
	getConnection((db, assert) => {
		const Collection = db.collection(collectorName);
		fn(db, Collection, assert);
	});
}