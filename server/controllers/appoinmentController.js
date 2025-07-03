const Appoinment = require("../models/Appoinment");

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

            const newAppoinment = new Appoinment({
                userID: tokenID,
                doctorID: doctorID,
                AppoinmentData: date
            })

            const resultAppoinment = await newAppoinment.save()

            if(resultAppoinment){
                return res.json({ Status: "Success", Message: "Appoinment Created Success"})
            }
            else{
                return res.json({ Error: "Internal Server Error"})
            }
        }
        catch (err) {
            console.log(err)
        }
    }
};

module.exports = AppoinmentController;  