const util= require("util")
const fs= require("fs")
const uuidv1= require("uuid")
const uuid= uuidv1.v4()

const readAsynch= util.promisify(fs.readFile)
const writeAsynch= util.promisify(fs.writeFile)

class Save {
    read(){
        return readAsynch("db/db.json","utf8")
    }
    write(note) {
        return writeAsynch("db/db.json",JSON.stringify(note))
    }
    readNotes(){
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
        const { title, text }=  note
        if(!title || !text ) {
            throw new Error("Title and text cannot be blank")
        }
        const newNote= { 
            title,
            text,
            id:uuid()
        }
        return this.readNotes()
            .then((notes) => [...notes,newNote])
            .then((updateNotes)=> this.write(updateNotes))
            .then(()=> newNote)
    }
    deleteNote(id){
        return this.readNotes()
            .then((notes)=> notes.filter((note)=> note.id !==id))
            .then((noNotes)=> this.write(noNotes))

    }
}
module.exports= new Save()
// module.exports = uuid