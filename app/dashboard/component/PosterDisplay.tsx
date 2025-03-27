import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import {
  Box,
  Button,
  IconButton,
  Typography,
  CircularProgress,
  Card,
  CardMedia,
  CardActions,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";

const API_URL = "http://localhost:10000/api/posters"; // Replace with actual API
const COMPANY_ID = "67e3dc19cfdf5e5d8a2b65e7"; // Replace with actual company ID

const FileInput = styled("input")({
  display: "none",
});

const PosterDisplay = () => {
  const [posters, setPosters] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPosters = async () => {
      try {
        const response = await axios.get(`${API_URL}/${COMPANY_ID}`);
        if (response.data.poster && Array.isArray(response.data.poster.imageUrl)) {
          setPosters(response.data.poster.imageUrl);
        } else {
          setPosters([]);
        }
      } catch (error) {
        console.error("Error fetching posters:", error);
        setPosters([]);
      }
    };
    fetchPosters();
  }, []);

  const formik = useFormik({
    initialValues: {
      Image1: null as File | null,
      Image2: null as File | null,
      Image3: null as File | null,
    },
    onSubmit: async (values, { resetForm }) => {
      if (!values.Image1 && !values.Image2 && !values.Image3) {
        alert("Please select at least one image before uploading.");
        return;
      }

      setLoading(true);
      try {
        const formData = new FormData();
        formData.append("companyId", COMPANY_ID);
        if (values.Image1) formData.append("image1", values.Image1);
        if (values.Image2) formData.append("image2", values.Image2);
        if (values.Image3) formData.append("image3", values.Image3);

        const response = await axios.post(API_URL, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        alert("Posters uploaded successfully!");
        setPosters((prev) => [...prev, ...response.data.poster.imageUrl]); // Append new images
        resetForm();
      } catch (error) {
        console.error("Error uploading posters:", error);
        alert("Failed to upload posters.");
      }
      setLoading(false);
    },
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Only image files are allowed.");
      return;
    }
    formik.setFieldValue(field, file);
  };

  const handleDelete = async (imagePath: string) => {
    try {
      await axios.delete(`${API_URL}/delete`, {
        data: { companyId: COMPANY_ID, image: imagePath },
      });
      setPosters((prev) => prev.filter((img) => img !== imagePath));
    } catch (error) {
      console.error("Error deleting poster:", error);
      alert("Failed to delete poster.");
    }
  };

  return (
    <Box sx={{ padding: 3, maxWidth: 600, margin: "auto", textAlign: "center" }}>
      <Typography variant="h5" sx={{ color: "black", mb: 2 }}>
        Manage Posters
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        {["Image1", "Image2", "Image3"].map((field, index) => (
          <Box sx={{ mb: 2 }} key={index}>
            <label htmlFor={`upload-${field}`}>
              <FileInput id={`upload-${field}`} type="file" accept="image/*" onChange={(e) => handleImageUpload(e, field)} />
              <Button variant="contained" component="span" startIcon={<CloudUploadIcon />}>
                {formik.values[field as keyof typeof formik.values] ? "Change Image" : `Select Image ${index + 1}`}
              </Button>
            </label>
          </Box>
        ))}
        <Box sx={{display:"flex",gap:"2rem"}}>

       
        {posters.length > 0 &&
          posters.map((imageUrl, index) => (
            <Card key={index} sx={{ position: "relative", mt: 2, maxWidth: 400, margin: "auto" }}>
              <CardMedia component="img" image={`http://localhost:10000${imageUrl}`} alt="poster" sx={{ height: 140, borderRadius: 2,marginTop:"1rem" }} />
              <CardActions sx={{ position: "absolute", top: 5, right: 5 }}>
                <IconButton sx={{ background: "rgba(255,255,255,0.8)" }} onClick={() => handleDelete(imageUrl)}>
                  <DeleteIcon color="error" />
                </IconButton>
              </CardActions>
            </Card>
          ))}
         </Box>
        <Button sx={{ mt: 3 }} type="submit" disabled={loading || (!formik.values.Image1 && !formik.values.Image2 && !formik.values.Image3)}>
          {loading ? <CircularProgress size={24} /> : "Upload Posters"}
        </Button>
      </form>
    </Box>
  );
};

export default PosterDisplay;
