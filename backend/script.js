// Example script for form validation
window.login = function () {
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  if (!email || !password) {
    alert('Please fill in both email and password to login.');
    return;
  }

  alert(`Logged in as: ${email}`);
};

window.register = function () {
  const email = document.getElementById('registerEmail').value;
  const password = document.getElementById('registerPassword').value;

  if (!email || !password) {
    alert('Please fill in both email and password to register.');
    return;
  }

  alert(`Registered: ${email}`);
};

window.savePainData = function () {
  const score = document.getElementById('scoreInput').value;
  const failures = document.getElementById('failInput').value;

  if (!score || !failures) {
    alert('Please enter both pain score and failures.');
    return;
  }

  alert(`Pain score: ${score}, Failures: ${failures}`);
};
