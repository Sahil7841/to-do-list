const inputField = document.getElementById("input-field");
const addBtn = document.getElementById("add-btn");
const listItems = document.getElementById("list-items");
const dataArray = [];


addBtn.addEventListener("click", addItem);

function addItem() {
    const inputValue = inputField.value;

    if (inputValue === "") {
        alert("Please enter a title.");
        return;
    }

    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    const listItem = document.createElement("li");
    const inputItem = document.createElement("span");
    inputItem.textContent = inputValue;

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.classList.add("remove-btn");

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.classList.add("edit-btn");

    listItem.appendChild(checkBox);
    listItem.appendChild(inputItem);
    listItem.appendChild(removeButton);
    listItem.appendChild(editButton);
    listItems.appendChild(listItem);
    dataArray.push(inputValue);
    inputField.value = "";


    removeButton.addEventListener("click", function () {
        const index = dataArray.indexOf(inputValue);
        if (index !== -1) {
            dataArray.splice(index, 1);
            listItems.removeChild(listItem);
        }

    });


    editButton.addEventListener("click", function () {
        const editableInput = document.createElement("input");
        editableInput.type = "text";
        const saveButton = document.createElement("button");
        saveButton.textContent = "Save";
        saveButton.classList.add("save-btn");
        editableInput.value = inputItem.textContent;

        listItem.replaceChild(editableInput, inputItem);
        listItem.insertBefore(saveButton, listItem.children[2]);
        editableInput.focus();


        saveButton.addEventListener("click", function () {
            const updatedValue = editableInput.value;
            dataArray[dataArray.indexOf(inputValue)] = updatedValue;
            inputItem.textContent = updatedValue;
            listItem.replaceChild(inputItem, editableInput);
            listItem.removeChild(saveButton);

        });


    });

    listItems.addEventListener("click", function (event) {
        const target = event.target;

        if (target.classList.contains("remove-btn")) {
            const listItem = target.parentElement;
            const listItemText = listItem.querySelector("span").textContent.trim();
            const index = dataArray.indexOf(listItemText);

            if (index !== -1) {
                dataArray.splice(index, 1);
            }

            listItems.removeChild(listItem);
        }
    });
}