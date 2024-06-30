const { sign, verify } = require('jsonwebtoken');
const bcrypt = require("bcryptjs");


exports.createJSONToken = (_id, role) => {
  return sign({ id: _id, role: role }, process.env.SECRET_TOKEN, { expiresIn: '1h' });
}

exports.validateJSONToken = (token) => {
  return verify(token, process.env.SECRET_TOKEN);
}

exports.isValidPassword = (password, storedPassword) => {
  return bcrypt.compare(password, storedPassword);
}

exports.hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
}