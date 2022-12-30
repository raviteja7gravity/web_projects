class todoClass{
    constructor(id,day,desc,isDone){
        this.id = id;
        this.day = day;
        this.desc = desc;
        this.isDone = isDone;
        this.flag= false;
    }
}

class TodoList {
    data =  [ ];
    addTodo(todos){
        this.data.push(todos);
    }
    delete(id){
        const i = this.data.findIndex((e)=>e.id=id);
        if(i<0){
            throw("No ToDO");
        }
        this.data.splice(i,1);
    }
    getAll(){
        return this.data;
    }
}

const g = new TodoList();
function onAddNew(){
let date = document.querySelector('label>input[type="date"]').value;
let desc = document.querySelector('label>input[type="text"]').value;
let checks  = document.querySelector('#check');
document.querySelector('label>input[type="date"]').value = "";
document.querySelector('label>input[type="text"]').value  = "";

if(date != "" && desc != "")
g.addTodo(new todoClass(g.data.length+1,date,desc,false));
else
window.alert("Please fill all options");
display();
}

function onSelect(value){
    if(value=="n"){
    for(let i=0;i<g["data"].length;i++){
        for(let j=0;j<g["data"].length;j++){
            if(g["data"][i].day<g["data"][j].day){
                let p = g["data"][i];
                g["data"][i] = g["data"][j];
                g["data"][j] = p;
            }
        }
    }
    console.log("sorted by Day");
}
else{
    for(let i=0;i<g["data"].length;i++){
        for(let j=0;j<g["data"].length;j++){
            if(g["data"][i].id<g["data"][j].id){
                let p = g["data"][i];
                g["data"][i] = g["data"][j];
                g["data"][j] = p;
            }
        }
    }
    console.log("sorted by Id");
}

    display(); 
}

function display(){
    const data = g.getAll();
    let mylist = document.querySelector(".mylist");
    mylist.innerHTML="";
    for(let i of data){
        let  f = "";
        if(i.desc.length>25){
            let  m = i.desc.slice(0,25);
         f = `<div class="box">  
                        <div id="ID"><strong>${i.id}</strong></div>
                        <div  id="time">${i.day}</div>
                        <div id="desc">${m}</div>
                        <div id="dropd">&#8964;</div>
                        <div id="checkers"><input type="checkbox"></div>
                        <div id="options"><strong>-</strong><div>
                    </div>`}
        else {
             f = `<div class="box">  
            <div id="ID"><strong>${i.id}</strong></div>
            <div  id="time">${i.day}</div>
            <div id="desc">${i.desc}</div>
            <div id="checkers"><input type="checkbox"></div>
            <div id="options"><strong>-</strong><div>
        </div>`  
        }
        mylist.innerHTML += f;
       
    }

    $("div > #options").on('click',function()
    {
    const ans = confirm("Do you really want to remove?");
    if(ans){
       
        $(this).parent().remove();
        g.delete(this.parentElement.firstElementChild.textContent);
    }
    else{
        console.log(ans)
    }} );
    
    $("div > #dropd").on('click',function()
   {
    
    let ind = parseInt(this.parentElement.querySelector('#ID').innerText);
    if(!g.data[ind-1]['flag']){
     this.parentElement.querySelector("#desc").innerText = g.data[ind-1]['desc'];
     g.data[ind-1]['flag']= true;
    }
    else{
        this.parentElement.querySelector("#desc").innerText = g.data[ind-1]['desc'].slice(0,25);
        g.data[ind-1]['flag'] = false; 
    }
   } );
}


display();



//dividing columns
//delteion- Done
//collapsing - Done
//sorting   - Done