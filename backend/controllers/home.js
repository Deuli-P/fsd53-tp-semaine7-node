


export const getRandomUser = async (req, res) => {
    try{
        const { id } = req.session;

        const user = await UserModel.findOne({ _id: { $ne: id } });
        res.status(200).json(user);

    }
    catch(error){
        res.status(500).json({message: error.message});
    }
}

export const getUserConnected = async (req, res) => {
    try{
        const { id } = req.session;

        const user
        = await UserModel.findOne({ _id: id });
        res.status(200).json(user);
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
};