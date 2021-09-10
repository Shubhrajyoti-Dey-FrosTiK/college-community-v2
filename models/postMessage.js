import mongoose from 'mongoose'

const postSchema=mongoose.Schema({
    title: {
        type:String,
        unique:true,
        index: true
    },
    message: String
})

// module.exports=mongoose.model("postMessage",postSchema);
export default mongoose.model("postMessage",postSchema);