let txtnote = document.getElementById("textNote");
let noteTitle = document.getElementById("noteTitle");
let add = document.getElementById("addNote");
showItem();

//To write and add a note
function initialise() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = {};
        document.getElementById("empty").innerHTML = "You have zero notes.Use add note to add a new note";
    }
    else {
        notesObj = JSON.parse(notes);
        if (Object.keys(notesObj).length==0) {
            document.getElementById("empty").innerHTML = "You have zero notes.Use add note to add a new note";
        }    
    }
    return notesObj;
}

add.addEventListener("click", function () {
    let title = noteTitle.value;
    let msg = txtnote.value;
    let notesObj = initialise();
    notesObj[title] = msg;
    localStorage.setItem("notes", JSON.stringify(notesObj));
    txtnote.value = "";
    noteTitle.value = "";
    location.reload();
});

function showItem() {
    let notesObj = initialise();
    let html = "";
    if (Object.keys(notesObj).length > 0) {
        document.getElementById("empty").innerHTML = "";
        id = 1;
        for (let key in notesObj) {
            html += `<div class="noteCard card mx-3 my-3" style="width: 18rem;" id="Note${id}">
            <div class="card-body">
              <div class="row">
              <div id="title${id}" class="col-10"><h5 class="card-title" id="titleNote${id}">${key}</h5></div>
              <div class="col-2"><i class="fa fa-pencil edit" id="${id}" style="cursor:pointer"></i></div>
              </div>
              <p class="card-text" id="text${id}">${notesObj[key]}</p>
              <div id="del${id}"><a href="#" class="btn btn-primary" onclick="delnote(this.id)" id="${key}">Delete Note</a></div>
            </div>
            </div>`
            id++;
        }
    }
    let ournote = document.getElementById("ournote");
    ournote.innerHTML = html;
}

//To delete a note
function delnote(key) {
    let notesObj = initialise();
    delete notesObj[key];
    if (Object.keys(notesObj).length == 0) {
        document.getElementById("empty").innerHTML = "You have zero notes.Use add note to add a new note";
    }
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showItem();
}

// Search for a note
let searchText = document.getElementById("searchText");
searchText.addEventListener("input", function () {
    let Card = document.getElementsByClassName("noteCard");
    Array.from(Card).forEach(function (element) {
        noteId = element.getAttribute("id");
        let title = document.getElementById("title" + noteId).innerText;
        let text = element.getElementsByTagName("p")[0].innerText;
        if (text.includes(searchText.value) || title.includes(searchText.value)) {
            element.style.display = "block";        //block to show
        }
        else {
            element.style.display = "none";         //none to hide
        }
    });
});

let edit = document.getElementsByClassName("edit");
Array.from(edit).forEach(function (element) {
    element.addEventListener("click", function () {
        myid = element.getAttribute("id");
        document.getElementById(myid).style.display = "none";
        divTitle = document.getElementById("title" + myid);
        title = divTitle.firstElementChild.innerText;
        text = document.getElementById("text" + myid).innerText;
        divTitle.innerHTML = `<div class="input-group input-group-sm mb-3">
        <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value="${title}" id="newTitle${myid}">
        </div>`;
        document.getElementById("text" + myid).innerHTML = `<div class="input-group input-group-sm mb-3">
        <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value="${text}" id="newText${myid}">
        </div>`;
        let notesObj = initialise();
        delete notesObj[title];
        document.getElementById("del" + myid).innerHTML = `<a href="#" class="btn btn-primary" onclick="saveNote(${myid})">Save Note</a>`;
    })
});

function saveNote(myid) {
    newTitle = document.getElementById("newTitle" + myid).value;
    newText = document.getElementById("newText" + myid).value;
    notesObj[newTitle] = newText;
    localStorage.setItem("notes", JSON.stringify(notesObj));
    location.reload();
}
