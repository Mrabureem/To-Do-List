// selector
let inputTask = document.getElementById("inp-task"),
  addTask = document.getElementById("add-task"),
  tasks = document.querySelector(".tasks"),
  finishedTasks = document.querySelector(".finish-tasks");
// get data in arry
let userData, tasksList, finishList;
function getData() {
  if (localStorage.users) {
    userData = JSON.parse(localStorage.users);
    if (userData[getIndex()].tasks) {
      tasksList = userData[getIndex()].tasks;
    } else {
      tasksList = [];
    }
    if (userData[getIndex()].finished) {
      finishList = userData[getIndex()].finished;
    } else {
      finishList = [];
    }
    for (let i = 0; i < userData.length; i++) {
      userData[i].id = i + 1;
    }
    localStorage.users = JSON.stringify(userData);
  } else {
    userData = [];
    tasksList = [];
    finishList = [];
  }
}
getData();
function getIndex() {
  let userIndex = userData
    .map(function (e, index) {
      if (e.name === localStorage.user) {
        return index;
      }
    })
    .join("");
  return userIndex;
}

// get input value and check button
inputTask.onkeyup = function () {
  if (tasksList.includes(inputTask.value)) {
    addTask.classList.remove("add");
    addTask.style.visibility = "visible";
  } else {
    addTask.classList.add("add");
    addTask.style.visibility = "visible";
  }
  if (inputTask.value === "") {
    addTask.style.visibility = "hidden";
  }
};
// add task
addTask.addEventListener("click", function () {
  if (addTask.classList.contains("add")) {
    tasksList.push(inputTask.value);
    userData[getIndex()].tasks = tasksList;
    localStorage.users = JSON.stringify(userData);
    addTask.style.visibility = "hidden";
    showTasks();
  } else {
    inputTask.focus();
  }
});
// create Element
function createElement(input, i) {
  document.createElement("h2");
  let task = `
<div class="task">
<span class="num">${String(i + 1).padStart(2, 0)}</span>
  <p class="task-text">${input}</p>
  <div class="buttons">
  <button onclick="deleted(${i})">delete</button>
  <button onclick="finished(${i})">finish</button>
</div>
</div>
`;
  inputTask.value = "";
  inputTask.focus();
  return task;
}
function finishedElement(input, i) {
  let task = `<div class="task">
  <span class="num">${String(i + 1).padStart(2, 0)}</span>
  <p class="task-text finish">${input}</p>
  <div class="buttons">
  <button onclick="deleted(${i})">delete</button>
  <button onclick="restore(${i})">restore</button>
</div>
</div>`;
  return task;
}
// show tasks
function showTasks() {
  // show tasks
  if (tasksList.length === 0) {
    tasks.innerHTML = `<div class="task">
    <p class="task-text no-task">No task</p>
  </div>`;
  } else {
    document.querySelectorAll(".tasks .task").forEach((e) => {
      e.remove();
    });
    for (let i = 0; i < tasksList.length; i++) {
      tasks.innerHTML += createElement(tasksList[i], i);
    }
  }
  // show finished
  if (finishList.length === 0) {
    finishedTasks.innerHTML = `<div class="task">
      <p class="task-text no-task">No Task Finish</p>
    </div>`;
  } else {
    document.querySelectorAll(".finish-tasks .task").forEach((e) => {
      e.remove();
    });
    for (let i = 0; i < finishList.length; i++) {
      finishedTasks.innerHTML += finishedElement(finishList[i], i);
    }
  }
}
showTasks();
//update
function update() {
  userData[getIndex()].tasks = tasksList;
  userData[getIndex()].finished = finishList;
  localStorage.users = JSON.stringify(userData);
}
// finished tasks
function finished(i) {
  let finish = tasksList.splice(i, 1).join("");
  finishList.push(finish);
  update();
  showTasks();
}
// restore tasks
function restore(i) {
  let restore = finishList.splice(i, 1).join("");
  tasksList.push(restore);
  update();
  showTasks();
}
// delete button
function deleted(i) {
  if (tasksList.includes(tasksList[i])) {
    tasksList.splice(i, 1);
  }
  if (finishList.includes(finishList[i])) {
    finishList.splice(i, 1);
  }
  update();
  showTasks();
}
