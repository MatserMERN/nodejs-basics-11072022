CREATE DATABASE studentdb
GO

USE studentdb
GO

CREATE TABLE student(
	_id INT IDENTITY(1,1) PRIMARY KEY,
	name VARCHAR(100),
	email VARCHAR(100),
	city VARCHAR(100)
)
GO

INSERT INTO student(name, email, city) VALUES ('Scott Desatnick','Scott.Desatnick@ef.com', 'Boston'),
                                              ('Adam Colson','Adam.Colson@ef.com', 'Newyork'),
											  ('Tuan Bui','Tuan.Bui@ef.com', 'Hanoi')
GO

UPDATE student  SET name='Scott', email='Scott@ef.com', city='Bengaluru' WHERE _id=1
GO

INSERT INTO student(name, email, city) VALUES ('dsdsdsd','dssdsds@ef.com', 'sdsdsd')
GO

DELETE FROM student Where _id=4
GO

SELECT * FROM student
GO