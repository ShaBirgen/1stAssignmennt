
import { Router } from "express";
import { Notes } from "../Controllers/create.note";

const createNote = Router();

createNote.post("/create", createNote);

export default createNote;