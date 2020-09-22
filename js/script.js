//console.log("js note taking project")

//If user adds a note ade it to the localStorage

let addNoteBtn = document.getElementById('add-note-btn');

showNotes();

addNoteBtn.addEventListener('click', function (e) {
    let addTxtArea = document.getElementById('add-txt-area');
    let addTitle = document.querySelector('#addTitle');
    let notes = localStorage.getItem('notes');


    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let myObj = {
        title: addTitle.value,
        text: addTxtArea.value
    }

    if (addTxtArea.value != '') {
        notesObj.push(myObj);
    } else {
        alert('Write something then add..')
    }

    localStorage.setItem('notes', JSON.stringify(notesObj));

    addTxtArea.value = '';
    addTitle.value = '';

    showNotes();

})


//function to show element from localStorage
function showNotes() {
    let notes = localStorage.getItem('notes');

    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let addSub = document.getElementById('add-subtitle')
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
            <div class="noteCard card text-white  bg-secondary mb-3" ">
                <div class="card-header">${element.title}</div>
                <div class="card-body">
                    <p class="card-text"> ${element.text} </p>
                    <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-danger">Delete Note</button>
                </div>
            </div>
                
            `

    })
    let notesElm = document.getElementById('notes');

    if (notesObj.length != 0) {
        notesElm.innerHTML = html
    } else {
        notesElm.innerHTML = `Nothing to show! "Add a Note" to add notes`
    }

}


//function to delete a note

function deleteNote(index) {
    //console.log("I am deleting", index);

    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    notesObj.splice(index, 1);

    localStorage.setItem('notes', JSON.stringify(notesObj));

    showNotes();

}

//search box funciton
let search = document.getElementById('search-box');

search.addEventListener('input', function () {
    let inputValue = search.value;
    //console.log("searching", inputValue)

    let noteCards = document.getElementsByClassName('noteCard');

    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName('p')[0].innerText;

        if (cardTxt.includes(inputValue)) {
            element.style.display = 'block'
        } else {
            element.style.display = 'none';
        }

    })

})


/*
further features:
1. add title
2. Marks a note as Important
3. Seperate notes by user
4. sync and host to server
*/
