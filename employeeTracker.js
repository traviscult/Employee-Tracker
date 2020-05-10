const inquirer = require('inquirer');
const mysql = require('mysql');

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

const viewEmployees = () => {
  // connection.query("SELECT employee.first_name, role.title, department.name FROM (( employee LEFT JOIN role ON employee.role_id=role.title) LEFT JOIN department ON role.department_id=department.id)",(err, res) => {
  //   if (err) throw err;
  //   console.table(res);
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
  connection.query('SELECT * FROM employee WHERE manager_id IS (?)', (err, res) => {
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
      name: 'first_name',
      type: 'input',
      message: 'Please enter employee first name'
    }, {
      name: 'last_name',
      type: 'input',
      message: 'Please enter employee last name'
    }, {
      name: 'role_id',
      type: 'input',
      message: 'Please enter employee role id'
    }, 
    {
      name: 'manager_id',
      type: 'list',
      choices: [0,1,2,3,4,5]
    } 
  ]).then(function(answer) {
      console.log(answer);
      connection.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${answer.first_name}", "${answer.last_name}", "${answer.role_id}", "${answer.manager_id}")`, function(err,res){
        if(err) throw err
      });
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
  connection.query('SELECT * FROM role', (err, res) => {
    if (err) throw err;
    console.table(res);
    start();
  });
};



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