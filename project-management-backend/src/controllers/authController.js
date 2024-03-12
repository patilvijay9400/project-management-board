const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { v4: uuidv4 } = require("uuid");
const secretKey = uuidv4();

console.log("Secret Key : ", secretKey);

// register new user
const signup = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    console.log("user body=", { username, email, password, role });
    // check if user with email is already existing
    const existingUser = await User.findOne({ where: { email } });
    console.log("existingUser=", existingUser);
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    // create new user
    const newUser = await User.create({ username, email, password, role });
    console.log("newUser=", newUser);

    res
      .status(201)
      .json({ message: "User created successfully!", user: newUser });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error creating the user");
  }
};

//  login to application
const login = async (req, res) => {
  const { email, password } = req.body;
  // check if email provided is exist

  const user = await User.findOne({ where: { email } });

  if (!user) {
    return res.status(401).json({ message: "user not found" });
  }

  //  validate password
  isPasswordValid = await bcrypt.compare(password, user.password);
  if (isPasswordValid) {
    // generate token and save it in cookies
    const token = jwt.sign({ id: user.id, email: user.email }, secretKey, {
      expiresIn: "3h",
    });
    res.status(200).json({ message: "User logged in successfully", token });
  } else {
    res.status(400).json({ message: "Invalid Password!" });
  }
};

const logout = (req, res) => {
  try {
    res.clearCookie("jwtToken"); // Clear JWT token cookie
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to logout" });
  }
};

module.exports = {
  signup,
  login,
  logout,
};
