import "../../src/css/main.css";
import "../assets/images/icon-splash.png";
import "../assets/images/user1.jpg";
import "../assets/images/user2.jpg";
import "../assets/images/user3.jpg";
import "../assets/images/user4.jpg";
import "../assets/images/user5.jpg";
import "../assets/images/user6.jpg";

 
$(document).ready(function () {
  // get current.location.path
  const currentPage = window.location.pathname;

  // check username isExist
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

  // get selector input username
  let inputUserName = $("#input-username");
  const btnInputUserName = $("#btn-input-username");

  // set username
  const setUser = () => {
      localStorage.setItem("user", inputUserName.val().trim());
      window.location.href = "todo.html";
  };

  // event setUser
  $(btnInputUserName).on("click", (e) => {
      e.preventDefault();

      if (inputUserName.val().trim() === "") {
          alert("Please enter your name.");
          return;
      }

      setUser();
  });

  // event checkUser
  checkUser();

  // function date
  const currentDate = new Date();
  let listDay = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let listMonth = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  $("#current-day").text(currentDate.getDate());
  $("#current-month").text(listMonth[currentDate.getMonth()]);
  $("#current-year").text(currentDate.getFullYear());

  // get selector username
  $("#username").text(localStorage.getItem("user"));

//   const checkTotalTask = () => {
//       const initializeTasks = (key) => {
//           if (localStorage.getItem(key) === null) {
//               localStorage.setItem(key, JSON.stringify([]));
//           }
//       };

//       initializeTasks("taskWork");
//       initializeTasks("taskStudy");
//       initializeTasks("taskSport");
//       initializeTasks("taskFun");
//       initializeTasks("taskFamily");
//       initializeTasks("taskOther");

//       const updateTaskCount = (key, element) => {
//           let taskArray = JSON.parse(localStorage.getItem(key));
//           element.text(taskArray.length);
//       };

//       updateTaskCount("taskWork", $("#task-work"));
//       updateTaskCount("taskStudy", $("#task-study"));
//       updateTaskCount("taskSport", $("#task-sport"));
//       updateTaskCount("taskFun", $("#task-fun"));
//       updateTaskCount("taskFamily", $("#task-family"));
//       updateTaskCount("taskOther", $("#task-other"));

//       let countAllTask =  JSON.parse(localStorage.getItem("taskWork")) + 
//                          JSON.parse(localStorage.getItem("taskStudy"));
//       $("#total-all-task").text(countAllTask);
//   };


//  update totaltask
const checkTotalTask = () => {
    if (localStorage.getItem("user") === null) {
        $("#task-work").text(localStorage.getItem("user"));
    } else {
      let taskArray = JSON.parse(localStorage.getItem('taskWork'))|| [];
      // Hitung jumlah elemen dalam array
      let taskCount = taskArray.length;
      $("#task-work").text(taskCount);
    }
  
  };
  

// define task object data
const generateTaskObject = (id,title,category,isCompleted) => {
    return {
        id,
        title,
      }
  };
  


  checkTotalTask();
});

  