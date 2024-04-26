const mysql = require('mysql2');

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


pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error getting database connection:', err);
        return;
    }

    connection.query('SELECT * FROM accounts', (err, result) => {
        connection.release()
        if (err) {
            console.error('Failed to retrieve accounts:', err);
            return;
        }
        console.log('Accounts:', result);
        pool.end(); 
    });
});

// Handle pool errors
pool.on('error', (err) => {
    console.error('MySQL pool error:', err);
});
