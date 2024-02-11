import { Request, Response } from "express";
import mssql from "mssql";
import sqlConfig from "../Config/sql.config";

// Get all notes
export const getNotes = async (req: Request, res: Response) => {
  try {
    const pool = await mssql.connect(sqlConfig);

    const result = (await pool.request().query("SELECT * FROM Users"))
      .recordset;

    res.status(200).json({
      message: "All users",
      result,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

// Get a single note by ID
export const getNoteById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const pool = await mssql.connect(sqlConfig);

    let result = (
      await pool.request().input("id", mssql.VarChar, id).execute("getById")
    ).recordset;

    res.status(200).json({
      message: "One user",
      result
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};
