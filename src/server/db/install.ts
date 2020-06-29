import { Collection, Db, MongoClient } from 'mongodb';
import * as assert from 'assert';
import { databaseFound, getConnectionWithClient } from './dbhelper';
import sqlJson from './sqlJson';

function insertData(db, item): Promise<{[key: string]: string | number}>{
	return new Promise(async (resolve, reject) => {
		const currentCol = item;
		const colName = currentCol.collectionName;
		const colDb = currentCol.dbSort;
		// create new collection
		await db.createCollection(colName, {
			autoIndexId: true
		});
		const conllection: Collection = db.collection(colName);
		// insert new multi records
		conllection.insertMany(colDb, (err, r) => {
			assert.equal(null, err);
			assert.equal(colDb.length, r.insertedCount);
			resolve({code: 0, result: `${colName}, insert complete！`});
		});
	});
}

export function initialDb(): Promise<{[key: string]: string | number}> {
	return new Promise(async (resolve, reject)=>{
		let _client: MongoClient, _db: Db;
		const { client, db, dbName } = await getConnectionWithClient();
		const dbIsExist = await databaseFound(dbName, db);
		if(dbIsExist){
			client.close();
			console.log('has initialized')
			resolve({code: 1});
			return;
		}
		client.close();
		const result = await getConnectionWithClient(dbName);
		_client = result.client;
		_db = result.db;
		if(!db){
			resolve({code: 0});
		}
		sqlJson.forEach( async (item, i, arr) => {
			const resultData = await insertData(_db, item);
			console.log(resultData.result);
			if (i === arr.length - 1) {
				_client.close();
				console.log('all db has initialized');
				resolve({code: 1});
			}
			
		});
	})
}
