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

  $("#current-day").text(currentDate.getDate());
  $("#current-month").text(listMonth[currentDate.getMonth()]);
  $("#current-year").text(currentDate.getFullYear());

  // get selector username
  $("#username").text(localStorage.getItem("user"));

  // Inisialisasi localStorage with empty array
  const initializeTasks = (key) => {
    if (localStorage.getItem(key) === null) {
      localStorage.setItem(key, JSON.stringify([])); // save as empty array
    }
  };

  // call function for all task
  initializeTasks("taskWork");
  initializeTasks("taskStudy");
  initializeTasks("taskSport");
  initializeTasks("taskFun");
  initializeTasks("taskFamily");
  initializeTasks("taskOther");

  // Update count of task from localStorage
  const updateTaskCount = (key, element) => {
    let taskArray = JSON.parse(localStorage.getItem(key)); // Ambil array dari localStorage
    element.text(taskArray.length); // Tampilkan jumlah elemen dalam array
  };

  const updateTotalTaskCount = () => {
    // Ambil jumlah task dari setiap kategori
    let taskWorkCount = JSON.parse(localStorage.getItem("taskWork")).length;
    let taskStudyCount = JSON.parse(localStorage.getItem("taskStudy")).length;
    let taskSportCount = JSON.parse(localStorage.getItem("taskSport")).length;
    let taskFunCount = JSON.parse(localStorage.getItem("taskFun")).length;
    let taskFamilyCount = JSON.parse(localStorage.getItem("taskFamily")).length;
    let taskOtherCount = JSON.parse(localStorage.getItem("taskOther")).length;
  
    // Jumlahkan semua task
    let totalTaskCount =
      taskWorkCount +
      taskStudyCount +
      taskSportCount +
      taskFunCount +
      taskFamilyCount +
      taskOtherCount;
  
    // Tampilkan total task di elemen dengan id #total-all-task
    $("#total-all-task").text(totalTaskCount);
  };
  
  // Panggil fungsi untuk mengupdate total task
  updateTotalTaskCount();

  // create unique id
  const createId = () => {
    // get timestamp
    return +new Date();
  };

  // 
  const getCheckedRadioValue = () => {
    // takes the checked radio button and gets its value
    const checkedValue = $("input.category:checked").val();
    return checkedValue || null; // Kembalikan nilai atau null jika tidak ada yang dicentang
  };


  // define task object data
  const generateTaskObject = (id, title, category, isCompleted) => {
    return {
      id,
      title,
      category,
      isCompleted,
    };
  };

  // Fungsi untuk menambahkan task baru ke DOM dan localStorage
  const addTaskWork = () => {
    // get unique id
    const generateId = createId();

    const taskCategory = getCheckedRadioValue();
    
    const newTaskWork = generateTaskObject(
      generateId,
      $("#input-new-task").val(),
      getCheckedRadioValue(),
      false,
    );

    if (newTaskWork) {
      let task = JSON.parse(localStorage.getItem(`task${taskCategory}`)) || [];
      task.push(newTaskWork);
     // Simpan kembali ke localStorage sesuai dengan kategori
     localStorage.setItem(`task${taskCategory}`, JSON.stringify(task));
    }
  };
    // Update dom count of task
    updateTaskCount("taskWork", $("#task-work"));
    updateTaskCount("taskStudy", $("#task-study"));
    updateTaskCount("taskSport", $("#task-sport"));
    updateTaskCount("taskFun", $("#task-fun"));
    updateTaskCount("taskFamily", $("#task-family"));
    updateTaskCount("taskOther", $("#task-other"));

  $("#btn-submit-add-task").on("click", function () {
    addTaskWork();
    updateTotalTaskCount();
  });

 
});
