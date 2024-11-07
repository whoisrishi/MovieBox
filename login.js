document.addEventListener("DOMContentLoaded", () => {
   const loginform = document.getElementById("loginform");
  const username = document.getElementById("username");
  const password = document.getElementById("password");

  const signupform = document.getElementById("signupform");
  const setusername = document.getElementById("setusername");
  const setpassword = document.getElementById("setpassword");


  const regUser = localStorage.getItem("username");
  const regPass = localStorage.getItem("password");

  loginform.addEventListener("submit", (e) => {
    e.preventDefault();
    const uname = username.value;
    const pass = password.value;

    if (uname === regUser && pass === regPass) {
      console.log("Logged in");
      window.location.href = "index.html";
    } else {
      console.log("Enter valid credentials");
      alert("Invalid username or password. Please try again.");
    }
  });

  signupform.addEventListener("submit", (e) => {
    e.preventDefault();
    const uname = setusername.value;
    const pass = setpassword.value;

    if (localStorage.getItem("username") === uname) {
      console.log("Username already exists");
      alert("Username already taken. Please choose another one.");
      return;
    }

    localStorage.setItem("username", uname);
    localStorage.setItem("password", pass);
    console.log("Account created");
    alert("Account created successfully!");
    window.location.href = "login.html"

    setusername.value = '';
    setpassword.value = '';
  });
});
