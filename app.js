const connection = require("./config/connection");
const inquirer = require("inquirer");
const table = require("inquirer-table-prompt");
// const { response } = require("express");
require("console.table"); //for calling tables in console

connection.connect((err) => {
  if (err) throw err;
  mainQuestion();
});
//prompts user for initial task
const mainQuestion = () => {
  inquirer
    .prompt({
      type: "list",
      message: "What do you want to do?",
      name: "entry",
      choices: [
        "Update employee role?",
        "View employees?",
        "View roles?",
        "View departments?",
        "Add employee, role, or department?",
        "Quit?",
      ],
    })
    .then((userChoice) => {
      switch (userChoice.entry) {
        case "Update employee role?":
          updateRole();
          break;

        case "View employees?":
          viewEmps();
          break;

        case "View roles?":
          viewRoles();
          break;

        case "View departments?":
          viewDeps();
          break;

        case "Add employee, role, or department?":
          addToTeam();
          break;

        default:
          process.exit();
      }
    });
};

// mainQuestion();
const viewEmps = () => {
  connection.query(
    "SELECT * FROM employee JOIN role WHERE employee.role_id = role.id ORDER BY last_name ASC",
    (err, data) => {
    if (err) return;
      console.table(data);
      mainQuestion();
    }
  );
};

const viewRoles = () => {
  connection.query(
    "SELECT * FROM role ORDER BY id ASC",
    //JOIN department ON role.department_id = department.id
    (err, data) => {
      if (err) return;
      console.table(data);
      mainQuestion();
    }
  );
};

const viewDeps = () => {
  connection.query("SELECT * FROM department", (err, data) => {
      if (err) return;
    console.table(data);
    mainQuestion();
  });
};

//adding employee, role or department
const addToTeam = () => {
  inquirer
    .prompt({
      name: "add",
      type: "list",
      message: "Which would you like to add?",
      choices: ["employee", "role", "department", "quit"],
    })
    .then((answer) => {
      switch (answer.add) {
        case "employee":
          addEmployee();
          break;

        case "role":
          addRole();
          break;

        case "department":
          addDepartment();
          break;

        default:
          process.exit();
      }
    });
};

function addEmployee() {
  connection.query("SELECT * FROM role", (err, data) => {
    let roleChoices = data.map((role) => {
      return { name: `${role.title}`, value: role.id };
    });
    inquirer
      .prompt([
        {
          message: "First Name?",
          name: "firstName",
          type: "input",
        },
        {
          message: "Last Name?",
          name: "lastName",
          type: "input",
        },
        {
          message: "Role ID?",
          name: "roleId",
          type: "list",
          choices: roleChoices,
        },
        {
          message: "Manager ID?",
          name: "managerId",
          type: "list",
          choices: [1, 2, 3, 4, 5],
        },
      ])
      .then((answers) => {
        connection.query(
          "INSERT INTO employee SET ?",
          {
            first_name: answers.firstName,
            last_name: answers.lastName,
            role_id: answers.roleId,
            manager_id: answers.managerId,
          },
          (err) => {
            if (err) throw err;
            mainQuestion();
          }
        );
      });
  });
}

function addRole() {
  var departmentChoices;
  connection.query("SELECT * FROM department", (err, data) => {
    departmentChoices = data.map((department) => {
      return { name: `${department.name}`, value: department.id };
    });
    inquirer
      .prompt([
        {
          message: "Title of role?",
          name: "roleTitle",
          type: "input",
        },
        {
          message: "Salary of role?",
          name: "roleSalary",
          type: "number",
        },
        {
          message: "Department ID of role?",
          name: "roleDepId",
          type: "list",
          choices: departmentChoices,
        },
      ])
      .then((answers) => {
        connection.query(
          "INSERT INTO role SET ?",
          {
            title: answers.roleTitle,
            salary: answers.roleSalary,
            department_id: answers.roleDepId,
          },
          (err) => {
            if (err) throw err;
            mainQuestion();
          }
        );
      });
  });
}

function addDepartment() {
  connection.query("SELECT * FROM department", (err, data) => {
    departmentChoices = data.map((department) => {
      return { name: `${department.name}`, value: department.id };
    });
    inquirer
      .prompt([
        {
          message: "Name of department?",
          name: "depName",
          type: "input",
        },
      ])
      .then((answers) => {
        connection.query(
          "INSERT INTO department SET ?",
          {
            name: answers.depName,
          },
          (err) => {
            if (err) throw err;
            mainQuestion();
          }
        );
      });
  });
}

const updateRole = () => {

  connection.query(
    "SELECT * FROM employee ORDER BY last_name ASC",
    (err, employees) => {
      if (err) return;
      connection.query("SELECT * FROM role", (err, roles) => {
        if (err) return;
        inquirer
          .prompt([
            {
              message: "Select an employee whose role you'd like to update:",
              name: "empToUpd",
              type: "list",
              choices: employees.map(
                ({ last_name, first_name }) => `${last_name}, ${first_name}`
              ),
            },
            {
              message: "To which role should they be updated:",
              name: "roleToUpd",
              type: "list",
              choices: roles.map(({ title }) => `${title}`),
            },
          ])
          .then(({ empToUpd, roleToUpd }) => {
            const [last, first] = empToUpd.split(", ");
            const employeeId = employees.filter(
              (el) => el.last_name === last && el.first_name === first
            )[0].id;
            const roleId = roles.filter((el) => el.title === roleToUpd)[0].id;
            connection.query(
              `UPDATE employee SET role_id=${roleId} WHERE id=${employeeId}`,
              (err, finished) => {
                console.log(finished);
                // process.exit(0);
                mainQuestion();
              }
            );
          });
      });
    }
  );
}; 










  //async await throw catch from Sam:
            // const dummyQuery = async () => {
            //     try {
            //         const employees = await connection.query(
            //             "SELECT * FROM employee ORDER BY last_name ASC"
            //           );
            //           if (employees.length <= 0 || !employees) throw new Error("employee_error")
            //           const roles = await connection.query("SELECT * FROM role");
            //           if (roles.length <= 0 || !roles) throw new Error("roles_error")
            //           const response = await inquirer.prompt([
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
            //           ]);
            //           if(!response) throw new Error("response_error")
            //            await connection.query(
            //             `UPDATE employee SET role_id=${response.roleToUpd} WHERE id=${response.empToUpd}`)
            //     } catch (error) {
            //        console.log(error.message)
            //     }
            
            // };

//     connection.query('SELECT * FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id', (err, data) => {
//         if (err) throw err;
//         var employeeChoices = data.map(employee => {
//             return {name: `${employee.first_name} ${employee.last_name}`, value: employee.id};
//         });

//     connection.query('SELECT * FROM role INNER JOIN department ON role.department_id = department.id INNER JOIN employee on employee.role_id = role.id', (err, data) => {
//         //INNER JOIN department ON role.department_id = department.id INNER JOIN employee on employee.role_id = role.id
//         if (err) throw err;
//         var roleChoices = data.map(role => {
//             return {name: `${role.title}`, value: role.id};
//         });

//         inquirer.prompt([
//             {
//                 message: 'which employee to update?',
//                 name: 'updateEmployee',
//                 type: 'list',
//                 choices: employeeChoices
//             },
//             {
//                 message: 'which role to update?',
//                 name: 'updateRole',
//                 type: 'list',
//                 choices: roleChoices
//             }
//         ])
//         .then(answers => {

//             connection.query('SELECT id, first_name, last_name FROM employee', (err, res) => {
//                 if (err) throw err;
//                 res.forEach(response => {
//                     if (response.first_name === answers.updateEmployee.split(' ')[0] && response.last_name === answers.updateEmployee.split(' ')[1] && response.title === answers.updateRole.id)

//             connection.query('UPDATE employee_db.employee SET role_id = ? WHERE id = ? ',
//                 [
//                    answers.updateEmployee,
//                    answers.updateRole
//                 ],
//                 err => {
//                     if (err) throw err;
//                     console.log('employee updated')
//                     mainQuestion();
//                 }
//             )
//         });
//         });
//         });
//     });
// })};
//don't need to query departments
// connection.query('SELECT * FROM department', (err, data) => {
//     var departmentChoices = data.map(department => {
//         return {name: `${department.name}`, value: department.id};
//         });
//     });
