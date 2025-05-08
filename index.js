// WIP = Work In Progress!



const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 8100;

//WIP = Work In Progress!
const MONGODB_URI = "mongodb+srv://ogtosin:<password>@cluster0.zhodrnk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; 

mongoose.connect(MONGODB_URI)
.then(()=> {
    console.log("MongoDB connected successfully..."); 
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`); 
    }); 
    
})
.catch((error) => {
    console.error("Error connecting to MongoDB:", error);
});

const result = "Welcome to Week 7 Assignment Server";

app.get("/", (req, res) => {
    res.status(200).json({message: result}); 
}); 

//WIP = Work In Progress!