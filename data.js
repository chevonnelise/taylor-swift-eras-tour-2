// add function
const BASE_JSON_BIN_URL = "https://api.jsonbin.io/v3/b";
const BIN_ID = "65ca629bdc74654018a3d305";
const MASTER_KEY = "$2a$10$bGGtgHiNbK3z4vgOgJ28J.fxGlg8OD9LqM/yfLGJp7zF6XnFV0hoa";

let todos = [];

function addTodo(todos, name, urgency){
    let newTodo = {
        id: Math.floor(Math.random() * 100 + 1),
        name: name,
        status: status
    };
    todos.push(newTodo);
}

function modifyTask(todos, id, newName, newStatus) {
    // creating the new task
    let modifiedTask = {
        "id": id,
        "name": newName,
        "status": newStatus
    }

    // insert index of the task that user wants to replace
    const indexToReplace = todos.findIndex(function(t){
        return t.id == id;
    });

    // if loop to check if the findIndex can find the index, if not findIndex to return -1
    if (indexToReplace > -1) {
        todos[indexToReplace] = modifiedTask;
    }
}

function deleteTask(todos, id) {
    let indexToDelete = null;
    for (let i = 0; i < todos.length; i++){
        if (todos[i].id == id){
            indexToDelete = i;
            break;
        }
    }
    if (indexToDelete !== null) {
        todos.splice(indexToDelete, 1);
    } else {
        console.log("Unable to find song");
    }
}

async function loadTasks() {
    const response = await axios.get(BASE_JSON_BIN_URL + "/" + BIN_ID + "/latest");
    console.log(response.data);
    return response.data.record;
}


async function saveTasks(todos) {
    const response = await axios.put(`${BASE_JSON_BIN_URL}/${BIN_ID}`, todos, {
        headers: {
            "Content-Type": "application/json",
            "X-Master-Key": MASTER_KEY
        }
    });
    return response.data;
}