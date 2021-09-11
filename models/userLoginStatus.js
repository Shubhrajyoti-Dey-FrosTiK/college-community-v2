import mongoose from 'mongoose'

const userLoginStatusSchema=mongoose.Schema({
    email : {
        type : String,
        require : true
    },
    keepLoggedIn : String,
    token : String,
    loginStatus : String
})

// module.exports=mongoose.model("postMessage",postSchema);
export default mongoose.model("userLoginStatus",userLoginStatusSchema);