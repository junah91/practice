const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');

const app = express();
const port = 8000;

// Create a MySQL connection pool
const pool = mysql.createPool({
    host: '10.0.11.141',
    user: 'devusr',
    password: 'a2j?XU4^dU?6DmN@',
    database: 'Nuj_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Middleware to parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (CSS)
app.use(express.static(__dirname + '/public'));

// Route to display user creation form
app.get('/create', (req, res) => {
    const html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Create User</title>
            <link rel="stylesheet" href="/styles.css">
        </head>
        <body>
            <h1>Create New User</h1>
            <form action="/create" method="post">
                <input type="text" name="user_fname" placeholder="First Name" required><br>
                <input type="text" name="user_mname" placeholder="Middle Name" required><br>
                <input type="text" name="user_lname" placeholder="Last Name" required><br>
                <input type="email" name="email" placeholder="Email" required><br>
                <input type="password" name="password" placeholder="Password" required><br>
                <select name="gender" required>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select><br>
                <input type="date" name="birthdate" required><br>
                <input type="text" name="status" placeholder="Status" required><br>
                <button type="submit">Create User</button>
            </form>
        </body>
        </html>
    `;
    res.send(html);
});

// Route to handle user creation
app.post('/create', async (req, res) => {
    const { user_fname, user_mname, user_lname, email, password, gender, birthdate, status } = req.body;

    try {
        const [result] = await pool.query(
            'INSERT INTO accounts (user_fname, user_mname, user_lname, email, password, gender, birthdate, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [user_fname, user_mname, user_lname, email, password, gender, birthdate, status]
        );
        res.send('User created successfully!');
    } catch (error) {
        console.error('Failed to create user:', error);
        res.status(500).send('Failed to create user.');
    }
});

// Route to display user update form
app.get('/update/:id', async (req, res) => {
    const userId = req.params.id;

    try {
        const [rows] = await pool.query('SELECT * FROM accounts WHERE id = ?', [userId]);
        const user = rows[0];

        const html = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Update User</title>
                <link rel="stylesheet" href="/styles.css">
            </head>
            <body>
                <h1>Update User</h1>
                <form action="/update/${userId}" method="post">
                    <input type="text" name="user_fname" value="${user.user_fname}" required><br>
                    <input type="text" name="user_mname" value="${user.user_mname}" required><br>
                    <input type="text" name="user_lname" value="${user.user_lname}" required><br>
                    <input type="email" name="email" value="${user.email}" required><br>
                    <input type="password" name="password" placeholder="New Password"><br>
                    <select name="gender" required>
                        <option value="male" ${user.gender === 'male' ? 'selected' : ''}>Male</option>
                        <option value="female" ${user.gender === 'female' ? 'selected' : ''}>Female</option>
                    </select><br>
                    <input type="date" name="birthdate" value="${user.birthdate}" required><br>
                    <input type="text" name="status" value="${user.status}" required><br>
                    <button type="submit">Update User</button>
                </form>
            </body>
            </html>
        `;
        res.send(html);
    } catch (error) {
        console.error('Failed to retrieve user:', error);
        res.status(500).send('Failed to retrieve user.');
    }
});

// Route to handle user update
app.post('/update/:id', async (req, res) => {
    const userId = req.params.id;
    const { user_fname, user_mname, user_lname, email, password, gender, birthdate, status } = req.body;

    try {
        const [result] = await pool.query(
            'UPDATE accounts SET user_fname=?, user_mname=?, user_lname=?, email=?, password=?, gender=?, birthdate=?, status=? WHERE id=?',
            [user_fname, user_mname, user_lname, email, password, gender, birthdate, status, userId]
        );
        res.send('User updated successfully!');
    } catch (error) {
        console.error('Failed to update user:', error);
        res.status(500).send('Failed to update user.');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
