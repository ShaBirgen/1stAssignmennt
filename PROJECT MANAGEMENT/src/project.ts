let createProject = document.querySelector('#toggle') as HTMLButtonElement
let createproject= document.querySelector(".createproject") as HTMLFormElement
let Title= document.querySelector("#title") as HTMLInputElement
let StartDate = document.querySelector("#start") as HTMLInputElement;
let EndDate = document.querySelector("#end") as HTMLInputElement;
let Leader = document.querySelector("#Pname") as HTMLInputElement;
let Department = document.querySelector("#department") as HTMLInputElement;
let Area = document.querySelector("#location") as HTMLInputElement;
let Submit = document.querySelector("#submit") as HTMLButtonElement
let container = document.querySelector(".container") as HTMLDivElement;

const Project: Project []= [];

window.onload = () => {
    let projectArr:any = localStorage.getItem('projects');
    projectArr = JSON.parse(projectArr);
    
    projectArr.forEach((item:any) => {
        Project.push(item);
    })
    
    createCards(projectArr);
}

createProject.addEventListener ( "click", (() => {

     if (createproject.style.display == 'none') {
        createproject.style.display='flex'
        // createProject.textContent=" CLOSE"
    } else {
        createproject.style.display='flex'
    }
}))

Submit.addEventListener("click", () => {
  if (createproject.style.display == "flex") {
    createproject.style.display = "none";
  }
});



interface Project{
    Title: string;
    StartDate: string;
    EndDate: string;
    Area: string;
    Department: string;
    Leader: string;
}

// localStorage.setItem("projects", JSON.stringify(Project));
// const container = document.createElement("div") as HTMLDivElement;
function createCards(project: Project[]) {
  // if (Project.length >= 1)
  container.textContent = "";
  
  project.forEach((items, index) => {
    
    // Create a new 'div' element for each product
    let item = document.createElement("div") as HTMLDivElement;
    item.className = "projectcard";

    // Create div elements for each property
    let titleDiv = document.createElement("div") as HTMLDivElement;
    titleDiv.className = "title";
    titleDiv.textContent = `Title: ${items.Title}`;

    let startDateDiv = document.createElement("div") as HTMLDivElement;
    startDateDiv.className = "start";
    startDateDiv.textContent = `Start Date: ${items.StartDate}`;

    let endDateDiv = document.createElement("div") as HTMLDivElement;
    endDateDiv.className = "end";
    endDateDiv.textContent = `End date: ${items.EndDate}`;

    let leaderDiv = document.createElement("div") as HTMLDivElement;
    leaderDiv.className = "manager";
    leaderDiv.textContent = `Project manager: ${items.Leader}`;

    let locationDiv = document.createElement("div") as HTMLDivElement;
    locationDiv.className = "navigate";
    locationDiv.textContent = `Location: ${items.Area}`;

    // Create a delete button
    let deletebtn = document.createElement("button");
    deletebtn.textContent = "Delete";
    deletebtn.addEventListener("click", () => {
        // Use slice to create a shallow copy of the array
        deleteItem(index)

    })
    // Append created elements to the item div
    item.appendChild(titleDiv);
    item.appendChild(startDateDiv);
    item.appendChild(endDateDiv);
    item.appendChild(leaderDiv);
    item.appendChild(locationDiv);
    item.appendChild(deletebtn);

    // Append the item div to the containerDiv
    container.appendChild(item);

    // Append the containerDiv to the document body
    // document.body.appendChild(container);
  })};




createproject.addEventListener("submit",(e) => {
    e.preventDefault()

    const isFormValid =
    Title.value.trim() !== "" &&
    StartDate.value.trim() !== "" &&
    EndDate.value.trim() !== "" &&
    Area.value.trim() !== "" &&
    Department.value.trim() !== "" &&
    Leader.value.trim() !== "";

  if (isFormValid) {
    const newProject: Project = {
      Title: Title.value.trim(),
      StartDate: StartDate.value.trim(),
      EndDate: EndDate.value.trim(),
      Area: Area.value.trim(),
      Department: Department.value.trim(),
      Leader: Leader.value.trim(),
    };

    Project.push(newProject);
    console.log("Hello",Project);
    
    createCards(Project);
    localStorage.setItem('projects', JSON.stringify(Project));
    console.log();
    

    // const Project = JSON.parse(localStorage.getItem('projects') || '[]');
    // projects.push(newProject);
    // console.log();
    
    
  } else {
    // Handle the case where the form is not valid (e.g., show an error message)
    console.log('Form is not valid. Please fill in all required fields.');
  }

})

function deleteItem(index:number) {
  Project.splice(index,1);
    localStorage.setItem("projects", JSON.stringify(Project));
    createCards(Project);
}