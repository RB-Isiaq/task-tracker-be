const { BadRequestError, UnauthenticatedError } = require("../errors");
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");

const register = async (req, res) => {
  const { username } = req.body;
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    throw new BadRequestError("Username already exists, try another one");
  }
  const user = await User.create({ ...req.body });
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({
    user: {
      username: user.username,
      msg: `User created successfully, please log in ${user.name}.`,
    },
    token,
    status: StatusCodes.CREATED,
  });
};
const login = async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);
  if (!username || !password) {
    throw new BadRequestError("Please provide username and password");
  }
  const user = await User.findOne({ username });

  if (!user) {
    throw new UnauthenticatedError("Invalid credentials");
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid password");
  }

  const token = user.createJWT();

  res.status(StatusCodes.OK).json({
    user: { name: user.name, msg: "User logged in successfully" },
    token,
    status: StatusCodes.OK,
  });
};

module.exports = {
  register,
  login,
};
