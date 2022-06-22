// Later this has to be changed to store username data, this is currently for testing purposes only

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//This is how the structure of the data is going to look like
const blogSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    favorites: {
        type: [String],
        required: false
    },
    dominant: {
        type: Number,
        required: false
    },
    interactive: {
        type: Number,
        required: false
    },
    stable: {
        type: Number,
        required: false
    },
    conscientious: {
        type: Number,
        required: false
    }
}, { timestamps: true });

//Blog is user

const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;

