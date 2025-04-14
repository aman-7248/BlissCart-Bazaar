import mongoose from 'mongoose'
const categorySchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    slug:{            // for better seo, we make url redable and cleaner with it
        type:String,
        lowercase:true,
    },   
});
                            //collection name //schema name
export default mongoose.model("Category",categorySchema);