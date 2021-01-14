const jwt = require('jsonwebtoken')

exports.isAuth = (req, res, next) => {
    try{
        if(req.headers.cookie){
            let cookies = req.headers.cookie.split('=');
            const decodedToken = jwt.verify(cookies[1], process.env.RANDOMSECRETTOKEN)
            const userId = decodedToken.userId
            if(req.body.userId && req.body.userId !== userId){
                throw 'Invalid USER ID'
            }else{
                next();
            }
        }else{
            throw "Non authentifié"
        }
    }catch(err){
        res.status(401).json({message : err})
    }
}

exports.isAdmin = (req, res, next) => {
    try{
        let cookies = req.headers.cookie.split('=');
        const decodedToken = jwt.verify(cookies[1], process.env.RANDOMSECRETTOKEN)
        const isAdmin = decodedToken.isAdmin
        if(isAdmin){
            next();
        }else{
            res.status(403).json({message: "Accès interdit"})
        }
    }catch(err){
        res.status(403).json({message : err})
    }
}