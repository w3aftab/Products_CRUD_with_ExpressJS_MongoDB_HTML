import Product from "../models/Product.js";

export const getProducts = async (req, res) => {
  const { sort, name, price } = req.query;
  const queryObj = {
    ...(name && { name: { $regex: name, $options: "i" } }),
    ...(price && { price: { $lte: price } }),
  };
  const sortString = sort?.replaceAll(",", " ") || "-createdAt";
  try {
    const products = await Product.find(queryObj).sort(sortString);
    res.status(200).send(products);
  } catch (error) {
    console.log("Products not found!", error);
  }
};

export const addProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    console.log("Product added");
    res
      .status(201)
      .json({ message: "Product added successfully!", savedProduct });
  } catch (error) {
    console.log(error);
  }
};

export const getSingleProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    console.log(`Id ${id} not found!`);
    res.status(500).json({ message: `Id ${id} not found!` });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const savedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        returnDocument: "after",
      }
    );
    console.log("Product Updated");
    res
      .status(200)
      .json({ message: "Product updated successfully!", savedProduct });
  } catch (error) {
    console.log(error);
  }
};

export const deleteProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const product = await Product.findByIdAndDelete(id);
    res.status(200).json({ message: "Product deleted", product });
  } catch (error) {
    console.log(`Id ${id} not found!`);
    res.status(404).json({ message: `Id ${id} not found!` });
  }
};

/*

*/
