const express=require("express")
router=express.Router()

const BlogModel=require("../Blogmodel/bmodel")

router.post("/add", async(req,res)=>{

    let data=req.body
    let libr=new BlogModel(data)
    let result=await libr.save()

    res.json({status:"success"})

})

router.post("/search",async(req,res)=>
{

    let input=req.body
    let data=await BlogModel.find(input)
    res.json(data)
})

router.get("/viewall",async(req,res)=>{


    let data= await BlogModel.find()
    res.json(data)
})

module.exports=router

