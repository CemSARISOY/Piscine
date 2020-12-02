const jwt = require('jsonwebtoken');

// If Admin() next else if authentificated next()
module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.RANDOMSECRETTOKEN);
        console.log(decodedToken)
        const numEtudiant = decodedToken.userId;
        if( numEtudiant === 1 ){
            next();
        }
        else{
            if (req.body.numEtudiant && req.body.numEtudiant !== numEtudiant) {
                throw 'numEtudiant invalide';
            } else {
                next();
            }
        }
    } catch {
        res.status(401).json({err: 'Requête invalide'});
    }
}