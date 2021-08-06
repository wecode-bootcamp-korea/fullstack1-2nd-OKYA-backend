import jwt from 'jsonwebtoken';
import { userDao } from '../model';
const TOKEN_KEY = '' + process.env.SECRET_KEY;

const validateToken = async (req, res, next) => {
  try {
    let bearer, token;
    const bearerHeader = req.headers.authorization;

    if (bearerHeader) {
      [bearer, token] = req.headers.authorization.split(' ');
    } else {
      const err = new Error('TOKEN_REQUIRED');
      err.statusCode = 401;
      throw err;
    }

    const { id } = jwt.verify(token, TOKEN_KEY);
    const foundUser = await userDao.findUser(id);

    if (!foundUser) {
      const err = new Error('INVALID_USER');
      err.statusCode = 400;
      throw err;
    }

    req.foundUser = foundUser;
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ message: 'INVALID_TOKEN' });
  }
};

export default validateToken;
