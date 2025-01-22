const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    title: {
        type : String,
        require : true,
    },
    description: String,
    status : {
        type : String,
        enum : ['active', 'inactive']
    },
    date : {
        type : Date,
        default : Date.now
    },
});

todoSchema.methods = {
    findActive : () =>{
        return mongoose.model('Todo').find({status : 'active'})
    },
};

module.exports = todoSchema;