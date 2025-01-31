const taskForm = document.getElementById('taskForm');
const taskList = document.getElementById('taskList');
let currentEditTask = null;

taskForm.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const taskDescription = document.getElementById('taskName').value;
    const taskPriority = document.querySelector('input[name="priority"]:checked') ? document.querySelector('input[name="priority"]:checked').value : 'Low';

    if (taskDescription) {
        const li = document.createElement('li');
        li.classList.add('bg-[#859393]', 'px-4', 'py-2', 'rounded', 'text-white', 'flex', 'items-center', 'justify-between');

        const taskText = document.createElement('span');
        taskText.textContent = `${taskDescription} (Priority: ${taskPriority})`;
        li.appendChild(taskText);

        
        const editBtn = document.createElement('button');
        editBtn.classList.add('bg-[#859393]', 'text-white', 'px-2', 'py-1', 'rounded', 'hover:bg-yellow-600');
        editBtn.textContent = 'Edit';

        editBtn.addEventListener('click', () => {
          
            currentEditTask = li;
            document.getElementById('taskName').value = taskDescription;
            if (taskPriority === 'High') {
                document.getElementById('priorityHigh').checked = true;
            } else {
                document.getElementById('priorityLow').checked = true;
            }
           
            document.getElementById('addTaskBtn').textContent = 'Save Changes';
        });

        li.appendChild(editBtn);

        
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('bg-[#859393]', 'text-white', 'px-2', 'py-1', 'rounded', 'hover:bg-red-600');
        deleteBtn.textContent = 'Delete';

        deleteBtn.addEventListener('click', () => {
            taskList.removeChild(li);
        });

        li.appendChild(deleteBtn);

        taskList.appendChild(li);

        document.getElementById('taskName').value = '';
        document.querySelector('input[name="priority"]:checked').checked = false;
    }
});


document.getElementById('addTaskBtn').addEventListener('click', (event) => {
    if (currentEditTask) {
        
        const updatedDescription = document.getElementById('taskName').value;
        const updatedPriority = document.querySelector('input[name="priority"]:checked').value;

        const updatedText = `${updatedDescription} (Priority: ${updatedPriority})`;
        currentEditTask.querySelector('span').textContent = updatedText;

       
        document.getElementById('taskName').value = '';
        document.querySelector('input[name="priority"]:checked').checked = false;
        document.getElementById('addTaskBtn').textContent = 'Submit';

        currentEditTask = null;
    } else {
        
        const taskDescription = document.getElementById('taskName').value;
        const taskPriority = document.querySelector('input[name="priority"]:checked') ? document.querySelector('input[name="priority"]:checked').value : 'Low';

        if (taskDescription) {
            const li = document.createElement('li');
            li.classList.add('bg-[#859393]', 'px-4', 'py-2', 'rounded', 'text-white', 'flex', 'items-center', 'justify-between');

            const taskText = document.createElement('span');
            taskText.textContent = `${taskDescription} (Priority: ${taskPriority})`;
            li.appendChild(taskText);

           
            const editBtn = document.createElement('button');
            editBtn.classList.add('bg-[#859393]', 'text-white', 'px-2', 'py-1', 'rounded', 'hover:bg-yellow-600');
            editBtn.textContent = 'Edit';

            editBtn.addEventListener('click', () => {
                currentEditTask = li;
                document.getElementById('taskName').value = taskDescription;
                if (taskPriority === 'High') {
                    document.getElementById('priorityHigh').checked = true;
                } else {
                    document.getElementById('priorityLow').checked = true;
                }
                document.getElementById('addTaskBtn').textContent = 'Save Changes';
            });

            li.appendChild(editBtn);

           
            const deleteBtn = document.createElement('button');
            deleteBtn.classList.add('bg-[#859393]', 'text-white', 'px-2', 'py-1', 'rounded', 'hover:bg-red-600');
            deleteBtn.textContent = 'Delete';

            deleteBtn.addEventListener('click', () => {
                taskList.removeChild(li);
            });

            li.appendChild(deleteBtn);

            taskList.appendChild(li);

            document.getElementById('taskName').value = '';
            document.querySelector('input[name="priority"]:checked').checked = false;
        }
    }
});

document.getElementById('pomodoroBtn').addEventListener('click', () => {
    timeRemaining = 25 * 60;
    updateTimerDisplay();
});



let timerInterval;
let isRunning = false;
let timeRemaining = 25 * 60; 
let isShortBreak = false;
let isLongBreak = false;

const timerDisplay = document.getElementById("timer");
const startBtn = document.getElementById("startBtn");
const shortBreakBtn = document.getElementById("shortBreakBtn");
const longBreakBtn = document.getElementById("longBreakBtn");

let tasks = [];

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secondsRemaining = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secondsRemaining).padStart(2, '0')}`;
}

function startPauseTimer() {
    if (isRunning) {
        clearInterval(timerInterval);
    } else {
        timerInterval = setInterval(function() {
            if (timeRemaining <= 0) {
                clearInterval(timerInterval);
                alert("Time's up!");
                timeRemaining = isShortBreak ? 5 * 60 : isLongBreak ? 15 * 60 : 25 * 60;
                updateTimerDisplay();
            } else {
                timeRemaining--;
                updateTimerDisplay();
            }
        }, 1000);
    }
    isRunning = !isRunning;
    startBtn.textContent = isRunning ? "PAUSE" : "START";
}

function updateTimerDisplay() {
    timerDisplay.textContent = formatTime(timeRemaining);
}





startBtn.addEventListener('click', startPauseTimer);

