"use client";
import React, { useEffect, useState } from "react";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { notify } from "@/utilits/toasts/toast";
import { userStore } from "@/lib/persistedStore";

const API_URL = "http://localhost:10000/api/categories/";

const CategoryDisplay = () => {
    const { token } = userStore();
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState("");
    const [editId, setEditId] = useState(null);
    const [editValue, setEditValue] = useState("");

    // Fetch Categories
    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const res = await axios.get(API_URL+"categories/67e3dc19cfdf5e5d8a2b65e7", {
                headers: { Authorization: token },
            });
            setCategories(res.data);
        } catch (err) {
            console.error("Error fetching categories", err);
        }
    };

    // Add Category
    const handleAddCategory = async () => {
        if (!newCategory.trim()) return notify("Category name cannot be empty!");
        try {
            await axios.post(API_URL, { categoryName: newCategory,companyId:"67e3dc19cfdf5e5d8a2b65e7" }, { headers: { Authorization: token } });
            notify("Category added successfully!");
            setNewCategory("");
            fetchCategories();
        } catch (err) {
            console.error("Error adding category", err);
        }
    };

    // Edit Category
    const handleEditCategory = async (id: string) => {
        if (!editValue.trim()) return notify("Category name cannot be empty!");
        try {
            await axios.put(`${API_URL}/${id}`, { name: editValue }, { headers: { Authorization: token } });
            notify("Category updated successfully!");
            setEditId(null);
            fetchCategories();
        } catch (err) {
            console.error("Error updating category", err);
        }
    };

    // Delete Category
    const handleDeleteCategory = async (id: string) => {
        if (!window.confirm("Are you sure you want to delete this category?")) return;
        try {
            await axios.delete(`${API_URL}/${id}`, { headers: { Authorization: token } });
            notify("Category deleted successfully!");
            fetchCategories();
        } catch (err) {
            console.error("Error deleting category", err);
        }
    };

    return (
        <Box sx={{ padding: "2rem" }}>
            <Typography variant="h5" sx={{ marginBottom: "1rem" }}>Manage Categories</Typography>

            {/* Add New Category */}
            <Box sx={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
                <TextField
                    label="New Category"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                />
                <Button variant="contained" color="primary" onClick={handleAddCategory}>
                    Add
                </Button>
            </Box>

            {/* Display Categories */}
            {categories.length === 0 ? (
                <Typography>No categories available</Typography>
            ) : (
                categories.map((cat: any) => (
                    <Box key={cat._id} sx={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.5rem" }}>
                        {editId === cat._id ? (
                            <>
                                <TextField value={editValue} onChange={(e) => setEditValue(e.target.value)} />
                                <Button variant="contained" color="secondary" onClick={() => handleEditCategory(cat._id)}>
                                    Save
                                </Button>
                            </>
                        ) : (
                            <>
                                <Box sx={{ display: "flex", justifyContent: "space-between", marginTop:"1rem",alignItems: "center", width: "100%" }}>
                                    <Typography variant="h5" sx={{ flex: 1 , color:"black"}}>{cat.categoryName}</Typography>

                                    <Box sx={{ display: "flex", gap: "1rem" }}>
                                        <IconButton color="primary" onClick={() => { setEditId(cat._id); setEditValue(cat.categoryName); }}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton color="error" onClick={() => handleDeleteCategory(cat._id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Box>
                                </Box>

                            </>
                        )}
                    </Box>
                ))
            )}
        </Box>
    );
};

export default CategoryDisplay;
