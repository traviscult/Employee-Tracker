USE employeeDB;

INSERT INTO department
    (name)
VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');
INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Sales Lead', 100000, 1),
    ('Salesperson', 80000, 1),
    ('Lead Engineer', 150000, 2),
    ('Software Engineer', 120000, 2),
    ('Account Manager', 160000, 3),
    ('Accountant', 125000, 3),
    ('Legal Team Lead', 250000, 4),
    ('Lawyer', 190000, 4);
INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('John', 'Smith', 1, NULL),
    ('Jane', 'Doe', 2, 1),
    ('Travis', 'Cultreri', 3, NULL),
    ('Noah', 'King', 4, 3),
    ('Kyle', 'Varni', 5, NULL),
    ('Eddie', 'Van Halen', 6, 5),
    ('James', 'Hendrix', 7, NULL),
    ('Keith', 'Richards', 8, 7);


