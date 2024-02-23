import mssql from "mssql";
import { Request, Response } from "express";
import { sqlConfig } from "../Config/config";
import { v4 } from "uuid";
import bcrypt from "bcrypt"
import validator from "validator"

interface User{
    User_id: string;
    First_Name:string;
    Last_Name: string;
    Email: string;
    Cohort_Number: string;
    Password: string;
}

      function verifyEmail(Email: string) {
        if (validator.isEmail(Email)) {
          // Check if the email matches the template
          const parts = Email.split("@");
          if (parts.length === 2 && parts[1] === "thejitu.com") {
            const namePart = parts[0];
            const nameParts = namePart.split(".");
            if (
              nameParts.length === 2 &&
              nameParts[0].length > 0 &&
              nameParts[1].length > 0
            ) {
              return true;
            }
          }
        }
      }

export const registerUser = async (req:Request, res:Response) =>{
    
    try {
        const user: User = req.body;
        if(verifyEmail(user.Email)){
          const hash_pwd = await bcrypt.hash(user.Password, 5);
          const User_id = v4();
          console.log("User_id", User_id);

          const pool = await mssql.connect(sqlConfig);

          const tableExists =
            await pool.query`SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = N'users'`;
          //   console.log("Hello", tableExists.recordset.length);

          if (tableExists.recordset.length === 0) {
            // Create users table if it doesn't exist
            await pool.query`CREATE TABLE users (User_id VARCHAR(40) PRIMARY KEY, First_Name VARCHAR(255),Last_Name VARCHAR(255), Email VARCHAR(255), Cohort_Number VARCHAR(255), Password VARCHAR(255))`;
          } else {
            const existingUser = await pool.query`SELECT * FROM users
      WHERE email = ${user.Email} `;

            if (existingUser.recordset.length > 0) {
              return res.status(201).json({
                success: false,
                message: "User with the provided email already exists",
              });
            } else {
              // Insert user data into the users table
              await pool.query`INSERT INTO users (User_id, First_Name, Last_Name, Email, Cohort_Number, Password)
         VALUES (${User_id},${user.First_Name}, ${user.Last_Name}, ${user.Email}, ${user.Cohort_Number},${hash_pwd})`;

              // Send a success response
              res
                .status(201)
                .json({
                  success: true,
                  message: "User registered successfully",
                });
            }
          }
        }else {
            return res.status(200).json({
                error: "Invalid email format"
            })
        }
    } catch (error) {
      console.error(error);
      // Send a failure response
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
}

export const getUser = async(req:Request, res:Response) =>{
    const User_id= req.params.User_id;


    try {
      const pool = await mssql.connect(sqlConfig);
      const result = (
        await pool
          .request()
          .input("User_id", mssql.VarChar(40), User_id)
          .query(`SELECT * FROM users WHERE User_id= '${User_id}'`)
      ).recordset;
      console.log(result);

      const user = result[0];
      if (User_id) {
        res.status(200).json({ user });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
      res.status(500).json({ error: "Internal server error" });
    }
}

export const deleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
    try {
      const User_id = req.params.User_id;
      
      const pool = await mssql.connect(sqlConfig);
      const result = (
          await pool
          .request()
          .input("User_id", mssql.VarChar, User_id)
          // Execute the DELETE query
          .query(`DELETE FROM users WHERE User_id = '${User_id}'`)
          ).rowsAffected;
          console.log(result);

    // Send success response
    res.status(201).json({ success: true, message: "Deleted Successfully" });
  } catch (error) {
    // Send error response
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


export const getAllUsers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const pool = await mssql.connect(sqlConfig);
    const result = await pool.request().query("SELECT * FROM users");
    const users = result.recordset;
    res.status(200).json({ users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
    try {
        const user: User = req.body;
        if(verifyEmail(user.Email)){
      const User_id = req.params.id;
    const pool = await mssql.connect(sqlConfig);
    const updatedUser = req.body;
    await pool.query`UPDATE users SET First_Name = ${updatedUser.First_Name}, Last_Name = ${updatedUser.Last_Name}, Email= ${updatedUser.Email},
    Cohort_Number = ${updatedUser.Cohort_Number} WHERE User_id = ${User_id}`;
    res.status(200).json({ success: true, data: updatedUser });

        } else{
            res.status(201).json ({
                error:"Invalid email format"
            })
        }
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};