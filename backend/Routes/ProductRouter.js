const ensureAuthenticated = require("../Middlewares/Auth");
const router = require("express").Router();


router.get("/",ensureAuthenticated, async(req,res)=>{
    res.status(200).json([
        {
            name:"Samsung J2",
            price:10000
        },
        {
            name:"Iphone 15 Plus",
            price:"Rs 80,000"
        },
        {
            name:"Samsung S23",
            price:"Rs 65,000"
        },
        {
            name:"Samsung S24 Ultra",
            price:"Rs 1,24,000"
        },

    ])
});


module.exports = router;
