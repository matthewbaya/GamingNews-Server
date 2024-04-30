const bcrypt = require("bcrypt");

const hashPassword = (password) => {
  return bcrypt.hashSync(password.toString(), 10);
};
const comparePassword = (password, passwordDb) => {
  return bcrypt.compareSync(password, passwordDb);
};
module.exports = { hashPassword, comparePassword };
