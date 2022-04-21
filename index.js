require('./db/connect')
const express = require('express');
const app = express();
const server = 'localhost';
const port=9000
const connectDB = require('./db/connect')
require('dotenv').config();
const tasks = require('./routes/task')
const createTask = require('./routes/task')
const getTask = require('./routes/task')
const UpdateTask = require('./routes/task')
const deleteTask = require('./routes/task')

// app.get('/',function(req,res){
//     res.send('Hello world')
// }) 
// middleware
app.use(express.static('./public'))
app.use(express.json())

// routes

app.use('/api/v1/tasks',tasks)
app.use('/api/v1/tasks/createTask',createTask)
// app.use('/api/v1/tasks/:id',getTask)
// app.use('/api/v1/tasks/:id',UpdateTask)
// app.use('/api/v1/tasks/:id',deleteTask)

// If database connected start server 

const start = async ()=>{
    try {
        
        await connectDB(process.env.MONGO_URI) 
        // ********to Access MONGO_URI in .env file**************
        // 1st npm install dotenv  .
        // 2nd then require('dotenv').config().
        // 3rd using process.env.MONGO_URI you can access MONGO_URI declared in .env file.
        console.log('DB Connected');
        app.listen(port,server)
        console.log(`Server Started on url ${server}:${port}`);

    } catch (error) {
        console.log(error);
    }
}
start()
