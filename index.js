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

        // Edit button
        const editBtn = document.createElement('button');
        editBtn.classList.add('bg-[#859393]', 'text-white', 'px-2', 'py-1', 'rounded', 'hover:bg-yellow-600');
        editBtn.textContent = 'Edit';

        editBtn.addEventListener('click', () => {
            // Set current task for editing
            currentEditTask = li;
            document.getElementById('taskName').value = taskDescription;
            if (taskPriority === 'High') {
                document.getElementById('priorityHigh').checked = true;
            } else {
                document.getElementById('priorityLow').checked = true;
            }
            // Change the button to "Save" when editing
            document.getElementById('addTaskBtn').textContent = 'Save Changes';
        });

        li.appendChild(editBtn);

        // Delete button
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

// Handle saving or adding new task
document.getElementById('addTaskBtn').addEventListener('click', (event) => {
    if (currentEditTask) {
        // Edit mode
        const updatedDescription = document.getElementById('taskName').value;
        const updatedPriority = document.querySelector('input[name="priority"]:checked').value;

        const updatedText = `${updatedDescription} (Priority: ${updatedPriority})`;
        currentEditTask.querySelector('span').textContent = updatedText;

        // Reset form and button
        document.getElementById('taskName').value = '';
        document.querySelector('input[name="priority"]:checked').checked = false;
        document.getElementById('addTaskBtn').textContent = 'Submit';

        currentEditTask = null;
    } else {
        // Add new task
        const taskDescription = document.getElementById('taskName').value;
        const taskPriority = document.querySelector('input[name="priority"]:checked') ? document.querySelector('input[name="priority"]:checked').value : 'Low';

        if (taskDescription) {
            const li = document.createElement('li');
            li.classList.add('bg-[#859393]', 'px-4', 'py-2', 'rounded', 'text-white', 'flex', 'items-center', 'justify-between');

            const taskText = document.createElement('span');
            taskText.textContent = `${taskDescription} (Priority: ${taskPriority})`;
            li.appendChild(taskText);

            // Edit button
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

            // Delete button
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
