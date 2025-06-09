function generatePassword() {
  const length = +document.getElementById("length").value;
  const includeUpper = document.getElementById("uppercase").checked;
  const includeLower = document.getElementById("lowercase").checked;
  const includeNumbers = document.getElementById("numbers").checked;
  const includeSymbols = document.getElementById("symbols").checked;

  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

  let allChars = "";
  if (includeUpper) allChars += upper;
  if (includeLower) allChars += lower;
  if (includeNumbers) allChars += numbers;
  if (includeSymbols) allChars += symbols;

  if (allChars === "") {
    alert("Select at least one option!");
    return;
  }

  let password = "";
  for (let i = 0; i < length; i++) {
    const char = allChars[Math.floor(Math.random() * allChars.length)];
    password += char;
  }

  document.getElementById("result").value = password;
  showStrength(password);
  savePassword(password);
}
function showStrength(password) {
  let score = 0;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  let result = "Weak 🔴";
  if (score === 2) result = "Moderate 🟡";
  if (score >= 3) result = "Strong 🟢";

  document.getElementById("strengthText").innerText = result;
}
function copyPassword() {
  const pwd = document.getElementById("result").value;
  if (pwd) {
    navigator.clipboard.writeText(pwd);
    alert("Copied to clipboard!");
  } else {
    alert("No password to copy!");
  }
}
function toggleTheme() {
  document.body.classList.toggle("light-mode");
}
function savePassword(pwd) {
  let history = JSON.parse(localStorage.getItem("passwordHistory")) || [];
  history.unshift(pwd);
  history = history.slice(0, 5);
  localStorage.setItem("passwordHistory", JSON.stringify(history));
  displayHistory();
}
function displayHistory() {
  const history = JSON.parse(localStorage.getItem("passwordHistory")) || [];
  const list = document.getElementById("history");
  list.innerHTML = "";
  history.forEach(p => {
    const li = document.createElement("li");
    li.textContent = p;
    list.appendChild(li);
  });
}
window.onload = displayHistory;
