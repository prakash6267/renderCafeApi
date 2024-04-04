const mongoose = require('mongoose')

const cafeSchema = mongoose.Schema({
    
    banner: [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Banner',
        required: true
    }],
    category: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    }],
    recommend: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    }]

})

module.exports = mongoose.model('Cafe',cafeSchema);