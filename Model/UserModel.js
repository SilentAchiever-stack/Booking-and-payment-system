const Mongoose = require('mongoose');

const userSchema = new Mongoose.Schema({
    name:{
        type: String,
    },
    email:{
        type:String,
        required:true,
    },
    password:{type:String, 
              required:true
    },
    username:{
        type:String,
        required:true
    },
     otp:{
        type:String,
    },

    ExpiryOtp:{
        type:Date
    },
resetToken:{
     
        type:String,
   
},
ExpiryToken:{
        type:Date
    },
isverufied:{
        type:Boolean,
        default:false
},
role:{
type:String,
enum:['user','admin'],//a restriction rule
default:'user'
},

},{timestamps:true});

module.exports = Mongoose.model('User',userSchema);