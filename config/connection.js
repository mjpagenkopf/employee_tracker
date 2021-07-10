const mysql = require('mysql');

// Enable access to .env variables
require('dotenv').config();

const connection = mysql.createConnection({
    host: 'localhost',

    user: 'root',

    password: process.env.DB_PASSWORD,

    database: 'employee_db',
});

module.exports = connection;




// connection.query(
//     "SELECT * FROM employee ORDER BY last_name ASC",
//     (err, employees) => {
//       if (err) return;
//       connection.query("SELECT * FROM role", (err, roles) => {
//         if (err) return;
//         inquirer
//           .prompt([
//             {
//               message: "Select an employee whose role you'd like to update:",
//               name: "empToUpd",
//               type: "list",
//               choices: employees.map(
//                 ({ last_name, first_name }) => `${last_name}, ${first_name}`
//               ),
//             },
//             {
//               message: "To which role should they be updated:",
//               name: "roleToUpd",
//               type: "list",
//               choices: roles.map(({ title }) => `${title}`),
//             },
//           ])
//           .then(({ empToUpd, roleToUpd }) => {
//             const [last, first] = empToUpd.split(", ");
//             const employeeId = employees.filter(
//               (el) => el.last_name === last && el.first_name === first
//             )[0].id;
//             const roleId = roles.filter((el) => el.title === roleToUpd)[0].id;
//             connection.query(
//               `UPDATE employee SET role_id=${roleId} WHERE id=${employeeId}`,
//               (err, finished) => {
//                 console.log(finished);
//                 process.exit(0);
//               }
//             );
//           });
//       });
//     }