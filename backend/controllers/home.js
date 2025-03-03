import UserModel from "../Models/User.js";
import jwt from 'jsonwebtoken';

export const getRandomUser = async (req, res) => {
    try{

        console.log("start random")
        const { token } = req.session;

        const tokenDecrypted = jwt.verify(token, process.env.JWT_SECRET);
        const id = tokenDecrypted.id;

        const randomPeople = await UserModel.findOne({ _id: { $ne: id } });
        res.status(200).json(randomPeople);

    }
    catch(error){
        res.status(500).json({message: error.message});
    }
}

export const getIsAdmin = async (req, res) => {
    try{
        const { token } = req.session;

        const user
        = await UserModel.findOne({ _id: id });
        
        if(!user.isAdmin){
            return res.status(403).json({ success: false, message: "Non autorisé. Vous n'êtes pas administrateur." });
        }
        
        return res.status(200).json({success: true});
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
};