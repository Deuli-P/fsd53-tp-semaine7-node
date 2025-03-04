import UserModel from "../Models/User.js";
import jwt from 'jsonwebtoken';

export const getListUsers = async (req, res) => {

    try {
        const { search_query, category } = req.query;

        const sessionToken = req.session.token;
        const token = jwt.verify(sessionToken, process.env.JWT_SECRET);

        // De base il y a toujours le filtre id pour pas sélectionner l'utilisateur connecté
        let filters = {_id: { $ne: token.id }};

        // On cherche si il y a une recherche pour trouver par nom, prenom, adresse complète
        if (search_query) {
            filters = {
                ...filters,
                $or: [
                    { firstname: { $regex: search_query, $options: "i" } },
                    { lastname: { $regex: search_query, $options: "i" } },
                    { address: { $regex: search_query, $options: "i" } },
                    { city: { $regex: search_query, $options: "i" } },
                    { country: { $regex: search_query, $options: "i" } },
                ]
            }
        }

        // on cherche par category si il y en a une de recherché
        if (category && category !== null) {
            filters = {
                ...filters,
                category: category
            }
        }
       
        // On cherche dans les users avec les filtres
        const users = await UserModel.find(filters);

        // On renvoi la liste
        res.status(200).json(users);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}