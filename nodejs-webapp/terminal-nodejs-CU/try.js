const mysql = require('mysql2');
const readlineSync = require('readline-sync');

// Create a MySQL database connection
const connection = mysql.createConnection({
    host: '10.0.11.141',
    user: 'devusr',
    password: 'a2j?XU4^dU?6DmN@',
    database: 'Nuj_db',
    connectTimeout: 60000 // 60 seconds timeout
});

// Connect to the database
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to database');
});

// Handle connection errors
connection.on('error', (err) => {
    console.error('Database connection error:', err);
    // You can attempt to reconnect here or handle the error appropriately
});

// Function to create a new user entry
function createNewEntry() {
    console.log('Enter your details:');
    const firstName = readlineSync.question('First Name: ');
    const middleName = readlineSync.question('Middle Name: ');
    const lastName = readlineSync.question('Last Name: ');
    const email = readlineSync.questionEMail('Email: ');
    const password = readlineSync.question('Password: ', { hideEchoBack: true });
    const gender = readlineSync.question('Gender (Male, Female, Other): ');
    const birthdate = readlineSync.question('Birthdate (YYYY-MM-DD): ');
    const status = readlineSync.question('Status (Active, Inactive): ');

    const query = `
        INSERT INTO accounts (user_fname, user_mname, user_lname, email, password, gender, birthdate, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    connection.query(query, [firstName, middleName, lastName, email, password, gender, birthdate, status], (err, results) => {
        if (err) {
            console.error('Error creating new entry:', err);
            return;
        }
        console.log('\nRegistration successful! Your details have been saved.');
        displayUserDetails(firstName, middleName, lastName, email, gender, birthdate, status);
    });
}

// Function to update user information
function updateUserInfo() {
    const email = readlineSync.question('Enter your email: ');
    const password = readlineSync.question('Enter your password: ', { hideEchoBack: true });

    authenticateUser(email, password, (authenticated) => {
        if (!authenticated) {
            console.log('Authentication failed. Invalid email or password.');
            return;
        }
        console.log('Authentication successful. You can now update your information.');

        console.log('Enter your updated details:');
        const firstName = readlineSync.question('First Name: ');
        const middleName = readlineSync.question('Middle Name: ');
        const lastName = readlineSync.question('Last Name: ');
        const newEmail = readlineSync.questionEMail('New Email: ');
        const newPassword = readlineSync.question('New Password: ', { hideEchoBack: true });
        const gender = readlineSync.question('Gender: ');
        const birthdate = readlineSync.question('Birthdate (YYYY-MM-DD): ');
        const status = readlineSync.question('Status: ');

        const query = `
            UPDATE accounts
            SET user_fname = ?, user_mname = ?, user_lname = ?, email = ?, password = ?, gender = ?, birthdate = ?, status = ?
            WHERE email = ? AND password = ?
        `;
        connection.query(query, [firstName, middleName, lastName, newEmail, newPassword, gender, birthdate, status, email, password], (err, results) => {
            if (err) {
                console.error('Error updating user information:', err);
                return;
            }
            console.log('Update successful! Your information has been updated.');
            displayUserDetails(firstName, middleName, lastName, newEmail, gender, birthdate, status);
        });
    });
}

// Function to authenticate user
function authenticateUser(email, password, callback) {
    const query = 'SELECT COUNT(*) AS count FROM accounts WHERE email = ? AND password = ?';
    connection.query(query, [email, password], (err, results) => {
        if (err) {
            console.error('Error authenticating user:', err);
            callback(false);
            return;
        }
        const count = results[0].count || 0;
        callback(count > 0);
    });
}

// Function to display user details
function displayUserDetails(firstName, middleName, lastName, email, gender, birthdate, status) {
    console.log('\nHere is your details:');
    console.log(`Name: ${firstName} ${middleName} ${lastName}`);
    console.log(`Email: ${email}`);
    console.log(`Gender: ${gender}`);
    console.log(`Birthdate: ${birthdate}`);
    console.log(`Status: ${status}`);
}

// Main function
function main() {
    console.log('Welcome to the Registration Form');

    const choice = readlineSync.question('Do you want to create new entry or update your information? (C or U): ').toUpperCase();

    switch (choice) {
        case 'C':
            createNewEntry();
            break;
        case 'U':
            updateUserInfo();
            break;
        default:
            console.log('Invalid choice. Please enter C or U.');
            break;
    }
}

// Call the main function
main();
