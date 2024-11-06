const userModel = require('../models/userModel');
const AsyncHandler = require('../middelwares/asyncHandler');
const ApiResponse = require('../utils/apiResponse');
const {sendEmail,sendVerificationEmail} = require('../utils/emailService');

//@desc get register user
//@desc get /api/v1/auth/register
//@access public

exports.registerUser = AsyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    let user = await userModel.findOne({email });

    if(user){
        return ApiResponse.success("User already exist ",user,400).send(res);

    }

    user = await userModel.create({
        name: name,
        email: email,
        password: password
    });

    const emailVerificationToken = user.generateEmailVerificationToken();
    await user.save({ validateBeforeSave: false });

    //envoyer un email verification

    try{
        await sendVerificationEmail(user.email, emailVerificationToken);
        return ApiResponse.error("Error sending verification email",500).send(res);
    }catch(error){
        user.emailVerificationToken = undefined;
        user.emailVerificationTokenExpire = undefined;
        await user.save({ validateBeforeSave: false });

    }

});