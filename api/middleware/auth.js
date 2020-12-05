const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    let cookie = req.cookies.sessionCookie;
    try{
        jwt.verify(cookie, process.env.RANDOMSECRETTOKEN);
        next();
    } catch {
        res.status(401).json({err: 'Requête invalide'});
    }
}