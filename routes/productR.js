const express = require('express')
const router = express.Router();
const mongoose = require('mongoose')
const Product = require('../models/productM');
const Category = require('../models/categoryM');
const upload = require('../helpers/multer')

router.get('/',async (req,res)=>{

    const products = await Product.find().populate('category').exec()

    if(!products){
        res.send(500).json({
            success:false
        })
    }
    res.status(200).json({
        success : true,
        product : products
    })
})

router.post('/', upload.single('image'),async (req,res)=>{
    try{

    const category = await Category.findById(req.body.category)
    if(!category) {
        return res.status(400).send('Invalid Category')
    }
    const file = req.file;
    if(!file) {
        return res.status(400).send('no image in the request')
    }

    let product = new Product({
        name: req.body.name,
        description: req.body.description,
        image: file.path,
        price: req.body.price,
        category: category,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured
        
    })
    product = await product.save()

    if(!product)
    return res.status(404).send('The product cannot be created')

   res.status(200).send(product);
}
catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
}

})

router.get('/:id', async (req , res) => {

    const products = await Product.findById(req.params.id).populate({ path: 'category', options: { strictPopulate: false } });

    if(!products){
        res.send(500).json({
            success:false
        })
    }
    res.send(products)
})

router.put('/:id',upload.single('image'), async (req, res) => {
    try {

        if(!mongoose.isValidObjectId(req.params.id)){
            res.status(400).send('Invalid Product Id')
        }

        const category = await Category.findById(req.body.category);
        if (!category) {
            return res.status(400).send('Invalid Category');
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                description: req.body.description,
                image: req.file.path,
                price: req.body.price,
                category: category,
                countInStock: req.body.countInStock,
                rating: req.body.rating,
                numReviews :req.body.numReviews,
                isFeatured: req.body.isFeatured
            },
            { new: true } 
        );

        if (!updatedProduct) {
            return res.status(404).send('The product cannot be updated');
        }

        res.status(200).send(updatedProduct);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.delete('/:id', (req, res) =>{
    Product.findByIdAndDelete(req.params.id).then(product =>{
        

        if(product){
            return res.status(200).json({success: true, message: 'the product is deleted successfully'})
        } else {
            return res.status(404).json({success: false , message: "product Invalide"})
        }
    }).catch(err=>{
        return res.status(500).json({success: false, error: err})
    })
})

// router.get('/filter', async (req, res) => {
//     try {
//         let filter = {};
//         if (req.query.categories) {
//             // Split the categories by comma and create a filter
//             filter = { category: { $in: req.query.categories.split(',') } };
//         }
//         // Find products based on the filter and populate the 'category' field
//         const productList = await Product.find(filter).populate('category');

//         if (!productList || productList.length === 0) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'No products found'
//             });
//         }
       
//         res.status(200).json({
//             success: true,
//             products: productList
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({
//             success: false,
//             message: 'Internal Server Error'
//         });
//     }
// });


module.exports = router