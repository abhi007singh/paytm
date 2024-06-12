const jwt = require('jsonwebtoken');
const { User, Account } = require("../db");
const { validateSignup, validateSignin, validateUpdateUser } = require("../validators/user");
const { JWT_SECRET } = require('../config');

const signup = async (req, res) => {
    try {
        const { success, data } = validateSignup(req.body);
        if (!success) return res.status(411).json({ message: 'ValidationError', error: data });

        const existingUser = await User.findOne({
            username: data.username
        })

        if (existingUser) {
            return res.status(411).json({
                message: "Email already taken/Incorrect inputs"
            });
        }

        const newUser = new User({
            username: data.username,
            firstname: data.firstname,
            lastname: data.lastname
        });

        const hashedPassword = await newUser.createHash(data.password);
        newUser.password = hashedPassword;

        await newUser.save();

        await Account.create({
            userId: newUser._id,
            balance: Math.floor(Math.random() * 10000) + 1
        });

        const token = jwt.sign({ userId: newUser._id }, JWT_SECRET);

        res.status(200).json({ message: 'User craeted successfully', token: token })
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
}

const signin = async (req, res) => {
    try {
        const { success, data } = validateSignin(req.body);
        if (!success) return res.status(411).json({ message: 'ValidationError', error: data });

        const user = await User.findOne({ username: data.username });
        if (user === null) {
            return res.status(400).json({
                message: "User not found.",
            });
        } else {
            if (await user.validatePassword(data.password)) {
                const token = jwt.sign({ userId: user._id }, JWT_SECRET);
                return res.status(200).json({
                    token: token,
                });
            } else {
                return res.status(400).json({
                    message: "Incorrect Password",
                });
            }
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
}

const updateUser = async (req, res) => {
    try {
        const { success, data } = validateUpdateUser(req.body);
        if (!success) return res.status(411).json({ message: 'ValidationError', error: data });

        const user = await User.findOne({ _id: req.user.userId });

        if (data.password) {
            const hashedPassword = await user.createHash(data.password);
            data.password = hashedPassword;
        }

        await User.updateOne({ _id: req.user.userId }, data);

        res.json({ message: "Updated successfully" });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
}

const bulkUsers = async (req, res) => {
    try {
        const { filter } = req.query;

        const users = await User.find({
            $or: [
                { firstname: { $regex: filter } },
                { lastname: { $regex: filter } }
            ]
        })
            .select('firstname lastname _id');

        return res.json({ users: users });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    signup,
    signin,
    updateUser,
    bulkUsers
}