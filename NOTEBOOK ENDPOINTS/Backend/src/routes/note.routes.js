"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const create_note_1 = require("../Controllers/create.note");
const createNoteRouter = (0, express_1.Router)();
createNoteRouter.post("/create", create_note_1.createNote);
exports.default = createNoteRouter;
