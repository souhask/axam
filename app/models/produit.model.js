module.exports = (sequelize, Sequelize) => {

    const Produit = sequelize.define("produit", {
        nomProd: {
            type: Sequelize.STRING,
            allowNull: false
          },
          description: {
            type: Sequelize.TEXT
          },
          fichesDescription: {
            type: Sequelize.STRING
          },
          image: {
            type: Sequelize.STRING
          },
          images: {
            type: Sequelize.STRING
          },
          marque: {
            type: Sequelize.STRING
          }, 
          quantité: {
            type: Sequelize.INTEGER
          },
          rating: {
            type: Sequelize.INTEGER 
          },
          numReviews: {
            type: Sequelize.INTEGER 
          },
          couleur: {
            type: Sequelize.STRING 
          },
          etat: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
          },
          poids: {
            type: Sequelize.INTEGER 
          },
          prix: {
            type: Sequelize.INTEGER 
          },
          tva: {
            type: Sequelize.INTEGER 
          },
          hauteur: {
            type: Sequelize.INTEGER 
          },
          largeur: {
            type: Sequelize.INTEGER 
          },
          volume: {
            type: Sequelize.INTEGER 
          },
          public: {
            type: Sequelize.STRING 
          },
          articleEnVedette: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
          },
          optionExpedition: {
            type: Sequelize.STRING 
          }          
        }
        ,{
          timestamps: true
        });

    return Produit;

}
