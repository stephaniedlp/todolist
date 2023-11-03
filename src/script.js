
// Select DOM elements
const form = document.getElementById("form");
const title = document.getElementById("textInput").value;
const dueDate = document.getElementById("dateInput").value;
const description = document.getElementById("taskdescription").value;
const priority = document.getElementById("taskpriority").value;
const label = document.getElementById("labelInput").value;
const msg = document.getElementById("msg");
const tasks = document.getElementById("tasks");
const add = document.getElementById("add");


// function displayTasks(tasks){
//   cleartask();

// }
// Add form submit event listener
form.addEventListener("submit", (e) => {
  e.preventDefault();
  formValidation();
});

const formValidation = () => {
  if (textInput.value === "") {
    msg.innerHTML = "Task cannot be blank";
  } else {
    msg.innerHTML = "";
    acceptData();
  }
};

// Accept data and send it to the API
const acceptData = () => {
  const taskData = {
    title: textInput.value,
    dueDate: dateInput.value,
    description: taskdescription.value,
    priority: taskpriority.value,
    label: labelInput.value,
  };

  // Send data to the server
  fetch(`${apiURL}/lista`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(taskData),
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Task creation failed');
      }
    })
    .then(() => {
      displayTasks(); // Refresh the task list
      add.setAttribute("data-bs-dismiss", "modal");
      add.click();
    })
    .catch(error => {
      console.error('Error creating task:', error);
    });
};

// C// Function to create tasks
const createTasks = () => {
  tasks.innerHTML = "";

  // Fetch tasks from the server
  fetch(`${apiURL}/lista`)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Task data fetch failed');
      }
    })
    .then(data => {
      displayTasks(data); // Call the displayTasks function with the retrieved data
    })
    .catch(error => {
      console.error('Error fetching task data:', error);
    });
};

// Function to display tasks
const displayTasks = (data) => {
  data.forEach((task, index) => {
    tasks.innerHTML += `
    <div class="taskslist">
    <div class="headertasklist">
      <span class="fw-bold">${task.title}</span>
      <span class="priority">${task.priority}</span>
    </div>
    <span class="taskdate"> <p>${(task.dueDate)}</p></span>
    <span class="tasklabel">${task.label}</span>
    <span class="smaller text-secondary"><p>${task.description}</p></span>

    <span class="options">
      <button type="submit" id="btn-edit" class="btn-edit">Edit</button>
      <button type="submit" id="btn-delete"  data-sale-id="${task.id}" class="btn-delete">Delete</button>
    </span>
  </div>
    `;
  });
  
  initDeleteButtonHandler();
};

// Initialize the task list
document.addEventListener("DOMContentLoaded", function() {
  createTasks(); // Call createTasks when the DOM is loaded
});

  
// Delete a task
function deleteTask(listaId) {
  const confirm = window.confirm(
    `¿Estás seguro de que deseas eliminar la venta ${listaId}?`
  );

  if (confirm) {
    fetchAPI(`${apiURL}/lista/${listaId}`, "DELETE").then(() => {
      window.alert("Venta eliminada.");
      
    });
  }
  
  window.location.reload();
}

function initDeleteButtonHandler() {
  document.querySelectorAll(".btn-delete").forEach((button) => {
    button.addEventListener("click", () => {
      const listaId = button.getAttribute("data-sale-id"); // Obtenemos el ID de la venta
      deleteTask(listaId); // Llamamos a la función para eleminar la venta
    });
  });
}
// Edit a task
const editTask = (index) => {
  const selectedTask = tasks.children[index];
  textInput.value = selectedTask.children[0].innerHTML;
  description.value = selectedTask.children[1].innerHTML;
  textarea.value = selectedTask.children[2].innerHTML;
  priority.value=selectedTask.children[3].innerHTML;
  label.value=selectedTask.children[4].innerHTML;
  // Delete the task locally
  deleteTask(index);
};

