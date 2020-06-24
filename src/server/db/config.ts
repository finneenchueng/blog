let isInitialized  = false;

export const dbPort = 27017;

export const dbName = 'blog';

export const dbServerAddr = 'localhost';

export function setInitialized(){
	isInitialized = true;
}

export function getInitialized(){
	return isInitialized;
}

export function getMongodbPath(transDbName){
	const _DbName = transDbName || dbName;
	return `mongodb://${dbServerAddr}:${dbPort}/${_DbName}`;
}
