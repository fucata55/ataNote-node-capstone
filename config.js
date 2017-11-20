exports.DATABASE_URL = process.env.DATABASE_URL || global.DATABASE_URL || 'mongodb://user1:user1@ds113736.mlab.com:13736/atanote-node-capstone-database';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://user1:user1@ds113736.mlab.com:13736/atanote-node-capstone-database';
exports.PORT = process.env.PORT || 8080;
