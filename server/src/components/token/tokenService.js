const jwt = require("jsonwebtoken");
const {
  accessSecret,
  refreshSecret,
  accessTokenTTL,
  refreshTokenTTL,
} = require("../../../config");

class TokenService {
  generateTokens(data) {
    const refreshToken = jwt.sign(data, refreshSecret, {
      expiresIn: refreshTokenTTL,
    });
    const accessToken = jwt.sign(data, accessSecret, {
      expiresIn: accessTokenTTL,
    });

    return { refreshToken, accessToken };
  }

  verify(token, tokenSecret) {
    try {
      const payload = jwt.verify(token, tokenSecret);
      return { payload, expired: false };
    } catch (error) {
      return {
        payload: null,
        expired: error.message === "jwt expired",
      };
    }
  }

  generateNewAccessToken(refreshToken) {
    const { payload } = this.verify(refreshToken, refreshSecret);
    if (!payload) return null;

    return {
      payload,
      accessToken: jwt.sign(payload, accessSecret, {
        expiresIn: accessTokenTTL,
      }),
    };
  }
}

module.exports = new TokenService();
