// // Variables para acceder a elementos HTML
// const taskForm = document.getElementById('task-form');
// const taskList = document.getElementById('task-list');

// // Event listener para el formulario de tareas
// taskForm.addEventListener('submit', function (e) {
//     e.preventDefault();
//     // Obtener valores del formulario
//     const title = document.getElementById('task-title').value;
//     const description = document.getElementById('task-description').value;
//     const dueDate = document.getElementById('task-due-date').value;
//     const priority = document.getElementById('task-priority').value;
//     const labels = document.getElementById('task-labels').value.split(',');

//     // Validar datos
//     if (title.trim() === '') {
//         alert('El título es obligatorio');
//         return;
//     }

//     // Crear objeto de tarea
//     const task = {
//         title,
//         description,
//         dueDate,
//         priority,
//         labels
//     };

//     // Agregar la tarea a la lista
//     displayTask(task);

//     // Limpiar el formulario
//     taskForm.reset();
// });

// // Función para mostrar una tarea en la lista
// function displayTask(task) {
//     const li = document.createElement('li');
    // li.innerHTML = `
    //     <h3>${task.title}</h3>
    //     <p>${task.description}</p>
    //     <p><strong>Fecha de Vencimiento:</strong> ${task.dueDate}</p>
    //     <p><strong>Prioridad:</strong> ${task.priority}</p>
    //     <p><strong>Etiquetas:</strong> ${task.labels.join(', ')}</p>
    //     <button class="delete-button">Eliminar</button>
    // `;
//     taskList.appendChild(li);

//     // Event listener para eliminar la tarea
//     const deleteButton = li.querySelector('.delete-button');
//     deleteButton.addEventListener('click', function () {
//         taskList.removeChild(li);
//     });
// }



// function getVideoGamesData() {
//     fetchAPI(`${apiURL}/task`, "GET")
//     .then((data) => {
//       const gameList = mapAPIToGameDescriptors(data);
//       displayGameOptions(gameList);
//     });
//   }
  
//   function getSalesData(videoGames, customerName, salesman, saleDate) {
   
//     const url = buildGetSalesDataUrl( videoGames,  customerName,  salesman,  saleDate );
  
//     fetchAPI(url, "GET")
//     .then((data) => {
//       const salesList = mapAPIToTasks(data);
//       displayGamesView(salesList);
//     });
//   }
  
//   function createSale(venta) {
//     fetchAPI(`${apiURL}/venta`, "POST", venta).then((venta) => {
//       closeAddSaleModal();
//       resetSales();
//       window.alert(`Venta ${venta.id} creada correctamente.`);
//     });
//   }
  
//   function deleteSale(ventaId) {
//     const confirm = window.confirm(
//       `¿Estás seguro de que deseas eliminar la venta ${ventaId}?`
//     );
  
//     if (confirm) {
//       fetchAPI(`${apiURL}/venta/${ventaId}`, "DELETE").then(() => {
//         resetSales();
//         window.alert("Venta eliminada.");
//       });
//     }
//   }
  
//   // Funcion que genera la url para consultar ventas con filtros.
//   function  buildGetSalesDataUrl( videoGames, customerName, salesman, saleDate) {
//     // Tecnica de string dinamico: se aconseja cuando tenemos una cantidad limitada de parámetros y
//     //    cierto control de los tipos de parametros (id, fechas).
//     // const url = `${apiURL}/sales?realEstate=${realEstate}&customerName=${customerName}&salesman=${salesman}&saleDate=${saleDate}`;
  
//     // URL y URLSearchParams: simplifican la construcción de URLs dinámicas y complejas,
//     //    facilitan la gestión de múltiples parámetros y textos dinámicos al encargarse de
//     //    la codificación y decodificación de caracteres especiales, lo que evita problemas
//     //    comunes relacionados con espacios y caracteres no válidos.
//     const url = new URL(`${apiURL}/venta`);
  
//     if (videoGames) {
//       url.searchParams.append("videoGames", videoGames);
//     }
  
//     if (customerName) {
//       url.searchParams.append("customerName", customerName);
//     }
  
//     if (salesman) {
//       url.searchParams.append("salesman", salesman);
//     }
  
//     if (saleDate) {
//       url.searchParams.append("saleDate", saleDate);
//     }
  
//     return url;
//   }


let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let dateInput = document.getElementById("dateInput");
let textarea = document.getElementById("textarea");
let msg = document.getElementById("msg");
let tasks = document.getElementById("tasks");
let add = document.getElementById("add");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  formValidation();
});

let formValidation = () => {
  if (textInput.value === "") {
    console.log("failure");
    msg.innerHTML = "Task cannot be blank";
  } else {
    console.log("success");
    msg.innerHTML = "";
    acceptData();
    add.setAttribute("data-bs-dismiss", "modal");
    add.click();

    (() => {
      add.setAttribute("data-bs-dismiss", "");
    })();
  }
};

let data = [{}];

let acceptData = () => {
  data.push({
    text: textInput.value,
    date: dateInput.value,
    description: textarea.value,
  });

  localStorage.setItem("data", JSON.stringify(data));

  console.log(data);
  createTasks();
};

let createTasks = () => {
  tasks.innerHTML = "";
  data.map((x, y) => {
    return (tasks.innerHTML += `
    <div id=${y}>
          <span class="fw-bold">${x.text}</span>
          <span class="small text-secondary">${x.date}</span>
          <p>${x.description}</p>
  
          <span class="options">
            <button type="submit" id="btn-edit" class="btn ">Edit</button>
            <button type="submit" id="btn-delete" class="btn">Delete</button>
          </span>
        </div>
    `);
  });

  resetForm();
};

let deleteTask = (e) => {
  e.parentElement.parentElement.remove();
  data.splice(e.parentElement.parentElement.id, 1);
  localStorage.setItem("data", JSON.stringify(data));
  console.log(data);
  
};

let editTask = (e) => {
  let selectedTask = e.parentElement.parentElement;

  textInput.value = selectedTask.children[0].innerHTML;
  dateInput.value = selectedTask.children[1].innerHTML;
  textarea.value = selectedTask.children[2].innerHTML;

  deleteTask(e);
};

let resetForm = () => {
  textInput.value = "";
  dateInput.value = "";
  textarea.value = "";
};

(() => {
  data = JSON.parse(localStorage.getItem("data")) || []
  console.log(data);
  createTasks();
})();