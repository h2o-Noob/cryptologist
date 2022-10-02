const ErrorHandler = require("../utils/errorHandler");
const userSchema = require("../models/UserModel");
const sendtoken = require("../utils/jwt");

// register user
exports.registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    console.log(name, email, password)
    const User = await userSchema.create({
      name,
      email,
      password,
      avatar: {
        public_id: "sample id",
        url: "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png",
      },
    });
    sendtoken(User, 201, res);

  } catch (err) {
    if (err.code === 11000) {
      let dup = Object.keys(err.keyValue)[0];
      return next(
        new ErrorHandler(`a user with that ${dup} already exists`, 400)
      );
    }
    return next( new ErrorHandler(err))
  }
};

// login function
exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new ErrorHandler("please enter email and password", 400));
    }

    const User = await userSchema.findOne({ email }).select("+password");

    if (!User) {
      return next(
        new ErrorHandler("please enter correct email and password", 401)
      );
    }

    const isPasswordMatched = await User.comparePasswords(password);

    if (!isPasswordMatched) {
      return next(
        new ErrorHandler("please enter correct email and password", 401)
      );
    }

    sendtoken(User, 200, res);
  } catch (err) {
    res.status(400).json(err.message);
  }
};

// user details
exports.getUserDetails = async (req, res, next) => {
  try {
    const user = await userSchema.findById(req.body.id);

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

// register wallet 
exports.registerWallet = async (req, res, next) => {
  try {
    const { id } = req.body;

    const User = await userSchema.create({
      cryptoWalletId: id
    });
    sendtoken(User, 201, res);

  } catch (err) {
    if (err.code === 11000) {
      let dup = Object.keys(err.keyValue)[0];
      return next(
        new ErrorHandler(`a user with that ${dup} already exists`, 400)
      );
    }
    return next( new ErrorHandler(err))
  }
};

// add wallet
exports.addWallet = async (req, res, next) => {
  try {
    const userId = req.body.userId
    const walletData = {
      cryptoWalletId: req.body.walletId
    };

    const User = await userSchema.findByIdAndUpdate(userId , walletData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({
      success: true,
      User,
    });
  } catch (error) {
    res.status(400).json(error.message);
  }
};