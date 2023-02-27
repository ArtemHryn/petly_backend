const bcryptjs = require('bcryptjs');
const { ErrorConstructor } = require('./errors');

const checkCredentials = async (user, password) => {
  if (!user) {
    throw new ErrorConstructor(401, 'Email or password is wrong');
  }
  if (!(await bcryptjs.compare(password, user.password))) {
    throw new ErrorConstructor(401, 'Email or password is wrong');
  }

};

module.exports = { checkCredentials };
