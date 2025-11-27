import Direc from '../models/direc.js';
import User from '../models/user.js';
import Prod from '../models/prod.js';
import Basket from '../models/basket.js';

export const selectTop50= async (query) =>{
    return  await Prod.find(query) // מוצרים עם thisWeek: true ו-prodId גדול מה-lastId
          .sort({ prodId: 1 }) // מיין לפי prodId בסדר עולה
          .limit(3); // הגבל ל-50 מוצרים
}

//check if director
export const ifDirec = async (secret) => {
    const myEmail = secret;
    const direc = Direc.findOne({myEmail});
    //console.log(direc.direcName);
    if (direc) return true;
    return false;
}

//check if user
export const isUser = async (secret) => {
    const myEmail = secret;
    const user = User.findOne({myEmail});
    //console.log(user.direcName);
    if (user) return true;
    return false;
}

export const createAndSaveProd= async (prodData) =>{
    const product = await new Prod(prodData);
    await product.save();
}



export const findProdByProdId = async (prodId) =>{
    return await Prod.findOne({ prodId });
}

export const findProdByName = async (prodName) =>{
    return await Prod.findOne({ prodName });
}


export const saveProd = async (product) =>{
    await product.save();
}



export const deleteProdByProdName = async (prodName) =>{
    const prod =  await Prod.findOneAndDelete({ prodName });
    if (prod){
        console.log(prod);
        return prod;
    }
    else{
        console.log('null');
        
        return null;
    }
}
