import UserModel from "../Models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { regexEmail } from "../utils/utils.js";


export const getAdminChangeProfile = async (req, res)=> {
    try {

        const sessionToken = req.session.token;

        if(!sessionToken){
            return res.status(401).json({ success: false, message: "Non autorisé. Veuillez vous connecter." });
        }

        const token = jwt.verify(sessionToken, process.env.JWT_SECRET);
        const user = await UserModel.findOne({ _id: token.id });

        if(!user || !user.isAdmin){
            return res.status(402).json({ success: false, message: "Non autorisé." });
        };

        const { data: newData , id } = req.body;


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

        const newUser = await UserModel.findOneAndUpdate({ _id: id }, newData, {
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