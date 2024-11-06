const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwentoken');




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
    },

    biography:{
        type: String,
        trim: true,
    },
    isEmailVerified:{
        type: Boolean,
        default: false
    },
    emailVerificationToken:String,
    emailVerificationTokenExpire:Date,
    resetPasswordToken: String, // reconnaitre l'utilisateur qui a fait la demande pour la renitialisation d'un mot de passe
    resetPasswordExpires: Date,
    
    // isActive: {
    //     type: Boolean,
    //     default: true
    // }
},
{timestamps : true}
)

// cripter le mot de passe quand la personne va s'inscrire
userSchema.pre('save', async function (next){
    if(!this.isModified('password')){
        return next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
}) // ce code c'est pour cripter le password


// middleware pour comparer le mot de passe
    userSchema.methods.comparePassword = async function (enteredpassword){
        return await bcrypt.compare(enteredpassword, this.password)
    }

// generer le token d'authentifaication
    userSchema.methods.getSignedJwtToken = function () {
        return jwt.sign({id: this._id}, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRE
        })
    }

//middelware generer le token de verification d'email
    userSchema.methods.generateEmailVerificationToken = function () {
        // generer un token à 6 chiffres
        const verificationToken = Math.floor(
            Math.random() * 1000000 * 900000
        ).toString();

        // cripter le token
        this.emailVerificationToken = crypto
            .createHash("sha256")
            .update(verificationToken)
            .digest("hex");


        // desactiver le token apres 10 minutes
        this.emailVerificationTokenExpire = Date.now() + 60 * 1000 * 10;

        return verificationToken;
    }

    // supprimer les tokens lorsque l'utilisateur se déconnecte
    userSchema.methods.removeToken = async function (token) {
        this.tokens = this.tokens.filter((t) => t.token!== token)
        await this.save()
    }

module.exports= mongoose.model('User', userSchema)

