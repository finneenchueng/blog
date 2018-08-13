module.exports = {
    initial: false,
    dbName: 'blog',
    dbPort: 27017,
    serveraddr: 'localhost',
    getMongodbPath: function (_dbName) {
        var _self = this;
        if (typeof _dbName === 'undefined') {
            _dbName = _self.dbName;
        }
        return 'mongodb://' + _self.serveraddr + ':' + _self.dbPort + '/' + _dbName;
    }
};
