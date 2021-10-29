const mongoose = require("mongoose")
const validate = require("validate")
const jwt = require('jsonwebtoken')


const Userschema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    age:{
        type: Number,
        required: true,

    },
    email:{
        type:String,
        required: true,
        trim: true, 
        lowercase: true
    },
    password:{
        type:String,
        required: true,
        trim: true,
        minlength: 7,
    },
    token:{
        type:String
    },
    location:{
        type: String,
        required: true,
    }
})
Userschema.methods.genarateAuthToken = async function () {

const user  = this
    const token = jwt.sign({_id: user._id.toString()} , 'mycompanyskystop')  
     user.token = token
    await user.save()
    return token

}





const User = mongoose.model('User',Userschema)
module.exports = User
