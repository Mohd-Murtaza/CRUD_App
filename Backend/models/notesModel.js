const mongoose=require("mongoose");
const notesSchema=mongoose.Schema({
    title:{type:String,required:true},
    description:{type:String,required:true},
    userId:{type:String,required:true},
    userName:{type:String,required:true}
},{versionKey:false});
const NotesModel=mongoose.model("note",notesSchema);
module.exports={NotesModel}