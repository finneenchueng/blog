
import { Admin, Collection, Db, MongoClient, FilterQuery, Cursor } from 'mongodb';
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
	result?: unknown;
	error?: unknown;
}

interface IOperator {
	client?: MongoClient;
	collection?: Collection;
}
interface IActionParameter {
	transDbName?: string;
	tblName: string;
}
interface ICRUDParameter {
	transDbName?: string;
	tblName: string;
	operatedType: string;
}
interface IConditions {
	query?: unknown;
	options?: unknown;
}
interface ICollections {
	code: -1 | 0 | 1;
	result?: unknown;
	error?: unknown;
	callback?: ()=>void;
	client?: MongoClient;
	collection?: Collection;
}
let client: MongoClient;
function getConnection(transDbName?: string): Promise<Db> {
	const _dbname = transDbName || defaultDbName;
	// Create a new MongoClient
	client = new MongoClient(mongodbPath, {
		keepAlive: true,
		useUnifiedTopology: true,
		connectTimeoutMS: 60000,
		poolSize: 10
	});
	return new Promise((resolve, reject) => {
		client.connect((err) => {
			assert.equal(null, err);
			if(err){
				console.log("Connected failed to server");
				reject(err);
			}
			const db = transDbName ? client.db(_dbname) : client.db();
			resolve(db);
		});
	});
	
}

export async function getConnectionWithClient(transDbName?: string): Promise<IDbWithMongoClient> {
	const db: Db = await getConnection(transDbName || defaultDbName);
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

export async function dbAction({transDbName, tblName}: IActionParameter, fn): Promise<IResult> {
	let result: IResult;
	try {
		const _dbname = transDbName || defaultDbName;
		const db: Db = await getConnection(_dbname);
		const collection: Collection = db.collection(tblName);
		const colResult = await fn(collection);
		result = {
			code: 1,
			result: colResult,
		};
	} catch (e){
		result = {
			code: -1,
			error: e,
		};
	} finally {
		client.close();
	}
	
	return result;
}

export async function dbCRUD({transDbName, tblName, operatedType}: ICRUDParameter, conditions?: IConditions): Promise<Cursor> {
	const { query, options } = conditions;
	try {
		const _dbname = transDbName || defaultDbName;
		const db: Db = await getConnection(_dbname);
		const collection: Collection = db.collection(tblName);
		return new Promise((resolve, reject)=>{
			collection[operatedType](query || {}, options || {}).toArray((err, result)=>{
				client.close();
				if(err){
					reject(err);
					return;
				}
				resolve(result);
			});
		});
	} catch (e){
		return new Promise((reject)=>{
			reject({
				code: -1,
				error: e
			} as any);
		});
	}
}
