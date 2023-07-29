
function createTask(e) {
    e.preventDefault();
    let taskList = localStorage.getItem('tareas')
    if (!taskList) {
        localStorage.setItem('tareas', JSON.stringify([]))
    }

    let taskListArray = JSON.parse(taskList);
    let form = document.querySelector('form');
    let formData = new FormData(form);
    let task  = Object.fromEntries(formData.entries());
    task.id = Math.floor((1 + Math.random()) * 0x10000).toString(16)

    taskListArray.push(task)

    localStorage.setItem('tareas', JSON.stringify(taskListArray))
    loadTaskList();
    form.reset()
}

function deleteTask(id) {
    let taskList = localStorage.getItem('tareas')
    let taskListArray = JSON.parse(taskList)
    let index = taskListArray.findIndex(tarea => tarea.id === id)
    taskListArray.splice(index, 1)
    localStorage.setItem('tareas', JSON.stringify(taskListArray))
    loadTaskList()
}

function updateTask(id,key,value){
    let taskList = localStorage.getItem('tareas')
    let taskListArray = JSON.parse(taskList)
    let index = taskListArray.findIndex(tarea => tarea.id === id)
    taskListArray[index][key] = value
    localStorage.setItem('tareas', JSON.stringify(taskListArray))
}

function loadTaskList() {
    let taskList = localStorage.getItem('tareas')
    if (!taskList) {
        localStorage.setItem('tareas', JSON.stringify([]))
    }
    let taskListArray = []
    let render = '';

    if (taskList) {
        taskListArray = JSON.parse(taskList)
        taskListArray.forEach(task => {
            render += `
             <tr>
               <td>
                <input data-id="${task.id}" type="text" name="title" value="${task.title}" class="form-control">
               </td>
               <td>
                <input data-id="${task.id}" type="date" name="fecha" value="${task.fecha}" class="form-control">
               </td>
               <td>
                <select data-id="${task.id}" name="prioridad" id="prioridad" class="form-select">
                    <option value="alta">Alta</option>
                    <option value="alta">Media</option>
                    <option value="alta">Baja</option>
                </select>
                </td>
               <td>
                <input data-id="${task.id}" type="text" name="descripcion" value="${task.descripcion}" class="form-control">
               </td>
               <td>
                  <button data-id="${task.id}" class="btn btn-danger">Eliminar</button>
               </td>
             </tr>`
        });
    }

    let buttonsDelete;
    document.querySelector('.body-table').innerHTML = render;
    buttonsDelete = document.querySelectorAll('.btn-danger');

    buttonsDelete.forEach(button => {
        button.addEventListener('click', function (e) {
            if(!confirm('¿Eliminar tarea?')) return false;
            let id = e.target.dataset.id
            deleteTask(id)
        })
    })

    let inputs = document.querySelectorAll('input,select');
    inputs.forEach(input => {
        "change keyup".split(" ").forEach(function (e) {
            input.addEventListener(e, function (e) {
                let id = e.target.dataset.id
                let key = e.target.name
                let value = e.target.value
                updateTask(id, key, value)
            })
        });
    })
}

let form = document.querySelector('form');
form.addEventListener('submit', createTask)
loadTaskList();

