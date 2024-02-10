import Express, { NextFunction, Request, Response, json } from "express";
import createNoteRouter from "./routes/note.routes";

const app = Express()

app.use(json)

// Import the routes
app.use("/note",createNoteRouter)

app.use((err: Error, req: Request, res: Response, next: NextFunction)=>{
    return res.json({
        err
    })
})

app.listen(3000, ()=>{
    console.log("server is listening on port 3000");
    
})