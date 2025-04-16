const userSchema = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.register = async (req, res) => {
    console.log("API is hit" , req.body);
    try {
        const { userName, email, password } = req.body;
        const emailExist = await userSchema.findOne({ email });
        if (emailExist) return res.status(400).json({ msg: "User already exists" });

        const hash = await bcrypt.hash(password, 10);
        const newUser = new userSchema({
            userName,
            email,
            password: hash
        });

        const save = await newUser.save();
        res.status(201).json({ msg: "User Registered Successfully" });
        console.log(save);
    } catch (error) {
        res.status(400).json({ msg: "Bad Request" });
    }
};

exports.logIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userSchema.findOne({ email });
        if (!user) return res.status(400).json({ msg: "User Not Found" });

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) return res.status(400).json({ msg: "Invalid Credentials" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ token, user: { id: user._id, username: user.userName, email: user.email } });
    } catch (error) {
        res.status(400).json({ msg: "User Not Found" });
        console.log("User not found");
    }
};
