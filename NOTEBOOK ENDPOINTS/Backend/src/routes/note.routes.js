"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const createNote = (0, express_1.Router)();
createNote.post("/create", createNote);
exports.default = createNote;
