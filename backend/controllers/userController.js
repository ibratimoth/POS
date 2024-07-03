const userModel = require("../models/userModel");

// login controller
const loginController = async (req, res) => {
  try {
    const { userId, password } = req.body;

    // Assuming userModel is your Mongoose model for users
    const user = await userModel.findOne({ userId, password, verified: true });

    if (user) {
      // If user is found and verified
      res.status(200).json(user); // Sending the user data as response
    } else {
      // If user is not found or not verified
      res.status(401).json({
        message: "Login failed. User not found or not verified.",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

//register controller
const registerController = async (req, res) => {
  try {
    const newUser = new userModel({...req.body, verified : true});
    await newUser.save();
    res.status(201).send("User registered Successfully!");
  } catch (error) {
    res.status(400).send("error", error);
    console.log(error);
  }
};

module.exports = {
  loginController,
  registerController
};
