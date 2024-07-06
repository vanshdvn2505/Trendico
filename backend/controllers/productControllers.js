import Product from '../models/product.models.js'
import {response_400, response_200} from '../utils/responseCode.utils.js'

export const panels = async (req, res) => {
    try {
        const prod1 = await Product.find({category: "groceries"});
        const prod2 = await Product.find({category: /laptops/i });
        response_200(res,"Success", {prod1, prod2})
    }
    catch(error){
        console.log(error);
        return response_400(res, error)    
    }    
}