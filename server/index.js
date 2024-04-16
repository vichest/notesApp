import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import cors from "cors";
const port = 3000;
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
const db = new pg.Client({
    user:"postgres",
    host: "localhost",
    database: "notes",
    password: "123456",
    port: 5432,
})
db.connect();
app.get("/api/notes",async(req,res)=>{
    try{
        const result = await db.query("SELECT * FROM notes");
       console.log(result.rows[0]);
       res.json(result.rows);
    }catch(e){
        console.log("error fetching notes");
    }
})
app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
});
