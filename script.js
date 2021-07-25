/* Your code here */
const input = document.querySelector("#add");
const btn = document.querySelector("#btn");
const list = document.querySelector("#list");
const delt = document.querySelector("#del");
const done_sec = document.querySelector("#done")
const flex = document.querySelector("#flex")
const act = document.querySelector("#action")

var el = document.getElementsByTagName('li');

const saveLocalStorage = () => {
    localStorage.setItem('textinput', input.value)
}

// this function will allow us to add elements when we click the button
btn.onclick = function () {

    var txt = input.value;
    if (txt == '') {
        alert('Task cannot be empty');
    } else {
        const mainDiv = document.createElement("div");
        const txtDiv = document.createElement("div");
        const buttDiv = document.createElement("div");

        mainDiv.setAttribute('class', 'flex')
        
        //text
        const text = document.createElement('div')
        text.innerHTML = txt;
        //input text to mainDiv

        txtDiv.appendChild(text)
        txtDiv.setAttribute('class', 'font2')
        mainDiv.appendChild(txtDiv)

        mainDiv.setAttribute('class', 'card2_detail')
        mainDiv.setAttribute('class', 'flex')

        //input to Local Storag
        // saveLocalStorage();
        saveLocaltodo(input.value)



        //delete butt
        const delBtn = document.createElement('button')
        delBtn.innerHTML = 'delete'
        delBtn.setAttribute('class', 'delete-butt')

        delBtn.addEventListener('click', () => {
            list.removeChild(mainDiv)
            //remove from local storage
            removeLocalTodos(text);
        })

        //check butt
        const checkbtn = document.createElement('button')

        checkbtn.innerHTML = 'done'
        checkbtn.setAttribute('class', 'check-butt')

        checkbtn.addEventListener('click', () => {

            txtDiv.setAttribute('class', 'font3')
            checkbtn.remove();
            delBtn.remove();
            //mainDiv.setAttribute('class', 'card2')
            delt.append(mainDiv) //move task to delete part
            //done storage
            saveLocalDone(text.innerHTML);
            removeLocalTodos(text);
            //doneLocalStorage()
            //
            delt.insertBefore(mainDiv, delt.firstChild)
        })


        //Add on mouse enter
        // mainDiv.addEventListener('mouseenter', () => {
        //     mainDiv.append(delBtn) //add delete butt to mainDiv
        //     mainDiv.append(checkbtn)
        // })

        checkbtn.style.visibility = "hidden";
        delBtn.style.visibility = "hidden";

        //make button hide
        mainDiv.addEventListener('mouseleave', () => {
            checkbtn.style.visibility = "hidden";
            delBtn.style.visibility = "hidden";
            mainDiv.setAttribute('class', 'card2_detail')
        })


        //make button show
        mainDiv.addEventListener('mouseenter', () => {
            checkbtn.style.visibility = "visible";
            delBtn.style.visibility = "visible";
            mainDiv.setAttribute('class', 'card2_detail')
        })

        //show
        mainDiv.setAttribute('class', 'card2_detail')
        buttDiv.append(delBtn) //add delete butt to mainDiv
        buttDiv.append(checkbtn)
        mainDiv.append(buttDiv)
        list.append(mainDiv) //add mainDiv to list
        list.append(delt)
        list.insertBefore(mainDiv, list.childNodes[0])

        input.value = ""


    }

};

//enter press
function pressEnter(key) {
    if (key.keyCode === 13) {
        btn.onclick();
    }
}

document.addEventListener("keydown", pressEnter)

//save todo

function saveLocaltodo(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo)
    localStorage.setItem("todos", JSON.stringify(todos));

}


function UiTodo() {
    let todos
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }


    let newArr = todos.filter(x => x != null);
    todos = newArr;
    localStorage.setItem("todos", JSON.stringify(newArr));

    todos.forEach(function (todo) {
        //edit here
        const mainDiv = document.createElement("div");
        const txtDiv = document.createElement("div");
        const buttDiv = document.createElement("div");
        //text
        const text = document.createElement('div')
        text.innerHTML = todo;
        //console.log(todo)
        //input text to mainDiv

        //edit here
        txtDiv.appendChild(text)
        txtDiv.setAttribute('class', 'font2')
        mainDiv.appendChild(txtDiv)
        


        //delete butt
        const delBtn = document.createElement('button')
        delBtn.innerHTML = 'delete'
        delBtn.setAttribute('class', 'delete-butt')
        delBtn.addEventListener('click', () => {
            list.removeChild(mainDiv)
            //delete from local
            removeLocalTodos(text);
        })
        //check butt
        const checkbtn = document.createElement('button')
        checkbtn.innerHTML = 'done'
        checkbtn.setAttribute('class', 'check-butt')
        checkbtn.addEventListener('click', () => {

            txtDiv.setAttribute('class', 'font3')
            checkbtn.remove();
            delBtn.remove();
            // mainDiv.setAttribute('class', 'card3')
            delt.append(mainDiv) //move task to delete part
            
            //done storage
            saveLocalDone(text.innerHTML);
            removeLocalTodos(text);
            //doneLocalStorage()
            //
            delt.insertBefore(mainDiv, delt.childNodes[0])
        })

        checkbtn.style.visibility = "hidden";
        delBtn.style.visibility = "hidden";

        //make button hide
        mainDiv.addEventListener('mouseleave', () => {
            checkbtn.style.visibility = "hidden";
            delBtn.style.visibility = "hidden";
            mainDiv.setAttribute('class', 'card2_detail')
        })

        //make button show
        mainDiv.addEventListener('mouseenter', () => {
            checkbtn.style.visibility = "visible";
            delBtn.style.visibility = "visible";
            mainDiv.setAttribute('class', 'card2_detail')
        })
        mainDiv.setAttribute('class', 'card2_detail')
        //show
        // mainDiv.append(delBtn) //add delete butt to mainDiv
        // mainDiv.append(checkbtn)
        buttDiv.append(delBtn) //add delete butt to mainDiv
        buttDiv.append(checkbtn)
        mainDiv.append(buttDiv)
        list.append(mainDiv) //add mainDiv to list
        list.append(delt)
        list.insertBefore(mainDiv, list.childNodes[0])
    });

}

UiTodo()

//remove from local
function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    let todoIndex = [];
    for (let i = 0; i <= todos.length; i++) {
        todoIndex[i] = todos[i];
    }
    // console.log(todo.innerHTML)
    // console.log(todoIndex.indexOf(todo.innerHTML))

    todoIndex.splice(todoIndex.indexOf(todo.innerHTML), 1);

    localStorage.setItem("todos", JSON.stringify(todoIndex));
    //console.log(todoIndex)

}

function saveLocalDone(todo) {
    let doneTodo;
    if (localStorage.getItem("doneTodo") === null) {
        doneTodo = [];
    } else {
        doneTodo = JSON.parse(localStorage.getItem("doneTodo"));
    }
    doneTodo.push(todo)
    localStorage.setItem("doneTodo", JSON.stringify(doneTodo));
}


function doneLocalStorage() {
    let doneTodo;
    if (localStorage.getItem("doneTodo") === null) {
        doneTodo = [];
    } else {
        doneTodo = JSON.parse(localStorage.getItem("doneTodo"));
    }

    doneTodo.forEach(function (todo) {
        const txtDiv = document.createElement("div");
        const mainDiv = document.createElement("div");
        //text
       
        txtDiv.innerHTML = todo;
        // text.setAttribute('class', 'complete')
        txtDiv.setAttribute('class', 'font3')

        mainDiv.appendChild(txtDiv)
        mainDiv.setAttribute('class', 'flex')
        mainDiv.setAttribute('class', 'card2_detail')

        //show
        done_sec.append(mainDiv) //add mainDiv to list
        //done_sec.append(delt)
        done_sec.insertBefore(mainDiv, done_sec.childNodes[0])
    });
}

doneLocalStorage()

//localStorage.clear();
