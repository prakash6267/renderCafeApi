const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    image :{
        type: String,
        require : true
    },
    isSwitchOn: {
        type: Boolean,
        default: false
      }
})

module.exports = mongoose.model('Category',categorySchema)