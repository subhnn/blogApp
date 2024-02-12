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
        data.Password=hashedpassword
        let blg=new BlogModel(data)
        let result= blg.save()
        res.json({status:"success"})


    })

    // const hashedpassword=await passwordGenerator(password)
    // data.password=hashedpassword
    // let blg=new BlogModel(data)
    // let result= blg.save()
    // res.json({status:"success"})


   


})



router.post("/signin", async (req, res) => {
    let email=req.body.email
    let data = await BlogModel.findOne({"email":email})
    if (!data) {
        return res.json({
            status:"invalid user"
        })
    }
    let dbPassword=data.Password
    let inputPassword=req.body.Password
    console.log(dbPassword)
    console.log(inputPassword)
    const match = await bcrypt.compare(inputPassword,dbPassword)
    if (!match) {
        return res.json({
            status:"invalid password"
        })
    }

    res.json({
        status:"success"
    })
})

module.exports = router
