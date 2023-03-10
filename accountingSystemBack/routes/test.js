// const a = new Promise((resolve, reject) => {
//   while (Math.random() * 11 <= 5) {
//     console.log("a is running");
//   }
//   resolve("a");
// });
// const b = new Promise((resolve, reject) => {
//   while (Math.random() * 11 <= 5) {
//     console.log("b is running");
//   }
//   resolve("b");
// });
// const c = new Promise((resolve, reject) => {
//   while (Math.random() * 11 <= 5) {
//     console.log("c is running");
//   }
//   resolve("c");
// });
const db = require("../src/db");
const e = async function () {
  let temp = "";
  await Promise.race([
    new Promise((resolve, reject) => {
      db.query("SELECT * FROM oil_sale", (err, result) => {
        resolve("c");
      });
    }),
    new Promise((resolve, reject) => {
      db.query("SELECT * FROM waveBox", (err, result) => {
        resolve("a");
      });
    }),
    new Promise((resolve, reject) => {
      db.query("SELECT * FROM reserves", (err, result) => {
        resolve("b");
      });
    }),
  ]).then((msg) => (temp = msg));
  console.log(temp);
};
db.end();
e();
