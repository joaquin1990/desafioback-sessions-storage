// Register
console.log("Hola, entra");
const registerForm = document.getElementById("registerForm");
registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let data = new FormData(registerForm);
  let obj = {};
  data.forEach((value, key) => (obj[key] = value));
  fetch("api/sessions/register", {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((result) => result.json())
    .then((json) => console.log(json))
    .catch((error) => console.log(error));
});

// Login
const loginForm = document.getElementById("loginForm");
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let data = new FormData(loginForm);
  let obj = {};
  data.forEach((value, key) => (obj[key] = value));
  fetch("api/sessions/login", {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((result) => result.json())
    .then((json) => console.log(json))
    .catch((error) => console.log(error));
});

// Current Session
const currentButton = document.getElementById("current");
currentButton.addEventListener("click", () => {
  fetch("api/sessions/current")
    .then((res) => res.json())
    .then((json) => console.log(json))
    .catch((error) => console.log(error));
});

// Logout
const logoutButton = document.getElementById("logout");
logoutButton.addEventListener("click", () => {
  fetch("api/sessions/logout")
    .then((res) => res.json())
    .then((json) => console.log(json))
    .catch((error) => console.log(error));
});
