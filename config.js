'use strict';
exports.DATABASE_URL = process.env.DATABASE_URL ||
    global.DATABASE_URL ||
    'mongodb://admin:admin123@ds247619.mlab.com:47619/birds-nest';
exports.TEST_DATABASE_URL = 
    process.env.TEST_DATABASE_URL ||
    'mongodb://localhost/test-birds-nest-db';
exports.PORT = process.env.PORT || 8080;