"use strict";
let createProject = document.querySelector('#toggle');
let createproject = document.querySelector(".createproject");
let Title = document.querySelector("#title");
let StartDate = document.querySelector("#start");
let EndDate = document.querySelector("#end");
let Leader = document.querySelector("#Pname");
let Department = document.querySelector("#department");
let LOcation = document.querySelector("#location");
createProject.addEventListener("click", (() => {
    if (createproject.style.display == 'none') {
        createproject.style.display = 'flex';
        createProject.textContent = " CLOSE";
    }
    else {
        createproject.style.display = 'flex';
    }
}));
let Project = [];
createProject.addEventListener("submit", (e) => {
    var _a, _b, _c, _d, _e, _f;
    e.preventDefault();
    let project = ((_a = Title.textContent) === null || _a === void 0 ? void 0 : _a.trim()) != "" &&
        ((_b = StartDate.textContent) === null || _b === void 0 ? void 0 : _b.trim()) != "" &&
        ((_c = EndDate.textContent) === null || _c === void 0 ? void 0 : _c.trim()) != "" &&
        ((_d = Location.textContent) === null || _d === void 0 ? void 0 : _d.trim()) != "" &&
        ((_e = Department.textContent) === null || _e === void 0 ? void 0 : _e.trim()) != "" &&
        ((_f = Leader.textContent) === null || _f === void 0 ? void 0 : _f.trim()) != "";
    if (project) {
        let newProject = {};
    }
});
