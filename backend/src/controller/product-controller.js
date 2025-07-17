import {
  fetchAllProducts,
  fetchProductsByCategory,
  fetchProductById,
  fetchFeaturedProducts,
 
} from "../services/product-services.js";
import { trycatch } from "../utilities/AsycErrorHandling.js";

// Fetch all products
export const getproducts = trycatch(async (req, res) => {
  const allProducts = await fetchAllProducts();
  res.status(200).json({
    status: "success",
    message: "Products fetched successfully",
    data: allProducts,
  });
});

export const category = trycatch(async (req, res) => {
  const { category } = req.query;

  const productsByCategory = await fetchProductsByCategory(category);
  res
    .status(200)
    .json({
      status: "success",
      message: "Products fetched successfully", 
      data: productsByCategory,
    });
}); 

export const getproductsbyId = trycatch(async (req, res) => {
  const { id } = req.params;
  const product = await fetchProductById(id);
  res.status(200).json({
    status: "success",
    message: "Product fetched successfully",
    data: product,
  });
});

//FEATURED PRODUCTS
export const featuredproducts = trycatch(async (req, res) => {
  const featuredProducts = await fetchFeaturedProducts();
  res.status(200).json({
    status: "success",
    message: "Featured products fetched successfully",
    data: featuredProducts,
  });
});


