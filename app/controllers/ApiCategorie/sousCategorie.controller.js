const db = require("../../models");
const Op = db.Sequelize.Op;


// image Upload
const multer = require('multer')
const path = require('path')


// create main Model
const Univers = db.univers;
const SousCategorie = db.sousCategorie

// main work

// 1. create Univers

const addSousCategorie = async (req, res) => {
    
    const id = req.params.id

    let info = {
        //univers_id: id,
        univers_id: req.body.univers_id,
        nomSousCat: req.body.nomSousCat,
        description: req.body.description,
        image: req.file.path,
        //parent: req.body.parent,
        nivs: req.body.nivs,

    }

    const univers = await SousCategorie.create(info)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the SousCategorie."
      });
    });
    console.log(univers);
}


// 2. get all SousCategories

const getAllSousCategories = async (req, res) => {
  const nomSousCategorie = req.query.nomSousCategorie;
  var condition = nomSousCategorie ? { nomSousCategorie: { [Op.like]: `%${nomSousCategorie}%` } } : null;

    let univers = await SousCategorie.findAll({where: condition}).then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving SousCategorie."
      });
    });

}


// 3. get single SousCategorie

const getOneSousCategorie  = async (req, res) => {

    let id = req.params.id
    let univers  = await SousCategorie.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving SousCategorie with id=" + id
      });
    });

}



// 4. update SousCategorie

const updateSousCategorie = async (req, res) => {
  const id = req.params.id;

  await SousCategorie.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "SousCategorie was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update SousCategorie with id=${id}. Maybe SousCategorie was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating SousCategorie with id=" + id
      });
    });
};


// 5. delete SousCategorie by id

const deleteSousCategorie = async (req, res) => {

  const id = req.params.id;

  SousCategorie.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "SousCategorie was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete SousCategorie with id=${id}. Maybe SousCategorie was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete SousCategorie with id=" + id
      });
    });

}

// 5. delete all SousCategories

const deleteAllSousCategories = async (req, res) => {

    let id = req.params.id
    
    await SousCategorie.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} SousCategories were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all SousCategories."
        });
      });

}



// 7. connect one to many relation SousCategorie and SousCategorie

const getSousCategorieUnivers =  async (req, res) => {

    const id = req.params.id

    const data = await SousCategorie.findOne({
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
    addSousCategorie,
    getAllSousCategories,
    getOneSousCategorie,
    updateSousCategorie,
    deleteSousCategorie,
    getSousCategorieUnivers,
    upload
}