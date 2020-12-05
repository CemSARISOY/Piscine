const jwt = require('jsonwebtoken');

// Only If Admin Next()
module.exports = (req, res, next) => {
    let cookie = req.cookies.sessionCookie;
    try{
        const decoded = jwt.verify(cookie, process.env.RANDOMSECRETTOKEN);
        if ( decoded.isAdmin ) {
            next();
        } else {
            throw 'Accès refusé';
        }
    } catch {
        res.status(401).json({err: 'Requête invalide'});
    }
}