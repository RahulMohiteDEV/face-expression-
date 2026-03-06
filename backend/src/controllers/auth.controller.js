const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function registerUser(req, res) {
    const { username, email, password } = req.body;

    const isuseralreadyexists = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    })

    if (isuseralreadyexists) {
        return res.status(400).json({
            message: "User with this username or email already exists"
        })
    }

    const hash = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
        username,
        email,
        password: hash
    })

    const token = jwt.sign({
        id: newUser._id,
        username: newUser.username,
    },
        process.env.JWT_SECRET,
        {
            expiresIn: "5h"
        }
    )

    res.cookie("token", token)

    return res.status(201).json({
        message: "User registered successfully",
        user: {
            id: newUser._id,
            username: newUser.username,
            email: newUser.email
        }
    })

}

async function loginUser(req, res) {
    const { username, email, password } = req.body;

    const user = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    }).select("+password")

    if (!user) {
        return res.status(400).json({
            message:"Invalid credential"
        })
    }
    
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
        return res.status(400).json({
            message:"Invalid credential"
        })
    }

   const token = jwt.sign(
        {
            id: user._id,
            username: user.username
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "5h"
        }
    )

    res.cookie("token", token)
    return res.status(200).json({
        message: "User logged in successfully",
        user:{
            id: user._id,
            username: user.username,
            email: user.email
        }
    })



}



module.exports = {
    registerUser,
    loginUser
};

