const mongoose = require('mongoose');
const Post = require('./postModel');
const User = require('./userModel');


const commentSchema= new mongoose.Schema({
 


    post:{
        type: mongoose.Schema.Types.ObjectId,
        ref: Post,
        required: true,
        trim: true,
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: true,
        trim: true,
    },
    content:{
        type: String,
        required: true,
        trim: true,
        maxlength: 1000,
    }

},

{timestamps: true}
)


// Middleware pour mettre à jour le compteur après la création d'un commentaire
commentSchema.post("save", async function () {
    try {
      const Post = this.model("Post");
      const post = await Post.findByIdAndUpdate(
        this.post,
        { $inc: { commentsCount: 1 } },
        { new: true }
      );
  
      // Le middleware pre('save') du Post s'occupera de recalculer le score de popularité
      await post.save();
    } catch (err) {
      console.error("Error updating comment count:", err);
    }
  });
  
  // Middleware pour mettre à jour le compteur après la suppression d'un commentaire
  commentSchema.post("remove", async function () {
    try {
      const Post = this.model("Post");
      const post = await Post.findByIdAndUpdate(
        this.post,
        { $inc: { commentsCount: -1 } },
        { new: true }
      );
  
      // Le middleware pre('save') du Post s'occupera de recalculer le score de popularité
      await post.save();
    } catch (err) {
      console.error("Error updating comment count:", err);
    }
  });

module.exports = mongoose.model('Comments',commentSchema )