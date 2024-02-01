const express=require("express");
const { NotesModel } = require("../models/notesModel");
const notesRouter=express.Router();

notesRouter.post("/add",async(req,res)=>{
    try {
        const {title,description,userId,userName}=req.body;
        const checkIsNotesExists=await NotesModel.findOne({title,description});
        if(checkIsNotesExists){
            res.status(200).send({msg:"please make unique notes this note you have already"})
        }else{
            const notesData=new NotesModel({title,description,userId,userName});
            await notesData.save();
            res.status(200).send({msg:"notes created successfully"})
        }
    } catch (error) {
        res.status(400).send({msg:"error while adding notes!",error:error.message})
    }
});
notesRouter.get("/", async(req,res)=>{
    try {
        const loginUser=req.body.userId;
        const allNotes=await NotesModel.find({userId:loginUser});
        res.status(200).send({msg:"all notes",allNotes});
    } catch (error) {
        res.status(400).send({msg:"error while fetching notes",error:error.message})
    }
});
notesRouter.delete("/delete/:notesId",async(req,res)=>{
    try {
        const {notesId}=req.params;
        const checkNotes=await NotesModel.findById({_id:notesId});
        if(checkNotes.userId===req.body.userId){
            await NotesModel.findByIdAndDelete({_id:notesId});
            return res.status(200).send({msg:"note deleted successfully",note:checkNotes})
        }else{
            return res.status(404).send({msg:"invalid user!"});
        }
    } catch (error) {
        console.log(error)
        return res.status(400).send({msg:"error while deleting!", error:error.message}) 
    }
});
notesRouter.patch("/update/:notesId",async(req,res)=>{
    try {
        const {notesId}=req.params;
        console.log(notesId)
        const checkNotes=await NotesModel.findById({_id:notesId});
        if(checkNotes.userId!==req.body.userId){
             return res.status(404).send({msg:"invalid user!"})
        }
        await NotesModel.findByIdAndUpdate({_id:notesId},req.body);
        return res.status(200).send({msg:"note updated successfully"})
    } catch (error) {
        console.log(error)
      return res.status(400).send({msg:"error while updating!", error:error.message}) 
    }
});
module.exports={notesRouter}