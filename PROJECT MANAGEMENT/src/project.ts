let createProject = document.querySelector('#toggle') as HTMLButtonElement
let createproject= document.querySelector(".createproject") as HTMLFormElement
let Title= document.querySelector("#title") as HTMLInputElement
let StartDate = document.querySelector("#start") as HTMLInputElement;
let EndDate = document.querySelector("#end") as HTMLInputElement;
let Leader = document.querySelector("#Pname") as HTMLInputElement;
let Department = document.querySelector("#department") as HTMLInputElement;
let LOcation = document.querySelector("#location") as HTMLInputElement;


createProject.addEventListener ( "click", (() => {

     if (createproject.style.display == 'none') {
        createproject.style.display='flex'
        createProject.textContent=" CLOSE"
    } else {
        createproject.style.display='flex'
    }
}))

interface Project{
    Title: string;
    StartDate: number;
    EndDate: number;
    Location: string;
    Department: string;
    Leader: string;
}

let Project: Project []= []

createProject.addEventListener("submit",(e) => {
    e.preventDefault()
let project = Title.textContent?.trim() != "" &&
              StartDate.textContent?.trim() != "" &&
              EndDate.textContent?.trim() != "" &&
              Location.textContent?.trim() != "" &&
              Department.textContent?.trim() != "" &&
              Leader.textContent?.trim() != ""

        if (project) {
            let newProject= {
        
        }

})