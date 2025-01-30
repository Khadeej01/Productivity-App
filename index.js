const taskForm = document.getElementById('taskForm');
const taskList = document.getElementById('taskList');

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

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('bg-red-500', 'text-white', 'px-2', 'py-1', 'rounded', 'hover:bg-red-600');
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
