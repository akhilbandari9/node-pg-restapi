const express = require('express');
const bodyParser = require('body-parser');
const db = require('./queries');
const app = express();

app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);
//test route
app.get('/', (req, res) => {
	res.json({
		info: 'node, postgres, express api',
	});
});
//user routes
app.get('/users', db.getUsers);
app.get('/users/:id', db.getUserById);
app.post('/users', db.createUser);
app.put('/users/:id', db.updateUser);
app.delete('/users/:id', db.deleteUser);

//port is set to 3000
app.listen(3000, () => {
	console.log('App running at port 3000');
});
