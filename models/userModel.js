const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 20
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6,
        select: false // ne pas afficher ce champ dans les retours json
    },

    role:{
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },

    avatar:{
        type: String,
    }
    
    // isActive: {
    //     type: Boolean,
    //     default: true
    // }
},
{timestamps : true}
)

module.exports= mongoose.model('User', userSchema)

