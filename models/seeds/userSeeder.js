const User = require('../Users')
const bcrypt = require('bcryptjs')
const { faker } = require('@faker-js/faker')

const user = {
  email: 'root@example.com',
  password: '12345678'
}
const db = require('../../config/mongoose')

db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', async () => {
  try {
    console.log('mongodb connected!')
    await User.create({
      name: faker.person.firstName(),
      email: user.email,
      password: bcrypt.hashSync(user.password, bcrypt.genSaltSync(10))
    })
    console.log('User seeder done!')
    return process.exit(0)
  } catch (error) {
    console.log(error)
    return process.exit(1)
  }
})
