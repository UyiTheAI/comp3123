/*
Purpose: Create a multiple server paths to access

/
/users
/userlist
/name

*/

let http = require('http') //Hypertext Transfer Protocol
let fs = require('fs') //File System
let users = require("./data.js") //Importing data.js file
const { stringify } = require('querystring')

const PORT = 8088

// Create the server and the multiple paths below
let server = http.createServer((req, res) => {
    if (req.url === "/") {
        res.write("<h1>NodeJS Web Server at the root</h1>")
        res.write("<p>Welcome to the root path at th server</p>")
        res.end()
    }
    if (req.url === "/users") {
        // Convert from JSON object to JSON string
        let data = JSON.stringify(users.users) // Must use the file as a namespace obj
        res.write(data)
        res.end()
    }
    if (req.url === "/name") {
        res.writeHead(200, { "Content-Type": "text/html" })
        res.write("<article>Omoruyi Oredia</article>")
        res.end()
    }
    if (req.url === "/userlist") {
        fs.readFile(__dirname + "/employees.json", "utf-8", (err, data) => {
            res.write(data)
            res.end()
        })
    }
})
server.listen(PORT)
console.log(`Server started at port number: ${PORT}`)