const bcrypt = require('bcrypt');
const { ErrorConstructor } = require('./errors');

const checkCredentials = async (user, password) => {
  if (!user) {
    throw new ErrorConstructor(401, 'Email or password is wrong');
  }
  if (!(await bcrypt.compare(password, user.password))) {
    throw new ErrorConstructor(401, 'Email or password is wrong');
  }
};

module.exports = { checkCredentials };
