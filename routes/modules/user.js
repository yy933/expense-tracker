const express = require("express");
const router = express.Router();
const Users = require('../../models/Users')
const passport = require('passport')
router.get("/login", (req, res, next) => {
  res.render("login");
});
router.post('/login', passport.authenticate('local',{
  successRedirect: '/',
  failureRedirect: '/user/login'
}))
router.get('/register', (req, res, next)=>{
  res.render('register')
})
router.post('/register', (req, res, next)=>{
  const { name, email, password, confirmPassword } = req.body
  Users.findOne({email}).then(user=>{
    if (user){
      console.log('User already exists!')
      res.render('register',{
        name,
        email,
        password,
        confirmPassword
      })
    }else{
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
