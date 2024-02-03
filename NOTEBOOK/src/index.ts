let CreateNote = document.querySelector(".createNote") as HTMLFormElement;
let submit = document.querySelector("#submit") as HTMLButtonElement;
let Title = document.querySelector("#title") as HTMLInputElement;
let Description = document.querySelector("#desc") as HTMLInputElement;
let Locate = document.querySelector("#location") as HTMLInputElement;
let Toggle = document.querySelector("#toggle") as HTMLButtonElement;
let container = document.querySelector("#container") as HTMLDivElement;

interface Note {
  Title: string;
  Description: string;
  Locate: string;
  Date: number;
  Month: number;
  Year: number;
  // Time: string;
}

Toggle.addEventListener("click", () => {
  if (CreateNote.style.display == "none") {
    CreateNote.style.display = "flex";
    // createProject.textContent=" CLOSE"
  } else {
    CreateNote.style.display = "flex";
  }
});

submit.addEventListener("click", () => {
  if (CreateNote.style.display == "flex") {
    CreateNote.style.display = "none";
  }
});

const Note: Note[] = [];
window.onload = () => {
  let noteArr: any = localStorage.getItem("note");
  noteArr = JSON.parse(noteArr);

  noteArr.forEach((item: any) => {
    Note.push(item);
  });

  createNote(noteArr);
};

function createNote(note: Note[]) {
  container.textContent = " ";

  note.forEach((items, index) => {
    // Create a new 'div' element for each product
    let item = document.createElement("div") as HTMLDivElement;
    item.className = "NoteCard";

    // Create div elements for each property
    let titleDiv = document.createElement("div") as HTMLDivElement;
    titleDiv.className = "title";
    titleDiv.textContent = `Title: ${items.Title}`;

    let DescriptionDiv = document.createElement("div") as HTMLDivElement;
    DescriptionDiv.className = "start";
    DescriptionDiv.textContent = `Description: ${items.Description}`;

    let LocateDiv = document.createElement("div") as HTMLDivElement;
    LocateDiv.className = "end";
    LocateDiv.textContent = `Location: ${items.Locate}`;

    let date = document.createElement("p");
    date.textContent = `Date: ${items.Date}/${items.Month}/${items.Year}`;

    let time = document.createElement("p");
    // date.textContent = `${items.Time}`;

//DETAILS BUTTON
    let detailsbtn = document.createElement("button");
    detailsbtn.textContent = "DETAILS";
    detailsbtn.className= "details";
    detailsbtn.addEventListener("click", () => {
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

const currentDate = new Date();

CreateNote.addEventListener("submit", (e) => {
  e.preventDefault();

  const isFormValid =
    Title.value.trim() !== "" &&
    Description.value.trim() !== "" &&
    Locate.value.trim() !== "";

  if (isFormValid) {
    let newNote: Note = {
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
  } else {
    console.log("Form is not valid. Please fill in all required fields.");
  }
});

function displayNoteDetails(note: Note) {
  console.log("Displaying Note Details:", note);
}
function deleteItem(index: number) {
  Note.splice(index, 1);
  localStorage.setItem("note", JSON.stringify(Note));
  createNote(Note);
}
