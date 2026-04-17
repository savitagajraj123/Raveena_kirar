
// 🔐 REGISTER
async function register() {
  const res = await fetch("http://localhost:3000/register", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      name: name.value,
      email: email.value,
      password: password.value
    })
  });

  const data = await res.json();
  alert(data.message);

  if (data.message === "Registration successful") {
  document.getElementById("registerBox").style.display = "none";
  showLogin();
}
}
function closeRegister() {
  const box = document.getElementById("registerBox");
  box.style.display = "none";
}

// 🔐 LOGIN
async function login() {
  const res = await fetch("http://localhost:3000/login", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      email: loginEmail.value,
      password: loginPassword.value
    })
  });

  const data = await res.json();
  alert(data.message);

  if (data.message === "Login successful") {
    localStorage.setItem("userEmail", loginEmail.value);

    // ✅ modal close karo
    document.getElementById("loginBox").style.display = "none";
    alert("Welcome!");

    document.querySelector(".navbar h2").innerText =
      "Welcome " + loginEmail.value;
  }
}
 function closeLogin() {
  document.getElementById("loginBox").style.display = "none";
}


// 🔥 NEW UI FUNCTIONS
function showLogin() {
  document.getElementById("loginBox").style.display = "block";
}

function showRegister() {
  document.getElementById("registerBox").style.display = "block";
}

// 🔒 LOGIN CHECK (cards ke liye)
function checkLogin(page) {
  const user = localStorage.getItem("userEmail");

  if (!user) {
    alert("Please login first!");
    return;
  }

  window.location.href = page + ".html";
}


function logout() {
  localStorage.removeItem("userEmail");
  location.reload();
}

window.onload = function () {
  const user = localStorage.getItem("userEmail");

  const title = document.querySelector(".navbar h2");

  if (!title) return; // 🔥 error prevent

  if (user) {
    title.innerText = "Welcome " + user;
  } else {
    title.innerText = "Student Portal";

    if (!user) {
  alert("You are logged out");
}

  }
};
