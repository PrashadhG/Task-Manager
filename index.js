/*function add(a, b) {
    return a + b
}

console.log(add(10, 20));

//array methods
arr1 = [1, 2, 3, 4, 5]
arr2 = [6, 7, 8, 9, 10]

console.log(arr1.concat(0, arr2));

//spread opreator
arr3 = [...arr1, ...arr2]

//string methods
str = "Happy Ramzan";

console.log(str.length);
console.log(str.toUpperCase());
console.log(str.at(0));
console.log(str.split(" "));

//Array of Objects
const users = [{
    name: "sri",
    dept: "IT",
    age: 18
},
{
    name: "hari",
    dept: "IT",
    age: 20
},
{
    name: "Kodi",
    dept: "AIDS",
    age: 20
}]

users.map((user) => {
    console.log("NAME:" + user.name, "DEPT:" + user.dept, "AGE:" + user.age);
})

let newArray = users.filter(function (el) {
    return el.age >= 20
});

console.log(newArray);

//DOM manipulation
var btn = document.getElementById("btn")
header.addEventListener("click", () => {
    if(btn.innerHTML == "Start"){
        btn.innerHTML = "Stop"
    }else{
        btn.innerHTML = "Start"
    }
    btn.classList.toggle("change");
})*/


const tasks = [
    {
        taskName: "personal-break",
        description: "-",
        duration: "00:05:00"
    },
    {
        taskName: "client-Meeting",
        description: "presentation",
        duration: "01:30:20"
    },
    {
        taskName: "project-development",
        description: "project-abc",
        duration: "02:30:40"
    },
    {
        taskName: "project-prsentation",
        description: "project-abc",
        duration: "00:30:00"
    }
];

const deleteTask = (index) => {
    tasks.splice(index, 1);
    renderTable(tasks);
    updateTaskFilter();
};

const renderTable = (data) => {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = data.map((task, index) => `
      <tr>
        <td>${task.taskName}</td>
        <td>${task.description}</td>
        <td>${task.duration}</td>
        <td><button class="deleteButton"onclick="deleteTask(${index})">Delete</button></td>
      </tr>
    `).join('');
};
renderTable(tasks);

const updateTaskFilter = () => {
    const taskNameFilter = document.getElementById('taskNameFilter');
    const uniqueTaskNames = [...new Set(tasks.map(task => task.taskName))];
    taskNameFilter.innerHTML = `
      <option value="">All Tasks</option>
      ${uniqueTaskNames.map(name => `<option value="${name}">${name}</option>`).join('')}
    `;
};

const addButton = document.getElementById('add');
addButton.addEventListener('click', () => {
    const inputTask = document.getElementById("task");
    const inputDescription = document.getElementById("description");
    const inputDuration = document.getElementById("duration");

    const newTask = {
        taskName: inputTask.value,
        description: inputDescription.value,
        duration: inputDuration.value
    };
    tasks.push(newTask);
    renderTable(tasks);
    updateTaskFilter();
});

const filterButton = document.getElementById('filterButton');
filterButton.addEventListener('click', () => {
    const taskNameFilter = document.getElementById('taskNameFilter').value;
    let filteredTasks = tasks;
    if (taskNameFilter) {
        filteredTasks = tasks.filter(task => task.taskName === taskNameFilter);
    }
    renderTable(filteredTasks);
});

updateTaskFilter();

let timer;
let secs = 0;
let min = 0;
let hours = 0;
let isRunning = false;

function startstop() {
    if (!isRunning) {
        isRunning = true;
        timer = setInterval(() => {
            secs++;
            if (secs == 60) {
                min++;
                secs = 0;
                if (min == 60) {
                    hours++;
                    min = 0;
                }
            }
            let formatTime = `${hours.toString().padStart(2, "0")}:${min.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
            document.getElementById("timer").innerHTML = formatTime;
            document.getElementById("startstop").innerText = "Stop";
        }, 1000);
    } else {
        document.getElementById("startstop").innerHTML = "Start";
        clearInterval(timer);
        isRunning = false;
    }
    document.getElementById("duration").value = `${hours.toString().padStart(2, "0")}:${min.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

function reset() {
    secs = 0;
    min = 0;
    hours = 0;
    let formatTime = `${hours.toString().padStart(2, "0")}:${min.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    document.getElementById("timer").innerHTML = formatTime;
    document.getElementById("startstop").innerText = "Start";
}

