const db = require("../../models");
const Op = db.Sequelize.Op;


// image Upload
const multer = require('multer')
const path = require('path')


// create main Model
const SousCategorie = db.sousCategorie
const Produit = db.produit;

// main work

// 1. create Produit

const addProduit = async (req, res) => {
    
    const id = req.params.id

    let info = {
        nomProd: req.body.nomProd,
        description: req.body.description,
        fichesDescription: req.body.fichesDescription,
        image: req.file.path,
        images: req.file.path,
        marque: req.body.marque,
        quantité: req.body.quantité,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        couleur: req.body.couleur,
        etat: req.body.etat,
        poids: req.body.poids,
        prix: req.body.prix,
        tva: req.body.tva,
        hauteur: req.body.hauteur,
        largeur: req.body.largeur,
        volume: req.body.volume,
        public: req.body.public,
        articleEnVedette: req.body.articleEnVedette,
        optionExpedition: req.body.optionExpedition,
    }

    const univers = await Produit.create(info)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Produit."
      });
    });
    console.log(univers);
}


// 2. get all Produits

const getAllProduits = async (req, res) => {
  const nomProduit = req.query.nomProduit;
  var condition = nomProduit ? { nomProduit: { [Op.like]: `%${nomProduit}%` } } : null;

    let univers = await Produit.findAll({where: condition}).then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Produit."
      });
    });

}


// 3. get single Produit

const getOneProduit  = async (req, res) => {

    let id = req.params.id
    let univers  = await Produit.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Produit with id=" + id
      });
    });

}



// 4. update Produit

const updateProduit = async (req, res) => {
  const id = req.params.id;

  await Produit.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Produit was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Produit with id=${id}. Maybe Produit was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Produit with id=" + id
      });
    });
};


// 5. delete Produit by id

const deleteProduit = async (req, res) => {

  const id = req.params.id;

  Produit.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Produit was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Produit with id=${id}. Maybe Produit was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Produit with id=" + id
      });
    });

}

// 5. delete all Produits

const deleteAllSousCategorieProduits = async (req, res) => {

    let id = req.params.id
    
    await Produit.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Produits were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Produits."
        });
      });

}



// 7. connect one to many relation Produit and SousCategorie

const getProduitSousCategorie =  async (req, res) => {

    const id = req.params.id

    const data = await Produit.findOne({
        include: [{
            model: Univers,
            as: 'univers'
        }],
        where: { id: id }
    })

    res.status(200).send(data)
}


// 8. Upload Image Controller

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Images')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage,
    limits: { fileSize: '1000000' },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/
        const mimeType = fileTypes.test(file.mimetype)  
        const extname = fileTypes.test(path.extname(file.originalname))

        if(mimeType && extname) {
            return cb(null, true)
        }
        cb('Give proper files formate to upload')
    }
}).single('image')


module.exports = {
    addProduit,
    getAllProduits,
    getOneProduit,
    updateProduit,
    deleteProduit,
    getProduitSousCategorie,
    upload
}