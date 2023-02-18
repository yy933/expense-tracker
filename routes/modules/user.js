const express = require("express");
const router = express.Router();
const Users = require('../../models/Users')
const passport = require('passport')
router.get("/login", (req, res, next) => {
  res.render("login");
});
router.post('/login', passport.authenticate('local',{
  successRedirect: '/',
  failureRedirect: '/user/login',
  failureFlash: true
}))
router.get('/logout', (req, res)=>{
  req.logout()
  req.flash("success_msg", "你已經成功登出。");
  res.redirect('/user/login')
})
router.get('/register', (req, res, next)=>{
  res.render('register')
})
router.post('/register', (req, res, next)=>{
  const { name, email, password, confirmPassword } = req.body
  const errors = [];
  if (!name || !email || !password || !confirmPassword) {
    errors.push({ message: "所有欄位都是必填。" });
  }
  if (password !== confirmPassword) {
    errors.push({ message: "密碼與確認密碼不相符！" });
  }
  if (errors.length) {
    return res.render("register", {
      errors,
      name,
      email,
      password,
      confirmPassword,
    });
  }
  Users.findOne({email}).then(user=>{
    if (user){
      console.log('User already exists!')
      errors.push({ message: "這個 Email 已經註冊過了，請登入" });
      return res.render("register", {
        name,
        email,
        password,
        confirmPassword,
      });
    } else{
      return Users.create({
        name, 
        email,
        password
      })
      .then(() => res.redirect('/') )
      .catch(error => console.log(error))
    }
  })
  .catch(error => console.log(error))
})
module.exports = router;
