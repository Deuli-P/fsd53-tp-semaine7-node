import jwt from "jsonwebtoken";
import UserModel from "../Models/User.js";


export const isAdmin = async (req, res, next) => {

    const sessionToken = req.session.token;

    // si pas de sessionToken alors déconnecté
    if (!sessionToken) {
      return res.status(401).json({ 
        success: false, 
        message: "Non autorisé. Veuillez vous connecter." 
      });
    }

    
    const token = jwt.verify(sessionToken, process.env.JWT_SECRET);
    const user = await UserModel.findOne({ _id: token.id });
    
    
    console.log('adminmiddlewara user find')

    // verifie avec le token de jwt si c'est bon ou pas et check si le token session est bon ou pas
    if (!user) {
        res.session.destroy();
        return res.status(401).json({
            success: false,
            message: "Non autorisé. Veuillez vous connecter."
        });
    }


    // Si user n'est pas admin alors pas autorisé
    if(!user.isAdmin){
        return res.status(402).json({ 
            success: false, 
            message: "Non autorisé." 
        });
    }

    next();
  };