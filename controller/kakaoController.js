import { kakaoService } from '../service';

const kakaoLogin = async (req, res) => {
  try {
    const auth = req.headers.authorization;
    const accessToken = auth.replace('Bearer ', '');
    const kakaoId = await kakaoService.getKakaoId(accessToken);

    if (!kakaoId) {
      return res.status(401).json({ message: 'INVALID_TOKEN' });
    }
    const token = await kakaoService.kakaoLogin(kakaoId);
    return res.status(200).json({ message: '카카오와 함께 해보세요.', token });
  } catch (err) {
    console.log(err);
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

export default { kakaoLogin };
