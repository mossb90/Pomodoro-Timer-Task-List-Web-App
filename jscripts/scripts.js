
var timerOn =  false;
var myTimer;
var PomoCycle = {
    pomoWork: "25:01",
    shortBreak: "5:01",
    longBreak: "30:01",
    longBreakInterval: 4   //number of work pomoWork intervals before long break
}
var numWorkCycles;  // Number of 25 min work cycles
var numPomoCycles;  // Number of Full Pomodoro Cycles thru full break
var timerContainer = document.querySelector("#timerContainer");
// var currentPhase = document.getElementById("#currentPhase");

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

function resetTimer() {
    console.log("entered resetTimer()")
    document.querySelector("#pomoTimer").innerText = "25:00";
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
            // currentPhase.innerText = "Short Break";
            document.querySelector("#pomoTimer").innerText = PomoCycle.shortBreak;
            timerContainer.style.backgroundColor = "rgb(250, 250, 210)";
        }
        else {
            currentPhase = "longBreak"
            console.log("started longBreak");
            document.querySelector("#pomoTimer").innerText = PomoCycle.longBreak;
            timerContainer.style.backgroundColor = "rgb(214, 102, 121)";
            
        }
        runTimer();
    
    // manages transition from longBreak back to work
    } else if (currentPhase === "longBreak") {
        numPomoCycles++;
        numWorkCycles = 0;
        currentPhase = "work";
        document.querySelector("#pomoTimer").innerText = PomoCycle.pomoWork;
        timerContainer.style.backgroundColor = "rgb(179, 154, 230)";

    // manages transition from shortBreak back to work
    } else {
        currentPhase = "work";
        document.querySelector("#pomoTimer").innerText = PomoCycle.pomoWork;
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
        //console.log(seconds);
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
        newTd1.appendChild(addTd1CheckBox);
        addTd1CheckBox.setAttribute("type", "checkbox");


        var newTd2= document.createElement("td");
        newTd2.innerText = inputValue;

        var newTd3= document.createElement("td");
        newTd3.classList.add("icon");
        const addTd3Image = document.createElement("img");
        newTd3.appendChild(addTd3Image);
        addTd3Image.classList.add("iconImg");
        addTd3Image.setAttribute("src", "./images/editIcon.png");


        var newTd4= document.createElement("td");
        newTd4.classList.add("icon");
        const addTd4Image = document.createElement("img");
        newTd4.appendChild(addTd4Image);
        addTd4Image.classList.add("iconImg");
        addTd4Image.setAttribute("src", "./images/deleteIcon.png");

        //add to the table
        var tableList = document.getElementById("tasksToDoTable");
        tableList.appendChild(newTr);
        newTr.appendChild(newTd1);
        newTr.appendChild(newTd2);
        newTr.appendChild(newTd3);
        newTr.appendChild(newTd4);
        inputField.value = "";
    }
}