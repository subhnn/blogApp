const express=require("express")
router=express.Router()

const BlogModel=require("../Blogmodel/bmodel")
const bcrypt=require("bcryptjs")

passwordGenerator=async(pass)=>{
const salt=await bcrypt.genSalt(10)
return bcrypt.hash(pass,salt)
}



router.post("/add", async(req,res)=>{

    let {data}={"data":req.body}
    let password=data.Password
    passwordGenerator(password).then(
        (hashedpassword)=>{
        console.log(hashedpassword)
        data.password=hashedpassword
        console.log(data)
        let blg=new BlogModel(data)
        let result= blg.save()
        res.json({status:"success"})


    })

   


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

