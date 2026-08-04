const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Register User
router.post("/register", async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.json({ message: "User Registered Successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Login User
router.post("/login", async (req, res) => {

    const { email, password } = req.body;

    try {

        const user = await User.findOne({ email, password });

        if(user){
            res.json({
                success:true,
                message:"Login Successful",
                user:user
            });
        }
        else{
            res.json({
                success:false,
                message:"Invalid Email or Password"
            });
        }

    } catch (err) {
        res.status(500).json({ message: err.message });
    }

});

module.exports = router;