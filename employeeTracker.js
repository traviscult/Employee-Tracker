const inquirer = require('inquirer');
const mysql = require('mysql');

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "password",
    database: "employeeDB"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
});

const start = () => {
    inquirer
      .prompt({
        name: 'action',
        type: 'list',
        message: 'What would you like to do?',
        choices: ['View all employees', 'View all employees by department', 'View all employees by manager', 'Add employee', 'Remove employee', 'Update employee role', 'Update employee manager', 'View all roles', 'Exit']
      })
      .then(answer => {
        switch (answer.action) {
          case 'View all employees':
            viewEmployees();
            break;
          case 'View all employees by department':
            employeeByDepartment();
            break;
          case 'View all employees by manager':
            employeeByManager();
            break;
          case 'Add employee':
            addEmployee();
            break;
        case 'Remove employee':
            removeEmployee();
            break;
        case 'Add employee':
            addEmployee();
            break;
        case 'Update employee role':
            updateEmployeeRole();
            break;
        case 'Update employee manager':
            updateEmployeeManager();
            break;
        case 'View all roles':
            viewRoles();
            break;
          case 'Exit':
            connection.end();
            break;
        }
      });
  };