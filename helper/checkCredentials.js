const bcrypt = require('bcrypt');
const { ErrorConstructor } = require('./errors');

const checkCredentials = async (user, password) => {
  if (!user) {
    throw new ErrorConstructor(401, 'Email or password is wrong');
  }
  const hashPass = await bcrypt.hash(password, 10)
  // if (!(await bcrypt.compare(password, user.password))) {
  //   throw new ErrorConstructor(401, 'Email or password is wrong');
  // }
  if (hashPass !== user.password) {
    throw new ErrorConstructor(401, 'Email or password is wrong');
  }
};

module.exports = { checkCredentials };
