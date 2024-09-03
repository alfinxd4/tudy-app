// import js
import "../../src/css/main.css";

// import img
import "../assets/images/icon-splash.png";
import "../assets/images/user1.jpg";
import "../assets/images/user2.jpg";
import "../assets/images/user3.jpg";
import "../assets/images/user4.jpg";
import "../assets/images/user5.jpg";
import "../assets/images/user6.jpg";
import "../assets/images/work-icon.png";
import "../assets/images/study-icon.png";
import "../assets/images/sport-icon.png";
import "../assets/images/fun-icon.png";
import "../assets/images/family-icon.png";
import "../assets/images/other-icon.png";

 $(document).ready(function () {
  const currentPage = window.location.pathname;

  const checkUser = () => {
    if (currentPage === "/dist/todo.html") {
      if (localStorage.getItem("user") === null) {
        window.location.href = "index.html";
      }
    } else if (currentPage === "/dist/index.html" || currentPage === "/dist/") {
      if (localStorage.getItem("user") !== null) {
        window.location.href = "todo.html";
      }
    }
  };

  let inputUserName = $("#input-username");
  const btnInputUserName = $("#btn-input-username");

  const setUser = () => {
    localStorage.setItem("user", inputUserName.val().trim());
    window.location.href = "todo.html";
  };

  $(btnInputUserName).on("click", (e) => {
    e.preventDefault();

    if (inputUserName.val().trim() === "") {
      alert("Please enter your name.");
      return;
    }

    setUser();
  });

  checkUser();

  const currentDate = new Date();
  let listDay = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let listMonth = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let formattedDate = currentDate.getDate().toString().padStart(2, "0");
  $("#current-date").text(formattedDate);
  $("#current-month").text(listMonth[currentDate.getMonth()]);
  $("#current-day").text(listDay[currentDate.getDay()]);

  $("#username").text(localStorage.getItem("user"));

  const initializeTasks = (key) => {
    if (localStorage.getItem(key) === null) {
      localStorage.setItem(key, JSON.stringify([])); 
    }
  };

  initializeTasks("taskWork");
  initializeTasks("taskStudy");
  initializeTasks("taskSport");
  initializeTasks("taskFun");
  initializeTasks("taskFamily");
  initializeTasks("taskOther");

  const updateTaskCount = (key, element) => {
    let taskArray = JSON.parse(localStorage.getItem(key));
    element.text(taskArray.length); 
  };

  const updateTotalTaskCount = () => {
    let taskWorkCount = JSON.parse(localStorage.getItem("taskWork")).length;
    let taskStudyCount = JSON.parse(localStorage.getItem("taskStudy")).length;
    let taskSportCount = JSON.parse(localStorage.getItem("taskSport")).length;
    let taskFunCount = JSON.parse(localStorage.getItem("taskFun")).length;
    let taskFamilyCount = JSON.parse(localStorage.getItem("taskFamily")).length;
    let taskOtherCount = JSON.parse(localStorage.getItem("taskOther")).length;

    let totalTaskCount =
      taskWorkCount +
      taskStudyCount +
      taskSportCount +
      taskFunCount +
      taskFamilyCount +
      taskOtherCount;

    $("#total-all-task").text(totalTaskCount);
  };

  updateTotalTaskCount();

  const createId = () => {
    return +new Date();
  };

  const getCheckedRadioValue = () => {
    const checkedValue = $("input.category:checked").val();
    return checkedValue || null;
  };

  const appendTaskToDOM = (taskText) => {
    let div = $("<div></div>");
    div.addClass("mb-3");
    let input = $("<input type='checkbox' name='checkbox' id=''>");
    input.addClass("peer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600");
    let label = $(`<label for='checkbox'>${taskText.title}, ${taskText.isCompleted}</label>`);
    label.addClass("peer-checked:line-through peer-checked:italic   ms-4 text-sm font-medium text-gray-900 dark:text-gray-300")

    div.append(input);
    div.append(label);
    $("#task-list").append(div);
  };

  const addTaskWork = () => {
    const generateId = createId();
    const taskCategory = getCheckedRadioValue();
    const taskTitle = $("#input-new-task").val().trim();

    const newTaskWork = {
      id: generateId,
      title: taskTitle,
      category: taskCategory,
      isCompleted: false,
    };

    let taskArray = JSON.parse(localStorage.getItem(`task${taskCategory}`)) || [];
    taskArray.push(newTaskWork);
    localStorage.setItem(`task${taskCategory}`, JSON.stringify(taskArray));

    appendTaskToDOM(newTaskWork);
    updateTotalTaskCount();
    updateTaskCount("taskWork", $("#task-work"));
  };

  const loadTasksFromStorage = () => {
    ["taskWork", "taskStudy", "taskSport", "taskFun", "taskFamily", "taskOther"].forEach((category) => {
      let taskArray = JSON.parse(localStorage.getItem(category)) || [];
      taskArray.forEach((task) => appendTaskToDOM(task)); 
    });
  };

  $("#btn-submit-add-task").on("click", function () {
    addTaskWork();
  });

  // Load tasks when the page loads
  loadTasksFromStorage();

  updateTaskCount("taskWork", $("#task-work"));
  updateTaskCount("taskStudy", $("#task-study"));
  updateTaskCount("taskSport", $("#task-sport"));
  updateTaskCount("taskFun", $("#task-fun"));
  updateTaskCount("taskFamily", $("#task-family"));
  updateTaskCount("taskOther", $("#task-other"));
});


