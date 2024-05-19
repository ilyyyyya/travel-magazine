const authController = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register
authController.post("/register", async (req, res) => {
    try{
        const isExist = await User.findOne({email: req.body.email});
        if(isExist){
            return res.status(400).json({message: "Пользователь с таким email уже существует"});
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const user = await User.create({...req.body, password: hashedPassword});
        await user.save();

        const {password,...others} = user._doc;
        console.log(others);
        const token = createToken(others);
        console.log(token)

        return res.status(201).json({ others, token });

    }catch(err){
        return res.status(500).json(err.message);
    }

})

// Login
authController.post("/login", async (req, res) => {
    try{
        const user = await User.findOne({email: req.body.email});

        if(!user){
            return res.status(404).json({message: "Пользователь не найден"});
        }

        const comparePassword = await bcrypt.compare(req.body.password, user.password);

        if(!comparePassword){
            return res.status(404).json({message: "Ошибка"});
        }

        const {password,...others} = user._doc;
        const token = createToken(others);

        return res.status(200).json({ others, token });

    }catch(err){
        return res.status(500).json(err.message);
    }
})


//createToken
const createToken = (user) => {
    const payload = {
        id: user._id.toString(),
        isAdmin: user.isAdmin,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET);

    return token;
}

module.exports = authController;
