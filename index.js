const express = require("express")
const { create } = require("express-handlebars");
const { getUsers, postUser, deleteUser } = require("./db")
const app = express();
const port = process.env.PORT || 5000


//configuracion parciales (handlebars)
const hbs = create({
    partialsDir: ["views/components"],
    extname: ".hbs"
})

//motor de plantilla (express)
app.engine('.hbs', hbs.engine)
app.set('view engine', '.hbs')
app.set('views', './views')

//middleware de carpeta public
app.use(express.static(__dirname + '/public'))

//middleware bootstrap
app.use(express.static("node_modules/bootstrap/dist"))

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const helpers = {
    formateoDeFecha: (f) => new Date(f).toISOString().split("T")[0]
}

//vistas
app.get("/", async (req, res) => {
    const todos = await getUsers()
    res.render('home', {todos, helpers})
})

app.get("/user-create", (req, res) => {
    res.render('create')
})

app.get("/user-delete/:id", (req, res) => {
    const {id} = req.params    
    res.render('delete', {id})
})


//api
app.get("/users", async (req, res) => {
    const todos = await getUsers()
    res.json(todos)
})

app.post("/users", async (req, res) => {
    const { username, email, contrasena } = req.body;
    const todos = await postUser (username, email, contrasena)
    if (todos) res.redirect('/')
})

app.delete("/users/:id", async (req, res) => {
    const {id} = req.params
    const todos = await deleteUser(id)
    if(todos) res.redirect('/')
})


app.listen(port, () => {
    console.log(`Server ON, in port ${port}`)
})