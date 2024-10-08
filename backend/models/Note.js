const mongoose= require('mongoose');
const { Schema } = mongoose;

const NoteSchema = new Schema({
    user:{//ACT AS FOREIGN KEY 
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    tag:{
        type:String,
        default:"Genral"
    },
    date:{
        type:Date,
        default:Date.now
    },
});

module.exports=mongoose.model("Note",NoteSchema);