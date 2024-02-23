import express, { json } from "express"
import auth from "./Routes/auth.routes";

const app = express()
app.use(json())
app.use("/auth", auth)


const PORT = 3000;
app.listen(PORT, ()=> 
    console.log(`Server runing on port ${PORT}`)
    
);