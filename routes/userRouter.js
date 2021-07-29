import express from 'express';
const router = express.Router();

// router.get('/kakao', passport.authenticate('kakao'));

// router.get(
//   '/kakao/callback',
//   passport.authenticate('kakao', {
//     failureRedirect: '/',
//   }),
//   (res, req) => {
//     res.redirect('/auth');
//   }
// );

router.get('/kakao', passport.authenticate('kakao'));

router.get(
  '/kakao/callback',
  passport.authenticate('kakao', {
    failureRedirect: '/auth/login',
  }),
  (req, res) => {
    // kakaoStrategy에서 done함수가 호출되면 다음 라우터 함수가 실행된다
    res.redirect(`/${req.user.user_id}`);
  }
);

export default router;
