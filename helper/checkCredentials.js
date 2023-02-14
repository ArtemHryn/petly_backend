const bcrypt = require("bcrypt");
const { ErrorConstructor } = require("./errors");

const checkCredentials = async (user, password) => {
  const isCorrectCredentials =
    !user && !(await bcrypt.compare(password, user.password));
  if (isCorrectCredentials) {
    throw new ErrorConstructor(401, `Email or password is wrong`);
  }
};

module.exports = { checkCredentials };
