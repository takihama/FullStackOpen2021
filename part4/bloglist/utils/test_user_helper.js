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

const auxInvalidUser = {
  user: 'daniel',
  password: 'carlos'
}

const auxInvalidPassoword = {
  username: 'pepito',
  password: 'ma'
}

const auxInvalidUsername = {
  username: 'jo',
  password: 'mariana'
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialUser,
  auxInvalidUser,
  auxInvalidPassoword,
  auxInvalidUsername,
  auxUser,
  usersInDb
}