const User = require('../models/user')

const initialUser = {
  username: 'mluukkai',
  name: 'Matti Luukkainen',
  password: 'salainen',
}

const auxUser = {
  username: 'takihama',
  name: 'Daniel Calderon',
  password: 'danielito'
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialUser,
  auxUser,
  usersInDb
}