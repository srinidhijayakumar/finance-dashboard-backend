const bcrypt = require("bcryptjs");
const User = require("../models/User");

exports.register = async (data) => {
  const { name, email, password, role } = data;

  if (!password) {
    throw new Error("Password required");
  }

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

  if (!passwordRegex.test(password)) {
    throw new Error(
      "Password must be 8+ chars, include uppercase, lowercase, and number"
    );
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error("User already exists");

  const hashedPassword = await bcrypt.hash(password, 10);

  return await User.create({
    name,
    email,
    password: hashedPassword,
    role,
  });
};

exports.login = async (data) => {
  const { email, password } = data;

  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  return { message: "Login successful" };
};