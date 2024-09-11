const express = require("express");
require("dotenv").config();
const app = express();
// It is used in fetching data from the body
const bodyParser=require("body-parser")
require("./Models/db")
const authRoute=require("./Routes/AuthRoutes")
const productRoute=require("./Routes/ProductRouter")
// It is used in connecting with the frontend 
// It makes our server opens to everyone to accept requests
const cors=require("cors")
const PORT = process.env.PORT || 8080;

app.get("/",async(req,res)=>{
    res.send("<h1>Welcome to Server</h1>")
})
app.use(bodyParser.json())
app.use(cors())
app.use("/auth",authRoute)
app.use("/products",productRoute)

app.listen(PORT, async (req, res) => {
  console.log(`Server is running on ${PORT}`)
});

