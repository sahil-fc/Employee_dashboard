"use client";
import {
  Box,
  Typography,
  useTheme,
} from "@mui/material";

import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import image1 from "../../utilits/img/image1.png";
const mainCard = {
    minWidth: "220px",
    minHeight: "250px",
    borderRadius: "50px ",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0px 6px 6px 0px #BCBCBC40",
    marginTop: "1.5rem",
    marginRight: "2rem",
    "& .css-4gjyzt-MuiCardContent-root": {
      padding: 0,
    },
  };
  const imageBox = {
    backgroundImage: `url(${image1.src})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderRadius: "50%",
    overflow: "hidden",
    width: "105px",
    height: "105px",
    marginTop: "1.2rem",
  };
  const isPrime = (num: number) => {
    for (var i = 2; i < num; i++) {
      if (num % i == 0) {
        return false;
      }
    }
    return true;
  };
  
const ImageCard = (props:any) => {
    const data=props.data
    const type = props.type
    const isTrue = props.isTrue
    const theme=useTheme()
  return (
    <Card key={data.id} sx={mainCard}>
                  <Box sx={imageBox} />

                  <CardContent
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                    style={{padding:0}}
                  >
                    <Typography
                      gutterBottom
                      component="div"
                      sx={{
                        textAlign: "center",
                        fontSize: "17px",
                        fontWeight: "600",
                        lineHeight: "19.04px",
                        letterSpacing: "0.02em",
                      }}
                    >
                      {data.username}
                    </Typography>
                    <Box
                      sx={{
                        width: "105px",
                        height: "25px",
                        borderRadius: "16px",
                        backgroundColor: "#CEFFFF",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: "1rem",
                      }}
                    >
                      <Typography
                        sx={{
                          textAlign: "center",
                          fontSize: "10px",
                          fontWeight: 500,
                          lineHeight: "11.2px",
                          letterSpacing: "0.02em",
                          color: `${theme.palette.primary.main}`,
                        }}
                      >
                        Album1
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        width: "220px",
                        height:"61px",
                        borderBottomRadius: "50px ",
                        backgroundColor: isTrue
                          ?theme.palette.primary.main:"",
                      }}
                    >
                      <Typography
                        variant="h5"
                        color="text.primary"
                        sx={{
                          textAlign: "center",
                          fontSize: "13px",
                          fontWeight: 450,
                          lineHeight: "14.56px",
                          letterSpacing: "0.02em",
                          color: isTrue
                              ?"#ffffff":"#8697B4",
                          marginTop:"1rem"
                        }}
                      >
                        {isTrue?type:data.email}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
  )
}

export default ImageCard
