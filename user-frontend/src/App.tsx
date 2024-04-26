import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);

  const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add your login form submission logic here
  };

  const handleRegistrationSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add your registration form submission logic here
  };

  return (
    <>
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
          <meta name="description" content="" />
          <meta name="author" content="" />
          <title>JBell</title>
          <link rel="icon" type="image/x-icon" href="assets/favicon.ico" />
          <link href="https://fonts.googleapis.com/css?family=Catamaran:100,200,300,400,500,600,700,800,900" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css?family=Lato:100,100i,300,300i,400,400i,700,700i,900,900i" rel="stylesheet" />
          <link href="assets/css/index.css" rel="stylesheet" />
        </head>
        <body id="page-top">
          <nav className="navbar navbar-expand-lg navbar-dark navbar-custom fixed-top">
            <div className="container px-5">
              <a className="navbar-brand" href=".php">JBell</a>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarResponsive">
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item"><a className="nav-link" href="#" onClick={() => setShowLoginModal(true)}>Log In</a></li>
                  <li className="nav-item"><a className="nav-link" href="#" onClick={() => setShowRegistrationModal(true)}>Sign Up</a></li>
                </ul>
              </div>
            </div>
          </nav>
          <header className="masthead text-center text-white">
            <div className="masthead-content">
              <div className="container px-5">
                <h1 className="masthead-heading mb-0">Welcome</h1>
                <h2 className="masthead-subheading mb-0">Meet Your Friends Online</h2>
                <a className="btn btn-primary btn-xl rounded-pill mt-5" href="#scroll">Learn More</a>
              </div>
            </div>
            <div className="bg-circle-1 bg-circle"></div>
            <div className="bg-circle-2 bg-circle"></div>
            <div className="bg-circle-3 bg-circle"></div>
            <div className="bg-circle-4 bg-circle"></div>
          </header>

          {/* Modal for Login */}
          <div className={`modal ${showLoginModal ? 'show' : ''}`} tabIndex={-1} role="dialog" style={{ display: showLoginModal ? 'block' : 'none' }}>
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="loginModalLabel">Log In</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => setShowLoginModal(false)}>
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleLoginSubmit}>
                    <div className="form-group">
                      <label htmlFor="loginEmail">Email</label>
                      <input type="email" className="form-control" id="loginEmail" name="email" required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="loginPassword">Password</label>
                      <input type="password" className="form-control" id="loginPassword" name="password" required />
                    </div>
                    <button type="submit" className="btn btn-primary">Log In</button>
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* Modal for Registration */}
          <div className={`modal ${showRegistrationModal ? 'show' : ''}`} tabIndex={-1} role="dialog" style={{ display: showRegistrationModal ? 'block' : 'none' }}>
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="registrationModalLabel">Register</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => setShowRegistrationModal(false)}>
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleRegistrationSubmit}>
                    <div className="form-group">
                      <label htmlFor="registrationFirstName">First Name</label>
                      <input type="text" className="form-control" id="registrationFirstName" name="firstname" required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="registrationLastName">Last Name</label>
                      <input type="text" className="form-control" id="registrationLastName" name="lastname" required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="registrationEmail">Email</label>
                      <input type="email" className="form-control" id="registrationEmail" name="email" required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="registrationPassword">Password</label>
                      <input type="password" className="form-control" id="registrationPassword" name="password" required />
                    </div>
                    <button type="submit" className="btn btn-primary">Sign Up</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </body>
      </html>
    </>
  );
};

export default App;
