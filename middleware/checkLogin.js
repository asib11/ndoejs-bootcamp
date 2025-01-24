const jwt = require('jsonwebtoken');

const checkLogin = (req, res, next) =>{
    const {authorization} = req.headers;
    try{
        const token = authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        const {userName, userID} = decoded;
        req.userName = userName;
        req.userID = userID;
        next()
    }catch(err) {
        console.log(err);
        next('authentication Faileddd')
    }
}

module.exports = checkLogin;