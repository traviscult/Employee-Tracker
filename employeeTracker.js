const inquirer = require('inquirer');
const mysql = require('mysql');
// const consoleTable = require ("console.table")

const connection = mysql.createConnection({
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
  employeeManagerAscii()
  start();
});

// Prompt user on start 
const start = () => {
  inquirer.prompt({
      name: 'action',
      type: 'list',
      message: 'What would you like to do?',
      choices: ['View all employees', 'View all departments', 'Add employee', 'Remove employee', 'Update employee role', 'View all roles', 'Exit']
    })
    .then(answer => {
      switch (answer.action) {
        case 'View all employees':
          viewEmployees();
          break;
        case 'View all departments':
          viewDepartment();
          break;
          // case 'View all employees by manager':
          //   employeeByManager();
          //   break;
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
          // case 'Update employee manager':
          //   updateEmployeeManager();
          //   break;
        case 'View all roles':
          viewRoles();
          break;
        case 'Exit':
          connection.end();
          break;
      }
    });
};

// view all employees based on user input
const viewEmployees = () => {
  connection.query('SELECT * FROM employee INNER JOIN role ON employee.role_id=role.id INNER JOIN department ON role.department_id=department.id', (err, res) => {
    if (err) throw err;
    console.table(res);
    start();
  });
};

// view all departments based on user input
const viewDepartment = () => {
  connection.query('SELECT * FROM department', (err, res) => {
    if (err) throw err;
    console.table(res);
    start();
  })

}

const removeEmployee = () => {
  console.log('I am going to remove an employee')
  connection.query("SELECT * FROM employee", (err, res) => {
    if (err) throw err;

    inquirer.prompt([{
        type: "list",
        name: "name",
        message: "Which employee would you like to remove",
        choices: () => {
          let choicesArray = [];
          for (let i = 0; i < res.length; i++) {
            choicesArray.push(res[i].first_name + " " + res[i].last_name);
          }
          return choicesArray
        },
      }])
      .then((answer) => {
        let employeeName = answer.name;
        let remove = employeeName.split(" ");

        connection.query(`DELETE FROM employee WHERE first_name = "${remove[0]}" AND last_name = "${remove[1]}"`, (err) => {
          if (err) throw err;
          console.log("employee removed");
          start();
        })
      })
  })
}

// add employee based on usre input
const addEmployee = () => {
  console.log("you are about to add an epmloyee")
  connection.query("SELECT * FROM employee", (err, res) => {
    if (err) throw err;

   inquirer.prompt([{
        name: 'first_name',
        type: 'input',
        message: 'Please enter employee first name'
      }, 
      {
        name: 'last_name',
        type: 'input',
        message: 'Please enter employee last name'
      },
      {
        name: "role",
        type: "list",
        message: "Please select an employee role?",
        choices: () => {
          let choicesArray = res.map(employee => employee.role_id).filter(roleId => roleId )
          console.log(choicesArray)
          return choicesArray;
        }
      },
      {
        name: "manager",
        type: "list",
        message: "Please select a manager id?",
        choices: () => {
          let choiceArray = res.map(employee => employee.manager_id).filter(managerId => managerId )
          console.log(choiceArray)
          return choiceArray;
        }
      }
    ])
    .then((answer) => {
      console.log("I am being called", answer);
      console.log(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${answer.first_name}", "${answer.last_name}", ${answer.role}, ${answer.manager})`)
      connection.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${answer.first_name}", "${answer.last_name}", ${answer.role}, ${answer.manager})`), (err, res) => {
        console.log(res)
        console.log(err)
        if (err) throw err
        console.log("A new employee has been added")
        
      };
      start();
    });
  });
};

const updateEmployeeRole = () => {
  console.log('updating employee role')
  start();
}


const viewRoles = () => {
  console.log('Show employee by role')
  connection.query('SELECT * FROM employee', (err, res) => {
    if (err) throw err;
    console.table(res);

    inquirer.prompt([
      {
        name: "name",
        type: "list",
        choices: () => {
          let choicesArray = [];
          for (let i = 0; i <res.length; i++)
          choicesArray.push(res[i].first_name + " " + res[i].last_name);

        }
      }
    ])
    start();
  });
};

// const employeeByManager = () => {
//   console.log("Manager is being requested")
//   connection.query('SELECT * FROM employee WHERE manager_id IS (?)', (err, res) => {
//     if (err) throw err;
//     start();
//   })
// }

// const updateEmployeeManager = () => {
//   console.log('updating employee manager')
//   start();
// }


const employeeManagerAscii = () => {
  console.log(`   ________                          __                                               `)
  console.log(`  /        |                        /  |                                              `)
  console.log(`  $$$$$$$$/  _____  ____    ______  $$ |  ______   __    __   ______    ______        `)
  console.log(`  $$ |__    /     \/    \  /      \ $$ | /      \ /  |  /  | /      \  /      \       `)
  console.log(`  $$    |   $$$$$$ $$$$  |/$$$$$$  |$$ |/$$$$$$  |$$ |  $$ |/$$$$$$  |/$$$$$$  |      `)
  console.log(`  $$$$$/    $$ | $$ | $$ |$$ |  $$ |$$ |$$ |  $$ |$$ |  $$ |$$    $$ |$$    $$ |      `)
  console.log(`  $$ |_____ $$ | $$ | $$ |$$ |__$$ |$$ |$$ \__$$ |$$ \__$$ |$$$$$$$$/ $$$$$$$$/       `)
  console.log(`  $$       |$$ | $$ | $$ |$$    $$/ $$ |$$    $$/ $$    $$ |$$       |$$       |      `)
  console.log(`  $$$$$$$$/ $$/  $$/  $$/ $$$$$$$/  $$/  $$$$$$/   $$$$$$$ | $$$$$$$/  $$$$$$$/       `)
  console.log(`                          $$ |                    /  \__$$ |                          `)
  console.log(`                          $$ |                    $$    $$/                           `)
  console.log(`                          $$/                      $$$$$$/                            `)
  console.log(`   __       __                                                                        `)
  console.log(`  /  \     /  |                                                                       `)
  console.log(`  $$  \   /$$ |  ______   _______    ______    ______    ______    ______             `)
  console.log(`  $$$  \ /$$$ | /      \ /       \  /      \  /      \  /      \  /      \            `)
  console.log(`  $$$$  /$$$$ | $$$$$$  |$$$$$$$  | $$$$$$  |/$$$$$$  |/$$$$$$  |/$$$$$$  |           `)
  console.log(`  $$ $$ $$/$$ | /    $$ |$$ |  $$ | /    $$ |$$ |  $$ |$$    $$ |$$ |  $$/            `)
  console.log(`  $$ |$$$/ $$ |/$$$$$$$ |$$ |  $$ |/$$$$$$$ |$$ \__$$ |$$$$$$$$/ $$ |                 `)
  console.log(`  $$ | $/  $$ |$$    $$ |$$ |  $$ |$$    $$ |$$    $$ |$$       |$$ |                 `)
  console.log(`  $$/      $$/  $$$$$$$/ $$/   $$/  $$$$$$$/  $$$$$$$ | $$$$$$$/ $$/                  `)
  console.log(`                                             /  \__$$ |                               `)
  console.log(`                                             $$    $$/                                `)
  console.log(`                                              $$$$$$/                                  `)
}