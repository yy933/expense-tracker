const bcrypt = require('bcryptjs')
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Users = require('../models/Users')
module.exports = (app) => {
  // 初始化 Passport 模組
  app.use(passport.initialize());
  app.use(passport.session());
  // 設定本地登入策略
  passport.use(
    new LocalStrategy({ usernameField: "email", passReqToCallback: true }, (req, email, password, done) => {
      Users.findOne({ email })
        .then((user) => {
          if (!user) {
            return done(
              null,
              false,
              req.flash("warning_msg", "這個Email尚未註冊")
            );
          }
          return bcrypt.compare(password, user.password).then(isMatch => {if(!isMatch){
            return done(
              null,
              false,
              req.flash("warning_msg", "帳號或密碼錯誤!")
            );
          }
          return done(null, user);
        })
      })
        .catch((err) => done(err, false));
    })
  );
  // 設定序列化與反序列化
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    Users.findById(id)
      .lean()
      .then((user) => done(null, user))
      .catch((err) => done(err, null));
  });
};