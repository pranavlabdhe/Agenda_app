const express = require('express')  
const router = express.Router();
const {getAllTasks, createTask, UpdateTask, deleteTask, getTask} = require('../controller/task_controller')
const server  = 'http://localhost:9000/api/v1/tasks'
//defining the routes and calling methods on them GET,POST,DELETE,PATCH
//getAllTasks && //createTasks 
router.route('/').get(getAllTasks).post(createTask)

//get/update/delete single task using :id param
router.route('/:id').get(getTask).patch(UpdateTask).delete(deleteTask)
// router.route('/:id').patch(UpdateTask)
// router.route('/:id').delete(deleteTask)
module.exports = router;