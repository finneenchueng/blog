import mongodb from 'mongodb';
import { dbName, dbPort, dbServerAddr, getInitialized, getMongodbPath, setInitialized } from './config';
import { join } from 'path';
import sqlJson from './sqlJson';
const MongoClient = mongodb.MongoClient;

export function initialDb(): Promise<{[key: string]: string| number}> {
	return new Promise((resolve, reject)=>{
		if (getInitialized()) {
			setInitialized();
		} else {
			resolve({code: 1, result: 'has initialized'});
		}
		// 连接到admin数据库
		MongoClient.connect(getMongodbPath("admin"), (err, db) => {
			if (err) {
				// console.log(err);
				resolve({code: 2, result: 'error accured while connecting mongodb'});
			} else {
				// 新建一个数据库实例
				// 但在插入一个实际、有效的文档前，该数据库并未存在于磁盘上，也就是还没有创建。  
				const newSrv = new mongodb.Server(dbServerAddr, dbPort, {
					auto_reconnect: true
				});
				const newDb = new mongodb.Db(dbName, newSrv, {
					safe: true
				});
				newDb.open((err, newdbs) => {
					if (err) {
						console.log(err);
						resolve({code: 3, result: 'error accured while opening mongodb'});
					} else {
						// inputInitalData(newdbs, db);
						sqlJson.forEach((item, i, arr) => {
							const currentCol = item;
							const colName = currentCol.collectionName;
							const colDb = currentCol.dbSort;
							newdbs.createCollection(colName, {
								autoIndexId: true
							});
							const _len = colDb.length;
							for (let j = 0; j < _len; j++) {
								let cur_items = colDb[j];
								// 插入一个新的文档。
								newdbs.collection(colName).insert(colDb, (err, result) => {
									if (i === arr.length - 1) {
										newdbs.close();
										db.close();
									}
									if(j === _len-1){
										resolve({code: 0,result: `${colName}, insert complete！`});
									}
									
								});
							}
							
						});
						
					}
				});
			}
		});
	});
}
