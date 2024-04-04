const mongoose = require('mongoose')
 
const recommendSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: ''
    },
    price: {
        type: Number,
        default: '0'
    },
    size: {
        type: String,
        
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    rating: {
        type: String,
        default: 0
    },
    numReviews: {
        type: Number,
        default: 0,
    },
    dateCreated: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Product', recommendSchema);