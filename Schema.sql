DROP DATABASE IF EXISTS employeeDB;
CREATE DATABASE employeeDB;

USE employeeDB;

CREATE TABLE department (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) UNIQUE NOT NULL
);
CREATE TABLE role (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) UNIQUE NOT NULL,
  salary DECIMAL UNSIGNED NOT NULL,
  department_id INT UNSIGNED NOT NULL,
  INDEX dep_ind (department_id),
  CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE
);
CREATE TABLE employee (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT UNSIGNED NOT NULL,
  INDEX role_ind (role_id),
  CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE,
  manager_id INT UNSIGNED,
  INDEX man_ind (manager_id),
  CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL
);

-- CREATE TABLE employee (
--     id INT NOT NULL AUTO_INCREMENT,
--     first_name VARCHAR(30) NOT NULL,
--     last_name VARCHAR(30) NOT NULL,
--     role_id INT,
--     manager_id INT,
--     PRIMARY KEY (id),
--     CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES employee_role (id),
--     CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employee (id)
-- );

-- CREATE TABLE employee_role (
--     id INT NOT NULL AUTO_INCREMENT,
--     title VARCHAR(30) NOT NULL,
--     salary DECIMAL (10,2) NOT NULL,
--     department_id INT,
--     PRIMARY KEY (id),
--     CONSTRAINT fk_departmentid FOREIGN KEY (department_id) REFERENCES department (id)
-- );

-- CREATE TABLE department (
--     id INT NOT NULL AUTO_INCREMENT,
--     department_name VARCHAR(30) NOT NULL,
--     PRIMARY KEY (id)
-- );

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;