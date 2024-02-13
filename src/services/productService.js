const ProductModel = require("../models/productModel");

exports.CreateProductService = async (req) => {
  let reqBody = req.body;
  let myBody = {
    UserEmail: req.headers.email,
    ...reqBody
  }
  try {
    const result = await ProductModel.create(myBody);
    return { status: "success", data: result };
  } catch (error) {
    return { status: "fail" };
  }
};

exports.ReadAllProductService = async (req) => {
    try {
        
    } catch (error) {
        
    }
}

exports.ReadSingleProductService = async (req) => {
    try {
        
    } catch (error) {
        
    }
}

exports.UpdateProductService = async (req) => {
    try {
        
    } catch (error) {
        
    }
}

exports.DeleteProductService = async (req) => {
    try {
        
    } catch (error) {
        
    }
}

exports.DeleteAllProductService = async (req) => {
    try {
        
    } catch (error) {
        
    }
}
