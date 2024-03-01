import path from "path";
import dotenv from "dotenv";
import mssql from "mssql";

dotenv.config();

interface sqlConfig {
  connect(sqlConfig: sqlConfig): unknown;
  server: string;
  user: string;
  password: string;
  database: string;
  port: number;
  options: {
    encrypt: boolean;
    trustServerCertificate: boolean;
  };
  
}

export const sqlConfig: sqlConfig = {
  server: process.env.MSSQLDB_HOST as string,
  user: process.env.MSSQLDB_USER as string,
  password: process.env.MSSQLDB_PASSWORD as string,
  database: process.env.MSSQLDB_DATABASE as string,
  port: 1433,
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
  connect: async () => {
    try {
      const pool = await mssql.connect(sqlConfig);
      return pool;
    } catch (error) {
      console.error("Error connecting to SQL Server:", error);
      throw error;
    }
  },
};

export const jwtSecret: string = process.env.JWT_SECRET as string;

console.log(sqlConfig);
