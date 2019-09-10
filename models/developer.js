let mongoose = require('mongoose');

let developerSchema = mongoose.Schema({
    name: {
        firstName:{
            type: String,
            required: true
        },

        lastName: String
    },

    level:{
        type: String,
        validate:{
            validator: function(value){
                if(value === "BEGINNER" || value === "EXPERT"){
                    return true;
                }
                else{
                    return false;
                }
            },
            message: 'Should be Beginner or Expert.'
        },

        set: function(newLevel){
            return newLevel.toUpperCase();
        },

        required:true
    },

    address:{
        state: String,
        suburb: String,
        street: String,
        unit: String
    }

});

let developerModel = mongoose.model('Developer',developerSchema);
module.exports = developerModel;
