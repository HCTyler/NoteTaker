//bringing things in
const express= require("express")
const apiRoutes= require("./routes/apiRoutes")
const htmlRoutes= require("./routes/htmlRoutes")

const app= express ()
const PORT= process.env.PORT || 3001

app.use(express.urlencoded({ extended:true }))
app.use(express.json())

app.use(express.static("public"))
app.use("/",htmlRoutes)
app.use("/api",apiRoutes)

app.listen(PORT, () =>{
    console.log(`App listening at http://localhost:${PORT}`)
})
