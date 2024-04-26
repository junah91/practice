
const express =require('express');
const mysql = require('mysql');


const connection = mysql.createConnection({
  host: '10.0.11.141',
  user: 'devusr',
  password: 'a2j?XU4^dU?6DmN@',
  database: 'Nuj_db'
});


connection.connect((err) => {
    if (err) {
      console.error('Error connecting to database:', err);
      return;
    }
    console.log('Connected to database');
  });
  
  
  connection.query('SELECT * FROM accounts', (err, results, fields) => {
    if (err) {
      console.error('Error querying database:', err);
      return;
    }
    console.log('Query results:', results);
  });
  
  
  connection.end((err) => {
    if (err) {
      console.error('Error closing database connection:', err);
      return;
    }
    console.log('Connection closed');
  });