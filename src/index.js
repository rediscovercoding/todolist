import './style.css';

let taskName= document.querySelector('#taskName');
let descrp= document.querySelector('#descrp');
let dueDate= document.querySelector('#dueDate');
let priority= document.querySelector('#priority');
let projName= document.querySelector('#projectName');
let submit= document.querySelector('#submit');
let okButton = document.querySelector('#OkButton')
let taskArray=[]
submit.addEventListener('click', addToArray);
okButton.addEventListener('click',  regProjectName);


//function to check if to add to default project or new project and add data to an array
function addToArray(){
    if (projName.value === 'Add Project'){
        let popUp = document.querySelector('.popUpHidden');
        
        popUp.classList.remove('popUpHidden');
        popUp.classList.add('popUpShow');
        
    }
    else{
        taskArray.push({
            project: projName.value,
            task: taskName.value,
            descrption: descrp.value,
            date: dueDate.value,
            priority: priority.value,
        
        })
        addCell();
        
        console.log(taskArray);
    
        return taskArray

    }
}


//displays the task as a list in a table
function addCell(){
    let table= document.querySelector('#table');
    let createRow= document.createElement('tr');
    let taskCell= document.createElement('td');
    let dueDateCell= document.createElement('td');
    let priorityCell= document.createElement('td');
    let doneButtonCell= document.createElement('td');
    let removeButtonCell= document.createElement('td');
    let describeButtonCell= document.createElement('td');

    let doneButton= document.createElement('button');
    let removeButton= document.createElement('button');
    let describeButton= document.createElement('button');
    doneButton.textContent= 'Done';
    removeButton.textContent = 'Remove';
    describeButton.textContent= '?'
    doneButton.classList.add('doneButton');
    removeButton.classList.add('removeButton');
    describeButton.classList.add('describeButton');
    
    

     
    for (let i=0; i< taskArray.length; i++){
        console.log(taskArray[i].task);
        taskCell.textContent= taskArray[i].task;
        dueDateCell.textContent= taskArray[i].date;
        priorityCell.textContent= taskArray[i].priority;
        createRow.appendChild(taskCell);
        createRow.appendChild(dueDateCell);
        createRow.appendChild(priorityCell);
        doneButtonCell.appendChild(doneButton);
        doneButton.setAttribute('id', `doneButton${i}`)
        removeButtonCell.appendChild(removeButton);
        removeButton.setAttribute('id', `removeButton${i}`)
        describeButtonCell.appendChild(describeButton);
        describeButton.setAttribute('id', `describeButton${i}`)
        createRow.appendChild(doneButtonCell);
        createRow.appendChild(removeButtonCell);
        createRow.appendChild(describeButtonCell);
        table.appendChild(createRow);

        //below logic for done and delet button
        let doneButtonSelect= document.querySelector(`#doneButton${i}`);
        doneButtonSelect.addEventListener ('click', doneFunction);
        
        let removeButtonSelect= document.querySelector(`#removeButton${i}`);
        removeButtonSelect.addEventListener ('click', function(){
            let taskItem= this.parentNode.parentNode;
            taskItem.remove();
            taskArray.splice(i, 1);
            
        });

        //below logic for describe button
        let describeButtonSelect= document.querySelector(`#describeButton${i}`);
        
        describeButtonSelect.addEventListener ('click', describeFunction)
            
        };     
};
    


// function register new Project Name. The new project pops up as a seperate entity.
function regProjectName(){
    let popUp = document.querySelector('.popUpShow');
    let projectListDiv= document.querySelector('.projectList');
    let projectListButton = document.createElement('button');
    projectListButton.setAttribute('id', 'projButton');
    popUp.classList.remove('popUpShow');
    popUp.classList.add('popUpHidden');
    let popUpInput= document.querySelector('#popUp');
    projName= popUpInput;
    
    taskArray.push({
        project: projName.value,
        task: taskName.value,
        descrption: descrp.value,
        date: dueDate.value,
        priority: priority.value,
    
    })
    addCell();
    projectListButton.textContent=projName.value;
    projectListDiv.appendChild(projectListButton);
    console.log(taskArray);
    return taskArray
}


function doneFunction(){
    
    let taskItem= this.parentNode.parentNode;
    taskItem.classList.add('strikeThrough');
}


function describeFunction(){
    let descriptionDiv= document.createElement('div');
    let descriptionOk= document.createElement('button');
    let descrpHiddenDiv= document.querySelector('.descrpHidden');
    let stringId = this.id
    let index= stringId.slice(-1)
    descriptionDiv.textContent = taskArray[index].descrption;
    descriptionOk.textContent="Ok";
    
    descrpHiddenDiv.appendChild(descriptionDiv);
    descrpHiddenDiv.appendChild(descriptionOk);
    descrpHiddenDiv.classList.add('showDiv');
    

    descriptionOk.addEventListener('click', function(){
        descriptionDiv.remove();
        descriptionOk.remove();
    })
    
}
