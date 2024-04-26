const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const port = 3000;

const pool = mysql.createPool({
    host: '10.0.11.141',
    user: 'devusr',
    password: 'a2j?XU4^dU?6DmN@',
    database: 'Nuj_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

app.use(bodyParser.json());
app.use(express.static('public'));

// Display all data from accounts table
app.get('/accounts', (req, res) => {
    pool.query('SELECT * FROM accounts', (err, result) => {
        if (err) {
            console.error('Failed to retrieve accounts:', err);
            res.status(500).json({ error: 'Failed to retrieve accounts' });
            return;
        }
        res.json(result);
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
    