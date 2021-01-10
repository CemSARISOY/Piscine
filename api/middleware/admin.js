
const jwt = require('jsonwebtoken');

// Only If Admin Next()
module.exports = (req, res, next) => {
    console.log(req)
    if(req.session.isAdmin){
        next();
    }else{
        res.status(403).json({err: "Non autorisé"});
    }
}