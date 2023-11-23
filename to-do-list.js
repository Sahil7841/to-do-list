const inputField = document.getElementById("input-field");
const addBtn = document.getElementById("add-btn");
const listItems = document.getElementById("list-items");
const totalCountElement = document.getElementById("total-count");
const showCompletedCheckbox = document.getElementById("checked");
const dataArray = [];

addBtn.addEventListener("click", addItem);

totalCountElement.style.display = "none";

function addItem() {
    const inputValue = inputField.value;

    if (inputValue === "") {
        alert("Please enter a title.");
        return;
    }

    totalCountElement.style.display = "block";

    function updateTotalCount() {
        totalCountElement.textContent = dataArray.length;
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

    dataArray.push({ value: inputValue, completed: false });

    inputField.value = "";
    updateTotalCount();

    checkBox.addEventListener("click", function () {
        const index = dataArray.findIndex((item) => item.value === updatedValue);
        if (index !== -1) {
            dataArray[index].completed = checkBox.checked;
            updateTotalCount();
        }
        toggleCompletedVisibility();
    });

    removeButton.addEventListener("click", function () {
        const index = dataArray.indexOf(inputValue);
        if (index !== -1) {
            dataArray.splice(index, 1);
            listItems.removeChild(listItem);
            updateTotalCount();
            toggleCompletedVisibility();
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
                updateTotalCount();
            }

            listItems.removeChild(listItem);
        }
    });

    function toggleCompletedVisibility() {
        const completedItems = dataArray.filter((item) => item.completed);
        listItems.style.display = showCompletedCheckbox.checked || completedItems.length === 0 ? "block" : "none";
    }

    showCompletedCheckbox.addEventListener("change", function () {
        toggleCompletedVisibility();
    });


    function toggleCompletedVisibility() {
        listItems.innerHTML = "";

        if (showCompletedCheckbox.checked) {
            const completedItems = dataArray.filter((item) => item.completed);
            displayItems(completedItems);
        } else {
            displayItems(dataArray);
        }
    }

    function displayItems(items) {
        items.forEach((item) => {
            const listItem = document.createElement("li");
            const checkBox = document.createElement("input");
            checkBox.type = "checkbox";
            const inputItem = document.createElement("span");
            inputItem.textContent = item.value;
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

            checkBox.checked = item.completed;

            checkBox.addEventListener("click", function () {
                const index = dataArray.findIndex((i) => i.value === item.value);
                if (index !== -1) {
                    dataArray[index].completed = checkBox.checked;
                    updateTotalCount();
                }
                toggleCompletedVisibility();
            });

            removeButton.addEventListener("click", function () {
                const index = dataArray.findIndex((i) => i.value === item.value);
                if (index !== -1) {
                    dataArray.splice(index, 1);
                    updateTotalCount();
                    toggleCompletedVisibility();
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
                    inputValue = updatedValue;

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
                        updateTotalCount();
                    }

                    listItems.removeChild(listItem);
                }
            });
        });
    }

    showCompletedCheckbox.addEventListener("change", function () {
        toggleCompletedVisibility();
    });
}

