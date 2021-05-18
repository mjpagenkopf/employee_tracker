DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(45) NULL,
  salary DECIMAL(10,2) NULL,
  department_id INT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NULL,
    last_name VARCHAR(30) NULL,
    role_id INT NULL,
    manager_id INT NULL,
    PRIMARY KEY (id)
);

INSERT INTO department (name)
VALUES ('Sales'); 
INSERT INTO department (name)
VALUES ('Legal'); 
INSERT INTO department (name)
VALUES ('Development'); 
INSERT INTO department (name)
VALUES ('Operations'); 
INSERT INTO department (name)
VALUES ('Human Resources');

INSERT INTO role (title, salary, department_id)
VALUE ('CEO', 1000000, 3);
INSERT INTO role (title, salary, department_id)
VALUE ('Vice President', 500000, 0);
INSERT INTO role (title, salary, department_id)
VALUE ('Sales Director', 200000, 0);
INSERT INTO role (title, salary, department_id)
VALUE ('Legal Director', 200000, 1);
INSERT INTO role (title, salary, department_id)
VALUE ('Development Director', 200000, 2);
INSERT INTO role (title, salary, department_id)
VALUE ('Operations Director', 200000, 3);
INSERT INTO role (title, salary, department_id)
VALUE ('Human Resources Director', 200000, 4);
INSERT INTO role (title, salary, department_id)
VALUE ('Sales Supervisor', 120000, 0);
INSERT INTO role (title, salary, department_id)
VALUE ('Marketing Manager', 120000, 0);
INSERT INTO role (title, salary, department_id)
VALUE ('Sales Engineer', 95000, 0);
INSERT INTO role (title, salary, department_id)
VALUE ('Marketing Executive', 95000, 0);
INSERT INTO role (title, salary, department_id)
VALUE ('Sales Representative', 65000, 0);
INSERT INTO role (title, salary, department_id)
VALUE ('Marketing Associate', 65000, 0);
INSERT INTO role (title, salary, department_id)
VALUE ('Sales Assistant', 40000, 0);
INSERT INTO role (title, salary, department_id)
VALUE ('Supervisor', 120000, 1);
INSERT INTO role (title, salary, department_id)
VALUE ('Associate', 95000, 1);
INSERT INTO role (title, salary, department_id)
VALUE ('Assistant', 65000, 1);
INSERT INTO role (title, salary, department_id)
VALUE ('Supervisor', 200000, 2);
INSERT INTO role (title, salary, department_id)
VALUE ('Project Manager', 120000, 2);
INSERT INTO role (title, salary, department_id)
VALUE ('Engineer', 100000, 2);
INSERT INTO role (title, salary, department_id)
VALUE ('Assistant Manager', 65000, 2);
INSERT INTO role (title, salary, department_id)
VALUE ('Junior Engineer', 75000, 2);
INSERT INTO role (title, salary, department_id)
VALUE ('Supervisor', 150000, 3);
INSERT INTO role (title, salary, department_id)
VALUE ('Project Manager', 110000, 3);
INSERT INTO role (title, salary, department_id)
VALUE ('Engineer', 100000, 3);
INSERT INTO role (title, salary, department_id)
VALUE ('Junior Engineer', 100000, 3);
INSERT INTO role (title, salary, department_id)
VALUE ('Project Coordinator', 50000, 3);
INSERT INTO role (title, salary, department_id)
VALUE ('Manager', 100000, 4);
INSERT INTO role (title, salary, department_id)
VALUE ('Representative', 70000, 4);
INSERT INTO role (title, salary, department_id)
VALUE ('Assistant', 40000, 4);



INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Mike', 'Pagenkopf', 1, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Megan', 'Quayne', 2, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Jed', 'Realmuto', 3, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Rachel', 'Hoskins', 4, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Ryan', 'McMahon', 5, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Nancy', 'Arenado', 6, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Carlos', 'Correa', 7, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Austin', 'Meadows', 8, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Mitch', 'Haniger', 9, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Kiley', 'Lewis', 9, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Jake', 'Cronenworth', 10, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Maxine', 'Mundy', 10, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Ron', 'Acuna', 11, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Kristin', 'Bassitt', 11, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Walker', 'Buehler', 12, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Cesar', 'Valdez', 12, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Nick', 'Pivetta', 13, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Lance', 'McCullers', 14, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Rebecca', 'Iglesias', 15, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Frankie', 'Montas', 16, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Triston', 'McKenzie', 16, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Joy', 'Musgrove', 17, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Brandy', 'MWoodruff', 17, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Brandy', 'Woodruff', 18, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Julie', 'Merryweather', 19, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('JD', 'Martinez', 19, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Vlad', 'Guerrero', 20, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Sandy', 'Bogaerts', 20, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Kristin', 'Bryant', 21, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Yuli', 'Gurriel', 21, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Rafael', 'Devers', 22, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Josie', 'Ramirez', 22, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Carly', 'Santana', 23, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Shohei', 'Ohtani', 24, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Jessica', 'Aguilar', 24, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Whitney', 'Merrifield', 25, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Fred', 'Freeman', 25, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Justin', 'Turner', 26, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Bob', 'Bichette', 26, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Kyle', 'Tucker', 27, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Natalie', 'Lowe', 27, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Aaron', 'Judge', 28, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Janet', 'Abreu', 29, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Trea', 'Turner', 29, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Amanda', 'Machado', 30, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Michelle', 'Trout', 30, null);
















-- INSERT INTO 
SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;
