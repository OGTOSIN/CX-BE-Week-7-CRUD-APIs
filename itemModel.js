const mongoose = require("mongoose"); 

const itemSchema = new mongoose.Schema({
    itemName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    locationFound: {
        type: String,
        required: true
    },
    dateFound: {
        type: Date,
        required: true
    },
    claimed: {
        type: Boolean,
        default: false
    },
}, { timestamps: true });

const Item = mongoose.model("Item", itemSchema); //this is the model that is used to create the 
// collection in the mongodb database. It is used to create the collection and it takes in the name of 
// the collection and the schema that is used to create the collection.

module.exports = Item; //this is the export statement that is used to export the model 
// so that it can be used in other files. It is used to export the model so that it can be used in other files.
