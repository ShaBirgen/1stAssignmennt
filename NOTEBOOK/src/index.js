var CreateNote = document.querySelector(".createNote");
var submit = document.querySelector("#submit");
var Title = document.querySelector("#title");
var Description = document.querySelector("#desc");
var Locate = document.querySelector("#location");
var Toggle = document.querySelector("#toggle");
var container = document.querySelector("#container");
Toggle.addEventListener("click", function () {
    if (CreateNote.style.display == "none") {
        CreateNote.style.display = "flex";
        // createProject.textContent=" CLOSE"
    }
    else {
        CreateNote.style.display = "flex";
    }
});
submit.addEventListener("click", function () {
    if (CreateNote.style.display == "flex") {
        CreateNote.style.display = "none";
    }
});
var Note = [];
window.onload = function () {
    var noteArr = localStorage.getItem("note");
    noteArr = JSON.parse(noteArr);
    noteArr.forEach(function (item) {
        Note.push(item);
    });
    createNote(noteArr);
};
function createNote(note) {
    container.textContent = " ";
    note.forEach(function (items, index) {
        // Create a new 'div' element for each product
        var item = document.createElement("div");
        item.className = "NoteCard";
        // Create div elements for each property
        var titleDiv = document.createElement("div");
        titleDiv.className = "title";
        titleDiv.textContent = "Title: ".concat(items.Title);
        var DescriptionDiv = document.createElement("div");
        DescriptionDiv.className = "start";
        DescriptionDiv.textContent = "Description: ".concat(items.Description);
        var LocateDiv = document.createElement("div");
        LocateDiv.className = "end";
        LocateDiv.textContent = "Location: ".concat(items.Locate);
        var date = document.createElement("p");
        date.textContent = "Date: ".concat(items.Date, "/").concat(items.Month, "/").concat(items.Year);
        var time = document.createElement("p");
        // date.textContent = `${items.Time}`;
        //DETAILS BUTTON
        var detailsbtn = document.createElement("button");
        detailsbtn.textContent = "DETAILS";
        detailsbtn.className = "details";
        detailsbtn.addEventListener("click", function () {
            window.location.href = "note.html";
        });
        // Create a delete button
        // let deletebtn = document.createElement("button");
        // deletebtn.textContent = "Delete";
        // deletebtn.addEventListener("click", () => {
        //   deleteItem(index);
        // });
        // Append created elements to the item div
        item.appendChild(titleDiv);
        item.appendChild(DescriptionDiv);
        item.appendChild(LocateDiv);
        item.appendChild(date);
        item.appendChild(detailsbtn);
        // item.appendChild(deletebtn);
        container.appendChild(item);
    });
}
var currentDate = new Date();
CreateNote.addEventListener("submit", function (e) {
    e.preventDefault();
    var isFormValid = Title.value.trim() !== "" &&
        Description.value.trim() !== "" &&
        Locate.value.trim() !== "";
    if (isFormValid) {
        var newNote = {
            Title: Title.value.trim(),
            Description: Description.value.trim(),
            Locate: Locate.value.trim(),
            Date: currentDate.getDate(),
            Month: currentDate.getMonth(),
            Year: currentDate.getFullYear(),
            // Time: formattedTime,
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
