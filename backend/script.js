const statusEl = document.getElementById('status');

// Simulate Login
function login() {
  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value.trim();

  if (!email || !password) {
    alert('Please enter both email and password to log in.');
    return;
  }

  statusEl.textContent = "Logging in...";

  setTimeout(() => {
    statusEl.textContent = `Welcome back, ${email}! (Simulated)`;
  }, 1000);
}

// Simulate Register
function register() {
  const email = document.getElementById('registerEmail').value.trim();
  const password = document.getElementById('registerPassword').value.trim();

  if (!email || !password) {
    alert('Please enter both email and password to register.');
    return;
  }

  statusEl.textContent = "Registering...";

  setTimeout(() => {
    statusEl.textContent = `Account created for ${email} (Simulated)!`;
  }, 1000);
}

// Simulate saving pain data
function savePainData() {
  const painScoreStr = document.getElementById('scoreInput').value.trim();
  const failuresStr = document.getElementById('failInput').value.trim();

  if (!painScoreStr || !failuresStr) {
    alert("Please enter both pain score and failures.");
    return;
  }

  const painScore = Number(painScoreStr);
  const failures = Number(failuresStr);

  if (isNaN(painScore) || isNaN(failures)) {
    alert("Pain score and failures must be valid numbers.");
    return;
  }

  statusEl.textContent = "Saving pain data...";

  setTimeout(() => {
    statusEl.textContent = `Pain data saved: Score=${painScore}, Failures=${failures} (Simulated)`;
  }, 1000);
}

window.login = login;
window.register = register;
window.savePainData = savePainData;
