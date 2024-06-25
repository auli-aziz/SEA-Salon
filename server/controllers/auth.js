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
