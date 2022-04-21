const Agendas = require('../models/task_models')
const getAllTasks = async(req,res)=>{
   try {
       const get_all_tasks = await Agendas.find({}) 
       res.status(200);
       res.json({get_all_tasks})
   } catch (error) {
       res.status(500).json({msg:error})
   }
}
const createTask = async (req,res)=>{
    try {
        const agendas = await Agendas.create(req.body)
        res.status(201)
        res.json({agendas});
    } catch (error) {
        res.status(500).json({msg:error})
    }
}
const getTask =async(req,res)=>{
    try {
        const { id:taskID } = req.params;
        const get_single_task = await Agendas.findOne({_id:taskID});
        if(!get_single_task){
            return res.status(404).json({msg:`No task with id:${taskID}`})
        }
        res.status(200);
        res.json({get_single_task}); 
    } catch (error) {
        res.status(500).json({msg:error})
    }
}
const deleteTask = async (req,res)=>{
   try {
      const {id:taskID} = req.params;
      const delete_task = await Agendas.findOneAndDelete({_id:taskID});
      if(!delete_task){
        res.status(404).json({msg:`No such task with id ${taskID}`});
      }else{
          res.status(200).json({delete_task})
      }
   } catch (error) {
        res.status(500).json({msg:error})
   }
}
const UpdateTask =async (req,res)=>{
    try {
        const {id:taskID} = req.params;
        const update_task = await Agendas.findOneAndUpdate({_id:taskID},req.body,
            {new:true,
            runValidators:true} )
        if(!update_task){
            return res.status(404).json({msg:`No such agenda with id ${taskID}`})
        }
        res.status(200).json({update_task})
    } catch (error) {
        res.status(500).json({msg:error})
    }
}
module.exports={
    getAllTasks,
    createTask,
    getTask,
    UpdateTask,
    deleteTask
}