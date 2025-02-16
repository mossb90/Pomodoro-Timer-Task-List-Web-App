
var timerOn =  false;
var myTimer;
var PomoCycle = {
    // variables set to +1 sec  since time decrement  of timeInSecond
    // in runTimer() occurs before time update
    pomoWork: "25:01",
    shortBreak: "5:01",
    longBreak: "30:01",
    longBreakInterval: 4   //number of work pomoWork intervals before long break
}
var numWorkCycles;  // Number of 25 min work cycles
var numPomoCycles;  // Number of Full Pomodoro Cycles thru full break
var timerContainer = document.querySelector("#timerContainer");

function startTimer() {
    if (!timerOn){
        timerOn = true;
        runTimer();
    }
}

function pauseTimer()  {
    clearTimeout(myTimer);
    timerOn = false;
}

function runTimer() {
    //   console.log(timer);
    const timer = document.querySelector("#pomoTimer").innerText;

    if (timer !== "0:00") {
      //  increment  counters to track cycles
      var timeInSecond = convertToSeconds(timer); 
      timeInSecond--; 
      var newTime = convertBackToString(timeInSecond);
      // console.log(newTime);
      document.querySelector("#pomoTimer").innerText = newTime;
      myTimer = setTimeout(runTimer, 1000);
    }
    // manages transition when timer counts down to zero
    else {
        makeTransition();  
    }
}

function fastForwardTimer() {
    console.log("entered fastForward function");
    makeTransition();
}

function addTimerMinute(){
    const timer = document.querySelector("#pomoTimer").innerText;

    var timeInSecond = convertToSeconds(timer); 
    timeInSecond= timeInSecond + 60; 
    var newTime = convertBackToString(timeInSecond);
    // console.log(newTime);
    document.querySelector("#pomoTimer").innerText = newTime;
}

function resetTimer() {
    console.log("entered resetTimer()")
    document.querySelector("#pomoTimer").innerText = "25:00";
    document.querySelector("#currentPhase").innerText = "We Can Do Hard Things!";
    timerContainer.style.backgroundColor = "rgb(179, 154, 230)";
    clearTimeout(myTimer);
    timerOn = false;
    numPomoCycles = 0;
    numWorkCycles = 0;
    currentPhase = "work";
}

function  makeTransition() {
    clearTimeout(myTimer);
    console.log("entered makeTransition function");
    //manages transition from work to break
    if (currentPhase === "work"){        
        numWorkCycles++;
        if (numWorkCycles < 4){
            currentPhase = "shortBreak"
            console.log("started shortBreak")
            document.querySelector("#pomoTimer").innerText = PomoCycle.shortBreak;
            document.querySelector("#currentPhase").innerText = "Take a Short Break";
            timerContainer.style.backgroundColor = "rgb(250, 250, 210)";
        }
        else {
            currentPhase = "longBreak"
            console.log("started longBreak");
            document.querySelector("#pomoTimer").innerText = PomoCycle.longBreak;
            document.querySelector("#currentPhase").innerText = "Enjoy a Well Deserved Long Break!";
            timerContainer.style.backgroundColor = "rgb(214, 102, 121)";
            
        }
        runTimer();
    
    // manages transition from longBreak back to work
    } else if (currentPhase === "longBreak") {
        numPomoCycles++;
        numWorkCycles = 0;
        currentPhase = "work";
        document.querySelector("#pomoTimer").innerText = PomoCycle.pomoWork;
        document.querySelector("#currentPhase").innerText = "We Can Do Hard Things!";
        timerContainer.style.backgroundColor = "rgb(179, 154, 230)";

    // manages transition from shortBreak back to work
    } else {
        currentPhase = "work";
        document.querySelector("#pomoTimer").innerText = PomoCycle.pomoWork;
        document.querySelector("#currentPhase").innerText = "We Can Do Hard Things!";
        timerContainer.style.backgroundColor = "rgb(179, 154, 230)";
        runTimer();
    }
}
   
function convertToSeconds(timer) {
    // separate the string value by the colon
    var splitTimer = timer.split(":"); // ["00", "10"]  
    return Number(splitTimer[0]) * 60 + Number(splitTimer[1]);
}

function convertBackToString(timeInSecond) {
    // convert divide by 60 = 14.
    var minutes = Math.floor(timeInSecond / 60); // 0
    // take the remainder (modulo) = 38.
    var seconds = timeInSecond % 60; // 9
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    // tack them together with a colon (:)
    var timeString = minutes + ":" + seconds; // 0:09
    // and display that
    return timeString;
}

function createNewTask() {
    console.log("the button has been clicked");
    var inputField = document.getElementById("taskInput");
    var inputValue = inputField.value;

    if (inputValue != ""){
        console.log(inputValue);
        //create new dom elements and assign to variables for later reference
        var newTr=document.createElement("tr");
        newTr.classList.add("taskRow");


        var newTd1= document.createElement("td");
        newTd1.classList.add("checkBox");
        const addTd1CheckBox = document.createElement("input");
        addTd1CheckBox.setAttribute("type", "checkbox");
        addTd1CheckBox.setAttribute("onclick", TaskComplete(this));
        newTd1.appendChild(addTd1CheckBox);
        

        var newTd2= document.createElement("td");
        newTd2.innerText = inputValue;
        
        var newTd3= document.createElement("td");
        newTd3.classList.add("icon");
        const addTd3Image = document.createElement("img");
        newTd3.appendChild(addTd3Image);
        addTd3Image.classList.add("editIconImg");
        addTd3Image.setAttribute("src", "./images/editIcon.png");


        var newTd4= document.createElement("td");
        newTd4.classList.add("icon");
        const addTd4Image = document.createElement("img");
        newTd4.appendChild(addTd4Image);
        addTd4Image.classList.add("deleteIconImg");
        addTd4Image.setAttribute("src", "./images/deleteIcon.png");

        //add to the table
        var tableList = document.getElementById("tasksToDoTable");
        tableList.appendChild(newTr);
        newTr.appendChild(newTd1);
        newTr.appendChild(newTd2);
        newTr.appendChild(newTd3);
        newTr.appendChild(newTd4);
        inputField.value = "";

        activateDeleteListeners();
        activateCheckBoxListeners();
    }
}

function TaskComplete(checkbox) {
    console.log("checked task complete")
}

function deleteTask() {
    var tr = this.parentElement.parentElement;
    tr.parentElement.removeChild(tr);
}

function activateDeleteListeners() {
    var deleteButtons = document.querySelectorAll('.deleteIconImg');

    for (let x = 0; x < deleteButtons.length; x++){
        deleteButtons[x].addEventListener('click', deleteTask);
    }
}

function activateCheckBoxListeners() {
    var  checkDone = document.query
}