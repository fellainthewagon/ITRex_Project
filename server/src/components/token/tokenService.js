const jwt = require("jsonwebtoken");
const {
  accessSecret,
  refreshSecret,
  accessTokenTTL,
  refreshTokenTTL,
} = require("../../../config");

class TokenService {
  generateTokens(data) {
    const { id, role } = data;

    const refreshToken = jwt.sign({ id, role }, refreshSecret, {
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
      return { payload, error: false };
    } catch (error) {
      return {
        payload: null,
        error: error.name,
      };
    }
  }

  generateNewAccessToken(refreshToken) {
    const { payload } = this.verify(refreshToken, refreshSecret);

    if (!payload) return null;

    const { id, role } = payload;

    return {
      payload,
      accessToken: jwt.sign({ id, role }, accessSecret, {
        expiresIn: accessTokenTTL,
      }),
    };
  }
}

module.exports = new TokenService();
