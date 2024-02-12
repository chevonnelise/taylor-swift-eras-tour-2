document.addEventListener("DOMContentLoaded", function () {
    async function main() {
        let todos = await loadTasks();

        const addTodoButton = document.querySelector("#addTodo");
        addTodoButton.addEventListener('click', function (){
        // add Event listeners
        // const form = document.querySelector("#todo-form");
        // form.addEventListener('submit', function (event) {
        //     event.preventDefault(); // This stops the form from being submitted the traditional way
        
        const saveButton = document.querySelector("#save-btn");
            saveButton.addEventListener("click", async function (){
                saveTasks(todos);
            })
            
            const taskNameInput = document.querySelector("#taskName");
            const taskName = taskNameInput.value;

            const taskStatusSelect = document.querySelector("#taskStatus");
            const taskStatus = taskStatusSelect.value;

            if (taskName) {
                addTodo(todos, taskName, taskStatus);
                renderTodos(todos);
                taskNameInput.value = '';
        }
    });
    //     )
    };

    function renderTodos(todos) {
        const todoList = document.querySelector('#todoList');
        todoList.innerHTML = '';
        for (let todo of todos) {
            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between align-items-center';
            li.innerHTML = `
            ${todo.name} <span class="badge  bg-primary">${todo.urgency}</span>
            <button data-task-id=${todo.id} class="btn edit-btn btn-success btn-sm">Edit</button>
            <button data-task-id=${todo.id} class="btn delete-btn btn-danger btn-sm">Delete</button>
            `;
            todoList.appendChild(li);

            li.querySelector(".edit-btn").addEventListener('click', function () {
                const newName = prompt("Enter the new task name: ", todo.name);
                const newUrgency = prompt("Enter the new urgency: ", todo.urgency);
                modifyTask(todos, todo.id, newName, newUrgency);
                renderTodos(todos);
            })

            li.querySelector(".delete-btn").addEventListener('click', function () {
                const confirmation = confirm("Do you want to delete the task: " + todo.name + "?");
                if (confirmation) {
                    deleteTask(todos, todo.id);
                    renderTodos(todos);
                }
            });
        }
    };
    main();
});


