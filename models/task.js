let mongoose = require('mongoose');

let taskSchema = mongoose.Schema({
    name: String,
    assignTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Development'
    },
    dueDate: Date,
    taskStatus: {
        type: String,
        validate:{
            validator: function(value){
                if(value === 'InProgress' || value === 'Complete'){
                    return true;
                }
                else{
                    return false;
                }
            },
            message: 'Should be InProgress or Complete.'
        }

    },
    taskDescription: String
});

let taskModel = mongoose.model('Task',taskSchema);
module.exports = taskModel;