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
  employeeManagerAscii()
  start();
});

const start = async () => {
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

const viewEmployees = () => {
  connection.query('SELECT * FROM employee', (err, res) => {
    if (err) throw err;
    console.table(res);
    start();
  });
};

const employeeByDepartment = () => {
  connection.query('SELECT * FROM department', (err, res) => {
    if (err) throw err;
    console.table(res);
    start();
  })

}

const employeeByManager = () => {
  console.log("Manager is being requested")
  connection.query('SELECT * FROM employee WHERE manager_id IS NULL', (err, res) => {
    if (err) throw err;
    start();
  })
}

const removeEmployee = () => {
  console.log('I am going to remove an employee')
  start();
}

const addEmployee = () => {
  inquirer
    .prompt([{
      name: 'firstName',
      type: 'input',
      message: 'Please enter employee first name'
    }, {
      name: 'lastName',
      type: 'input',
      message: 'Please enter employee last name'
    }, {
      name: 'empManagerId',
      type: 'input',
      message: 'Please enter employee manager id'
    }, {
      name: 'empManagerId',
      type: 'input',
      message: 'Please enter employee manager id'
    }, {
      name: 'empTitle',
      type: 'input',
      message: 'Please enter employee title'
    }, {
      name: 'empSalary',
      type: 'input',
      message: 'Please enter employee salary'
    }, {
      name: 'empTitle',
      type: 'input',
      message: 'Please enter employee title'
    }, {
      name: 'empDepartment',
      type: 'list',
      message: 'Please select employee department',
      choices: ['Sales', 'Engineering', 'Finance', 'Legal']
    }]).then(answers => {
      console.log(answers);
      start();
    })

}

const updateEmployeeRole = () => {
  console.log('updating employee role')
  start();
}


const updateEmployeeManager = () => {
  console.log('updating employee manager')
  start();
}

const viewRoles = () => {
  console.log('Show employee by role')
  connection.query('SELECT * FROM employee WHERE role IS ?', (err, res) => {
    if (err) throw err;
    console.table(res);
    start();
  })
}



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