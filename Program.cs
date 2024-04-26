using System;
using MySql.Data.MySqlClient;

namespace RegistrationForm
{
    internal class Program
    {
        // Main method
        private static void Main(string[] args)
        {
            Console.WriteLine("Welcome to the Registration Form");

            // Prompt user to choose between updating or creating
            Console.WriteLine("Do you want to create new entry or update your information?");
            Console.WriteLine("C. Create a new entry");
            Console.WriteLine("U. Update my information");
            Console.Write("Enter your choice (C or U): ");
            string choice = Console.ReadLine()?.ToUpper();

            switch (choice)
            {
                case "C":
                    CreateNewEntry();
                    break;
                case "U":
                    UpdateUserInfo();
                    break;
                default:
                    Console.WriteLine("Invalid choice. Please enter C or U.");
                    break;
            }
        }

        // Method to create a new user entry
        private static void CreateNewEntry()
        {
            Console.WriteLine("Enter your details:");

            Console.Write("First Name: ");
            string firstName = Console.ReadLine();

            Console.Write("Middle Name: ");
            string middleName = Console.ReadLine();

            Console.Write("Last Name: ");
            string lastName = Console.ReadLine();

            Console.Write("Email: ");
            string email = Console.ReadLine();

            Console.Write("Password: ");
            string password = Console.ReadLine();

            Console.Write("Gender (Male, Female, Other): ");
            string gender = Console.ReadLine();

            Console.Write("Birthdate (YYYY-MM-DD): ");
            string birthdate = Console.ReadLine();

            Console.Write("Status (Active, Inctive): ");
            string status = Console.ReadLine();

            // Validate input
            if (string.IsNullOrEmpty(firstName) || string.IsNullOrEmpty(lastName) ||
                string.IsNullOrEmpty(email) || string.IsNullOrEmpty(password) ||
                string.IsNullOrEmpty(gender) || string.IsNullOrEmpty(birthdate) ||
                string.IsNullOrEmpty(status))
            {
                Console.WriteLine("All fields are required. Please try again.");
                return;
            }

            if (!IsValidEmail(email))
            {
                Console.WriteLine("Invalid email address. Please try again.");
                return;
            }

            if (password.Length <= 8 || password.Length >= 15)
            {
                Console.WriteLine("Password must be between 8 and 15 characters long. Please try again.");
                return;
            }

            // Database connection and insertion
            string connectionString = "server=10.0.11.141;user=devusr;password=a2j?XU4^dU?6DmN@;database=Nuj_db";

            using (MySqlConnection conn = new MySqlConnection(connectionString))
            {
                try
                {
                    conn.Open();

                    string query = "INSERT INTO accounts (user_fname, user_mname, user_lname, email, password, gender, birthdate, status) " +
                                   "VALUES (@FirstName, @MiddleName, @LastName, @Email, @Password, @Gender, @Birthdate, @Status)";

                    using (MySqlCommand command = new MySqlCommand(query, conn))
                    {
                        command.Parameters.AddWithValue("@FirstName", firstName);
                        command.Parameters.AddWithValue("@MiddleName", middleName);
                        command.Parameters.AddWithValue("@LastName", lastName);
                        command.Parameters.AddWithValue("@Email", email);
                        command.Parameters.AddWithValue("@Password", password);
                        command.Parameters.AddWithValue("@Gender", gender);
                        command.Parameters.AddWithValue("@Birthdate", birthdate);
                        command.Parameters.AddWithValue("@Status", status);

                        int rowsAffected = command.ExecuteNonQuery();

                        if (rowsAffected > 0)
                        {
                            Console.WriteLine("\nRegistration successful! Your details have been saved.");
                        }
                        else
                        {
                            Console.WriteLine("\nRegistration failed. Please try again.");
                        }
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"An error occurred while saving your details: {ex.Message}");
                }
            }
            Console.WriteLine("\nHere is your details: ");
            Console.WriteLine($"Name: {firstName} {middleName} {lastName}" );
            Console.WriteLine($"Email: {email}");
            Console.WriteLine($"Gender: {gender}");
            Console.WriteLine($"Birthdate: {birthdate}");
            Console.WriteLine($"Status: {status}");
        }

        // Update existing user information
        private static void UpdateUserInfo()
        {
            Console.WriteLine("Enter your email and password to authenticate:");

            Console.Write("Email: ");
            string email = Console.ReadLine();

            Console.Write("Password: ");
            string password = Console.ReadLine();

            // Authenticate user
            if (!AuthenticateUser(email, password))
            {
                Console.WriteLine("Authentication failed. Invalid email or password.");
                return;
            }

            Console.WriteLine("Authentication successful. You can now update your information.");

            Console.WriteLine("Enter your updated details:");

            Console.Write("First Name: ");
            string firstName = Console.ReadLine();

            Console.Write("Middle Name: ");
            string middleName = Console.ReadLine();

            Console.Write("Last Name: ");
            string lastName = Console.ReadLine();

            Console.Write("New Email: ");
            string newEmail = Console.ReadLine();

            Console.Write("New Password: ");
            string newPassword = Console.ReadLine();

            Console.Write("Gender: ");
            string gender = Console.ReadLine();

            Console.Write("Birthdate (YYYY-MM-DD): ");
            string birthdate = Console.ReadLine();

            Console.Write("Status: ");
            string status = Console.ReadLine();

            // Database connection and update
            string connectionString = "server=10.0.11.141;user=devusr;password=a2j?XU4^dU?6DmN@;database=Nuj_db";

            using (MySqlConnection conn = new MySqlConnection(connectionString))
            {
                try
                {
                    conn.Open();

                    string query = @"UPDATE accounts 
                                     SET user_fname = @FirstName, 
                                         user_mname = @MiddleName, 
                                         user_lname = @LastName, 
                                         email = @NewEmail, 
                                         password = @NewPassword, 
                                         gender = @Gender, 
                                         birthdate = @Birthdate, 
                                         status = @Status 
                                     WHERE email = @Email AND password = @Password";

                    using (MySqlCommand command = new MySqlCommand(query, conn))
                    {
                        command.Parameters.AddWithValue("@FirstName", firstName);
                        command.Parameters.AddWithValue("@MiddleName", middleName);
                        command.Parameters.AddWithValue("@LastName", lastName);
                        command.Parameters.AddWithValue("@NewEmail", newEmail);
                        command.Parameters.AddWithValue("@NewPassword", newPassword);
                        command.Parameters.AddWithValue("@Gender", gender);
                        command.Parameters.AddWithValue("@Birthdate", birthdate);
                        command.Parameters.AddWithValue("@Status", status);
                        command.Parameters.AddWithValue("@Email", email);
                        command.Parameters.AddWithValue("@Password", password);

                        int rowsAffected = command.ExecuteNonQuery();

                        if (rowsAffected > 0)
                        {
                            Console.WriteLine("Update successful! Your information has been updated.");
                        }
                        else
                        {
                            Console.WriteLine("Update failed! Please try again.");
                        }
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"An error occurred while updating your details: {ex.Message}");
                }
            }


            Console.WriteLine("\nHere is your details: ");
            Console.WriteLine($"Name: {firstName} {middleName} {lastName}" );
            Console.WriteLine($"Email: {newEmail}");
            Console.WriteLine($"Gender: {gender}");
            Console.WriteLine($"Birthdate: {birthdate}");
            Console.WriteLine($"Status: {status}");
        }

        // Method to validate email format
        private static bool IsValidEmail(string email)
        {
            try
            {
                var addr = new System.Net.Mail.MailAddress(email);
                return addr.Address == email;
            }
            catch
            {
                return false;
            }
        }

        
          private static bool AuthenticateUser(string email, string password)
        {
            string connectionString = "server=10.0.11.141;user=devusr;password=a2j?XU4^dU?6DmN@;database=Nuj_db";
            string query = "SELECT COUNT(*) FROM accounts WHERE email = @Email AND password = @Password";

            using MySqlConnection conn = new MySqlConnection(connectionString);
            try
            {
                conn.Open();

                using MySqlCommand command = new MySqlCommand(query, conn);
                command.Parameters.AddWithValue("@Email", email);
                command.Parameters.AddWithValue("@Password", password);

                int count = Convert.ToInt32(command.ExecuteScalar());

                return count > 0;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return false;
            }
        }

    }
}
