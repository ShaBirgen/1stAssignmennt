import mssql from "mssql";
import { Request, Response } from "express";
import { sqlConfig } from "../Config/sqlConfig";
import { v4 } from "uuid";
import bcrypt from "bcrypt";

interface UserData {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
}

export const registerUser = async (req: Request, res: Response) => {
  // Get user data from request body
  const userData: UserData = req.body;
  const hash_pwd = await bcrypt.hash(userData.password, 5);
  // console.log(hash_pwd);

  try {
    const id = v4();
    console.log("id", id);

    // Connect to SQL Server
    const pool = await mssql.connect(sqlConfig);

    // Check if the users table exists, if not, create it
    const tableExists =
      await pool.query`SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = N'users'`;
    if (tableExists.recordset.length === 0) {
      // Create users table if it doesn't exist
      await pool.query`CREATE TABLE users (id VARCHAR(40) PRIMARY KEY, fullName VARCHAR(255), email VARCHAR(255), phoneNumber VARCHAR(255), password VARCHAR(255))`;
    } else {
      const existingUser = await pool.query`SELECT * FROM users 
      WHERE email = ${userData.email} OR phoneNumber = ${userData.phoneNumber} `;

      if (existingUser.recordset.length > 0) {
        return res.status(201).json({
          success: false,
          message:
            "User with the provided email or phone number already exists",
        });
      } else {
        // Insert user data into the users table
        await pool.query`INSERT INTO users (id, fullName, email, phoneNumber, password) VALUES (${id},${userData.fullName}, ${userData.email}, ${userData.phoneNumber}, ${hash_pwd})`;

        // Send a success response
        res
          .status(201)
          .json({ success: true, message: "User registered successfully" });
      }
    }
  } catch (error) {
    console.error(error);
    // Send a failure response
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const loginUser = async (req: any, res: any) => {
  try {
    const { email, password } = req.body;
    const pool = await mssql.connect(sqlConfig);

    if (pool.connected) {
      let user = (
        await pool
          .request()
          .input("email", mssql.VarChar, email)
          .query(`SELECT * FROM users WHERE email = '${email}'`)
      ).recordset;

      if (user.length > 0) {
        const isPwd = await bcrypt.compare(password, user[0].password);
        if (isPwd) {
          if (user[0].isAdmin) {
            res.status(200).json({
              admin: "Admin Login successful",
            });
          } else {
            res.status(200).json({
              user: "Login successful",
            });
          }
        } else {
          res.status(201).json({
            error: "Incorrect password",
          });
        }
      } else {
        res.status(201).json({
          error: "User not found",
        });
      }
    } else {
      res.status(500).json({
        error: "Could not create pool connection",
      });
    }

  } catch (error) {
    console.error(error);
    // Send a failure response in case of any error
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


function uuidv4() {
  throw new Error("Function not implemented.");
}
