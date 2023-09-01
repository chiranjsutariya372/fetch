const {Router}= require('express');
const product = require('../model/product');

const routes = Router();

routes.get('/product',(req,res)=>{
    res.render('product')
})

routes.get('/find',async(req,res)=>{
    res.send(await product.find())
});

routes.post('/add',async(req,res)=>{
    await product.create(req.body)
    res.json({success:true})
});

routes.delete('/delet/:id',async(req,res)=>{
    let delet=await product.findByIdAndDelete(req.params.id); 
    res.json({success:true,delet})
});

module.exports  = routes;
