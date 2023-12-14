const mongoose = require('mongoose')    
const feed = mongoose.Schema({
    username : {type : String, default : ""},
    shop : {type : String, default : "",require : true},
    email : {type : String, unique : true, require : true},
    active : {type : Boolean, default : true},
    tag_id : {type : Number},
})
module.exports =  mongoose.model( 'user' , feed)
