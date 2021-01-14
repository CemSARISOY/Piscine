
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Etudiants = require("../model/etudiantsModel");
var nodemailer = require('nodemailer');


exports.getAllEtudiant = async (req, res) => {
    try{
        const etudiants = await Etudiants.selectAll()
        if(etudiants.rowCount > 0){
            res.status(200).json(etudiants.rows);
        }else{
            res.status(404).json({message : "Il n'existe aucun étudiant"});
        }
    }catch(err){
        res.status(500).json({message : err.message});
    }
};


exports.createEtudiant = async (req, res) => {
    try{
        let data = req.body;
        data.mdpEtudiant = await bcrypt.hash(data.mdpEtudiant, 10)
        const result = await Etudiants.create(data);
        if(result.rowCount > 0){
            
            //envoie de mail
            const emailToken = jwt.sign({

                numEtudiant : data.numEtudiant
            
            },
            process.env.RANDOMSECRETTOKEN,
            {
                expiresIn : '1d'
            })

            const url = `http://localhost:8080/emailconfirmation/${emailToken}`;
            //envoie mail
                        var transporter = nodemailer.createTransport({
                            service: 'gmail',
                            auth: {
                              user: process.env.MailThatSend,
                              pass: process.env.PasswordToSend
                            }
                          });
                          
                          var mailOptions = {
                            from: process.env.MailThatSend,
                            to: req.body.mailEtudiant,
                            subject: 'Nouveau mot de passe',
                            text: 'Activez votre compte via ce lien :' + url +'. Vous avez un délai de 1 jour pour confirmer votre compte'
                          };
                          
                          transporter.sendMail(mailOptions, function(error, info){
                            if (error) {
                              console.log(error);
                            } else {
                              console.log('Email sent: ' + info.response);
                            }
                          });

            res.status(201).json(result.rows[0])
        }else{
            res.status(400).json({message : "Erreur de création"});
        }
        
    }catch(err){
        res.status(500).json({message : err.message});
    }
};

exports.deleteEtudiant = async (req, res) => {
    try{
        const result = await Etudiants.delete(req.params.id);
        if(result.rowCount > 0){
            res.status(200).json(result.rows[0]);
        }else{
            res.status(404).json({message : "Erreur de suppression"});
        }
    }catch(err){
        res.status(500).json({message : err.message});
    }
};

exports.updateEtudiant = async (req, res) => {
    try{
        let data = req.body
        if(data.hasOwnProperty("mdpEtudiant")){
            data.mdpEtudiant = await bcrypt.hash(data.mdpEtudiant, 10)
        }
        const result = await Etudiants.update(data, req.params.id);
        if(result.rowCount > 0){
            res.status(200).json(result.rows[0])
        }else{
            res.status(400).json({message : "Erreur de modification"});
        }
    }catch(err){
        res.status(500).json({message : err.message});
    }
};

exports.login = async (req, res) =>{
    try{
        const etudiant = await Etudiants.select(req.body.numEtudiant);
        if(etudiant.rowCount === 1){
            const result = await bcrypt.compare(req.body.mdpEtudiant, etudiant.rows[0].mdpEtudiant);
            if(result && req.body.confirmedMail){
                token = jwt.sign( { userId: etudiant.rows[0].numEtudiant, isAdmin: etudiant.rows[0].numEtudiant == 1}, process.env.RANDOMSECRETTOKEN, {expiresIn: '60m'});
                res.cookie('jwtAuth', token, {maxAge:'3600000', httpOnly:true}).status(200).json({success: true, userId: req.body.numEtudiant, isAdmin: req.body.numEtudiant==1});
            }else{
                res.status(401).json({message: "Mot de passe incorrect"});
            }
        }else{
            res.status(404).json({message : "Aucun étudiant inscrit avec ce numéro"});
        }
    }catch(err){
        res.status(500).json({message : err.message});
    }
};

exports.getEvent = async (req, res) => {
    try{
        const result = await Etudiants.selectEvent(req.params.id);
        if(result.rowCount > 0){
            res.status(200).json(result.rows)
        }else{
            res.status(404).json({message: "Aucun événement lié à cet étudiant"})
        }
    }catch(err){
        res.status(500).json({message: err.message});
    }
}


exports.verifyToken = (req, res) => {
    try{
        if(req.headers.cookie){
            cookies = req.headers.cookie.split('=');
            const decodedToken = jwt.verify(cookies[1], process.env.RANDOMSECRETTOKEN)
            const userId = decodedToken.userId
            if(userId){
                newToken = jwt.sign( { userId: decodedToken.userId, isAdmin: decodedToken.isAdmin}, process.env.RANDOMSECRETTOKEN, {expiresIn: '60m'});
                res.cookie('jwtAuth', newToken, {maxAge:'3600000', httpOnly:true}).status(200).json({success: true, userId: userId, isAdmin: userId==1})
            }else{
                res.status(401).json({success: false})
            }
        }else{
            res.status(401).json({success: false})
        }
    }catch(err){
        res.status(500).json({message: err.message})
    }
}

exports.logout = (req, res) => {
    res.clearCookie("jwtAuth", {httpOnly: true}).status(200).send("Cookie deleted");
}

exports.pswd = async (req, res) => {
    try{
        const etudiant = await Etudiants.select(req.body.numEtudiant)
        if(etudiant.rowCount == 1){
            
            // Si le mail correspond a celui entré avec l'id
            if(etudiant.rows[0].mailEtudiant == req.body.mailEtudiant){
                //on génere un mdp aléatoire ici je commence par constante
                let newmdp = Math.random().toString(36).substring(7);
                
                    let data = {mdpEtudiant : newmdp}

                    data.mdpEtudiant = await bcrypt.hash(data.mdpEtudiant, 10)
                    
                    const result = await Etudiants.update(data, req.body.numEtudiant);
                    if(result.rowCount == 1){
                        var transporter = nodemailer.createTransport({
                            service: 'gmail',
                            auth: {
                              user: process.env.MailThatSend,
                              pass: process.env.PasswordToSend,
                            }
                          });
                          
                          var mailOptions = {
                            from: process.env.MailThatSend,
                            to: etudiant.rows[0].mailEtudiant,
                            subject: 'Nouveau mot de passe',
                            text: 'Voici votre nouveau mot de passe :' + newmdp +'. Changez le au plus vite !'
                          };
                          
                          transporter.sendMail(mailOptions, function(error, info){
                            if (error) {
                              console.log(error);
                            } else {
                              console.log('Email sent: ' + info.response);
                            }
                          });
                    
                        res.status(200).json(result.rows[0])
                    }else{
                        res.status(400).json({message : `Erreur de modification`});
                    }
            }
            else{
                
                res.status(404).json({message:`L'adresse mail ne correspond pas a celle écrite`})
            }
        }else{
            res.status(404).json({message : `Il n'existe aucun étudiant avec ce numéro`});
        }
    }catch(err){
        res.status(500).json({message : err.message});
    }
}

exports.getOneEtudiant = async (req, res) => {
    try{
        const etudiant = await Etudiants.select(req.params.id)
        if(etudiant.rowCount > 0){
            res.status(200).json(etudiant.rows[0])
        }else{
            res.status(404).json({message : "Il n'existe aucun étudiant avec ce numéro"});
        }
    }catch(err){
        res.status(500).json({message : err.message});
    }
};

exports.confirmation = async (req, res) => {
    try{
        const token = jwt.verify(req.params.token,process.env.RANDOMSECRETTOKEN);
        let data = {confirmedMail:  true}
        const result = await Etudiants.update(data, token.numEtudiant);
        if(result.rowCount > 0){
            res.status(200).json(result.rows[0])
        }else{
            res.status(400).json({message : "Erreur de modification"});
        }
    }catch(err){
        res.status(500).json({message : err.message});
    }
};

