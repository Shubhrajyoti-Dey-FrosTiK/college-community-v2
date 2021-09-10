import mongoose from 'mongoose'

const userSchema=mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true,
        index: true
    },
    password: String
})

// module.exports=mongoose.model("postMessage",postSchema);
export default mongoose.model("userModel",userSchema);