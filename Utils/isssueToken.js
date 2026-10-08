const jwt = require('jsonwebtoken');

const issueToken = (res,account)=>{
    const payload = {
        id: account._id,
        name: account.name,
        email: account.email,
        isverified: account.isverified
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;

    res.cookie('token', token,{
        httpOnly:true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
    })
}

module.exports = { issueToken };