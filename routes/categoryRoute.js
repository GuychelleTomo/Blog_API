const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const categoryValidator = require('../middelwares/validators/categoryValidator');


router
    .route("/")
    .post(
        categoryValidator.validateCategoryCreate,
        categoryController.createCategory)


    .get(categoryController.getCategories)
    

router
    .route("/:id")
    .get
        (   categoryValidator.validateCategoryGet, 
            categoryController.getCategoryById)
            
            
    .delete(categoryValidator.validateCategoryDelete, //
            categoryController.deleteCategory)

    .put(categoryValidator.validateCategoryUpdate, 
        categoryController.updateCategory)

module.exports = router;