const ProductModel = require("../models/product/product.model");

exports.CreateProductService = async (req) => {
  let reqBody = req.body;
  let myBody = {
    UserEmail: req.headers.email,
    ...reqBody,
  };
  try {
    const result = await ProductModel.create(myBody);
    return { status: "success", data: result };
  } catch (error) {
    return { status: "fail" };
  }
};

exports.ReadAllProductService = async (req) => {
  let Email = req.headers.email;
  let Query = { UserEmail: Email };
  try {
    let result = await ProductModel.find(Query);
    return { status: "success", data: result };
  } catch (error) {
    return { status: "fail" };
  }
};

exports.ReadSingleProductService = async (req) => {
    let ID = req.params.id;
    let Query = { _id: ID };
  try {
    let result = await ProductModel.findOne(Query);
    return { status: "success", data: result };
  } catch (error) {
    return { status: "fail" };
  }
};

exports.UpdateProductService = async (req) => {
    let ID = req.params.id;
    let reqBody = req.body;
    let Query = { _id: ID };
  try {
    let result = await ProductModel.updateOne(Query, reqBody);
    return { status: "success", data: result };
  } catch (error) {
    return { status: "fail" };
  }
};

exports.DeleteProductService = async (req) => {
    let ID = req.params.id;
    let Query = { _id: ID };
  try {
    let result = await ProductModel.deleteOne(Query);
    return { status: "success", data: result };
  } catch (error) {
    return { status: "fail" };
  }
};

exports.DeleteAllProductService = async (req) => {
    let Email = req.headers.email;
    let Query = { UserEmail: Email };
  try {
    let result = await ProductModel.deleteMany(Query);
    return { status: "success", data: result };
  } catch (error) {
    return { status: "fail" };
  }
};
