
import { Admin, Collection, Db, MongoClient } from 'mongodb';
import * as assert from 'assert';
import { defaultDbName, mongodbPath } from './config';

type IDbWithMongoClient = {
	db: Db;
	client: MongoClient;
	dbName?: string;
}

type IDataBasesItem = {
	name: string;
	sizeOnDisk: number;
	empty: boolean;
}
interface IDataBases {
	databases: IDataBasesItem[];
	totalSize: number;
	ok?: number;

}

interface IResult {
	code: -1 | 0 | 1;
	result?: any;
}


let client: MongoClient;

// Create a new MongoClient
function createClient(){
	return new MongoClient(mongodbPath, {
		keepAlive: true,
		useUnifiedTopology: true,
		connectTimeoutMS: 60000,
		poolSize: 10
	});
}
export function resetClient(){
	client = null;
}
function getConnection(transDbName?: string): Promise<Db> {
	const _dbname = transDbName || defaultDbName;
	if(!client){
		client = createClient();
	}
	return new Promise((resolve, reject) => {
		client.connect((err) => {
			assert.equal(null, err);
			if(err){
				console.log("Connected failed to server");
				resolve(null);
			}
			const db = transDbName ? client.db(_dbname) : client.db();
			resolve(db);
		});
	});
	
}

export async function getConnectionWithClient(transDbName?: string): Promise<IDbWithMongoClient> {
	const db: Db = await getConnection(transDbName);
	return {
		db, 
		client,
		dbName: defaultDbName
	}
	
}

export async function databaseFound(databaseName: string, db?: Db): Promise<boolean> {
	const mongoDb = db || client.db();
	const _admin: Admin = mongoDb.admin();
	const _datas: IDataBases = await _admin.listDatabases();
	return _datas.databases.filter((item)=>{
		if(item.name === databaseName){
			return true;
		}
		return false;
	}).length > 0;
}

export async function dbAction({transDbName, tblName}: {[key: string]: string}, fn): Promise<IResult> {
	const _dbname = transDbName || defaultDbName;
	const db: Db = client.db(_dbname) || await getConnection(_dbname);
	if(!db){
		return {
			code: 1
		};
	}
	const collection: Collection = db.collection(tblName);
	let result: IResult;
	try {
		const colResult = await fn(collection);
		result = {
			code: 1,
			result: colResult,
		};
	} catch (e){
		result = {
			code: -1
		};
	}
	client.close();
	return result;
}