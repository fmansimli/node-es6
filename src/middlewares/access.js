import { verify, TokenExpiredError, JsonWebTokenError } from "jsonwebtoken";

const access =
  (role = "user") =>
  async (req, res, next) => {
    try {
      const token = req.cookies.authtoken || req.headers.authorization;
      if (token) {
        const decoded = verify(token, process.env.JWT_SECRET);
        if (decoded.roles.includes(role)) {
          req.user = decoded;
          return next();
        }
        return res.status(403).json({ message: "access is denied!!" });
      }

      throw new Error("no token provided..");
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        return res.status(401).json({ message: "token is expired!!!" });
      }
      if (error instanceof JsonWebTokenError) {
        return res.status(401).json({ message: "wrong token!!!" });
      }
      req.session.destroy((err) => {
        if (err) {
          return res.status(401).json({ message: err.message });
        }
      });
      res.status(401).json({ message: error.message });
    }
  };

export default access;
