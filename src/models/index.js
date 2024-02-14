// const dbConfig = require('../config/dbConfig');

// const {Sequelize, DataTypes} = require('sequelize');

// const sequelize = new Sequelize(
//     dbConfig.DB,
//     dbConfig.USER,
//     dbConfig.PASSWORD,{
//         host: dbConfig.HOST,
//         dialect: dbConfig.dialect,
//         operatorsAliases: false,
//         // port: dbConfig.DB_PORT,
//         pool:{
//             max: dbConfig.pool.max,
//             min: dbConfig.pool.min,
//             acquire: dbConfig.pool.acquire,
//             idle: dbConfig.pool.idle,
//         }
//     }
// )



// sequelize.authenticate()
// .then(()=>{
//     console.log('Connected to database');
// })
// .catch(err=>{
//     console.log('Error', err);
// })

// const db= {};

// db.Sequelize = Sequelize;
// db.sequelize = sequelize;

// db.books = require('./bookModel')(sequelize, DataTypes);

// db.sequelize.sync({ force: false })
// .then(()=>{
//     console.log('re-sync done');
// });

// module.exports = db;


// // 'use strict';

// // const fs = require('fs');
// // const path = require('path');
// // const Sequelize = require('sequelize');
// // const process = require('process');
// // const basename = path.basename(__filename);
// // const env = process.env.NODE_ENV || 'development';
// // const config = require(__dirname + '/../config/config.json')[env];
// // const db = {};

// // let sequelize;
// // if (config.use_env_variable) {
// //   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// // } else {
// //   sequelize = new Sequelize(config.database, config.username, config.password, config);
// // }

// // fs
// //   .readdirSync(__dirname)
// //   .filter(file => {
// //     return (
// //       file.indexOf('.') !== 0 &&
// //       file !== basename &&
// //       file.slice(-3) === '.js' &&
// //       file.indexOf('.test.js') === -1
// //     );
// //   })
// //   .forEach(file => {
// //     const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
// //     db[model.name] = model;
// //   });

// // Object.keys(db).forEach(modelName => {
// //   if (db[modelName].associate) {
// //     db[modelName].associate(db);
// //   }
// // });

// // db.sequelize = sequelize;
// // db.Sequelize = Sequelize;

// // module.exports = db;

// const dbConfig = require('../config/dbConfig');
'use strict';


const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize; 
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
      const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    console.log(__dirname);
      db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
