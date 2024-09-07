// import CSS
import "../../src/css/main.css";

// import images
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
import "../assets/images/todo-logo.png";


$(document).ready(function () {
  const currentPage = window.location.pathname;   // get current path location
  const checkUser = () => {   // function to check has the user set the username yet
    // username not set
    if (currentPage === "/dist/todo.html" || currentPage === "/dist/task-work.html" || currentPage === "/dist/task-study.html" || currentPage === "/dist/task-sport.html" || currentPage === "/dist/task-fun.html" || currentPage === "/dist/task-family.html" || currentPage === "/dist/task-other.html" ) {
      if (localStorage.getItem("user") === null) {
        window.location.href = "index.html";  // redirect page
      }
    } else if (currentPage === "/dist/index.html" || currentPage === "/dist/") { // username set
      if (localStorage.getItem("user") !== null) {
        window.location.href = "todo.html"; // redirect page
      }
    }
  };

  let inputUserName = $("#input-username");   // selector input username
  const btnInputUserName = $("#btn-input-username");   // selector btn input username
  const setUser = () => {   // function to set username
    localStorage.setItem("user", inputUserName.val().trim()); // get value by input username
    window.location.href = "todo.html";  // redirect poge
  };

  $(btnInputUserName).on("click", (e) => { // event click btn input username
    e.preventDefault();
    if (inputUserName.val().trim() === "") { // if input username empty value
      alert("Please enter your name-!"); // display alert
      return;
    }
    setUser(); // running  function setUser
  });
  checkUser();   // running function checkUser every time the website load

  const currentDate = new Date();   // set function date
  // list day name
  const listDay = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  // list month name
  const listMonth = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


  $("#current-date").text(currentDate.getDate().toString().padStart(2, "0")); // get currentDate [00]
  $("#current-month").text(listMonth[currentDate.getMonth()]);  // get currentMonth
  $("#current-day").text(listDay[currentDate.getDay()]);  // get currentDay

  $("#username").text(localStorage.getItem("user"));  // get username by localstorage and display in page

  const initializeTasks = (key) => {   // initialize localstorage each task if not exists
    if (localStorage.getItem(key) === null) { 
      localStorage.setItem(key, JSON.stringify([]));  // set empty array if not set
    }
  };

  initializeTasks("taskWork");   // check localstorage task work
  initializeTasks("taskStudy");   // check localstorage task study
  initializeTasks("taskSport");   // check localstorage task sport
  initializeTasks("taskFun");   // check localstorage task fun
  initializeTasks("taskFamily");   // check localstorage task family
  initializeTasks("taskOther");   // check localstorage task other

const updateTotalTaskCount = () => {  // update total all task 
  // initialize name of localstorage each task
  const totalTaskCount = ["taskWork", "taskStudy", "taskSport", "taskFun", "taskFamily", "taskOther"]
    .map(key => { 
      const taskArray = JSON.parse(localStorage.getItem(key)) || []; // parse return of localstorage
      return taskArray.filter(task => !task.isCompleted).length; // only count incomplete tasks
    }) 
    .reduce((sum, count) => sum + count, 0);
    
  $("#total-all-task").text(totalTaskCount); // update the total task count element
};

const updateTaskCount = (key, element) => { // update count of each task
  const taskArray = JSON.parse(localStorage.getItem(key)) || [];  // get localstorage 
  const incompleteTasks = taskArray.filter(task => !task.isCompleted);   // get count of incomplete task
  element.text(incompleteTasks.length);    // Update the element with the count of incomplete tasks
};

 updateTotalTaskCount(); // running function updateTotalTaskCount every time the website load

  const createId = () => +new Date();   // generate unique task ID

  const getCheckedRadioValue = () => {  // get the value of the selected radio button (task category)
    return $("input.category:checked").val() || null;
  };

  const addTaskWork = () => {  // add new task
    const taskCategory = getCheckedRadioValue(); // get the value of the selected radio button (task category)
    const taskTitle = $("#input-new-task").val().trim(); // get the value of title task

    if (!taskTitle || !taskCategory) { // if the user not set title task or choose task category
      alert("Please enter a task and select a category."); // display alert
      return;
    }

    // set data structure task
    const newTaskWork = {
      id: createId(),
      title: taskTitle,
      category: taskCategory,
      isCompleted: false, // incompleted task
    };

  // get and parse localstorage according to task category selected
    let taskArray = JSON.parse(localStorage.getItem(`task${taskCategory}`)) || []; 
    taskArray.push(newTaskWork); // push in array
      // set and stringify localstorage according to task category selected
    localStorage.setItem(`task${taskCategory}`, JSON.stringify(taskArray));
    // get selector task list location according to localstorage
    const targetElement = `#task-list-${taskCategory.toLowerCase()}`; 
    appendTaskToDOM(newTaskWork, taskCategory, targetElement); // render to page
    updateTotalTaskCount(); // update total task count
    updateTaskCount(`task${taskCategory}`, $(`#task-${taskCategory.toLowerCase()}`)); // update count of task by selected task
  };
  // 
  
    const appendTaskToDOM = (taskText, taskCategory, targetElement) => {  // render task to page
      // create element for task list
      const container = $("<div></div>").addClass("mb-8");  // create container 
      const wrapper = $("<div></div>").addClass("flex items-center space-x-5"); // create wrapper
      // create checkbox
      const checkbox = $("<input type='checkbox'>").addClass("peer size-6 text-emerald-400 bg-gray-100 border-gray-500 rounded focus:ring-emerald-500 cursor-pointer");
      checkbox.prop("checked", taskText.isCompleted);  // set checkbox status based on task completion
      // create label
      const label = $(`<label>${taskText.title}</label>`).addClass("peer-checked:italic peer-checked:line-through flex-1 font-semibold text-gray-900 dark:text-gray-100");
      // create trash-icon
      const trashIcon = $("<i></i>").addClass("fa-solid fa-trash text-lg font-semibold text-gray-500 dark:text-gray-100 hover:text-red-600  dark:hover:text-red-600 cursor-pointer");
      trashIcon.attr('id', `delete-modal-${taskText.id}`);  // set id trash-icon by task-id
      trashIcon.attr('data-modal-target', `delete-modal-${taskText.id}`);  // set data-modal-target trash-icon by task-id
      trashIcon.attr('data-modal-toggle', `delete-modal-${taskText.id}`); // // set data-modal-toggle trash-icon by task-id
      // create divider
      const divider = $("<hr>").addClass("mt-7 border-gray-300");
      // render element
      container.append(wrapper);
      wrapper.append(checkbox);
      wrapper.append(label);
      wrapper.append(trashIcon);
      container.append(divider);
      // render element to selector
      $(targetElement).append(container);
  
// event trash-icon
trashIcon.on("click", () => {
 // show delete-modal
  $(`.delete-modal`).attr({
    'id':`delete-modal-${taskText.id}`,
    'aria-modal' :  'true',
    'role' : 'dialog'
  }).removeAttr('aria-hidden')
  .removeClass('hidden').addClass('flex');
  $(`.data-modal-hide`).attr('data-modal-hide',`delete-modal-${taskText.id}`);

   // close delete modal
  $(`.data-modal-hide, .delete-modal`).on("click", () => {
    $('div.bg-gray-900\\/50.dark\\:bg-gray-900\\/80.fixed.inset-0.z-40').remove();
    $('body').removeClass('overflow-hidden');
    $('.delete-modal').removeAttr('id aria-modal role')
    .attr('aria-hidden','true').addClass('hidden').removeClass('flex');
    $(`.data-modal-hide`).removeAttr('data-modal-hide');
  });
 
// event btn-confirm-delete
  $(`#btn-confirm-delete`).on("click", () => {
 // delete the task from localStorage and DOM
 deleteTask(taskText.id, taskCategory, container); // `container` is the DOM element for the task
   // close the modal
   $('.delete-modal').attr('aria-hidden', 'true').addClass('hidden').removeClass('flex').removeAttr('id aria-modal role');
   $('body').removeClass('overflow-hidden');
  })
});
// 
      checkbox.on("change", function () { // checkbox event listener for updating task status
        taskText.isCompleted = this.checked; // check status checkbox
        updateTaskInStorage(taskText.id, taskCategory, taskText.isCompleted); // update task in localstorage
        updateTaskCount(`task${taskCategory}`, $(`#task-${taskCategory.toLowerCase()}`)); // update task count
        updateTotalTaskCount(); // update total taks count
      });
    };

  // update task if task is completed
  const updateTaskInStorage = (taskId, taskCategory, isCompleted) => {  // update task in localStorage when checkbox is clicked
    let taskArray = JSON.parse(localStorage.getItem(`task${taskCategory}`)) || []; // get localstorage by selected task
    taskArray = taskArray.map(task => {
      if (task.id === taskId) {
        task.isCompleted = isCompleted; // check status task
      }
      return task;
    });
    localStorage.setItem(`task${taskCategory}`, JSON.stringify(taskArray)); // update status in localstorage
  };

  const loadTasksFromStorage = () => {   // load tasks from localStorage and append to DOM
    // initialize each task in localstorage
    ["taskWork", "taskStudy", "taskSport", "taskFun", "taskFamily", "taskOther"].forEach(category => {
      const taskArray = JSON.parse(localStorage.getItem(category)) || []; // get localstorage 
      const taskCategory = category.replace("task", ""); // extract category name from key
      const targetElement = `#task-list-${taskCategory.toLowerCase()}`;
      
      taskArray.forEach(task => appendTaskToDOM(task, taskCategory, targetElement));
    });
  };


  $("#btn-submit-add-task").on("click", () => {
    addTaskWork();
  });
 
  loadTasksFromStorage(); // running function loadTasksFromStorage every time the website load

  // Update task counts in each category and match that selector
  updateTaskCount("taskWork", $("#task-work"));
  updateTaskCount("taskStudy", $("#task-study"));
  updateTaskCount("taskSport", $("#task-sport"));
  updateTaskCount("taskFun", $("#task-fun"));
  updateTaskCount("taskFamily", $("#task-family"));
  updateTaskCount("taskOther", $("#task-other"));

  // function to delete task
  const deleteTask = (taskId, taskCategory, elementToRemove) => {
    let taskArray = JSON.parse(localStorage.getItem(`task${taskCategory}`)) || []; // ger localstorage
    // filter out the task with the specified ID
    taskArray = taskArray.filter(task => task.id !== taskId);
    localStorage.setItem(`task${taskCategory}`, JSON.stringify(taskArray)); // Update localStorage
    const updatedTaskArray = JSON.parse(localStorage.getItem(`task${taskCategory}`)) || []; // verify if the update was successful
    elementToRemove.remove();     // remove the task element from the DOM
  
    // update the task count after deletion
    updateTaskCount(`task${taskCategory}`, $(`#task-${taskCategory.toLowerCase()}`));
    updateTotalTaskCount();
  };


 

  // theme var
const userTheme = localStorage.getItem("theme");

// dark mode
const darkMode = () => {
  document.documentElement.classList.add("dark");
  localStorage.setItem("theme", "dark");
}

// light mode
const lightMode = () => {
  if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
}

//check initial theme
const checkTheme = () => {
  if (userTheme != null) {
    //dark mode
    if (userTheme == "dark" || switchTheme == "dark") {
        darkMode();
    } else {
    //   light mode
      lightMode();
    }
  }
};

// switch theme
const switchTheme = () => {
  // dark - light
  if (document.documentElement.classList.contains("dark")) {
   lightMode();
  }
  // light - dark
  else {
    darkMode();
  }
};

$("#btn-switch").on("click", () => {
  switchTheme();
});

checkTheme();
});