const auth = (req, res, next) => {
  const { refreshToken, accessToken } = req.cookies;

  if (!refreshToken || !accessToken) {
    const error = {
      status: 401,
      message: "Unauthorized",
    };
    return next(error);
  }

  next();
};

module.exports = auth;
