const express=require("express"); 
const connectDB=require("./configs/connection");
const app=express();
const dotenv=require("dotenv");
const { sanitizeInput } = require("./middlewares/sanitizeInput");
dotenv.config();

const port=process.env.PORT||3000;
app.get("/", (req,res)=>{
    res.send("Hello World");
});
// midlleware will work on all url
app.use(sanitizeInput);

app.listen(port,()=>{
    connectDB();
    console.log(`Server is running on port ${port}`);
});