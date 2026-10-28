const express = require('express');
const cors = require('cors');
const scanRoutes = require('./routes/scanRoutes');
const historyRoutes = require('./routes/historyRoutes');
const errorHandler = require('./middleware/errorHandler');
const userRoutes = require('./routes/userRoutes')


const app = express();
app.use(express.json());
app.use(cors())

app.get("/",(req, res)=>{
    res.send("Welcome to JobShield API!");
})

app.get("/api/health",(req,res)=>{
    res.status(200).json({
        success:true,

        message:"JobShield backend is running"
    })
})

app.use("/api/scan",scanRoutes);
app.use("/api/scan", historyRoutes);
app.use("/api/user", userRoutes);
app.use(errorHandler);


module.exports = app;