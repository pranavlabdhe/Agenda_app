const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    name:{
     type:String,
     required:[true,'must provide a name'],
     trim:true,
     maxLength:[20,'name cannot be more than 20 chars']
    },
    completed:{
    type:Boolean,
    default:false
    }
})

module.exports = mongoose.model('agendas',TaskSchema)