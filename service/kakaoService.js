import { kakaoDao } from '../model';
import axios from 'axios';
import jwt from 'jsonwebtoken';
const TOKEN_KEY = '' + process.env.SECRET_KEY;

const getKakaoId = async (accessToken) => {
  try {
    const kakaoUserInfo = await axios({
      method: 'POST',
      url: 'https://kapi.kakao.com/v2/user/me',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const kakaoId = kakaoUserInfo.data.kakao_account.email
      ? kakaoUserInfo.data.kakao_account.email
      : null;

    return kakaoId;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

const kakaoLogin = async (kakaoId) => {
  try {
    const existingUser = await kakaoDao.findUserByEmail(kakaoId);

    if (existingUser) {
      return await makeToken(existingUser.id);
    }

    const createdUser = await kakaoDao.saveUserByKakao(kakaoId);
    return await makeToken(createdUser.id);
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

const makeToken = async (id) => {
  const token = jwt.sign({ id }, TOKEN_KEY, { expiresIn: '1h' });

  return token;
};

export default {
  getKakaoId,
  kakaoLogin,
  makeToken,
};
