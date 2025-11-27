// controllers/ProdController.js
import Prod from '../models/prod.js';
import {
  selectTop50,
  ifDirec,
  isUser,
  createAndSaveProd,
  findProdByProdId,
  findProdByName,
  saveProd,
  deleteProdByProdName
} from '../services/prodService.js';

import {getStatus} from '../services/thisService.js';

export const getProds = async (req, res) => {
  console.log('arrived to controller');
  try {
      const open = getStatus();
      if (!open)
          return res.status(505).send('closed');

      const permit = isUser(req.user);
      console.log('permit', permit);
      if(!permit){
          return res.status(508).send('you are not allowed to do it!');
      }

      const { lastId } = req.query;
      console.log('lastId', lastId);
      const query = {
          thisWeek: true,
          ...(lastId && { prodId: { $gt: lastId } })
      };

      // קבלת 50 מוצרים שמסודרים לפי ה-id
      const products =await selectTop50(query);
      if (!products){
          return res.status(501).send('products not found');
      }
      res.status(200).json(products);
  } catch (err) {
      console.error('Error getting Prods:', err);
      res.status(500).send('Error getting Prods');
  }
};


//add product to data base
export const addProdToDB = async (req, res) => {
  try {
    const permit = await ifDirec(req.user);
    console.log('permit', permit);
    if (!permit) {
      return res.status(508).send('You are not allowed to do it!');
    }

  
    const { prodId, prodName, price, available, thisWeek } = req.body;
    const image = req.file; // קובץ התמונה

    if (!image) {
      return res.status(400).send('No image file uploaded');
    }

    const product = {
      prodId,
      prodName,
      price,
      available,
      thisWeek,
      url: image.path // נתיב התמונה
    };

    await createAndSaveProd(product);
    res.status(201).send('Product added successfully');
  } catch (error) {
    res.status(405).send(`Error adding product: ${error.message}`);
  }
};

/*export const addProdToDB = async (req, res) => {
  try {
    
    const permit = await ifDirec(req.user);
      console.log('permit', permit);
      if(!permit){
          return res.status(508).send('you are not allowed to do it!');
      }

    const { prodId, prodName, price, available, thisWeek,url } = req.body;

    const product ={
      prodId,
      prodName,
      price,
      available,
      thisWeek,
      url
    };

    await createAndSaveProd(product);
    res.status(201).send('Product added successfully');
  } catch (error) {
    res.status(405).send('Error adding product: ' + error.message);
  }
};*/

//update product
export const updateProd = async (req, res) => {
    try {
      
        console.log('try');
      const permit = await ifDirec(req.user);
      console.log('permit', permit);
      if(!permit){
          return res.status(508).send('you are not allowed to do it!');
      }

      const { name, prodName, price, available,thisWeek } = req.body;
  
      // Find the product by prodId 
      const product = await findProdByName(name);
      if (!product) {
        return res.status(404).send('Product not found');
      }
  
      // Update the product details
      //if (prodId !== undefined) product.prodId = prodId;
      if (prodName !== undefined) product.prodName = prodName;
      if (price !== undefined) product.price = price;
      if (available !== undefined) product.available = available;
      if (thisWeek !== undefined) product.thisWeek = thisWeek;
  
      await saveProd(product);
      res.status(200).send('Product updated successfully');
    } catch (error) {
      res.status(400).send('Error updating product: ' + error.message);
    }
  };

  //delete product
  export const deleteProd = async (req, res) => {
    try {
      const permit = await ifDirec(req.user);
      console.log('permit', permit);
      if(!permit){
          return res.status(508).send('you are not allowed to do it!');
      }
      const { prodName } = req.body;
      
      // Find and delete the product by prodName
      const product = deleteProdByProdName(prodName);
      console.log('product', product);
      if (!product) {
        return res.status(404).send('Product not found');
      }
      console.log(product);
      res.status(200).send('Product deleted successfully');
    } catch (error) {
      res.status(400).send('Error deleting product: ' + error.message);
    }
  };