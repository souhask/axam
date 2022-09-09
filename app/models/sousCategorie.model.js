module.exports = (sequelize, Sequelize) => {

    const SousCategorie = sequelize.define("sousCategorie", {
        nomSousCat: {
            type: Sequelize.STRING,
            allowNull: false
          },
          description: {
            type: Sequelize.TEXT
          },
          image: {
            type: Sequelize.STRING
          },
          parent: {
            type: Sequelize.STRING
          },
          nivs: {
            type: Sequelize.INTEGER 
          }      
        }
        ,{
          timestamps: true
        });

    return SousCategorie;

}




