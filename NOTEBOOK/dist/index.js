"use strict";
let CreateNote = document.querySelector('.createNote');
let submit = document.querySelector('#submit');
let Title = document.querySelector('#title');
let Description = document.querySelector('#desc');
let Locate = document.querySelector('#location');
let Toggle = document.querySelector('#toggle');
let container = document.querySelector('#container');
Toggle.addEventListener("click", () => {
    if (CreateNote.style.display == "none") {
        CreateNote.style.display = "flex";
        // createProject.textContent=" CLOSE"
    }
    else {
        CreateNote.style.display = "flex";
    }
});
submit.addEventListener("click", () => {
    if (CreateNote.style.display == "flex") {
        CreateNote.style.display = "none";
    }
});
const Note = [];
window.onload = () => {
    let noteArr = localStorage.getItem('note');
    noteArr = JSON.parse(noteArr);
    noteArr.forEach((item) => {
        Note.push(item);
    });
    createNote(noteArr);
};
function createNote(note) {
    container.textContent = " ";
    note.forEach((items, index) => {
        // Create a new 'div' element for each product
        let item = document.createElement("div");
        item.className = "NoteCard";
        // Create div elements for each property
        let titleDiv = document.createElement("div");
        titleDiv.className = "title";
        titleDiv.textContent = `Title: ${items.Title}`;
        let DescriptionDiv = document.createElement("div");
        DescriptionDiv.className = "start";
        DescriptionDiv.textContent = `Start Date: ${items.Description}`;
        let LocateDiv = document.createElement("div");
        LocateDiv.className = "end";
        LocateDiv.textContent = `End date: ${items.Locate}`;
        // Create a delete button
        let deletebtn = document.createElement("button");
        deletebtn.textContent = "Delete";
        deletebtn.addEventListener("click", () => {
            deleteItem(index);
        });
        // Append created elements to the item div
        item.appendChild(titleDiv);
        item.appendChild(DescriptionDiv);
        item.appendChild(LocateDiv);
        item.appendChild(deletebtn);
        container.appendChild(item);
    });
}
;
CreateNote.addEventListener("submit", (e) => {
    e.preventDefault();
    const isFormValid = Title.value.trim() !== "" &&
        Description.value.trim() !== "" &&
        Locate.value.trim() !== "";
    if (isFormValid) {
        let newNote = {
            Title: Title.value.trim(),
            Description: Description.value.trim(),
            Locate: Locate.value.trim(),
        };
        Note.push(newNote); // Push the newNote to the array
        createNote(Note);
        localStorage.setItem("note", JSON.stringify(Note)); // Use the correct key
    }
    else {
        console.log("Form is not valid. Please fill in all required fields.");
    }
});
function displayNoteDetails(note) {
    console.log("Displaying Note Details:", note);
}
function deleteItem(index) {
    Note.splice(index, 1);
    localStorage.setItem("note", JSON.stringify(Note));
    createNote(Note);
}
