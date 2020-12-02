let inputfield = document.getElementsByClassName('container-inputfield')[0]
let addButton = document.getElementsByClassName('container-addbutton')[0]
let listContainer = document.getElementsByClassName('container-list')[0]


//GET ONLOAD all list items on screen
let showAllItems = () => {
    getTodoData().then(res => {
        for (i = 0; i < res.length; i++) {
            let todoitems = res[i].description
            createTodoItem(todoitems)
        }
        let trueValues = res.filter(e => e.done == "true").map(e => e.description)
        for (i = 0; i < trueValues.length; i++) {
            let itemValue = Array.from(listContainer.querySelectorAll('.todoText'))
            itemValue.forEach(e => {
                if (e.value == trueValues[i]) {
                    let checkbox = e.parentElement.children[0]
                    checkbox.checked = true
                    let text = e.parentElement.children[1]
                    text.classList.add('checked')
                }
            })
        }
    })
}
showAllItems();


//POST the Data Info to JSON BOX onclick "Add button" && create List item on screen
addButton.addEventListener('click', () => {
    getTodoData().then(res => {
        let item = inputfield.value
        let itemValues = res.map(e => e.description)
        let sameValues = itemValues.includes(item)
        if (sameValues) {
            alert('Task already exist')
            inputfield.focus()
        }
        else if (item !== "") {
            createTodoItem(item)
            postTodoData(item, false)
            inputfield.value = ""
            inputfield.focus()
        }
        else {
            alert('You have to add a task')
            inputfield.focus()
        }
    })
})


//CREATE TODO Item
let createTodoItem = (todoItem) => {
    //Create List item && apply style
    let newLi = document.createElement('li')
    newLi.classList.add('listItem')
    //Create checkbox && apply style
    checkbox = document.createElement('input')
    checkbox.setAttribute('type', 'checkbox');
    checkbox.checked = false
    checkbox.classList.add('checkbox')
    //Create todo item text && apply style
    let newTodoText = document.createElement('input')
    newTodoText.setAttribute('type', 'text');
    newTodoText.setAttribute('maxlength', '30');
    newTodoText.spellcheck = false
    newTodoText.disabled = true
    newTodoText.value = `${todoItem}`;
    newTodoText.classList.add('todoText')
    //Create edit button && apply style
    let editButton = document.createElement('button')
    editButton.innerHTML = "EDIT"
    editButton.classList.add('editButton')
    //Create Delete button && apply style
    let deleteButton = document.createElement('button')
    deleteButton.innerHTML = `<i id="deleteBtn" class="fa fa-trash"></i>`
    deleteButton.classList.add('deleteButton')
    //Append all list items
    listContainer.appendChild(newLi)
    newLi.appendChild(checkbox)
    newLi.appendChild(newTodoText)
    newLi.appendChild(editButton)
    newLi.appendChild(deleteButton)
}


//Input task 
listContainer.addEventListener('click', (e) => {
    if (e.target && e.target.className == 'todoText checked' || e.target && e.target.className == 'todoText') {
        e.target.disabled = false
        e.target.focus()
        e.target.classList.remove('checked')
        e.target.previousSibling.disabled = true
        e.target.previousSibling.checked = false
        let editBtn = e.target.nextSibling
        editBtn.classList.add('showButton')
        let taskValue = e.target.value
        getTodoData().then(res => {
            let recordID = res.filter(e => e.description === taskValue).map(e => e._id)
            updateTask(recordID)
        })
    }
})


// PUT Changed TODO task to JSON BOX
let updateTask = (recordID) => {
    listContainer.addEventListener('click', (e) => {
        e.stopImmediatePropagation();
        if (e.target && e.target.className == 'editButton showButton') {
            let checkbox = e.target.parentElement.children[0]
            let inputValue = e.target.previousSibling.value
            getTodoData().then(res => {
                let allDescriptions = res.map(e => e.description)
                if (!allDescriptions.includes(inputValue) && inputValue != "") {
                    putData(inputValue, false, recordID)
                    checkbox.disabled = false
                    e.target.classList.remove('showButton')
                    let inputField = e.target.previousSibling
                    inputField.classList.add('effectComplete')
                    setTimeout(() => {
                        inputField.classList.remove('effectComplete')
                    }, 500);
                }
                else {
                    alert('Task already exist || has not been changed || "empty"')
                    e.target.previousSibling.focus()
                }
            })
        }
    })
}


//Line trough when checked || unchecked
listContainer.addEventListener('click', (e) => {
    if (e.target && e.target.className === 'checkbox') {
        let task = e.target.parentElement.children[1]
        e.target.checked ? task.classList.add('checked') : task.classList.remove('checked')
    }
})


//when checkbox is checked || unchecked && Trigger function to update JSON BOX
listContainer.addEventListener('click', (e) => {
    if (e.target.className === 'checkbox') {
        getTodoData().then(res => {
            let inputValue = e.target.nextSibling.value
            let taskValue = res.filter(e => e.description === inputValue).map(e => e.description)
            if (inputValue == taskValue) {
                let recordID = res.filter(e => e.description === inputValue).map(e => e._id)
                e.target.checked ? checked(inputValue, recordID) : unChecked(inputValue, recordID)
            }
        })
    }
})


//PUT JSON BOX data when button is CHECKED
let checked = (inputValue, recordID) => {
    putData(inputValue, true, recordID)
}

//PUT JSON BOX data when button is UNCHECKED
let unChecked = (inputValue, recordID) => {
    putData(inputValue, false, recordID)
}

//DELETE list item from screen && JSON BOX
listContainer.addEventListener('click', (e) => {
    if (e.target.className === 'deleteButton') {
        let li = e.target.parentElement
        li.classList.add('deleteEffect')
        setTimeout(() => {
            listContainer.removeChild(li)
        }, 500);
        let itemValue = li.children[1].value
        getTodoData().then(res => {
            let recordID = res.filter(e => e.description === itemValue).map(e => e._id)
            deleteTodoData(recordID)
        })
    }
});