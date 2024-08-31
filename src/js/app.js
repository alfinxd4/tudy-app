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
      if (currentPage == "/dist/todo.html") {
        // username does not exist
        if (localStorage.getItem("user") == null) {
          // redirect to index.html
          window.location.href = "index.html";
        }
      } // username exist
      else if (currentPage === "/dist/index.html" || currentPage === "/dist/") {
        if (localStorage.getItem("user") !== null) {
          // redirect todo.html
          window.location.href = "todo.html";
        }
      }
    };
  
    // get selector input username
    let inputUserName = $("#input-username");
    const btnInputUserName = $("#btn-input-username");
  
    // set username
    const setUser = () => {
      // set localstorage by result input
      localStorage.setItem("user", inputUserName.val());
      // redirect to todo.html
      window.location.href = "todo.html";
    };
  
    // event setUser
    $(btnInputUserName).on("click", (e) => {
      console.log(localStorage.getItem("user"));
      e.preventDefault();
      setUser();
    });
  
    //event checkUser
    checkUser();
  
  
    // function date
  const currentDate = new Date();
  
  // set name list of day
  let listDay = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  
  // set name list of month
  let listMonth = [
    "January",
    "February",
    "March",
    "April",
    "Mei",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  
  // 
  let currentDay = $("#current-day");
  currentDay.text(currentDate.getDate());
  
  let currentMonth = $("#current-month");
  let monthName = currentDate.getMonth();
  monthName = listMonth[monthName];
  currentMonth.text(monthName);
  
  let currentYear = $("#current-year");
  currentYear.text(currentDate.getFullYear());
  
    // get selector username
    let username = $("#username");
    username.text(localStorage.getItem("user"));
  
    let totalTaskAll = $("#total-all-task");
    let totalTaskWork = $("#task-work");
    let totalTaskStudy = $("#task-study");
    let totalTaskSport = $("#task-sport");
    let totalTaskFun = $("#task-fun");
    let totalTaskFamily = $("#task-family");
    let totalTaskOther = $("#task-other");
  
    const checkTotalTask = () => {
      // 
      if (localStorage.getItem("taskWork") == null) {
        localStorage.setItem("taskWork", Number(0));
      } else {
        let taskArray = JSON.parse(localStorage.getItem("taskWork")) || [];
        let taskCount = taskArray.length;
        totalTaskWork.text(taskCount);
      }
      // 
      if (localStorage.getItem("taskStudy") == null) {
        localStorage.setItem("taskStudy", 0);
      } else {
        let taskArray = JSON.parse(localStorage.getItem("taskStudy")) || [];
        let taskCount = taskArray.length;
        totalTaskStudy.text(taskCount);
      }
       // 
       if (localStorage.getItem("taskSport") == null) {
        localStorage.setItem("taskSport", 0);
      } else {
        let taskArray = JSON.parse(localStorage.getItem("taskSport")) || [];
        let taskCount = taskArray.length;
        totalTaskSport.text(taskCount);
      }
       // 
       if (localStorage.getItem("taskFun") == null) {
        localStorage.setItem("taskFun", 0);
      } else {
        let taskArray = JSON.parse(localStorage.getItem("taskFun")) || [];
        let taskCount = taskArray.length;
        totalTaskFun.text(taskCount);
      }
      // 
      if (localStorage.getItem("taskFamily") == null) {
        localStorage.setItem("taskFamily", 0);
      } else {
        let taskArray = JSON.parse(localStorage.getItem("taskFamily")) || [];
        let taskCount = taskArray.length;
        totalTaskFamily.text(taskCount);
      }
       // 
       if (localStorage.getItem("taskOther") == null) {
        localStorage.setItem("taskOther", 0);
      } else {
        let taskArray = JSON.parse(localStorage.getItem("taskOther")) || [];
        let taskCount = taskArray.length;
        totalTaskOther.text(taskCount);
      }
  
  
      let countAllTask = JSON.parse(localStorage.getItem("taskWork")) + JSON.parse(localStorage.getItem("taskStudy"));
      totalTaskAll.text(countAllTask);
    };
  
    checkTotalTask();
  
  
  });
  