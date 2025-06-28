const express=require("express"); 
const connectDB=require("./configs/connection");
const dotenv=require("dotenv");
const { sanitizeInput } = require("./middlewares/sanitizeInput");
const limiter=require("./middlewares/rateLimiter");
const urlRoutes=require("./routes/urlRoutes");

const app=express();
dotenv.config();

const port=process.env.PORT||3000;

// connection to monogDB
connectDB();

//middleware
app.use(express.json());
app.use(sanitizeInput);
app.use(limiter);

//Routes
app.use('/sid', urlRoutes);


app.get("/", (req,res)=>{
    res.send("Url shortner");
});

// error handler(404)
app.use((req,res,next)=>{
    res.status(404).json({
        error:{
            message: "Route not found"
        }
    });
});

// error handling middleware
app.use((err,req,res,next)=>{
    console.error(err.stack);
    res.status(err.status || 500).json({
        error:{
            message: err.message || "Internal server Error"
        }
    });
});

app.listen(port,()=>{
    
    console.log(`Server is running on port ${port}`);
});