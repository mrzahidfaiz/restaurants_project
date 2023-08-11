const Joi = require("joi");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const UserDTO = require("../dtos/user");
const JWTService = require("../services/JWTService");
const RefreshTokenSchema = require("../models/token");

const passwordPattren = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,25}$/;

const authController = {
  async register(req, res, next) {
    const userRegisterSchema = Joi.object({
      name: Joi.string().max(30).required(),
      email: Joi.string().email().required(),
      password: Joi.string().pattern(passwordPattren).required(),
      confirmpassword: Joi.ref("password"),
      role: Joi.string().required(),
    });

    const { error } = userRegisterSchema.validate(req.body);
    if (error) {
      return next(error);
    }

    const { name, email, password, role } = req.body;

    try {
      const emailInUse = await User.exists({ email: email });
      if (emailInUse) {
        const error = {
          status: 409,
          message: "Email Already Exists",
        };
        return next(error);
      }
    } catch (error) {
      return next(error);
    }

    const hashPassword = await bcrypt.hash(password, 10);

    let accessToken;
    let refreshToken;
    let user;
    try {
      const newRegisteredUser = new User({
        name: name,
        email: email,
        password: hashPassword,
        role: role
      });

      user = await newRegisteredUser.save();

      accessToken = JWTService.signAccessToken({ _id: user._id }, "30m");
      refreshToken = JWTService.signRefreshToken({ _id: user._id }, "60m");
    } catch (error) {
      return next(error);
    }

    await JWTService.storeRefreshToken(refreshToken, user._id);

    res.cookie("accessToken", accessToken, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
    });

    res.cookie("refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
    });

    const userDto = new UserDTO(user);

    res.status(201).json({
      user: userDto,
      message: "User Successfully Registered",
      auth: true,
    });
  },
  // login
  async login(req, res, next) {
    const userLoginSchema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string()
        .pattern(passwordPattren, "Password is not match")
        .required(),
    });

    const { error } = userLoginSchema.validate(req.body);
    if (error) {
      return next(error);
    }

    const { email, password } = req.body;

    let accessToken;
    let refreshToken;
    let user;
    try {
      user = await User.findOne({ email: email });
      if (!user) {
        const error = {
          status: 401,
          message: "Invalid Email",
        };
        return next(error);
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        const error = {
          status: 401,
          message: "Invalid Password",
        };
        return next(error);
      }
    } catch (error) {
      return next(error);
    }

    accessToken = JWTService.signAccessToken({ _id: user._id }, "30m");
    refreshToken = JWTService.signRefreshToken({ _id: user._id }, "60m");

    try {
      await RefreshTokenSchema.updateOne(
        {
          _id: user._id,
        },
        {
          token: refreshToken,
        },
        {
          upsert: true,
        }
      );
    } catch (error) {
      return next(error);
    }

    res.cookie("accessToken", accessToken, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
    });

    res.cookie("refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
    });

    const userDto = new UserDTO(user);

    return res
      .status(200)
      .json({ user: userDto, message: "Login Successfully", auth: true });
  },
  // logout
  async logout(req, res, next) {
    const { refreshToken } = req.cookies;
    try {
      await RefreshTokenSchema.deleteOne({ token: refreshToken });
    } catch (error) {
      return next(error);
    }

    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    res
      .status(200)
      .json({ user: null, message: "Successfully Logout", auth: false });
  },
  // refresh
  async refresh(req, res, next) {
    const originalRefreshToken = req.cookies.refreshToken;

    let id;
    try {
      id = JWTService.verifyRefreshToken(originalRefreshToken)._id;
    } catch (e) {
      const error = {
        status: 401,
        message: "Unauthorized",
      };
      return next(error);
    }

    try {
      const match = RefreshTokenSchema.findOne({
        _id: id,
        token: originalRefreshToken,
      });
      if (!match) {
        const error = {
          status: 401,
          message: "Unauthorized",
        };
        return next(error);
      }
    } catch (error) {
      return next(error);
    }

    try {
      const accessToken = JWTService.signAccessToken({ _id: id }, "30m");
      const refreshToken = JWTService.signRefreshToken({ _id: id }, "60m");

      await RefreshTokenSchema.updateOne({ _id: id }, { token: refreshToken });

      res.cookie("accessToken", accessToken, {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
      });

      res.cookie("refreshToken", refreshToken, {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
      });
    } catch (error) {
      return next(error);
    }

    const user = await User.findOne({ _id: id });

    const userDto = new UserDTO(user);

    return res.status(200).json({ user: userDto, auth: true });
  },

  async getAllUsers(req, res, next) {
    try {
      const users = await User.find({});

      const allUsers = [];

      for (let i = 0; i < users.length; i++) {
        const dto = new UserDTO(users[i]);
        allUsers.push(dto);
      }

      return res.status(200).json({ users: allUsers });
    } catch (error) {
      return next(error);
    }
  },
};

module.exports = authController;
