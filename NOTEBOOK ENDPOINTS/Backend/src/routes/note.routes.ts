
import { Router } from "express";
import { createNote } from "../Controllers/create.note";

const createNoteRouter = Router();

createNoteRouter.post("/create", createNote);

export default createNoteRouter;