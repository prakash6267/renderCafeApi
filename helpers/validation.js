const { check } = require('express-validator')

exports.addValidator = [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail().normalizeEmail({gmail_remove_dots:true}),
    check('phone', 'phone number is required').optional()
   .custom((value, { req }) => {
        const phonePattern = /^[6-9]\d{9}$/;
        if (!phonePattern.test(value)) {
            throw new Error('Invalid phone number format');
        }
        return true;
    }).isLength({ min: 10, max: 10 }).withMessage('Mobile No. should contain 10 digits'),
    
    check('password', 'Password must be greater than 6 charecters, and contains at least one Uppercase letter, one lowercase letter, and one special character').isStrongPassword({
        minLength:6,
        minUppercase:1,
        minLowercase:1,
        minNumbers:1,
        minSymbols:1
    }),
    check('image', 'image is required').custom((value, {req}) => {
        if(req.file.mimetype === 'image/jpeg' || req.file.mimetype === 'image/png' || req.file.mimetype === 'image/jpg'){
            return true
        }
        else{
            return false }

    }).withMessage("Please upload an image Jpeg, png or jpg")
]
