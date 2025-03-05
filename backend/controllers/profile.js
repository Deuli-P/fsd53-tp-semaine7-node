import UserModel from "../Models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { regexEmail } from "../utils/utils.js";


export const getChangeProfile = async (req, res) => {
    try {

        const sessionToken = req.session.token;

        if(!sessionToken){
            return res.status(401).json({ success: false, message: "Non autorisé. Veuillez vous connecter." });
        }

        const token = jwt.verify(sessionToken, process.env.JWT_SECRET);
        const user = await UserModel.findOne({ _id: token.id });

        if(!user){
            return res.status(402).json({ success: false, message: "Non autorisé." });
        };

        const newData = req.body;

        if(newData.email && !regexEmail.test(newData.email)){
            return res.status(400).json({ success: false, message: "Email invalide." });
        };

        
        if(newData.password){
            if(newData.password.length < 8 || newData.password.length > 255){
                return res.status(400).json({ success: false, message: "Mot de passe non valide." });
            };

            newData.password = await bcrypt.hash(newData.password, 10);
        }
        else{
            delete newData.password;
        }

        const newUser = await UserModel.findOneAndUpdate({ _id: token.id }, newData, {
            new: true
        });

        if(newUser){
            res.status(200).json({ 
                success: true,
                message: "Profil modifié avec succès." ,
                user: newUser
            });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    } 
}

export const getProfileUser = async (req,res) => {
    try{
        const { id } = req.params;

        const user = await UserModel.findOne({ _id: id });

        if(user){
            res.status(200).json({ 
                success: true,
                user: user
            });
        }
        else{
            res.status(400).json({ 
                success: false,
                message: "Utilisateur non trouvé."
            });
        }

    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}