const jwt = require("jsonwebtoken");
const RefreshTokenSchema = require("../models/token");
const {
  ACCESS_SECRECT_TOKEN,
  REFRESH_SECRECT_TOKEN,
} = require("../config/index");

class JWTService {
  static signAccessToken(payload, expiryTime) {
    return jwt.sign(payload, ACCESS_SECRECT_TOKEN, { expiresIn: expiryTime });
  }
  static signRefreshToken(payload, expiryTime) {
    return jwt.sign(payload, REFRESH_SECRECT_TOKEN, { expiresIn: expiryTime });
  }
  static verifyAccessToken(token) {
    return jwt.verify(token, ACCESS_SECRECT_TOKEN);
  }
  static verifyRefreshToken(token) {
    return jwt.verify(token, REFRESH_SECRECT_TOKEN);
  }
  static async storeRefreshToken(token, userId) {
    try {
      const newToken = new RefreshTokenSchema({
        token: token,
        userId: userId,
      });
      await newToken.save();
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = JWTService;
