const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/userM');
const { addValidator } = require('../helpers/validation');
const upload = require('../helpers/multer')
const { validationResult } = require('express-validator');

router.post('/register',upload.single('image'),addValidator, async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            success: false,
            msg:'Errors',
            errors:errors.array().map(error => error.msg)
        })
    }
    const isExists = await User.findOne({email: req.body.email})
        if(isExists){
            return res.status(400).json({
                success : false,
                msg: 'Email Already Exists!'
            })
        }

    let user = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
        image: req.file.path
    })

    user = await user.save();
    if(!user){
        return res.status(404).send('User cannot be created')
    }
    res.status(200).json({success : true,
    user:user })
})

router.get('/', async (req, res) =>{

    const user = await User.find().select('-password')
    if(!user){
       res.send(500).json({  success : false })
    }
    res.status(200).json({
        success : true,
        user : user
    })
})

router.get ('/:id', async (req, res) => {
    const user = await User.findById(req.params.id).select('-password');

    if (!user) {
        res.status(500).json({ success: false, message: 'The user with the given ID not exists' })
    }
    res.status(200).send(user)
    
})

router.delete('/:id', (req, res) => {
    User.findOneAndDelete(req.params.id).then(user => {
        if (user) {
            return res.status(200).json({ success: true, message: 'User deleted successfully' })
        } else {
            return res.status(404).json({ success: false, message: 'User cannot find' })
        }
    }).catch(err => {
        return res.status(400).json({
             success: false,
              error: err })
    })
})


module.exports = router;