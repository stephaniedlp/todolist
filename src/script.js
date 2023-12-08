
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
const taskData = {
  title: textInput.value,
  dueDate: dateInput.value,
  description: taskdescription.value,
  priority: taskpriority.value,
  label: labelInput.value,
};

// Accept data and send it to the API
const acceptData = () => {
  

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
    acceptData.innerHTML = '';
    
    
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
      displayTasks(data);
      // Call the displayTasks function with the retrieved data
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
      <span class="fw-bold " id="editTitle">${task.title}</span>
      <span class="priority" id="editPriority">${task.priority}</span>
    </div>
    <span class="taskdate" id="editDueDate" > <p>${(task.dueDate)}</p></span>
    <span class="smaller text-secondary" id="editDescription"><p>${task.description}</p></span>
    <span class="taskdate" id="editId">  <p>${(task.id)}</p></span>

    <span class="options">
    <div>
      <span class="tasklabel small" id="editLabel">${task.label}</span>
      </div><div>
      <button type="submit" id="btn-edit " class="btn-edit btn-sm"  data-toggle="modal" data-target="#editTaskModal" data-edit-id="${task.id}">Edit</button>
      <button type="submit" id="btn-delete"  data-sale-id="${task.id}" class="btn-delete btn-sm">Done</button>
      </div>
      </span>
  </div>
    `;
  });
  
  initDeleteButtonHandler();
  initEditButtonHandler();
};

// Initialize the task list
document.addEventListener("DOMContentLoaded", function() {
  createTasks(); // Call createTasks when the DOM is loaded
});

  
// Delete a task
function deleteTask(listaId) {
  
  const confirm = window.confirm(
    `¿Estás seguro de que deseas marcar como completada y eliminar la tarea ${listaId}?`
  );

  if (confirm) {
    fetchAPI(`${apiURL}/lista/${listaId}`, 'DELETE').then(() => {
      window.alert("lista completada");
      
      
    })
    .catch((error) => {
      console.error('Error updating task:', error);
    });
  }
  
}

function initDeleteButtonHandler() {
  document.querySelectorAll(".btn-delete").forEach((button) => {
    button.addEventListener("click", () => {
      const listaId = button.getAttribute("data-sale-id"); 
      // Obtenemos el ID de la venta
      deleteTask(listaId); 
      // Llamamos a la función para eleminar la venta
    });
  });
}
function editTask(taskId) {
 debugger
    const title = taskData.title;
  const dueDate = taskData.dueDate;
  const description = taskData.description;
  const priority = taskData.priority;
  const label = taskData.label;
    // Add any other fields you want to edit
    document.getSelection.value = title;
    document.getElementById("editDueDate").value = dueDate;
    document.getElementById("editDescription").value = description;
    document.getElementById("editPriority").value = priority;
    document.getElementById("editLabel").value = label;

  fetch(`${apiURL}/lista/${taskId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedTaskData),
  })
    .then((response) => {
      if (response.ok) {
        // Task update successful, refresh the task list or perform other actions
        createTasks();
      } else {
        throw new Error('Task update failed');
      }
    })
    .catch((error) => {
      console.error('Error updating task:', error);
    });
}
// function updateTask(listaId, initEditButtonHandler) {
//   editTask(listaId, updatedTaskData);
// }
// function initEditButtonHandler() {
//   document.querySelectorAll(".btn-edit").forEach((button) => {
//     button.addEventListener("click", () => {
//       const listaId = button.getAttribute("data-edit-id"); // Obtenemos el ID de la venta
//       editTask(listaId); // Llamamos a la función para eleminar la venta
//     });
//   });
// }
function populateEditModal(task) {
  // Find the modal form fields by their IDs and set their values from the task object
  document.getElementById("textInput").value = task.edittitle;
  document.getElementById("dateInput").value = task.dueDate;
  document.getElementById("taskdescription").value = task.description;
  document.getElementById("taskpriority").value = task.priority;
  document.getElementById("labelInput").value = task.label;
  // Add any other fields you want to edit
}

function initEditButtonHandler() {
document.querySelectorAll(".btn-edit").forEach((button) => {
  button.addEventListener("click", () => {
    const listaId = button.getAttribute("data-edit-id");
    // Find the corresponding task data using `listaId` and call `populateEditModal` with that data
    const task = populateEditModal(listaId); // Implement the `findTaskById` function to fetch the task from your data source
    editTask(task);
  });
});
}
