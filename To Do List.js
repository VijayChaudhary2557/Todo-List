let todo = {
    index : 0,
    allTask : [],
    doneTask : []
};

const taskList = document.querySelector('.taskList');
const taskField = document.querySelector('.inputText');

function AddTask()
{
    let taskText = taskField.value;
    if (taskText=='')
    {
        return;
    }
    taskField.value = '';
    let i = todo.index++;

    todo.allTask.push(taskText);
    let task = createTaskElement(taskText,i);

    console.log(todo);
    localStorage.setItem('todo',JSON.stringify(todo));
}

function createTaskElement(taskText, i)
{
    let mainDiv = document.createElement('div');
    mainDiv.setAttribute('class','mainDiv')
    taskList.appendChild(mainDiv);


    let textDiv = document.createElement('div');
    textDiv.setAttribute('class','textDiv')
    mainDiv.appendChild(textDiv);

    let checkBox = document.createElement('input');
    checkBox.setAttribute('type','checkbox');
    checkBox.setAttribute('onclick','RemoveCheck(this)');
    textDiv.appendChild(checkBox);

    let textP = document.createElement('span');
    textP.textContent = taskText;
    textP.setAttribute('class','textP');
    textDiv.appendChild(textP)
    let btnDiv = document.createElement('span');
    btnDiv.setAttribute('class','btnDiv');
    mainDiv.appendChild(btnDiv);

    let CheckBtn = document.createElement('i');
    CheckBtn.setAttribute('class','fa-solid fa-check checkBtn taskBTN');
    btnDiv.appendChild(CheckBtn);

    CheckBtn.setAttribute('onclick','checkFun(this)');

    let UpdateBtn = document.createElement('i');
    UpdateBtn.setAttribute('class','fa-solid fa-pen-nib updateBtn taskBTN')
    btnDiv.appendChild(UpdateBtn);

    UpdateBtn.setAttribute('onclick','UpdateTask(this)');

    let DeleteBtn = document.createElement('i');
    DeleteBtn.setAttribute('class','fa-solid fa-trash deletBtn taskBTN');
    btnDiv.appendChild(DeleteBtn);

    DeleteBtn.setAttribute('onclick','delFun(this)');

}
let GlobalArr = [];
function RemoveCheck(ele)
{
    ele.classList.toggle('checkBox');
    let newEle = (ele.parentElement).parentElement;
    if (!GlobalArr.includes(newEle))
    {
        GlobalArr.push(newEle);
        console.log(GlobalArr);
    }
    else
    {
        let index = GlobalArr.indexOf(newEle);
        if (index!=-1)
        {
            GlobalArr.splice(index,1);
        }
    }
}
let doneIndex ;
function checkFun(ele)
{
    let parent = ele.parentNode;
    let sibling = parent.previousElementSibling;

    let myTodo = todo.allTask
    let myIndex = myTodo.indexOf(sibling.lastElementChild.textContent);
    sibling.lastElementChild.classList.toggle('strikethrough');
    if (sibling.lastElementChild.classList.contains('strikethrough'))
    {
        
        
        console.log(doneIndex = 1);
    }
    else
    {
        console.log(doneIndex = 0);
    }

    if (doneIndex == 1)
    {
        todo.doneTask.push(sibling.lastElementChild.textContent);
        localStorage.setItem('todo',JSON.stringify(todo));
    }
    else if (doneIndex == 0)
    {
        let arr = todo.doneTask;
        let indx = arr.indexOf(sibling.lastElementChild.textContent);
        arr.splice(indx, 1);
        localStorage.setItem('todo',JSON.stringify(todo)); 
    }
}


let GlobalParent;
let GlobalSibling;
let GlobalText;
function UpdateTask(ele)
{
    let parent = ele.parentNode;
    let sibling = parent.previousElementSibling;
    GlobalParent = parent;
    GlobalText = sibling.textContent;
    console.log(GlobalParent);
    console.log(GlobalSibling);

    GlobalSibling = sibling;
    let taskValue = document.querySelector('.inputText').value;
    document.querySelector('.inputText').value = sibling.textContent;

    let UpdateInputBtn = document.createElement('input')
    UpdateInputBtn.setAttribute('value','Update');
    UpdateInputBtn.setAttribute('onclick','updateMyTask()');
    UpdateInputBtn.setAttribute('type','button');
    UpdateInputBtn.setAttribute('class','inputBtn updateBtn');
    let myBox = document.querySelector('.myBox');
    myBox.replaceChild(UpdateInputBtn, myBox.lastElementChild);
}

function updateMyTask()
{
    let taskValue = document.querySelector('.inputText').value;
    document.querySelector('.inputText').value = "";

    let textNew = GlobalSibling.children[1];
    textNew.textContent = taskValue;

    if (todo.allTask.includes(GlobalText)==true && todo.doneTask.includes(GlobalText)==true)
    {
        let myTask = GlobalText;
        console.log(myTask)
        console.log(taskValue)
        let myNewTodo = todo.allTask;
        let myOldTodo = todo.doneTask;

        let indexTodo = myNewTodo.indexOf(myTask);
        console.log(indexTodo)
        myNewTodo[indexTodo] = taskValue;

        let indexNewTodo = myOldTodo.indexOf(myTask);
        console.log(indexNewTodo);
        myOldTodo[indexNewTodo] = taskValue;

        todo.allTask = myNewTodo;
        todo.doneTask = myOldTodo
        console.log(todo);
    }
    else
    {
        let myTask = GlobalText;
        console.log(myTask)
        console.log(taskValue)
        let myNewTodo = todo.allTask;

        let indexTodo = myNewTodo.indexOf(myTask);
        console.log(indexTodo)
        myNewTodo[indexTodo] = taskValue;

        for (let n=0; n<myNewTodo.length; n++)
        {
            if(myNewTodo[n]==null)
            {
                myNewTodo.splice(n,1);
            }
        }
        todo.allTask = myNewTodo;
        console.log(todo);
    }

    let AddTaskBtn = document.createElement('input')
    AddTaskBtn.setAttribute('value','Add Task');
    AddTaskBtn.setAttribute('onclick','AddTask()');
    AddTaskBtn.setAttribute('type','button');
    AddTaskBtn.setAttribute('class','inputBtn updateBtn');
    let myBox = document.querySelector('.myBox');
    myBox.replaceChild(AddTaskBtn, myBox.lastElementChild);

    localStorage.setItem('todo', JSON.stringify(todo));
}

function delFun(ele)
{
    let parent = ele.parentNode;
    let NewParent = parent.parentNode;
    
    let myText = parent.previousElementSibling.lastElementChild.textContent;

    let myAllTask = todo.allTask;
    let myDoneTask = todo.doneTask;

    
    if (myAllTask.includes(myText)==true && myDoneTask.includes(myText)==true)
    {
        let indexAll = myAllTask.indexOf(myText);
        myAllTask.splice(indexAll, 1);

        indexAll = myDoneTask.indexOf(myText);
        myDoneTask.splice(indexAll, 1);

        for (let n=0; n<myAllTask.length; n++)
        {
            if(myAllTask[n]==null)
            {
                myAllTask.splice(n,1);
            }
        }
        NewParent.remove();
        todo.allTask = myAllTask;
        todo.doneTask = myDoneTask;

    }
    else if ( myAllTask.includes(myText)==true )
    {
        let indexAll = myAllTask.indexOf(myText);
        myAllTask.splice(indexAll, 1);

        for (let n=0; n<myAllTask.length; n++)
        {
            if(myAllTask[n]==null)
            {
                myAllTask.splice(n,1);
            }
        }
        NewParent.remove();
        todo.allTask = myAllTask;
    }

    console.log(todo);

    localStorage.setItem('todo', JSON.stringify(todo));
}

function allDel()
{
    for (let i=0; i<GlobalArr.length; i++)
    {
        let x = GlobalArr[i];
        let myText = x.firstElementChild.lastElementChild.textContent;
        console.log(myText);
        
        let myAllTask = todo.allTask;
        let myDoneTask = todo.doneTask;

        if (myAllTask.includes(myText)==true && myDoneTask.includes(myText)==true)
        {
            let indexAll = myAllTask.indexOf(myText);
            myAllTask.splice(indexAll, 1);

            indexAll = myDoneTask.indexOf(myText);
            myDoneTask.splice(indexAll, 1);

            todo.allTask = myAllTask;
            todo.doneTask = myDoneTask;
            console.log(todo)
        }
        else if ( myAllTask.includes(myText)==true )
        {
            let indexAll = myAllTask.indexOf(myText);
            myAllTask.splice(indexAll, 1);

            todo.allTask = myAllTask;
            console.log(todo)
        }
        localStorage.setItem('todo', JSON.stringify(todo));
        x.remove();
    }
}
function done()
{
    let doneTask = todo.doneTask;
    for (let i=0; i<GlobalArr.length; i++)
    {
        let x = GlobalArr[i];
        let y = x.firstElementChild;
        let z = y.lastElementChild;
        console.log(y);
        y.firstElementChild.checked = false;
        console.log(z);
        z.classList.add('strikethrough');
        if (doneTask.includes(z.textContent)==false)
        {
            doneTask.push(z.textContent);
        }
    }
    console.log(GlobalArr.splice(0,GlobalArr.length+1));
    todo.doneTask = doneTask;
    localStorage.setItem('todo', JSON.stringify(todo));
}
window.onload = function()
{
    let mytodo = JSON.parse(localStorage.getItem('todo'));
    console.log(mytodo);

    for (let i=0; i<mytodo.allTask.length; i++)
    {
        for (let l=0; l<mytodo.allTask.length; l++)
        {
            if (mytodo.allTask[l]==null)
            {
                mytodo.allTask.splice(l,1); 
            }
        }
        createTaskElement(mytodo.allTask[i]);
        let AlltextP = document.querySelectorAll('.textP');
        for (let j=0; j<AlltextP.length; j++)
        {
            let taskP = AlltextP[j].textContent;
            console.log('taskP:--',taskP);

            for (let k=0; k<mytodo.doneTask.length; k++)
            {
                let doneText = mytodo.doneTask[k];

                console.log('doneTask:',mytodo.doneTask[i]);
                let taskPele = AlltextP[j];
                console.log('taskPele:--',taskPele);
                if (taskP==doneText)
                {
                    taskPele.classList.add('strikethrough');
                    console.log('done')
                }    
            }
        }
    }
    console.log(todo)
    todo = mytodo;
}