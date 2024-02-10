import { Request, Response } from "express";
import { newNote } from "../interface/note.interface";
import timestamp from "time-stamp";
import { v4 } from "uuid";


let notes: newNote[] = [];

export const createNote = async (req: Request, res: Response) => {
  const { Title, Content }: newNote = req.body;

  try {
    const newNote: newNote = {
      Note_id: v4(), 
      Title: Title,
      Content: Content,
      createdAt: timestamp(), 
    };

    notes.push(newNote);

    res.status(201).json({
      message: "Note created successfully",
      note: newNote,
    });
  } catch (error) {
    res.status(500).json({
      errorMsg: "Internal Server error",
      error
    });
  }
};
