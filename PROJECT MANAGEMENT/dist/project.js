"use strict";
let createProject = document.querySelector('#toggle');
let createproject = document.querySelector(".createproject");
let Title = document.querySelector("#title");
let StartDate = document.querySelector("#start");
let EndDate = document.querySelector("#end");
let Leader = document.querySelector("#Pname");
let Department = document.querySelector("#department");
let Area = document.querySelector("#location");
let Submit = document.querySelector("#submit");
let container = document.querySelector(".container");
const Project = [];
window.onload = () => {
    let projectArr = localStorage.getItem('projects');
    projectArr = JSON.parse(projectArr);
    projectArr.forEach((item) => {
        Project.push(item);
    });
    createCards(projectArr);
};
createProject.addEventListener("click", (() => {
    if (createproject.style.display == 'none') {
        createproject.style.display = 'flex';
        // createProject.textContent=" CLOSE"
    }
    else {
        createproject.style.display = 'flex';
    }
}));
Submit.addEventListener("click", () => {
    if (createproject.style.display == "flex") {
        createproject.style.display = "none";
    }
});
// localStorage.setItem("projects", JSON.stringify(Project));
// const container = document.createElement("div") as HTMLDivElement;
function createCards(project) {
    // if (Project.length >= 1)
    container.textContent = "";
    project.forEach((items, index) => {
        // Create a new 'div' element for each product
        let item = document.createElement("div");
        item.className = "projectcard";
        // Create div elements for each property
        let titleDiv = document.createElement("div");
        titleDiv.className = "title";
        titleDiv.textContent = `Title: ${items.Title}`;
        let startDateDiv = document.createElement("div");
        startDateDiv.className = "start";
        startDateDiv.textContent = `Start Date: ${items.StartDate}`;
        let endDateDiv = document.createElement("div");
        endDateDiv.className = "end";
        endDateDiv.textContent = `End date: ${items.EndDate}`;
        let leaderDiv = document.createElement("div");
        leaderDiv.className = "manager";
        leaderDiv.textContent = `Project manager: ${items.Leader}`;
        let locationDiv = document.createElement("div");
        locationDiv.className = "navigate";
        locationDiv.textContent = `Location: ${items.Area}`;
        // Create a delete button
        let deletebtn = document.createElement("button");
        deletebtn.textContent = "Delete";
        deletebtn.addEventListener("click", () => {
            // Use slice to create a shallow copy of the array
            deleteItem(index);
        });
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
    });
}
;
createproject.addEventListener("submit", (e) => {
    e.preventDefault();
    const isFormValid = Title.value.trim() !== "" &&
        StartDate.value.trim() !== "" &&
        EndDate.value.trim() !== "" &&
        Area.value.trim() !== "" &&
        Department.value.trim() !== "" &&
        Leader.value.trim() !== "";
    if (isFormValid) {
        const newProject = {
            Title: Title.value.trim(),
            StartDate: StartDate.value.trim(),
            EndDate: EndDate.value.trim(),
            Area: Area.value.trim(),
            Department: Department.value.trim(),
            Leader: Leader.value.trim(),
        };
        Project.push(newProject);
        console.log("Hello", Project);
        createCards(Project);
        localStorage.setItem('projects', JSON.stringify(Project));
        console.log();
        // const Project = JSON.parse(localStorage.getItem('projects') || '[]');
        // projects.push(newProject);
        // console.log();
    }
    else {
        // Handle the case where the form is not valid (e.g., show an error message)
        console.log('Form is not valid. Please fill in all required fields.');
    }
});
function deleteItem(index) {
    Project.splice(index, 1);
    localStorage.setItem("projects", JSON.stringify(Project));
    createCards(Project);
}
