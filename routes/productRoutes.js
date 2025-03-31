import express from 'express'
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import { createProductController, getProductController,getSingleProductController,productPhotoController,
deleteProductController       
} from '../controllers/productController.js';
import formidable from 'express-formidable';


const router=express.Router()

router.post('/create-product',requireSignIn,isAdmin,formidable(),createProductController);


// get products
router.get('/get-product',getProductController);

//single product
router.get('/get-product/:slug',getSingleProductController);

// get Photo
router.get('/product-photo/:pid',productPhotoController);

//delete prodoct
router.delete('/delete-product/:pid',requireSignIn,isAdmin,deleteProductController);

export default router;