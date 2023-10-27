// Selected items
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

// Classes names
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

// Variables
let LIST = [],
  id;

// get item from localStorage
let data = localStorage.getItem("TODO");

// check if data is not empty
if (data) {
  LIST = JSON.parse(data);
  id = LIST.length; // set the id to the last element in the list
  loadList(LIST); // load the list to the UI
} else {
  LIST = [];
  id = 0;
}

// load items to UI
function loadList(array) {
  array.forEach(function (item) {
    addToDo(item.name, item.id, item.done, item.trash);
  });
}

// clear storage
clear.addEventListener('click', function(){
  localStorage.clear()
  location.reload()
})

//Show today's date
const options = { weekday: "long", month: "short", day: "numeric" };
const today = new Date();
dateElement.innerHTML = today.toLocaleDateString("en-UK", options);

//Add todo function

function addToDo(toDo, id, done, trash) {
  if (trash) {
    return;
  }

  const DONE = done ? CHECK : UNCHECK;
  const LINE = done ? LINE_THROUGH : "";

  const item = `
        <li class="item">
            <i class="fa ${DONE} co" job="complete" id=${id}></i>
            <p class="text ${LINE}">${toDo}</p>
            <i class="fas fa-trash-o de" job="delete" id=${id}></i>
        </li>
    `;

  const position = "beforeend";

  input.value = "";

  list.insertAdjacentHTML(position, item);
}

//Add an item to the list using the Enter key
document.addEventListener("keyup", (event) => {
  if (event.keyCode == 13) {
    const toDo = input.value;

    //If the input isn't empty
    if (toDo) {
      addToDo(toDo, id, false, false);

      LIST.push({
        name: toDo,
        id: id,
        done: false,
        trash: false,
      });

      //  ass item to localStorage (this code must be written where the LIST array is updated)
      localStorage.setItem("TODO", JSON.stringify(LIST));

      id++;
    }
    input.value = "";
  }
});

//complete todo
function completeTodo(element) {
  element.classList.toggle(CHECK);
  element.classList.toggle(UNCHECK);
  element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

  // Update the list
  LIST[element.id].done = LIST[element.id].done ? false : true;
}

// remove todo
function removeTodo(element) {
  element.parentNode.parentNode.removeChild(element.parentNode);

  LIST[element.id].trash = true;
}

// Target the items created dynamically

list.addEventListener("click", function (event) {
  const element = event.target; //return the clisked element inside the list
  const elementJob = element.attributes.job.value; //complete or delete

  if (elementJob == "complete") {
    completeTodo(element);
  } else if (elementJob == "delete") {
    removeTodo(element);
  }

  //  ass item to localStorage (this code must be written where the LIST array is updated)
  localStorage.setItem("TODO", JSON.stringify(LIST));
});
