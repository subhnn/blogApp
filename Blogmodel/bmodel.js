const mongoose=require("mongoose")

const BlogSchema=mongoose.Schema

(
{
    Name:String,
    Age:String,
    Adress:String,
    phone:String,
    email:String,
    Password:String
}
)

module.exports=mongoose.model("BlogData",BlogSchema)