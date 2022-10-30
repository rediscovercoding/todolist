("use strict");
const taskName = document.querySelector("#taskName");
const taskPriority = document.querySelector("#priorityInput");
const taskDueDate = document.querySelector("#dueDate");
let taskProjName = document.querySelector("#projectName");
const taskDesc = document.querySelector("#taskDesc");
const submitBtn = document.querySelector(".submit");
const displayTaskName = document.querySelector(".displayTaskName");
const taskDisplayContainer = document.querySelector(".taskDisplayContainer");
const taskDisplayContainerInner = document.querySelector(
  ".taskDisplayContainerInner"
);

//object constructor
let tasksConstructor = function (
  task,
  taskDesc,
  dueDate,
  priority,
  project,
  taskPriorityValue
) {
  this.taskName = task;
  this.taskDesc = taskDesc;
  this.priority = priority;
  this.project = project;
  this.dueDate = new Date(dueDate);
  this.taskPriorityValue = taskPriorityValue;
};

//trial Objects
let trialOb1 = new tasksConstructor(
  "Task1",
  "Very Important Task",
  "02-20-1993",
  "Low",
  "Special",
  3
);
let trialOb2 = new tasksConstructor(
  "Task2",
  "Second Important Task",
  "11-10-1997",
  "Medium",
  "General",
  2
);
let trialOb3 = new tasksConstructor(
  "Task3",
  "Third Task",
  "10-15-1996",
  "Medium",
  "General",
  2
);
let taskArr = [trialOb1, trialOb2, trialOb3];
if (!localStorage.getItem("storedArr")) {
  taskArr = [trialOb1, trialOb2, trialOb3];
} else {
  taskArr = JSON.parse(localStorage.getItem("storedArr"));
}

refreshview();

function addNewTask() {
  let taskPriorityValue;
  if (taskPriority.value === "Low") {
    taskPriorityValue = 3;
  } else if (taskPriority.value === "Medium") {
    taskPriorityValue = 2;
  } else {
    taskPriorityValue = 1;
  }
  let trialTaskObject = new tasksConstructor(
    `${taskName.value}`,
    `${taskDesc.value}`,
    `${taskDueDate.value}`,
    `${taskPriority.value}`,
    `${taskProjName.value}`,
    `${taskPriorityValue}`
  );
  taskArr.push(trialTaskObject);
  updateStorage(taskArr);
}

//Update UI
function refreshview() {
  let taskContainerNodeList = document.querySelectorAll(".taskContainer");
  taskContainerNodeList.forEach((e) => {
    e.parentNode.remove();
  });
  taskArr.forEach((ele, i) => updateListDisplay(ele, i));
  addDescLogic(taskArr);
}

// Extra code written below, not sure if useful so will keep for now
// function updateTaskListDisplay(taskArr) {
//   let div = document.createElement("div");
//   div.setAttribute("id", `taskNo${taskArr.length - 1}`);

//   div.innerHTML = `
//         <div class="taskContainer">
//                 <p class="taskInfo displayTaskName">${
//                   taskArr[taskArr.length - 1].taskName
//                 }</p>
//                 <p class="taskInfo displayDesc">❔</p>
//                 <p class="taskInfo">Priority: ${
//                   taskArr[taskArr.length - 1].priority
//                 }</p>
//                 <p class="taskInfo">Due Date: ${
//                   taskArr[taskArr.length - 1].dueDate
//                 }</p>

//                 <p class="taskInfo taskProjName">${
//                   taskArr[taskArr.length - 1].project
//                 }</p>
//                 <button class="doneBtn" onclick="done(${
//                   taskArr.length - 1
//                 })">✔</button>
//             <button class="removeBtn" onclick="remove(${
//               taskArr.length - 1
//             })">🗑</button>
//             </div>
//             <div class="taskDesc hiddenModal${
//               taskArr.length - 1
//             }" style="display:none"></div>`;

//   taskDisplayContainerInner.appendChild(div);
// }

//Event Listener for all ? and showing description in an modal

function addDescLogic(taskArr) {
  const displayDesc = document.querySelectorAll(".displayDesc");

  //Logic for showing description on howering the ?
  displayDesc.forEach((e, i) => {
    displayDesc[i].addEventListener("mouseenter", function () {
      const hiddenModal = document.querySelector(`.hiddenModal${i}`);
      hiddenModal.style.display = "";
      hiddenModal.innerHTML = `${taskArr[i].taskDesc}`;
    });
    displayDesc[i].addEventListener("mouseleave", function () {
      const hiddenModal = document.querySelector(`.hiddenModal${i}`);
      hiddenModal.style.display = "none";
    });
  });
}

function updateListDisplay(element, i) {
  let div = document.createElement("div");
  div.setAttribute("id", `taskNo${i}`);
  let date = convertDate(taskArr[i].dueDate);
  div.innerHTML = `
        <div class="taskContainer">
                <p class="taskInfo displayTaskName">${taskArr[i].taskName}</p>
                <p class="taskInfo displayDesc">❔</p>
                <p class="taskInfo">Priority: ${taskArr[i].priority}</p>
                <p class="taskInfo">Due Date: ${date}</p>

                <p class="taskInfo taskProjName">${taskArr[i].project}</p>
                <button class="doneBtn" onclick="done(${i})">✔</button>
            <button class="removeBtn" onclick='remove(${i})'>🗑</button>
            </div>
            <div class="taskDesc hiddenModal${i}" style="display:none"></div>`;

  taskDisplayContainerInner.appendChild(div);
}

//Event handlers Buttons
submitBtn.addEventListener("click", function (e) {
  e.preventDefault();
  addNewTask();
  refreshview(taskArr);
  addDescLogic(taskArr);

  //reset the form
  taskName.value = "";
  taskDesc.value = "";
  taskDueDate.value = "";
  taskProjName = "General";
});

function done(n) {
  let taskDiv = document.querySelector(`#taskNo${n}`);
  taskDiv.classList.toggle("strikeThrough");
}

function remove(n) {
  let taskDiv = document.querySelector(`#taskNo${n}`);
  taskDiv.remove();
  taskArr.splice(n, 1);
  console.log(taskArr);
  updateStorage(taskArr);
  refreshview(taskArr);
}

function convertDate(dateString) {
  let dateformat = new Date(dateString);
  let date = Intl.DateTimeFormat("de-DE").format(dateformat);
  return date;
}

// to save the data to local storage
// logic for sort button
//Intl.DateTimeFormat("de-DE").format(newDate)

const sortByDates = function () {
  taskArr.sort((a, b) => a.dueDate - b.dueDate);
  refreshview(taskArr);
  addDescLogic(taskArr);
};

const sortByPriority = function () {
  taskArr.sort((a, b) => a.taskPriorityValue - b.taskPriorityValue);
  refreshview(taskArr);
  addDescLogic(taskArr);
};

const sortByCategory = function () {
  console.log(taskArr[1].project < taskArr[0].project);
  taskArr.sort((a, b) => {
    if (a === b) {
      return 0;
    }
    return a.project < b.project ? -1 : 1;
  });
  refreshview(taskArr);
  addDescLogic(taskArr);
};

let sortBtn = document.querySelector(".sortBtn");
let sortBy = document.querySelector("#sortBy");
sortBtn.addEventListener("click", function () {
  if (sortBy.value === "byDueDate") {
    sortByDates();
  } else if (sortBy.value === "byPriority") {
    sortByPriority();
  } else if (sortBy.value === "byCategory") {
    sortByCategory();
  }
});

function updateStorage(taskArr) {
  localStorage.setItem("storedArr", JSON.stringify(taskArr));
}
