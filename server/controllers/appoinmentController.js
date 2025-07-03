const AppoinmentController = {
    createAppoinment: async (req, res) => {
        try {
            const token = req.header('Authorization');
            if (!token || !token.startsWith('Bearer ')) {
                return res.json({ Error: "Missing or invalid token" });
            }

            const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
            const tokenID = decoded.id;

            const {
                doctorID,
                date,
            } = req.body

            


        }
        catch (err) {
            console.log(err)
        }
    }
};

module.exports = AppoinmentController;  