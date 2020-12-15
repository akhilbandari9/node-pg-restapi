const Pool = require('pg').Pool; //api from node-postgres

//setup db in command prompt

//psql -d postgres -p 5000
// postgres=# CREATE ROLE akhil WITH LOGIN PASSWORD '1234';
// postgres=# ALTER ROLE akhil CREATEDB;
// postgres=# \q
// psql -d postgres -U akhil -p 5000;
// postgres=> CREATE DATABASE api;
// postgres=> \c api
// You are now connected to database "api" as user "me".
// api=>
// CREATE TABLE users (
//   ID SERIAL PRIMARY KEY,
//   name VARCHAR(30),
//   email VARCHAR(30)
// );
// api=>
// INSERT INTO users (name, email)
// VALUES ('Jerry', 'jerry@example.com'), ('George', 'george@example.com');

//we will work on db 'api' with user 'akhil'

//db configuration
const pool = new Pool({
	user: 'akhil',
	host: 'localhost',
	database: 'api',
	password: '1234',
	port: '5000',
});

// GET request
// Get all users
const getUsers = (_, res) => {
	pool.query('SELECT * FROM users ORDER BY id ASC', (err, results) => {
		if (err) {
			throw err;
		}
		res.status(200).json(results.rows);
	});
};

// GET request
// Get a single user
const getUserById = (req, res) => {
	const id = parseInt(req.params.id);

	pool.query('SELECT * FROM users WHERE id=$1', [id], (err, results) => {
		if (err) {
			throw err;
		}
		res.status(200).json(results.rows);
	});
};

// POST request
// INSERT a NEW user
const createUser = (req, res) => {
	const { name, email } = req.body;
	pool.query(
		'INSTERT INTO users (name, email) VALUES ($1,$2)',
		[name, email],
		(err, results) => {
			if (err) {
				throw err;
			}
			res.status(200).send(`User added with ID: ${results.insertId}`);
		}
	);
};

// UPDATE request
// UPDATE a single user
const updateUser = (req, res) => {
	const id = parseInt(req.params.id);
	const { name, email } = req.body;
	pool.query(
		'UPDATE users SET name =$1, email = $2 WHERE id = $3',
		[name, email, id],
		(err, results) => {
			if (err) {
				throw err;
			}
			res.status(200).send(`User modified with ID: ${id}`);
		}
	);
};

// DELETE request
// DELETE a single user
const deleteUser = (req, res) => {
	const id = parseInt(req.params.id);
	pool.query('DELETE FROM users WHERE id=$1', [id], (err, results) => {
		if (err) {
			throw err;
		}
		res.status(200).send(`User deleted with ID: ${id}`);
	});
};

module.exports = {
	getUsers,
	getUserById,
	createUser,
	updateUser,
	deleteUser,
};
