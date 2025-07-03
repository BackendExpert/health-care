const User = require("../models/User");
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const Role = require("../models/Role");
const Doctor = require("../models/Doctor");
const transporter = require('../utils/emailTransporter');


const doctorController = {
    createDoctor: async (req, res) => {
        try {
            const {
                username,
                email,
                exp,
                contactInfo,
                landline,
                hospital,
                section,
            } = req.body

            const checkUser = await User.findOne({
                $or: [
                    { username: username },
                    { email: email }
                ]
            });

            if (checkUser) {
                return res.json({ Error: "User already exists in the system" })
            }

            const randomPassword = crypto.randomBytes(4).toString('hex');
            const hashedPassword = await bcrypt.hash(randomPassword, 10);

            const getroleID = await Role.findOne({ name: 'doctor' });

            const createuseracc = new User({
                username: username,
                email: email,
                password: hashedPassword,
                roles: getroleID._id
            })

            const resultUserAcc = await createuseracc.save()

            if (resultUserAcc) {
                const createdoctor = new Doctor({
                    name: username,
                    exp: exp,
                    contactInfo: contactInfo,
                    landline: landline,
                    hospital: hospital,
                    section: section
                })

                const resultCreateDoctor = await createdoctor.save()

                if (resultCreateDoctor) {
                    const mailOptions = {
                        from: process.env.EMAIL_USER,
                        to: email,
                        subject: 'Your Doctor Account at MyHealthCare',
                        html: `
                        <p>Dear ${username},</p>
                        <p>Thank you for registering at the MyHealthCare</p>
                        <p>Here are your login credentials:</p>
                        <ul>
                            <li><strong>Username:</strong> ${username}</li>
                            <li><strong>Password:</strong> ${randomPassword}</li>
                        </ul>
                        <p>Please Login with our email and this password and update the Password ASPS.</p>
                        <br>
                        <p style="color:gray;">Do not share these credentials with anyone.</p>
                    `,
                    };

                    transporter.sendMail(mailOptions, (err, info) => {
                        if (err) {
                            console.log(err);
                            return res.json({
                                Error: "Account created but failed to send email."
                            });
                        }
                        return res.json({
                            Status: "Success",
                            Message: "Doctor Account Created Successfully. Login credentials have been emailed."
                        });
                    });
                }
            }

        } catch (err) {
            console.log(err)
            return res.json({ Error: "An error occurred while creating the doctor account." })
        }
    },

    getalldoctors: async(req, res) => {
        try{
            const alldoctors = await Doctor.find()

            return res.json({ Result: alldoctors })
        }
        catch(err){
            console.log(err)
        }
    }

};

module.exports = doctorController;