// console.log(1 + 2);
// const name = "matthew";
// function where() {
//   console.log("hi");
// }
// where();
const { hashPassword } = require("./helpers/bcrypt");
const { createToken } = require("./helpers/jwt");
// const data = require("./categories.json");
// console.log(data);

const payload = {
  id: 1,
};
let data = "123";
console.log(data.toString());
// console.log(createToken(payload));
console.log(hashPassword(data));
