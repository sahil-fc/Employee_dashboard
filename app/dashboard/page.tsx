"use client";
// @ts-ignore
import {
  Box,
  Button,
  MenuItem,
  Pagination,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { Grid } from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import React, { useEffect, useLayoutEffect, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Search } from "@mui/icons-material";
import axios from "axios";
import ImageCard from "../components/Card";
import { notify } from "@/utilits/toasts/toast";
import { userStore } from "@/lib/persistedStore";
import { useRouter } from "next/navigation";
import ProductDisplay from "./component/ProductDisplay";
import CategoryDisplay from "./component/CategoryDisplay";
import PosterDisplay from "./component/PosterDisplay";


const pageLimit = 7;
const page = () => {
  const theme = useTheme();
  const [activeItem, setActiveItem] = useState("Photos");
  const [currentPage, setCurrentPage] = useState(0);
  const [pagesCount, setPagesCount] = useState(0);
  const [dataCount, setDataCount] = useState(0);
  const [dropdown, setdropdown] = useState(false)
  const [username, setUserName] = useState("")
  const [deleteVal, setDeleteVal] = useState(false);
  const [change, setChange] = useState(false);
  const [product,setProduct] = useState(false);
  const [category,setCategory] = useState(false)
  const [poster, setPoster] = useState(false);

  const router = useRouter();
  const {token,isLogin,setIsLogin,setToken,name} = userStore();
  async function handleLogout() {
    notify("logout Successfully")
    setToken("")
    setIsLogin(false)
  }
  console.log(product);
  console.log(poster)
  console.log(category)
  // ******** Delete ********


  async function handleDelete(id: any) {
    console.log(id)
    await axios.delete(`http://localhost:3002/player-reports/${id}`, {
      headers: {
        Authorization: token
      }
    });
    setChange(!change);
  }


  // ******** Edit ********

  // const { values, errors, touched, setFieldValue } = useFormikContext();

  return (
    <>
      <Grid
        container
        sx={{
          backgroundColor: '#2A3439',
          width: "100vw",
          height: "100vh",
        }}
      >
        {/* **************** Side Bar Start **************** */}
        <Grid item lg={2.5}>
          <Box
            sx={{
              marginTop: "4.7rem",
              marginLeft: "2rem",
              width: "18rem",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                width: "16rem",
                height: "2rem",
                borderTop: "1px solid #65BEBE",
              }}
            ></Box>
            <Box
              sx={leftInner("Photos", activeItem, theme)}
              onClick={() => {setActiveItem("Photos");setCategory(false); setProduct(true); setPoster(false);}}
              className={activeItem === "Photos" ? "pseudo" : ""}
            >
              Product
            </Box>
            <Box
              sx={leftInner("Team", activeItem, theme)}
              onClick={() => {setActiveItem("Team") ;setCategory(true); setProduct(false); setPoster(false);}}
              className={activeItem === "Team" ? "pseudo" : ""}
            >
              Category
            </Box>
            <Box
              sx={leftInner("Poster", activeItem, theme)}
              onClick={() => {setActiveItem("Poster");setCategory(false); setProduct(false); setPoster(true);}}
              className={activeItem === "Poster" ? "pseudo" : ""}
            >
              Poster
            </Box>
          </Box>
        </Grid>
        {/* **************** Side Bar End **************** */}

        <Grid
          item
          lg={9.2}
          sx={{
            marginTop: ".7rem",
            backgroundColor: "#FFFFFF",
            height: "97vh",
            borderRadius: "30px",
          }}
        >
          <Grid
            lg={11.1}
            container
            sx={{
              marginLeft: "3rem",
            }}
          >
            {/* **************** Header Start **************** */}
            <Grid
              item
              lg={12}
              sx={{
                display: "flex",
                height: "4rem",
                color: theme.palette.secondary.main,
                alignItems: "center",
                justifyContent: "start",
                borderBottom: "1px solid #65BEBE ",
              }}
            >
              <Grid
                item
                lg={9.5}
                sx={{
                  fontSize: "28px",
                  fontWeight: "600",
                  lineHeight: "31.36px",
                  letterSpacing: "0.02em",
                }}
              >
                Inventory Management
              </Grid>
              <Grid item lg={1} textAlign="center">
                <NotificationsNoneIcon />
              </Grid>
              <Grid
                item
                lg={1.5}
                display="flex"
                textAlign="end"
                alignItems={"center"}
                sx={{ position: "relative" }}
                onClick={() => setdropdown(!dropdown)}
              >
                {name}
                {dropdown ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}

                <ul style={{ display: dropdown ? "block" : "none", position: "absolute", bottom: "-30px", left: "27px", listStyle: "none" }}>
                  <Button onClick={handleLogout} >Logout</Button>
                </ul>
              </Grid>
            </Grid>
            {/* **************** Header End **************** */}

            {/* **************** Cards Display Start **************** */}     
           {product && <ProductDisplay/>}
           {category && <CategoryDisplay/>}
           {poster && <PosterDisplay/>}
            {/* **************** Cards Display End **************** */}
          </Grid>

          {/* **************** Pagination Start **************** */}
          <Grid
            container
            lg={12}
            sx={{
              display: "flex",
              alignItems: "center",
              marginLeft: "6rem",
              marginTop: "1.5rem",
              position: "absolute",
              bottom: "1.5rem",
            }}
          >
            <Grid item lg={6.5}>
              <Typography
                sx={{
                  color: theme.palette.secondary.main,
                  fontSize: "14px",
                  fontWeight: "400",
                  lineHeight: "15.68px",
                }}
              >
                Showing {dataCount===0?0:currentPage * pageLimit + 1} to{" "}
                {dataCount<currentPage * pageLimit + pageLimit + 1?dataCount:currentPage * pageLimit + pageLimit + 1} of {dataCount} entries
              </Typography>
            </Grid>
            <Grid item lg={2}>
              <Pagination
                count={pagesCount}
                color="primary"
                onChange={(
                  event: React.ChangeEvent<unknown>,
                  value: number
                ) => {
                  setCurrentPage(value - 1);
                }}
              />
            </Grid>
          </Grid>
          {/* **************** Pagination End **************** */}
        </Grid>
      </Grid>
    </>
  );
};

const leftInner = (item: any, activeItem: any, theme: any) => ({
  marginBottom: "0rem",
  marginTop: "0.2rem",
  marginLeft: "2rem",
  fontSize: "15px",
  fontWeight: "500",
  lineHeight: "16.8px",
  letterSpacing: "0.02em",
  display: "flex",
  alignItems: "center",
  backgroundColor: activeItem === item ? "#FFFFFF" : "transparent",
  borderRadius: activeItem === item ? "30px 0px 0px 30px" : "0",
  color: activeItem === item ? theme.palette.primary.main : "inherit",
  cursor: "pointer",
  height: "3.5rem",
  paddingLeft: "1rem",
  position: "relative",
});
const InputProps = {
  color: "#AEB8B8",
  fontSize: "16px",
  fontFamily: "League Spartan, sans-serif",
  fontWeight: 500,
  lineHeight: "16.8px",
  height: "2.5rem",
  letterSpacing: "0.02em",
};
const albumStyle = {
  fontSize: "15px",
  fontWeight: "500",
  lineHeight: "16.8px",
  letterSpacing: "0.02em",
};
const isPrime = (num: number) => {
  for (var i = 2; i < num; i++) {
    if (num % i == 0) {
      return false;
    }
  }
  return true;
};
export default page;
