const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const showRegister = document.getElementById('showRegister');
const showLogin = document.getElementById('showLogin');
const loginContainer = document.querySelector('.login-container');
const registerContainer = document.getElementById('registerContainer');
const message = document.getElementById('message');
const regMessage = document.getElementById('regMessage');

showRegister.addEventListener('click', (e) => {
  e.preventDefault();
  loginContainer.style.display = 'none';
  registerContainer.style.display = 'block';
});

showLogin.addEventListener('click', (e) => {
  e.preventDefault();
  registerContainer.style.display = 'none';
  loginContainer.style.display = 'block';
});

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();
    if (response.ok) {
      message.style.color = 'green';
      message.textContent = 'Login successful!';
      localStorage.setItem('token', data.token);
    } else {
      message.style.color = 'red';
      message.textContent = data.msg;
    }
  } catch (error) {
    message.style.color = 'red';
    message.textContent = 'Error logging in';
  }
});

registerForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('regUsername').value;
  const password = document.getElementById('regPassword').value;

  try {
    const response = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();
    if (response.ok) {
      regMessage.style.color = 'green';
      regMessage.textContent = 'Registration successful!';
    } else {
      regMessage.style.color = 'red';
      regMessage.textContent = data.msg;
    }
  } catch (error) {
    regMessage.style.color = 'red';
    regMessage.textContent = 'Error registering';
  }
});