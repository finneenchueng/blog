let isInitialized  = true;

export const dbPort = 27017;

export const dbName = 'blog';

export const dbServerAddr = 'localhost';

export function setInitialized(): void {
	isInitialized = false;
}

export function getInitialized(): boolean {
	return isInitialized;
}

export function getMongodbPath(transDbName?: string): string {
	const _DbName = transDbName || dbName;
	return `mongodb://${dbServerAddr}:${dbPort}/${_DbName}`;
}
