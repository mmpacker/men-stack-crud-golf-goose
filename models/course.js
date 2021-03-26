const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    reviewer: {type: String, required: true},
    avatar: String,
    rating: {type: Number, min: 1, max: 10},
    content: String
}, {
    timestamps: true
});

const courseSchema = new Schema({
    name: {type: String, required: true},
    imageUrl: {type: String},
    city: {type: String, required: true},
    state: {type: String, required: true},
    usRank: Number,
    public: Boolean,
    yearBuilt: Number,
    architects: {type: String},
    summary: {type: String},
    playedBy: [{type: Schema.Types.ObjectId, ref: 'User'}],
    reviews: [reviewSchema]
}, {
    timestamps: true
});


module.exports = mongoose.model('Course', courseSchema)