//GET and POST URL
let apiUrl = `https://jsonbox.io/box_2ab455796a5f75eaef12`


//POST TODO item JSONBOX
async function postTodoData(item, checkValue) {
    let todoData = {
        body: JSON.stringify({
            description: `${item}`,
            done: `${checkValue}`,
        }),
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    };
    try {
        let postData = await fetch(apiUrl, todoData);
        let data = await postData.json();
        console.log(todoData, postData, data)
        return data;
    } catch (error) {
        console.log(error)
        return error;
    }
}


//GET the to do item(s) from JSON BOX
async function getTodoData() {
    try {
        let res = await fetch(apiUrl)
        let resJSON = await res.json();
        return resJSON
    }
    catch (error) {
        console.log(error)
        return error
    }
};



//DELETE TODO item JSONBOX
async function deleteTodoData(recordID) {
    let deleteApiUrl = `https://jsonbox.io/box_2ab455796a5f75eaef12/${recordID}`
    let deleteData = {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };
    try {
        let deleteInfo = await fetch(deleteApiUrl, deleteData);
        let deleteJSON = await deleteInfo.json();
        console.log(deleteJSON, deleteData, deleteInfo)
        return deleteJSON;
    } catch (error) {
        console.log(error)
        return error;
    }
}

//PUT TODO item JSONBOX
async function putData(item, checkedValue, recordID) {
    let putApiUrl = `https://jsonbox.io/box_2ab455796a5f75eaef12/${recordID}`
    let updateData = {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            description: `${item}`,
            done: `${checkedValue}`,
        }),
    };
    try {
        let updatedInfo = await fetch(putApiUrl, updateData);
        let updateJSON = await updatedInfo.json();
        console.log(updateJSON, updatedInfo, updateData)
        return updateJSON;
    } catch (error) {
        console.log(error)
        return error;
    }
}




