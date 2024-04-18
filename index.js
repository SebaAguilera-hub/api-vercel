const express = require("express")
const { readData, writeData } = require("./functions")
const app = express()
require("dotenv").config()
const bodyParser = require("body-parser")
const port = process.env.PORT || 3001

app.use(bodyParser.json())

//Configurar rutas

app.delete("/dishes/:id", (req,res)=>{
   const data = readData()
   const id = parseInt(req.params.id)
   const dishIndex = data.dishes.findIndex(dish => dish.id === id)
   data.dishes.splice(dishIndex, 1)
   writeData(data)
   res.json({message: "item eliminado"})  
})

app.put("/dishes/:id", (req,res)=>{
    const data = readData()
    const body = req.body
    const id = parseInt(req.params.id) // transforma el id que se captura como string desde los parametros y lo transforma a int
    const dishIndex =  data.dishes.findIndex(dish => dish.id === id)
    data.dishes[dishIndex] = {  //re asignarle un objeto nuevo para actualizarlo
      id, 
      ...body
    }
    writeData(data)
    res.json({message: "Dish was updated" })
})


app.get("/dishes", (req, res)=>{
    const data = readData()
    res.json(data.dishes)
})

app.post("/dishes", (req, res)=>{
    const data = readData() //leer el archivo
    const dish = req.body; //capturar el cuerpo de la peticion
    const newDish = {
        id: data.dishes.length + 1,
        ...dish 
    }
    data.dishes.push(newDish)
    writeData(data)
    res.json(newDish)
})


app.put("/movies/:id", (req, res)=>{
    const data = readData()
    const movie = req.body
    const id = parseInt(req.params.id)
    const movieIndex = data.movies.findIndex(movie => movie.id === id)
    data.movies[movieIndex] = {
        id,
        ...movie
    }
    writeData(data)
    res.json({message: "pelicula actualizada..."})
})

app.get("/movies", (req, res)=>{
    const data = readData()
    res.json(data.movies)

})

app.post("/movies", (req,res)=>{
    const data = readData(); //obtenemos la data de la bd
    const movie = req.body; // obtenemos el cuero de la consulta
    const newMovie = { 
        id: data.movies.length + 1,
        ...movie
    }
    data.movies.push(newMovie)
    writeData(data)
    res.json(newMovie)


})

app.get("/", (req,res) => {
    res.send("welcome to my api with nodejs")
})

//escucha las peticiones del cliente
app.listen(port, ()=>{
    console.log(`El servidor esta corriendo en el puerto ${port}`)
})


//nodemon no se ejecuta inmediatamente de ser instalado, hay que configurar un script en package.json como "start": nodemon index.js