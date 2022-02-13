const router= require ("express").Router()
const store = require("../db/save")
// const save= require("../db/store")

router.get("/notes",(req,res)=>{
    store
    .readNotes()
    .then((notes)=> {
        return res.json(notes)
    })
    .catch((err)=> res.status(500).json(err))
})

router.post("/notes",(req,res)=> {
    store
    .createNote(req.body)
    .then((note)=> res.json(note))
    .catch((err)=> res.status(500).json(err))
})

router.delete("/notes/:id", (req,res)=> {
    store
    .deleteNote(req.params.id)
    .then(()=> res.json({ ok:true }))
    .catch((err)=> res.status(500).json(err))
})

module.exports= router