const express = require('express');
const router = express.Router();
const passport = require('passport');
const KakaoStrategy = require('passport-kakao').Strategy;

passport.use(
  'kakao',
  new KakaoStrategy(
    {
      clientID: '15bc2e36d9c1d93a221ff04d2a4a4dc9',
      callbackURL: '/auth/kakao/callback', // 위에서 설정한 Redirect URI
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log(`accessToken : '${accessToken}'`);
      console.log(`refreshToken : '${refreshToken}'`);
      console.log(profile);
    }
  )
);

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

export default router;
