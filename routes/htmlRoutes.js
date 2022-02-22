const path= require("path")
const router= require("express").Router()

router.get("/notes",(req,res) =>{
    res.sendFile(path.join(__dirname,"../public/notes.html"))
})

//no matching routes, direct it back to homepage
router.get("/",(req,res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"))
})

module.exports= router