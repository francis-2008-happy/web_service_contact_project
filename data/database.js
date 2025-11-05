const dotenv = require('dotenv');
dotenv.config();
const MongoClient = require('mongodb').MongoClient;

let _db;

const initDb = (callback) => {
  if (_db) {
    console.log('Db is already initialized!');
    return callback(null, _db);
  }
  MongoClient.connect(process.env.MONGODB_URI)
    .then((client) => {
      _db = client;
      callback(null, _db);
    })
    .catch((err) => {
      callback(err);
    });
};

const getDb = () => {
  if (!_db) {
    throw Error('Db not initialized');
  }
  return _db;
};

module.exports = {
  initDb,
  getDb,
};



// const dotenv = require('dotenv');
// dotenv.config();

// const MongoClient = require('mongodb').MongoClient;

// let database;

// const initDb = (callback) => {
//     if (database) {
//     console.log('Database is already initialized!');
//     return callback(null, database);
//   }
//   MongoClient.connect(process.env.MONGODB_URI)
//     .then((client) => {
//       database = client;
//       callback(null, database);
//       console.log('Database initialized successfully');
//     })
//     .catch((err) => {
//       callback(err);
//     });
// };

// const getDatabase = () => {
//     if (!database) {
//     throw new Error('Database not initialized');
//   }
//   return database;
// };

// module.exports = { initDb, getDatabase }