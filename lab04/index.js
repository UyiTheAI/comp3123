/*
Purpose:
Express framework with Node.js
- Try GET, POST, PUT, DELETE methods
- Use routers instead of pure paths - like an API in your own
software's backend
- Compare and contrast GET query vs params
*/

const express = require('express');
const app = express();

const SERVER_PORT = process.env.PORT || 3000;

// =========== Middleware setup for each of our needs on the web server ==================
// Serving static files
// Public folder is not usually accessible by default
// Notice there is no real folder in our filesystem called static
// But this will be a path we can access in the URL
app.use("/static", express.static('public'));

// Serving Static JSON
app.use(express.json());

// Serving traditional HTML body
// if we add the object parameter with property extended: true
// we can use the library qs instead of library querystring
app.use(express.urlencoded({ extended: true }));

// ==============================================================================
// http://localhost:3000
app.get("/", (req, res) => {
    res.send("<h1>Welcome to the root path of the server</h1>")
})

// http://localhost:3000/hello
app.get("/hello", (req, res) => {
    res.status(200).send("<h1>Welcome to the path of /hello</h1>")
})


app.get("/college", (req, res) => {
    const college = {
        method: "GET",
        name: "Geoge Brown College",
        location: "Toronto",
        established: 1967
    }
    res.json(college)   // We treat our backend as an API
})

app.get("/students/:name/:age/:city", (res, req) =>{
    console.log(res.params)
    if(req.params.name || !req.params.age || !req.params.city){
        return res.status(400).json({error: "Missing path parameters"})
    }
    const name = req.params.name
    const age = req.params.age
    const city = req.params.city

    response.json({
        student_name: name,
        student_age: age,
        student_city: city
    })
})

app.post("/college", (req, res) => {
    const college = {
        method: "POST",
        name: "George Brown College",
        location: "Toronto",
        established: 1967
    }
    res.json(college)
})

app.put("/college", (req, res) => {
    const college = {
        method: "PUT",
        name: "George Brown College",
        location: "Toronto",
        established: 1967
    }
    res.json(college)
})

app.delete("/college", (req, res) => {
    const college = {
        method: "DELETE",
        name: "George Brown College",
        location: "Toronto",
        established: 1967
    }
    res.json(college)
})

app.listen(SERVER_PORT, () => {
    console.log("Server is running on http://localhost:" + SERVER_PORT)
})