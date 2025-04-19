import express from 'express'
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import { createProductController, getProductController,getSingleProductController,productPhotoController,
deleteProductController,       
updateProductController,
productFiltersController,
productCountController,
productListController,
searchProductController,
relatedProductController,
productCategoryController
} from '../controllers/productController.js';
import formidable from "express-formidable";


const router=express.Router()

router.post('/create-product',requireSignIn,isAdmin,formidable(),createProductController);

router.put('/update-product/:pid',requireSignIn,isAdmin,formidable(),updateProductController);


// get products
router.get('/get-product',getProductController);

//single product 
router.get('/get-product/:slug',getSingleProductController);

// get Photo
router.get('/product-photo/:pid',productPhotoController);

//delete prodoct
router.delete('/delete-product/:pid',requireSignIn,isAdmin,deleteProductController);

//filter product
router.post('/product-filters',productFiltersController);

//get count of products
router.get('/product-count',productCountController);


//product per page
router.get('/product-list/:page',productListController);


//search product
router.get('/search/:keyword',searchProductController);

// similar product
router.get('/related-product/:pid/:cid',relatedProductController)

// category wise Product
router.get('/product-category/:slug',productCategoryController)

export default router;