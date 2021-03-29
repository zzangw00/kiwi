const Sequelize = require('sequelize');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config(); //LOAD CONFIG

const sequelize = new Sequelize(
    process.env.DATABASE,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        timezone: '+09:00', //한국 시간 셋팅
        operatorsAliases: Sequelize.Op,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
        pool: {
            max: 5,
            min: 0,
            idle: 10000,
        },
        logging: false, //콘솔
    },
);

let db = [];

fs.readdirSync(__dirname)
    .filter((file) => {
        return file.indexOf('.js') && file !== 'index.js';
    })
    .forEach((file) => {
        const model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach((modelName) => {
    if ('associate' in db[modelName]) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
