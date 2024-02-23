const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    cartItems:{
        type: Array,
        default: [
           {
             type:mongoose.Schema.Types.objectId,
             ref:"food" ,
            
            }
        ]
    },
    otp:{
        type:Number ,
        default:0
    }
})

const User = mongoose.model('user', userSchema)

module.exports = User ;