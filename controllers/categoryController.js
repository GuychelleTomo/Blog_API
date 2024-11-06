const Category = require('../models/categoryModel');
const AsyncHandler = require('../middelwares/asyncHandler');
const ApiResponse = require('../utils/apiResponse');


exports.createCategory = AsyncHandler(async (req, res) => {
    const category = await Category.create(req.body);

    if (!category){
        return ApiResponse.error('Category not created', 400).send(res);
    }
    return ApiResponse.success(
        "Category created successfully",
        category,
        201 
    ).send(res);
})







exports.updateCategory = AsyncHandler(async (req, res, next) => {
    const category_id = req.params.id
    const updatedCategory = await Category.findByIdAndUpdate(category_id, 
        req.body, {
            new: true, 
            runValidators: true
        })

            if (!updatedCategory){
                return ApiResponse.error('Category not found', 404).send(res);
            }
            return ApiResponse.success(
                "Categories updated successfully",
                updatedCategory
            ).send(res);
})





exports.deleteCategory = AsyncHandler(async (req, res, next) => {
    const category_id = req.params.id
    const deletedCategory = await Category.findByIdAndDelete(category_id, 
        req.body, {
            new: true, 
            runValidators: true
        })

            if (!deletedCategory){
                return ApiResponse.error('Category not found', 404).send(res);
            }
            return ApiResponse.success(
                "Categories deleted successfully",
                deletedCategory
            ).send(res);
})





exports.getCategories = AsyncHandler(async (req, res, next) => {
    const categories = await Category.find();
    return ApiResponse.success(
        "Categories fetched successfully",
        categories
        // par defaut le code de status est 200 quand tout se passe bien
    ).send(res);
})








exports.getCategoryById = AsyncHandler(async (req, res,next) => {
    const category_id = req.params.id
    const category= await Category.findById(category_id)

    if (!category){
        return ApiResponse.error('Category not found', 404).send(res);
    }
    return ApiResponse.success(
        "Categories fetched successfully",
        category
    ).send(res);
})