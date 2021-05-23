const connection = require('../employee_tracker/config/connection');
const inquirer = require('inquirer');
const table = require('inquirer-table-prompt');
const { response } = require('express');
require('console.table'); //for calling tables in console

connection.connect((err) => {
    if (err) throw err;
    mainQuestion();
});
//prompts user for initial task
const mainQuestion = () => {
    inquirer
        .prompt (
        {
            type: 'list',
            message: 'What do you want to do?',
            name: 'entry',
            choices: [
                'Update employee role?',
                'View employees?',
                'View roles?',
                'View departments?',
                'Add employee, role, or department?',
                'Quit?'
            ],
        },
    ).then(userChoice => {
        switch(userChoice.entry) {

            case 'Update employee role?':
                updateRole();
                break;

            case 'View employees?':
                viewEmps();
                break;

            case 'View roles?':
                viewRoles();
                break;

            case 'View departments?':
                viewDeps();
                break;

            case 'Add employee, role, or department?':
                addToTeam();
                break;

            default:
                process.exit();
        };
    });
};
// mainQuestion();
const viewEmps = () => {
    connection.query('SELECT * FROM employee JOIN role ON employee.role_id = role.id', (err, data) => {
        console.table(data);
        mainQuestion();
    });
};

const viewRoles = () => {
    connection.query('SELECT * FROM role JOIN department ON role.department_id = department.id', (err, data) => {
        console.table(data);
        mainQuestion();
    });
};

const viewDeps = () => {
    connection.query('SELECT * FROM department', (err, data) => {
        console.table(data);
        mainQuestion();
    });  
};

//adding employee, role or department
const addToTeam = () => {
    inquirer
        .prompt(
        {
            name:'add',
            type:'list',
            message:'Which would you like to add?',
            choices: [
                'employee',
                'role',
                'department',
                'quit'
            ],
        },
    )
    .then(answer => {
        switch(answer.add) {
    
            case 'employee':
                addEmployee();
                break;

            case 'role':
                addRole();
                break;

            case 'department':
                addDepartment();
                break;

            default:
                process.exit();
        };  
    });
};
 function addEmployee() {
        connection.query('SELECT * FROM role', (err, data) => {
            var roleChoices = data.map(role => {
                return {name: `${role.title}`, value: role.id};
                });
        inquirer.prompt(
            [
                {
                    message: 'First Name?',
                    name: 'firstName',
                    type: 'input'
                },
                {
                    message: 'Last Name?',
                    name: 'lastName',
                    type: 'input'
                },
                {
                    message: 'Role ID?',
                    name: 'roleId',
                    type: 'list',
                    choices: roleChoices
                },
                {
                    message: 'Manager ID?',
                    name: 'managerId',
                    type: 'list',
                    choices: [1, 2, 3, 4, 5]
                },
            ],
        ).then(answers => {
            connection.query(
                'INSERT INTO employee SET ?',
                {
                    first_name: answers.firstName,
                    last_name: answers.lastName,
                    role_id: answers.roleId,
                    manager_id: answers.managerId
                },
                err => {
                    if (err) throw err;
                    mainQuestion();
                },
            )
        })        
    })
    }

    function addRole() {
        connection.query('SELECT * FROM department', (err, data) => {
            var departmentChoices = data.map(department => {
                return {name: `${department.name}`, value: department.id};
                });
        inquirer.prompt(
            [
                {
                    message: 'Title of role?',
                    name: 'roleTitle',
                    type: 'input'
                },
                {
                    message: 'Salary of role?',
                    name: 'roleSalary',
                    type: 'number'
                },
                {
                    message: 'Department ID of role?',
                    name: 'roleDepId',
                    type: 'list',
                    choices: departmentChoices
                },
            ],
        ).then(answers => {
            connection.query(
                'INSERT INTO role SET ?',
                {
                    title: answers.roleTitle,
                    salary: answers.roleSalary,
                    department_id: answers.roleDepId
                },
                err => {
                    if (err) throw err;
                    mainQuestion();
                },
            );
        });        
      }
    )
    }

    function addDepartment() {
        connection.query('SELECT * FROM department', (err, data) => {
            var departmentChoices = data.map(department => {
                return {name: `${department.name}`, value: department.id};
                });
        inquirer.prompt(
            [
                {
                    message: 'Name of department?',
                    name: 'depName',
                    type: 'input'
                }
            ],
        ).then(answers => {
            connection.query(
                'INSERT INTO department SET ?',
                {
                    name: answers.depName,
                },
                err => {
                    if (err) throw err;
                    mainQuestion();
                },
            );
        });        
    })


    }

    


    

updateRole = () => {
    connection.query('SELECT * FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id', (err, data) => {
        if (err) throw err;
        var employeeChoices = data.map(employee => {
            return {name: `${employee.first_name} ${employee.last_name}, role:  ${employee.title}, salary:  ${employee.salary}, Department:  ${employee.name}`, value: employee.id}; 
        });
        
    connection.query('SELECT * FROM role JOIN department ON role.department_id = department.id', (err, data) => {
        if (err) throw err;
        var roleChoices = data.map(role => {
            return {name: `${role.title}`, value: role.id};
        });
        inquirer.prompt([
            {
                message: 'which employee to update?',
                name: 'updateEmployee',
                type: 'rawlist',
                choices: employeeChoices
            },
            {
                message: 'which role to update?',
                name: 'updateRole',
                type: 'rawlist',
                choices: roleChoices
            }
        ])
        .then(answers => {
            connection.query(
                'UPDATE employee SET role_id = ? WHERE id = ?',
                [
                    answers.updateRole,
                    answers.updateEmployee
                ],
                err => {
                    if (err) throw err;
                    mainQuestion();
                }
            )
        });
        });
    });

    //don't need to query departments    
    // connection.query('SELECT * FROM department', (err, data) => {
    //     var departmentChoices = data.map(department => {
    //         return {name: `${department.name}`, value: department.id};
    //         });
    //     });
};


















// const viewAllEmpByDep = () => {
//     inquirer
//     .prompt({
//         name: 'department',
//         type: 'list',
//         message: 'Choose department:',
//         choices: [
//             'Sales',
//             'Legal',
//             'Development',
//             'Operations',
//             'Human Resources',
//             'Quit?'
//             ]
//     }
//     ).then((userChoice) => {
//         let query =
//         'SELECT '
//         switch(userChoice.department) {
//             case 'Sales':
//                 viewSalesEmps();
//                 break;

//             case 'Legal':
//                 viewLegalEmps();
//                 break;

//             case 'Development':
//                 viewDevEmps();
//                 break;

//             case 'Operations':
//                 viewOpsEmps();
//                 break;

//             case 'Human Resources':
//                 viewHREmps();
//                 break;            
//             default:
//                 process.exit();
//         }
//     });
// };
