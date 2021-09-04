const jwt = require("jsonwebtoken");
const { secret, expiresIn } = require("../../../config");

class TokenService {
  generateTokens(data) {
    const refreshToken = jwt.sign(data, "secret", { expiresIn: "30d" });
    const accessToken = jwt.sign(data, secret, { expiresIn });

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
    const payload = this.verify(refreshToken, "secret");
    if (!payload) return null;

    return { payload, token: jwt.sign(payload, secret, { expiresIn }) };
  }
}

module.exports = new TokenService();
