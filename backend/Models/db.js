const mongoose=require("mongoose")



mongoose.connect(process.env.MONGODB_URL)
.then(()=>{
    console.log("Database is connected")
})
.catch((err)=>{
    console.log('Error in connecting with database ',err)
})