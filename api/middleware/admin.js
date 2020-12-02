const jwt = require('jsonwebtoken');

// Only If Admin Next()
module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.RANDOMSECRETTOKEN);
        const numEtudiant = decodedToken.userId;
        if ( numEtudiant !== 1 ) {
            throw 'Accès refusé';
        } else {
            next();
        }
    } catch {
        res.status(401).json({err: 'Requête invalide'});
    }
}