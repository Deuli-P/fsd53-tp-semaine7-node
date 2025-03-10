import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import UserModel from "../Models/User.js";
import { regexEmail } from "../utils/utils.js";

// Fonction pour se connecter
export const postLogin = async (req, res) => {
    try{

        const { email, password } = req.body;

        // ========= SCURITY ============
        // Check si les inpus sont vides
        if(email === "" || password === "") {
            return res.status(400).json({message :"Tous les champs doivent être remplis"});
        }
        // Check si le mot de passe à les bonnes longueurs
        if(password.length < 5 || password.length > 255) {
            return res.status(400).json({message :"Le mot de passe doit faire minimum 5 caractères et maximum 255 caractères"});
        }

        // Check du format de l'email
        if(!regexEmail.test(email)) {
            return res.status(400).json({message :"L'email n'est pas valide"});
        }

        const userExist = await UserModel.findOne({email: email});

        // Check si l'utilisateur existe par l'email
        if(!userExist) {
            return res.status(400).json({message :"L'email ou le mot de passe est incorrect"});
        }

        // Comparaison du mot de passe envoyé avec celui de la DB
        const match = await bcrypt.compare(password, userExist.password);

        // Si pas le bon mot de passe on le renvoi sur la page login
        if(!match){
            return res.status(400).json({message:"L'email ou le mot de passe est incorrect"});
        }

        // On lui créer un token a partir de son id
        const newToken = jwt.sign({id: userExist._id}, process.env.JWT_SECRET, {expiresIn: "1d"});

        // Token stocké dans les cookies
        req.session.token = newToken;
        req.session.user = {
            id: userExist._id,
            firstname: userExist.firstname,
            lastname: userExist.lastname,
            email: userExist.email,
            gender: userExist.gender,
            category: userExist.category,
            phone: userExist.phone,
            birthdate: userExist.birthdate,
            address: userExist.address,
            city: userExist.city,
            country: userExist.country,
            photo: userExist.photo,
            isAdmin: userExist.isAdmin
        };

        res.status(200).json({
            success: true,
            user: req.session.user
        })

    }
    catch (error) {
        return res.status(500).json({message :"Erreur lors de la connexion"});
    }
};

// Fonction pour se deconnecter
export const getLogout = async (req, res) => {
    try {
      req.session.destroy((err) => {
        if (err) {
          return res.status(500).json({ success: false, message: "Erreur lors de la déconnexion" });
        }
        res.clearCookie("session_token");
        res.status(200).json({ success: true, message: "Déconnexion réussie" });
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: "Erreur lors de la déconnexion" });
    }
  };


// Fonction pour check si on est connecté a chaque lancement de la page
export const getCheck = async (req, res) => {
    try{
        const sessionToken = req.session.token;

        if(!sessionToken){
            return res.status(401).json({ success: false, message: "Non autorisé. Veuillez vous connecter." });
        }
        const token = jwt.verify(sessionToken, process.env.JWT_SECRET);

        if(!token){
            return res.status(401).json({ success: false, message: "Non autorisé. Veuillez vous connecter." });
        }

        const user = await UserModel.findOne({ _id: req.session.user.id });
        if(!user){
            return res.status(401).json({ success: false, message: "Non autorisé. Veuillez vous connecter." });
        }
        
        req.session.user = {
            id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            gender: user.gender,
            category: user.category,
            phone: user.phone,
            birthdate: user.birthdate,
            address: user.address,
            city: user.city,
            country: user.country,
            photo: user.photo,
            isAdmin: user.isAdmin
        };

        res.status(200).json({ 
            success: true, 
            user: req.session.user 
        });

    }
    catch(error){
        return res.status(500).json({ success: false, message: "Erreur lors de la vérification de l'utilisateur" });
    }
};