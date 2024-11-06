const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({

    title:{
        type: 'string',
        required: true,
        trim: true
    },

    content:{
        type: 'string',
        required: true,
        trim: true,
        minlength: 10,
        maxlength: 5000
    },
    
    category:
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        require: true,
        trim: true,
        },
    

    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        trim: true,
    },

    image:{
        type: String,
        required: true,
        trim: true,
        
    },

    views:{
        type: Number,
        default: 0,
    },

    likedCount:{
        type: Number,
        default: 0,
    },

    commentsCount:{
        type: Number,
        default: 0,
    },

    popularityScore:{
        type: Number,
        default: 0,
    }

},


{timestamps: true}
)

// calculate popularity scores
postSchema.methods.calculatePopularityScore = function(){
    this.popularityScore = this.views * 0.5 + this.likedCount * 0.3 + this.commentsCount * 0.2
}

// middleware to calculate popularity scores
postSchema.pre("save", function(next) { // save : sauvegarde ou modifie une information
    this.calculatePopularityScore()
    next()
} )

module.exports = mongoose.model("Post", postSchema)