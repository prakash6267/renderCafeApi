const mongoose = require('mongoose')

const bannerSchema = mongoose.Schema({
    banner: {
        type : String,
        require : true
    },
    offer:{
       type : String
    },
    offerDate:{
        type : String
     }
})

module.exports = mongoose.model('Banner',bannerSchema)