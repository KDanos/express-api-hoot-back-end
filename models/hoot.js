import mongoose from "mongoose";

//Embedded Comment Schema
const commentSchema = new mongoose.Schema({
    text: {type: String, required: true}, 
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
}, {
    time:true
})

//Parent Hoot Schema
const hootSchema = new mongoose.Schema({
    title: {type: String, required: ['Title is a required field', true]},
    text: {type: String, required:true},
    category:{type: String, required: true, enum:['News', 'Sports', 'Games', 'Movies', 'Music', 'Television']}, 
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    comments: [commentSchema]
}, {
    timestamps: true
})

const Hoot = mongoose.model ('Hoot', hootSchema)
// console.log ('ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️')
// console.log (commentSchema)
// console.log ('ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️')
// console.log(hootSchema)
// console.log ('ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️')
// console.log(Hoot)
// console.log ('ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️ℹ️')

export default Hoot
