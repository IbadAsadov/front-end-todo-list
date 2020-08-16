const form=document.querySelector("#todo-form");
const todoinput=document.querySelector("#todo");
const todolist=document.querySelector(".list-group");
const firstCardbody=document.querySelectorAll(".card-body")[0];
const secondCardBody=document.querySelectorAll(".card-body")[1];
const filter=document.querySelector("#filter");
const clearButton=document.querySelector("#clear-todos");



eventListener();

function eventListener(){
    form.addEventListener("submit",addTodo);

    document.addEventListener("DOMContentLoaded",loadedAllTodoUI);
    secondCardBody.addEventListener("click",deleteTodo);
    filter.addEventListener("keyup",filterTodos);
    clearButton.addEventListener("click",clearAllTodos);



}

function clearAllTodos(e){
    if(confirm("Butun todolari silmek istediyinizden eminmisiniz?")){
        // todolist.innerHTML="";

        while(todolist.firstElementChild != null){
            todolist.removeChild(todolist.firstElementChild);
        }
        localStorage.removeItem("todos")

    }
}



function deleteTodo(e){
    if(e.target.className=="fa fa-remove")
    {
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
        

    }
    
}
function filterTodos(e){
    let filterValues=e.target.value.toLowerCase();
    let listItems=document.querySelectorAll(".list-group-item");
    listItems.forEach(function(el){
        let text=el.textContent.toLowerCase();
        if(text.indexOf(filterValues)===-1){
            el.setAttribute("style","display:none !important");
            
        }
        else{
            el.setAttribute("style","display:block")
        }

    });

}



function deleteTodoFromStorage(todo){
    let todos=getTodosFromStorage();
    
    todos.forEach(function(el,index){
        if(el===todo){



            todos.splice(index,1);
            // // console.log(todo);
            
        }
       
        

    });
    localStorage.setItem("todos",JSON.stringify(todos));


}

function loadedAllTodoUI(){
    let todos= getTodosFromStorage();

    todos.forEach(function(el){
        addTodoToUI(el);

    }) 
   
    

}


function addTodo(e){
    const newTodo=todoinput.value.trim();

    
    if(newTodo==""){
            

       showAlert("danger","todo elave edin..");
       
       
    }
    else{ 
        addTodoToUI(newTodo);
        addTodoStorage(newTodo);
        showAlert("success","tebrikler");

    }
    
    
    e.preventDefault();
}

function getTodosFromStorage(){
    let todos;
    if(localStorage.getItem("todos")==null)
    {
        todos=[];
    }
    else{
        todos=JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}

function addTodoStorage(newTodo){
    let todos=getTodosFromStorage();
    todos.push(newTodo);

    localStorage.setItem("todos",JSON.stringify(todos));

   
}

function showAlert(type,message)
{
    const alert=document.createElement("div");
    alert.className=`alert alert-${type}`;
    alert.textContent=message;
    firstCardbody.appendChild(alert);
    setTimeout(function(){
        alert.remove();

    },1000);
     
}


function addTodoToUI(newTodo){
    const listItem=document.createElement("li");
    const link=document.createElement("a");
    link.href="#";
    link.className="delete-item";
    link.innerHTML="<i class = 'fa fa-remove'></i>";

    listItem.className="list-group-item d-flex justify-content-between";
    listItem.appendChild(document.createTextNode(newTodo));

    listItem.appendChild(link);

    todolist.appendChild(listItem);
    todoinput.value="";

}










