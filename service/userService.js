import { userDao } from '../model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const TOKEN_KEY = '' + process.env.SECRET_KEY;

const userSignUp = async (
  email,
  password,
  name,
  phoneNumber,
  roadAddress,
  detailAddress,
  zipCode
) => {
  const existingEmail = await userDao.getEmail(email);

  if (existingEmail.length) {
    const error = new Error('ALREADY_EXISTING_USER');
    error.statusCode = 409;
    throw error;
  }

  const saltRounts = 10;
  const salt = await bcrypt.genSalt(saltRounts);
  const hashedPassword = await bcrypt.hash(password, salt);

  return await userDao.createUser(
    email,
    hashedPassword,
    name,
    phoneNumber,
    roadAddress,
    detailAddress,
    zipCode
  );
};

const userLogin = async (email, password) => {
  const findUsers = await userDao.getUsers(email);

  if (!findUsers.length) {
    const error = new Error('INVALID_USER');
    error.statusCode = 401;
    throw error;
  }

  const { id, password: hashedPassword } = findUsers[0];
  const comparedPassword = await bcrypt.compare(password, hashedPassword);

  if (!comparedPassword) {
    const err = new Error('INVALID_USER');
    err.statusCode = 401;
    throw err;
  }
  const token = jwt.sign({ id }, TOKEN_KEY, { expiresIn: '1h' });

  return token;
};

export default { userSignUp, userLogin };
