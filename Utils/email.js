const nodeMailer = require('nodemailer');

  const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_SENDER,
    pass: process.env.EMAIL_PASSWORD,
    
  }
});

const sendOtpToMail = async (email, otp) => {
    try{
    const mailOptions = {
        from: process.env.EMAIL_SENDER,
        to: email,
        subject: 'OTP for Email Verification',
        text: `Your OTP is: ${otp}`
    };
   await transporter.sendMail(mailOptions);
}catch (err) {
    console.error('Error sending OTP email:', err);
    throw err; // let the controller's catch block handle the response
  }}

  module.exports = { sendOtpToMail };