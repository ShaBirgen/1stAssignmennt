// user.ts
import sql from "mssql";
import { sqlConfig } from "../Config/sqlConfig";

interface User {
  username: string;
  userId: string;
  email: string;
  password: string;
}

const User = {
  async getUserById(userId: number): Promise<any> {
    try {
      const pool = await sql.connect(sqlConfig);
      const result = await pool
        .request()
        .input("userId", sql.Int, userId)
        .query("SELECT * FROM Users WHERE Id = @userId");
      return result.recordset[0];
    } catch (err) {
      console.error("Error fetching user:", err);
      throw err;
    }
  },

  async createUser(user: User): Promise<any> {
    try {
      const pool = await sql.connect(sqlConfig);
      const result = await pool
        .request()
        .input("username", sql.NVarChar, user.username)
        .input("email", sql.NVarChar, user.email)
        .input("password", sql.NVarChar, user.password)
        .input("userId", sql.NVarChar, user.userId)
        .query(
          "INSERT INTO Users (Username, Email, Password) VALUES (@username, @email, @password)"
        );
      return result;
    } catch (err) {
      console.error("Error creating user:", err);
      throw err;
    }
  },

  // Add other user-related methods as needed
};

export default User;
