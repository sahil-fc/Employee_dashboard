import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions, MenuItem, Select } from "@mui/material";
import ImageCard from "./Card";
import axios from "axios";
import { userStore } from "@/lib/persistedStore";
import AddIcon from "@mui/icons-material/Add";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const ProductDisplay = () => {
    interface Product {
        _id: string;
        productName: string;
        price: number;
        discount:number;
        categoryName: string;
        images: string[]; // Array of image URLs
      }
  const { token } = userStore();
  const [groupedProducts, setGroupedProducts] = useState<{ [key: string]: any[] }>({});
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
const [editProduct, setEditProduct] = useState<Product | null>(null);


  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [token]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:10000/api/products/company/67e3dc19cfdf5e5d8a2b65e7",
        { headers: { Authorization: token } }
      );
  
      const grouped = response.data.reduce((acc:any, product:any) => {
        const categoryName = product.categoryId?.categoryName || "Uncategorized";
  
        if (!acc[categoryName]) acc[categoryName] = [];
        acc[categoryName].push({
          ...product,
          image: product.images.length > 0 ? product.images[0].imageUrls : null, // Pick only the first image
        });
  
        return acc;
      }, {});
  
      setGroupedProducts(grouped);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:10000/api/categories/categories/67e3dc19cfdf5e5d8a2b65e7", {
        headers: { Authorization: token },
      });
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Product name is required"),
    price: Yup.number().positive("Price must be positive").required("Price is required"),
    discount: Yup.number().positive("Price must be positive").required("Price is required").min(0).max(100),
    category: Yup.string().required("Category is required"),
    images: Yup.array().of(Yup.mixed()).min(3, "Upload 3 images"),
  });

  const handleAddOrEditProduct = async (values:any, { resetForm }:any) => {
    try {
      const formData = new FormData();
      formData.append("productName", values.name);
      formData.append("price", values.price);
      formData.append("categoryId", values.category);
      formData.append("Discount", values.discount);

      values.images.filter((image: any) => image).forEach((image: any, index: number) => {
        formData.append(`image${index + 1}`, image);
      });
      
      if (editProduct) {
        await axios.put(`http://localhost:10000/api/products/${editProduct._id}`, formData, {
          headers: { Authorization: token, "Content-Type": "multipart/form-data" },
        });
      } else {
        await axios.post("http://localhost:10000/api/products", formData, {
          headers: { Authorization: token, "Content-Type": "multipart/form-data" },
        });
      }

      resetForm();
      setOpen(false);
      setEditProduct(null);
      fetchProducts();
    } catch (error) {
      console.error("Error adding or updating product:", error);
    }
  };

  const handleEdit = (product:any) => {
    setEditProduct(product);
    setOpen(true);
  };

  const handleDelete = async (productId:any) => {
    try {
      await axios.delete(`http://localhost:10000/api/products/${productId}`, {
        headers: { Authorization: token },
      });
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <Box sx={{ margin: "2rem", width: "80vw", height: "75vh", overflowY: "auto", display: "flex", flexDirection: "column" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem",height:"80%" }}>
        <Typography variant="h5" sx={{ fontWeight: "bold", color: "black" }}>Manage Products</Typography>
        <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={() => setOpen(true)}>Add Product</Button>
      </Box>

      {Object.keys(groupedProducts).length > 0 ? (
        Object.entries(groupedProducts).map(([category, products]) => (
          <Box key={category} sx={{ marginBottom: "2rem" }}>
            <Typography variant="h6" sx={{ marginBottom: "1rem", fontWeight: "bold", color: "black" }}>{category}</Typography>
            <Box sx={{ display: "flex", overflowX: "auto", gap: "1rem", whiteSpace: "nowrap", scrollbarWidth: "none", "&::-webkit-scrollbar": { display: "none" } }}>
  {products.map((product) => (
    <ImageCard key={product._id} data={product} onDelete={handleDelete} onEdit={handleEdit} />
  ))}
</Box>

          </Box>
        ))
      ) : (
        <Box sx={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center", color: "black" }}>No Products Available</Box>
      )}

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{editProduct ? "Edit Product" : "Add Product"}</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={{
              name: editProduct?.productName || "",
              price: editProduct?.price || "",
              discount:editProduct?.discount || "",
              images: [],
              categoryId:""
            }}
            validationSchema={validationSchema}
            onSubmit={handleAddOrEditProduct}
          >
            {({ setFieldValue, errors, touched }) => (
              <Form>
                <Field as={TextField} label="Product Name" name="name" fullWidth margin="normal" error={touched.name && !!errors.name} helperText={touched.name && errors.name} />
                <Field as={TextField} label="Price" name="price" type="number" fullWidth margin="normal" error={touched.price && !!errors.price} helperText={touched.price && errors.price} />
                <Field as={TextField} label="Discount" name="discount" type="number" fullWidth margin="normal" error={touched.discount && !!errors.discount} helperText={touched.discount && errors.discount} />
                <Field as={Select} name="category" fullWidth margin="normal">
                  {categories.map((cat:any) => (
                    <MenuItem key={cat._id} value={cat._id}>
                      {cat.categoryName}
                    </MenuItem>
                  ))}
                </Field>

                {[...Array(3)].map((_, index) => (
                  <input
                    key={index}
                    type="file"
                    accept="image/*"
                    onChange={(event) => {
                      const files = event.currentTarget.files;
                      if (files && files[0]) {
                        setFieldValue(`images[${index}]`, files[0]);
                      }
                    }}
                    style={{ marginTop: "0.5rem", display: "block" }}
                  />
                ))}

                <DialogActions>
                  <Button onClick={() => setOpen(false)} color="secondary">Cancel</Button>
                  <Button type="submit" variant="contained" color="primary">{editProduct ? "Update" : "Add"}</Button>
                </DialogActions>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ProductDisplay;
