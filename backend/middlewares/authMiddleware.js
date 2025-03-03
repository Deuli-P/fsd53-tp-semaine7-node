import jwt from "jsonwebtoken";
import UserModel from "../Models/User.js";


export const isAuthenticated = (req, res, next) => {

    const sessionToken = req.session.token;

    if (!sessionToken) {
      return res.status(401).json({ 
        success: false, 
        message: "Non autorisé. Veuillez vous connecter." 
    });
    }
    const token = jwt.verify(sessionToken, process.env.JWT_SECRET);

    const user = UserModel.findOne({ _id: token.id });

    // verifie avec le token de jwt si c'est bon ou pas et check si le token session est bon ou pas
    if (!user) {
        res.session.destroy();
        return res.status(401).json({
            success: false,
            message: "Non autorisé. Veuillez vous connecter."
        });
    }

    next();
  };