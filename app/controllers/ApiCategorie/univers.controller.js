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

const addUnivers = async (req, res) => {

    let info = {
        nomUnivers: req.body.nomUnivers,
        description: req.body.description,
        image: req.file.path,
    }

    const univers = await Univers.create(info)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Univers."
      });
    });
    console.log(univers);
}


// 2. get all Universes

const getAllUnivers = async (req, res) => {
  const nomUnivers = req.query.nomUnivers;
  var condition = nomUnivers ? { nomUnivers: { [Op.like]: `%${nomUnivers}%` } } : null;

    let univers = await Univers.findAll({where: condition}).then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Univers."
      });
    });

}


// 3. get single Univers 

const getOneUnivers  = async (req, res) => {

    let id = req.params.id
    let univers  = await Univers.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Univers with id=" + id
      });
    });

}



// 4. update Univers

const updateUnivers = async (req, res) => {
  const id = req.params.id;

  await Univers.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Univers was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Univers with id=${id}. Maybe Univers was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Univers with id=" + id
      });
    });
};


// 5. delete Univers by id

const deleteUnivers = async (req, res) => {

  const id = req.params.id;

  Univers.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Univers was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Univers with id=${id}. Maybe Univers was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Univers with id=" + id
      });
    });

}

// 5. delete all Universes

const deleteAllUniverses = async (req, res) => {

    let id = req.params.id
    
    await Univers.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Universes were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Univers."
        });
      });

}



// 7. connect one to many relation Univers and SousCategorie

const getUniversSousCategorie =  async (req, res) => {

    const id = req.params.id

    const data = await Univers.findOne({
        include: [{
            model: SousCategorie,
            as: 'sousCategorie'
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
    addUnivers,
    getAllUnivers,
    getOneUnivers,
    updateUnivers,
    deleteUnivers,
    getUniversSousCategorie,
    upload
}