const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (data) => {
  const { name, email, password, role } = data;

  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error("User already exists");

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword, // ✅ IMPORTANT
    role,
  });

  return user;
};
const login = async (data) => {
  const { email, password } = data;

  const user = await User.findOne({ email });
  console.log("USER FROM DB:", user);

  if (!user) throw new Error("User not found");

  console.log("Entered password:", password);
  console.log("Stored password:", user.password);

  const isMatch = await bcrypt.compare(password, user.password);
  console.log("Password match:", isMatch);

  if (!isMatch) throw new Error("Invalid credentials");

  return user;


};

module.exports = {
  register,
  login,
};