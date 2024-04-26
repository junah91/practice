const express = require('express');
const bodyParser = require('body-parser');
const forms = require('forms');
const mysql = require('mysql2');

const app = express();
const PORT = process.env.PORT || 8081;

// Middleware
app.set('view engine', 'pug');
app.set('views', './views'); // Set views directory
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL Connection
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
    console.log('Connected to MySQL database');
});

// Registration Form
const regForm = forms.create({
    user_fname: forms.fields.string({ required: true }),
    user_mname: forms.fields.string({ required: true }),
    user_lname: forms.fields.string({ required: true }),
    email: forms.fields.email({ required: true }),
    password: forms.fields.password({ required: true }),
    gender: forms.fields.string(),
    birthdate: forms.fields.date(),
    status: forms.fields.string()
});

// Route to display registration form
app.get('/', (req, res) => {
    res.render('index'); // Render the registration form (index.pug)
});

// Route to handle form submission
app.post('/index', (req, res) => {
    regForm.handle(req, {
        success: (form) => {
            const { user_fname, user_mname, user_lname, email, password, gender, birthdate, status } = form.data;
            const sql = 'INSERT INTO users (user_fname, user_mname, user_lname, email, password, gender, birthdate, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
            connection.query(sql, [user_fname, user_mname, user_lname, email, password, gender, birthdate, status], (err, result) => {
                if (err) {
                    console.error('Error inserting user:', err);
                    res.render('index', { error: 'Registration failed' });
                } else {
                    console.log('User registered successfully');
                    res.render('index', { success: 'Registration successful' });
                }
            });
        },
        other: (form) => {
            res.render('index', { error: 'Validation failed', form: form.toHTML() });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
