// select elements
let inp = document.getElementById("inp"),
  logIn = document.getElementById("log-in"),
  signUp = document.getElementById("sign-up"),
  ok = document.getElementById("ok"),
  popUp = document.querySelector(".pop-up"),
  popUpText = document.querySelector(".pop-up p");

// get data in arry
let userData;
function getData() {
  if (localStorage.users) {
    userData = JSON.parse(localStorage.users);
    for (let i = 0; i < userData.length; i++) {
      userData[i].id = i + 1;
    }
    localStorage.users = JSON.stringify(userData);
  } else {
    userData = [];
  }
}
getData();
// get input value and check it
inp.onkeyup = () => {
  checker(inp.value);
};
//checker function
function checker(input) {
  let name = userData.filter((e) => e.name === input);
  name = name.length > 0 ? name[0].name : false;
  // check value
  if (name !== inp.value) {
    document.querySelectorAll(".choose button").forEach((e) => {
      logIn.classList.add("opacity");
      signUp.classList.remove("opacity");
    });
  }
  if (inp.value === "") {
    document.querySelectorAll(".choose button").forEach((e) => {
      logIn.classList.add("opacity");
      signUp.classList.add("opacity");
    });
  }
  if (name === input) {
    document.querySelectorAll(".choose button").forEach((e) => {
      logIn.classList.remove("opacity");
      signUp.classList.add("opacity");
    });
  }
}

// button action
logIn.addEventListener("click", function () {
  // button checker
  if (logIn.classList.contains("opacity")) {
    return;
  } else {
    popUpText.innerHTML = `welcome back <span>${inp.value}</span>`;
    popUp.style.scale = 1;
    document.getElementById("ok").remove();
    setTimeout(() => {
      localStorage.user = inp.value;
      location.href = "/To-Do-List/pages/tasksPage.html";
    }, 1500);
  }
});
signUp.addEventListener("click", function () {
  // button checker
  if (signUp.classList.contains("opacity")) {
    return;
  } else if (inp.value.length < 4) {
    popUpText.innerHTML = `${inp.value} << the name is short`;
    popUp.style.scale = 1;
  } else if (!Number.isNaN(inp.value - 1)) {
    popUpText.innerHTML = `${inp.value} << the number is not allow`;
    popUp.style.scale = 1;
  } else {
    userData.push({ id: userData.length + 1, name: inp.value });
    localStorage.users = JSON.stringify(userData);
    popUpText.innerHTML = `welcome <span>${inp.value}</span>`;
    popUp.style.scale = 1;
    document.getElementById("ok").remove();
    setTimeout(() => {
      localStorage.user = inp.value;
      location.href = "/To-Do-List/pages/tasksPage.html";
    }, 1500);
  }
});
ok.addEventListener("click", function () {
  popUp.style.scale = 0;
});
