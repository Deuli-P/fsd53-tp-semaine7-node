import UserModel from "../Models/User.js";


export const getListUsers = async (req, res) => {

    try {
        const { id } = req.session;
        // prendre la liste hors utlisateur connecté
        const users = await UserModel.find({ _id: { $ne: id } });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}