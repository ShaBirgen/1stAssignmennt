import express, { json } from "express";
import cors from "cors";
import router from "./Routes/auth.routes";

// import sql from "mssql";
// import config from "./config/config";
// import authRoutes from "./routes/authRoutes";


const app = express();
app.use(json());
app.use(cors());
app.use("/api/auth", router)
// sql
//   .connect(config.mssqlDBConfig)
//   .then(() => console.log("SQL Server connected"))
//   .catch((err: Error) => console.log(err));

const PORT: number = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
