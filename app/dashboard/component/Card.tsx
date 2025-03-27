"use client";
import {
  Box,
  Typography,
  useTheme,
  Card,
  CardContent,
} from "@mui/material";
import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/navigation";

const mainCard = {
  minWidth: "220px",
  height: "250px",
  borderRadius: "20px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  boxShadow: "0px 3px 6px 3px #BCBCBC40",
  marginTop: "1.5rem",
  marginRight: "2rem",
  padding: "1rem",
  position: "relative",
};

const imageBox = (image: any) => ({
    backgroundImage: `url(http://localhost:10000${image})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderRadius: "50%",
    overflow: "hidden",
    width: "90px",
    height: "100px",
    marginTop: "1.2rem",
    marginBottom: "1rem",
    backgroundColor:'#add8e6'
  });

const ImageCard = ({ data, onDelete,onEdit }: any) => {
  const theme = useTheme();
  const router = useRouter();

  const handleDelete = () => {
    onDelete(data._id);
  };

  const handleEdit = () => {
    onEdit(data);
  };
  console.log(data)
  return (
    <Card key={data._id} sx={mainCard}>
      <EditIcon
        sx={{
          position: "absolute",
          top: "12px",
          right: "18px",
          color: "gray",
          fontSize: "20px",
          "&:hover": { cursor: "pointer", color: "lightgray" },
        }}
        onClick={handleEdit}
      />
      <DeleteIcon
        sx={{
          position: "absolute",
          top: "42px",
          right: "18px",
          color: "gray",
          fontSize: "20px",
          "&:hover": { cursor: "pointer", color: "lightgray" },
        }}
        onClick={handleDelete}
      />

      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Box sx={imageBox(data.image)} /> {/* Placeholder image box */}

        <CardContent sx={{ textAlign: "center" }}>
          <Typography
            variant="h6"
            sx={{ fontSize: "16px", fontWeight: "bold" }}
          >
            {data.productName}
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontSize: "14px", color: theme.palette.text.secondary }}
          >
            Price: ${data.price}
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontSize: "14px", color: "green" }}
          >
            Discount: {data.Discount}%
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
};

export default ImageCard;
