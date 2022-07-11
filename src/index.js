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



function addCell(){
    let table= document.querySelector('#table');
    let createRow= document.createElement('tr');
    let taskCell= document.createElement('td');
    let dueDateCell= document.createElement('td');
    let priorityCell= document.createElement('td');
     
    for (let i=0; i< taskArray.length; i++){
        console.log(taskArray[i].task);
        taskCell.textContent= taskArray[i].task;
        dueDateCell.textContent= taskArray[i].date;
        priorityCell.textContent= taskArray[i].priority;
        createRow.appendChild(taskCell);
        createRow.appendChild(dueDateCell);
        createRow.appendChild(priorityCell);
        table.appendChild(createRow);
        
    };
};



function regProjectName(){
    let popUp = document.querySelector('.popUpShow');
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
    
    console.log(taskArray);

    return taskArray
    
}