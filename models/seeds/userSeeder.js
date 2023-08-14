const User = require('../Users')
const bcrypt = require('bcryptjs')

const user = {
  name: 'Avocado',
  email: 'root@example.com',
  password: '12345678'
}
const db = require('../../config/mongoose')

db.once('open', async () => {
  try {
    console.log('mongodb connected!')
    await User.create({
      name: user.name,
      email: user.email,
      password: bcrypt.hashSync(user.password, bcrypt.genSaltSync(10))
    })
    console.log('UserSeeder done!')
  } catch (error) { console.log(error) }
})
