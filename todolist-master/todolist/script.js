let all = document.querySelector('.all');
let doing = document.querySelector('.doing');
let done = document.querySelector('.done');
let clear = document.querySelector('.clear');

let todosContainer = document.querySelector('.todos')

let todos = []

let todoform = document.querySelector('#todoform')
let newtodo = document.getElementById("createtodo")
let checkedstatus = document.querySelector(".checkbox")
const footer = document.querySelector("#all")


todoform.addEventListener("submit", (e)=>{
    e.preventDefault()

    if(newtodo.value.trim() !== ""){
        let todo = {
            taskname: newtodo.value.trim(),
            status: checkedstatus.checked
        }

        todos.push(todo)

        console.log(todos);

        localStorage.setItem('todos', JSON.stringify(todos))

        displayTodos()
    }
})

let displayTodos = function(){

    let taskItems = localStorage.getItem("todos")

    taskItems = JSON.parse(taskItems)

    let tasks = document.querySelectorAll('.todos .todo')

    tasks.forEach(el=>{
        el.remove()
    })

if (taskItems) {
    taskItems.forEach((el, index)=>{
        let todo = document.createElement('div')
        todo.className = "todo"

        let checkbox = document.createElement("input")
        checkbox.type = "checkbox"
        checkbox.className ="checkbox"
        checkbox.checked = el.status

        let taskname = document.createElement('div')
        taskname.textContent = el.taskname

        todo.appendChild(checkbox)
        todo.appendChild(taskname)

        todosContainer.appendChild(todo)
    })
    
} else {
    todosContainer.textContent = "No Items available"
}
}

displayTodos()

// all.addEventListener('click', () => {
//     console.log("all clicked");
// });

done.addEventListener("click", () => {
  // Retrieving tasks from localStorage
  let taskItems = localStorage.getItem("todos");
  taskItems = JSON.parse(taskItems);

  if (taskItems) {
    // Clearing the todos div
    todosContainer.textContent = "";

    // Displaying completed tasks
    taskItems.forEach((task, i) => {
      if (task.status) {
        // Creating HTML elements for completed tasks
        let todo = document.createElement("div");
        todo.className = "todo";

        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "checkbox";
        checkbox.checked = task.status;

        let taskname = document.createElement("div");
        taskname.textContent = task.taskname;

        // Appending elements to the todo container
        todo.appendChild(checkbox);
        todo.appendChild(taskname);

        todosContainer.appendChild(todo);
      }
    });
  } else {
    // Displaying a message if there are no completed tasks
    todosContainer.textContent = "No completed tasks";
  }
});

// Event listener for displaying active tasks
doing.addEventListener("click", () => {
  // Retrieving tasks from localStorage
  let taskItems = localStorage.getItem("todos");
  taskItems = JSON.parse(taskItems);

  if (taskItems) {
    // Clearing the todos div
    todosContainer.textContent = "";

    // Displaying active tasks
    taskItems.forEach((task, i) => {
      if (!task.status) {
        // Creating HTML elements for active tasks
        let todo = document.createElement("div");
        todo.className = "todo";

        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "checkbox";
        checkbox.checked = task.status;

        let taskname = document.createElement("div");
        taskname.textContent = task.taskname;

        // Appending elements to the todo container
        todo.appendChild(checkbox);
        todo.appendChild(taskname);

        todosContainer.appendChild(todo);
      }
    });
  } else {
    // Displaying a message if there are no active tasks
    todosContainer.textContent = "No active tasks";
  }
});

// Event listener for displaying all tasks
all.addEventListener("click", () => {
  // Displaying all tasks
  displayTodos();
});





// event listener for clearing
clear.addEventListener("click", () => {
  // Retrieving tasks from localStorage
  let taskItems = localStorage.getItem("todos");
  taskItems = JSON.parse(taskItems);
    if (taskItems) {
      // Filter out completed tasks
      let remainingTasks = taskItems.filter((task) => !task.status);

      // Update localStorage with remaining tasks
      localStorage.setItem("todos", JSON.stringify(remainingTasks));

      // Refresh the displayed tasks
      displayTodos();
      // Displaying a message if there are no active tasks
      todosContainer.textContent = "You have cleared done tasks";
    }
});
