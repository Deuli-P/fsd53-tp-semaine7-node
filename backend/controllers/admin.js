import UserModel from "../Models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { regexEmail } from "../utils/utils.js";


export const adminChangeProfile = async (req, res)=> {
    try {

        console.log("adminChangeProfile");

        const { id, data } = req.body;

        const user = await UserModel.findOne({ _id: id });

        
        if(data.email && !regexEmail.test(data.email)){
            return res.status(400).json({ success: false, message: "Email invalide." });
        };

        if(data.password){
            if(data.password.length < 8 || data.password.length > 255){
                return res.status(400).json({ success: false, message: "Mot de passe non valide." });
            };

            data.password = await bcrypt.hash(data.password, 10);
        }
        else{
            delete data.password;
        }

        const newUser = await UserModel.findOneAndUpdate({ _id: id }, data, {
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

export const deleteProfileUser = async (req, res)=> {
    try {

        const { id } = req.body;

        const user = await UserModel.findOne({_id: id});

        if(user){
            await UserModel.findOneAndDelete({_id: id});
            res.status(200).json({ success: true, message: "Profil supprimé avec succès." });
        }

        res.status(404).json({ success: false, message: "Profil non trouvé." });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    } 
}