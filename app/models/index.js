const dbConfig = require("../config/db.config.js");
const {Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.univers = require("./univers.model.js")(sequelize, Sequelize);
db.sousCategorie = require('./sousCategorie.model.js')(sequelize, Sequelize)
db.produit = require('./produit.model.js')(sequelize, Sequelize)

db.sequelize.sync({ force: false })
.then(() => {
    console.log('yes re-sync done!')
})


// 1 to Many Relation univers->sousCategorie

db.univers.hasMany(db.sousCategorie, {
    foreignKey: 'univers_id',
    as: 'sousCategorie'
})

db.sousCategorie.belongsTo(db.univers, {
    foreignKey: 'univers_id',
    as: 'univers'
})


// 1 to Many Relation sousCategorie->produit

db.sousCategorie.hasMany(db.produit, {
  foreignKey: 'sousCategorie_id',
  as: 'produit'
})

db.produit.belongsTo(db.sousCategorie, {
  foreignKey: 'sousCategorie_id',
  as: 'sousCategorie'
})


module.exports = db;
