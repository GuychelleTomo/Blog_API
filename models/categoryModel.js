const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema(
{
    name : {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
            
    description:{
        type: String,
        trim: true,
    },

},
    {timestamps: true} // properties qui ajoute des champs automatiquement dans notre categories
) 

    module.exports = mongoose.model("Category", categorySchema) // Category : nom de la collection dans la base de données
