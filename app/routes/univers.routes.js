module.exports = app => {
  const univers = require("../controllers/ApiCategorie/univers.controller");
  const sousCategorie = require("../controllers/ApiCategorie/sousCategorie.controller.js");
  var router = require("express").Router();

// Univers router  
router.post('/addUnivers', univers.upload , univers.addUnivers);
router.get('/allUnivers', univers.getAllUnivers);
router.get('/getOneUnivers/:id', univers.getOneUnivers);
router.put('/updateUnivers/:id', univers.upload , univers.updateUnivers);
router.delete('/deleteUnivers/:id', univers.deleteUnivers);
// get Univers SousCategories
router.get('/getUniversSousCategorie/:id', univers.getUniversSousCategorie);


// SousCategorie router  
router.post('/addSousCategorie', sousCategorie.upload , sousCategorie.addSousCategorie);
router.get('/allSousCategorie', sousCategorie.getAllSousCategories);
router.get('/getOneSousCategorie/:id', sousCategorie.getOneSousCategorie);
router.put('/updateSousCategorie/:id', sousCategorie.upload , sousCategorie.updateSousCategorie);
router.delete('/deleteSousCategorie/:id', sousCategorie.deleteSousCategorie);
// get SousCategories Univers
router.get('/getSousCategorieUnivers/:id', sousCategorie.getSousCategorieUnivers);



app.use('/api/univers', router);
};