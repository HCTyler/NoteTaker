const util= require("util")
const fs= require("fs")
const uuid = require("uuid/v1");

const readAsynch= util.promisify(fs.readFile)
const writeAsynch= util.promisify(fs.writeFile)

class Save {
    read(){
        return readAsynch("db/db.json","utf8")
    }
    write(notes) {
        return writeAsynch("db/db.json",JSON.stringify(notes))
    }
    getNotes(){
        return this.read().then((notes)=>{
            
            let localNotes
            try {
                localNotes= [].concat(JSON.parse(notes))
            } catch (err) {
                localNotes= []
            }
            return localNotes
        })
    }
    createNote(note){
        const { title, text }=  note;
        console.log("it is making a note")
        console.log(note)

        if(!title || !text ) {
            throw new Error("Title and text cannot be blank")
        }
        const newNote= { title, text, id: uuid() }
        console.log(newNote)
        return this.getNotes()
            .then((note) => [... note, newNote])
            .then(console.log(note))
            .then((updateNotes)=> this.write(updateNotes))
            .then(console.log(updateNotes))
            .then(()=> newNote)
            .then(console.log(newNote))
    }
    deleteNote(id){
        return this.getNotes()
            .then((notes)=> notes.filter((note)=> note.id !==id))
            .then((noNotes)=> this.write(noNotes))

    }
}
module.exports= new Save()