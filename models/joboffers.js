
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobOfferSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    businessSectors: {
        type: String,
        required: true
    },
    introduction: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    responsibilities: {
        type: String,
        required: true
    },
    profile: {
        type: String,
        required: true
    },
    workingConditions: {
        type: String,
        required: true
    },
    study: {
        type: String,
        required: false
    },
    keyword1: {
        type: String,
        required: false
    },
    keyword2: {
        type: String,
        required: false
    },
    keyword3: {
        type: String,
        required: false
    }
})

const Offers = mongoose.model('Offers', jobOfferSchema);
module.exports = Offers;