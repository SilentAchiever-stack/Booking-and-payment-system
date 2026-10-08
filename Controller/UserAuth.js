const User = require('../Model/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SendOtpToMail } = require('../Utils/email');
const { issueToken } = require('../Utils/isssueToken');
const crypto = require('crypto');
const { generateOtp } = require('../Utils/generateOtp');


const createUser = async (req, res) => {
    const {name, email, password} = req.body;
    try {
    const newUserEmail = await User.findOne({email});
        if (newUserEmail) {
            return res.status(400).json(
                {message:"User already exists"}
            )
        }
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(password, salt);
const otp = generateOtp();
const ExpiryOtp = new Date(Date.now() + 10 * 60 * 1000); // OTP expires in 10 minutes
const newUser = new User({
    Name: name,
    email : email,
    password : hashedPassword,
    otp : otp,
    ExpiryOtp : ExpiryOtp,
    isverified :false
})
  const save = await newUser.save();
  const response = save.toObject();
  delete response.password;

await SendOtpToMail(email,otp)// the otp we generated we then send it 

return res.status(200).json({
    message:`${name}, have been registered successfully,an OTP has been sent to ${email},please verify your account`,
    data:response
})
    } catch (error) {
        return res.status(500).json({message:"Internal server error"});
    }}

const verifyOtp = async(req,res)=>{
    const {email,otp} = req.body;
    try{
       const userEmail = await User.findOne({email});

       if(!userEmail){
        return res.status(400).json({message:"User not found"});
       }

       if(userEmail.isverified){
        return res.status(400).json({message:"User already verified"});
       }
       
       if(userEmail.otp !== otp){
        return res.status(400).json({message:"Invalid OTP"});
       }

       if (new Date() > userEmail.ExpiryOtp) {
    return res.status(400).json({
        message: "OTP has expired"
    });
  }
        userEmail.isverified = true;
        userEmail.otp = null;
        userEmail.ExpiryOtp = null;
        await userEmail.save();

       const loginToken = issueToken(res,userEmail)
       return res.status(200).json({message:"User verified successfully", data:loginToken});
    }
    catch(error){
        return res.status(500).json({message:"Internal server error"});
    }
}