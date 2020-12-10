
module.exports = (req, res, next) => {
    if(req.session.connected){
        next();
    }else{
        res.status(401).json({err: "Non authentifié"});
    }
}