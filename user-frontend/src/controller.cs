using Microsoft.AspNetCore.Mvc;
using System;

namespace YourNamespace.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class YourController : ControllerBase
    {
        private readonly IUserService _userService;

        public YourController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            // Validate request
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Authenticate user
            var user = _userService.Authenticate(request.Email, request.Password);

            if (user == null)
            {
                return Unauthorized();
            }

            // Generate and return JWT token
            var token = _userService.GenerateJwtToken(user);
            return Ok(new { Token = token });
        }

        [HttpPost("register")]
        public IActionResult Register([FromBody] RegisterRequest request)
        {
            // Validate request
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Register user
            try
            {
                var user = _userService.Register(request);
                return Ok(user);
            }
            catch (Exception)
            {
                return StatusCode(500, new { message = "An error occurred while registering the user." });
            }
        }
    }

    public interface IUserService
    {
        object Authenticate(string email, string password);
        object GenerateJwtToken(object user);
        object Register(RegisterRequest request);
    }

    public class RegisterRequest
    {
        // Add properties as needed
    }

    public class LoginRequest
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
