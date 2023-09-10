let todoItemsContainer = document.getElementById("todoItemsContainer");
let userInputElement = document.getElementById("userInput");
// console.log(userInputElement);

let btnElement = document.getElementById("addBtn");
let innerContainer = document.getElementById("innerContainer");

let saveBtnElement = document.createElement("btn");
saveBtnElement.classList.add("btn", "btn-primary", "mt-3", "mb-2");
saveBtnElement.textContent = "Save";
innerContainer.appendChild(saveBtnElement);

// console.log(btnElement);
console.log(innerContainer);

function getFromStorage() {
    let parsedtodoList = JSON.parse(localStorage.getItem("todoList"));
    if (parsedtodoList === null) {
        return [];
    } else {
        return parsedtodoList;
    }
}
let todoList = getFromStorage();

saveBtnElement.onclick = function() {
    localStorage.setItem("todoList", JSON.stringify(todoList));
    alert("inspect to see  Local Storage");
};

function checker(labelId, checkBoxId) {
    let labelElement = document.getElementById(labelId);
    // let checkbox = document.getElementById(checkBoxId);
    // if (checkbox.checked === true) {
    //     labelElement.classList.add("checker");
    // } else {
    //     labelElement.classList.remove("checker");
    // }
    labelElement.classList.toggle("checker");
}


function deleter(deleteId, todoId) {
    // let iconElement=document.getElementById(deleteId);
    let todoElement = document.getElementById(todoId);
    todoItemsContainer.removeChild(todoElement);
    let deletetodoId = todoList.find(function(each) {
        let eachtodoId = "todo" + each.unikNo;
        if (eachtodoId === todoId) {
            return true;
        } else {
            return false;
        }
    });
    todoList.splice(deletetodoId, 1);
    console.log(todoList);
}


function ushaSri(todo) {
    let todoId = "todo" + todo.unikNo;
    let checkBoxId = "checkBox" + todo.unikNo;
    let labelId = "label" + todo.unikNo;
    let deleteId = "delete" + todo.unikNo;

    let todoElement = document.createElement("li");
    todoElement.classList.add("todo-element", "d-flex", "flex-row");
    todoElement.id = todoId;
    todoItemsContainer.appendChild(todoElement);

    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = checkBoxId;
    inputElement.classList.add("checkbox-input");
    todoElement.appendChild(inputElement);

    let labelContainer = document.createElement("div");
    labelContainer.classList.add("label-container", "d-flex", "flex-row", "justify-content-between");
    labelContainer.id = "labelContainer2";
    todoElement.appendChild(labelContainer);

    let labelElement = document.createElement("label");
    labelElement.classList.add("label-element");
    labelElement.setAttribute("for", checkBoxId);
    labelElement.id = labelId;
    labelElement.textContent = todo.text;
    labelContainer.appendChild(labelElement);

    let deleteContainer = document.createElement("div");
    deleteContainer.classList.add("del-container");
    labelContainer.appendChild(deleteContainer);

    let iconElement = document.createElement("i");
    iconElement.classList.add("far", "fa-trash-alt", "del-icon");
    iconElement.id = deleteId;
    deleteContainer.appendChild(iconElement);

    inputElement.onclick = function() {
        checker(labelId, checkBoxId);
    };
    iconElement.onclick = function() {
        deleter(deleteId, todoId);
    };

}

for (let todo of todoList) {
    ushaSri(todo);
}

btnElement.onclick = function() {
    let input = userInputElement.value;
    if (input === "") {
        alert("input ra pulka");
    } else {
        let length = todoList.length;
        length += 1;
        let newtodo = {
            text: input,
            unikNo: length,
        };
        todoList.push(newtodo);
        ushaSri(newtodo);
        userInputElement.value = "";
        console.log(todoList);
    }
};
// console.log(todoItemsContainer);