const { createJSONToken, isValidPassword, hashPassword } = require("../util/auth");
const User = require("../models/User");
const validator = require("validator");

exports.signup = async (req, res, next) => {
  const data = req.body;
  let errors = {};
  try {
    if (!data.fullName || !data.email || !data.phoneNumber || !data.password) {
      throw Error("All fields must be filled");
    }

    if (!validator.isEmail(data.email)) {
      errors.email = "Invalid email.";
    } else {
      const existingUser = await User.findOne({ email: data.email });
      if (existingUser) {
        errors.email = "Email already exists.";
      }
    }

    if (!validator.isStrongPassword(data.password)) {
      errors.password = "Invalid password. Password too weak.";
    }

    if (Object.keys(errors).length > 0) {
      return res.status(422).json({
        message: "User signup failed due to validation errors: ",
        errors,
      });
    }

    const hashedPass = await hashPassword(data.password)

    const createdUser = new User({
      fullName: data.fullName,
      email: data.email,
      phoneNumber: data.phoneNumber,
      password: hashedPass,
      role: "customer",
    });
    createdUser.save();

    const authToken = createJSONToken(createdUser._id, createdUser.role);
    res
      .status(201)
      .json({ message: "User created.", user: createdUser, token: authToken });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(401).json({ message: "All fields must be filled." });
  }

  let user;
  try {
    user = await User.findOne({ email });
    const pwIsValid = await isValidPassword(password, user.password);
    
    if(!pwIsValid) {
      throw Error();
    }
  } catch (error) {
    return res.status(422).json({
      message: "Invalid credentials.",
      errors: { credentials: "Invalid email or password entered." },
    });
  }

  const token = createJSONToken(user._id, user.role);
  res.json({ token: token, role: user.role });
};

exports.getProfile = async (req, res) => {
  const id = req.user.id;
  try {
    const user = await User.findOne({ _id: id });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found.", payload: user });
    }
    return res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.resetPassword = async (req, res, next) => {
  const id = req.user.id;
  const { oldPassword, newPassword } = req.body;
  let errors = {};

  try {
    if (!oldPassword || !newPassword) {
      throw Error("Email, old password, and new password must be provided.");
    }

    if (!validator.isStrongPassword(newPassword)) {
      errors.password = "Invalid password. Password too weak.";
    }

    if (Object.keys(errors).length > 0) {
      return res.status(422).json({
        message: "Password reset failed due to validation errors: ",
        errors,
      });
    }

    const user = await User.findOne({ _id: id });
    if (!user) {
      return res.status(404).json({
        message: "User not found.",
        errors: { email: "No user found with this email." },
      });
    }

    const pwIsValid = await isValidPassword(oldPassword, user.password);
    if (!pwIsValid) {
      return res.status(422).json({
        message: "Invalid old password.",
        errors: { oldPassword: "The old password entered is incorrect." },
      });
    }

    const hashedPass = await hashPassword(newPassword);
    user.password = hashedPass;
    await user.save();

    res.status(200).json({ message: "Password reset successfully." });
  } catch (error) {
    next(error);
  }
};