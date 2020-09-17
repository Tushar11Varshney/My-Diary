showItem();
//To write and add a note
function initialise()
{
    let notes=localStorage.getItem("notes");
    if(notes==null)
    {
        notesObj={};
        document.getElementById("empty").innerHTML="You have zero notes.Use add note to add a new note";
    }
    else
    {
        notesObj=JSON.parse(notes);
        document.getElementById("empty").innerHTML="";
    }
    return notesObj;
}
let txtnote=document.getElementById("textNote");
let noteTitle=document.getElementById("noteTitle");
let add=document.getElementById("addNote");
add.addEventListener("click",function(){
    let title=noteTitle.value;
    let msg=txtnote.value;
    let notesObj=initialise();
    notesObj[title]=msg;
    localStorage.setItem("notes",JSON.stringify(notesObj));
    txtnote.value="";
    noteTitle.value="";
    // console.log(notesObj);
    showItem();
});

function showItem(){
    let notesObj=initialise();
    let html="";

    for(let key in notesObj){
        html+=`<div class="noteCard card mx-3 my-3" style="width: 18rem;">
            <div class="card-body">
              <h5 class="card-title">${key}</h5>
              <p class="card-text">${notesObj[key]}</p>
              <a href="#" class="btn btn-primary" onclick="delnote(this.id)" id="${key}">Delete Note</a>
            </div>
           </div>`
    }

    let ournote=document.getElementById("ournote");
    ournote.innerHTML=html;
}

//To delete a note
function delnote(key)
{   
    let notesObj=initialise();
    delete notesObj[key];   
    localStorage.setItem("notes",JSON.stringify(notesObj));
    showItem(); 
}

// Search for a note
let searchText=document.getElementById("searchText");
searchText.addEventListener("input",function(){
    let Card=document.getElementsByClassName("noteCard");
    Array.from(Card).forEach(function(element){
        // console.log(element);
        let text=element.getElementsByTagName("p")[0].innerText;
        if(text.includes(searchText.value))
        {
            element.style.display="block";  //block dikhane kelie
        }
        else{
            element.style.display="none";     //none hide krne kelie 
        }
    });
});

