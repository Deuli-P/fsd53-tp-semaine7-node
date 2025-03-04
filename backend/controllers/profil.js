import UserModel from "../Models/User.js";


export const checkAdmin = async (req, res) => {
    try {
        const { id } = req.session;
        const user = await UserModel.findOne({ _id: id });

        if(!user){
            return res.status(401).json({ success: false, message: "Non autorisé. Veuillez vous connecter." });
        }

        if (!user.isAdmin){
            return res.status(403).json({ success: false, message: "Non autorisé. Vous n'êtes pas administrateur." });
        }

        res.status(200);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};