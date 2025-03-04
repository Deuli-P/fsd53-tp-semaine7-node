import UserModel from "../Models/User.js";
import jwt from 'jsonwebtoken';

export const getRandomUser = async (req, res) => {
    try{

        const sessionToken = req.session.token;

        const token = jwt.verify(sessionToken, process.env.JWT_SECRET);

        const users = await UserModel.find({ _id: { $ne: token.id } });

        if (users.length === 0) {
            return res.status(404).json({ success: false, message: "Aucun utilisateur trouvé" });
        }

        const randomPeople = users[Math.floor(Math.random() * users.length)];

        res.status(200).json(randomPeople);

    }
    catch(error){
        res.status(500).json({message: error.message});
    }
}
