
import { Router } from "express";
import { createNote } from "../Controllers/create.note";
import getNotes from '../Controllers/getNotes';

const createNoteRouter = Router();

createNoteRouter.post("/create", createNote);
createNoteRouter.get("/notes", getNotes)

export default createNoteRouter;
