"use client";
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
import React, { useEffect, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useSession } from "next-auth/react";
import { Search } from "@mui/icons-material";
import axios from "axios";
import ImageCard from "../components/Card";

const pageLimit = 7;
const page = () => {
  const theme = useTheme();
  const session = useSession();
  const [activeItem, setActiveItem] = useState("Photos");
  const [employeeData, setEmployeeData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pagesCount, setPagesCount] = useState(0);
  const [dataCount, setDataCount] = useState(0);
  const [type, setType] = useState("none");
  const [search, setSearch] = useState("");
  const [completeData, setcompleteData] = useState([]);

  const checkCondition = (type: any, id: any) => {
    if (
      (type === "Even" && id % 2 === 0) ||
      (type === "Odd" && id % 2 != 0) ||
      (type === "Prime" && isPrime(id))
    )
      return true;

    return false;
  };
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      setDataCount(response.data.length);
      setcompleteData(response.data);
      setPagesCount(Math.ceil(response.data.length / pageLimit));
      setEmployeeData(
        response.data.slice(
          currentPage * pageLimit,
          currentPage * pageLimit + pageLimit + 1
        )
      );
    };
    fetchData();
  }, [currentPage]);
  useEffect(() => {
    if (search != "") {
      const temp = completeData.filter(
        (itr) => itr.username.slice(0, search.length) === search
      );
      setEmployeeData(
        temp.slice(
          currentPage * pageLimit,
          currentPage * pageLimit + pageLimit + 1
        )
      );
    }else{
      setEmployeeData(
        completeData.slice(
          currentPage * pageLimit,
          currentPage * pageLimit + pageLimit + 1
        )
      );
    }
  }, [search]);
  const handletypeChange = (e: any) => {
    setType(e.target.value);
  };
  const handlesearchChange = (e: any) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <Grid
        container
        sx={{
          backgroundColor: theme.palette.primary.main,
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
                height: "1rem",
                borderTop: "1px solid #65BEBE",
              }}
            ></Box>
            <Box
              sx={leftInner("My Info.", activeItem, theme)}
              onClick={() => setActiveItem("My Info.")}
              className={activeItem === "My Info." ? "pseudo" : ""}
            >
              My Info.
            </Box>
            <Box
              sx={leftInner("Blogs", activeItem, theme)}
              onClick={() => setActiveItem("Blogs")}
              className={activeItem === "Blogs" ? "pseudo" : ""}
            >
              Blogs
            </Box>
            <Box
              sx={leftInner("General Info.", activeItem, theme)}
              onClick={() => setActiveItem("General Info.")}
              className={activeItem === "General Info." ? "pseudo" : ""}
            >
              General Info.{" "}
              <KeyboardArrowRightIcon sx={{ marginLeft: "6.4rem" }} />{" "}
            </Box>
            <Box
              sx={leftInner("Team", activeItem, theme)}
              onClick={() => setActiveItem("Team")}
              className={activeItem === "Team" ? "pseudo" : ""}
            >
              Team <KeyboardArrowRightIcon sx={{ marginLeft: "9.6rem" }} />
            </Box>
            <Box
              sx={leftInner("Photos", activeItem, theme)}
              onClick={() => setActiveItem("Photos")}
              className={activeItem === "Photos" ? "pseudo" : ""}
            >
              Photos
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
                Photo Management
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
              >
                {session.data?.user?.name
                  ? session.data?.user?.name
                  : "Sahil Khan"}{" "}
                <KeyboardArrowDownIcon />{" "}
              </Grid>
            </Grid>
            {/* **************** Header End **************** */}

            {/* **************** Search Bar and Button Start **************** */}
            <Grid
              container
              lg={12}
              alignContent="center"
              sx={{ width: "100%", height: "4rem", marginTop: "16px" }}
              justifyContent="space-between"
            >
              <Grid item lg={3.5} sx={{ height: "48px" }}>
                <TextField
                  variant="outlined"
                  name="search"
                  placeholder="search by name"
                  InputProps={{
                    disableUnderline: true,
                    style: InputProps,
                    endAdornment: <Search />,
                  }}
                  sx={{
                    width: "100%",

                    "& .MuiOutlinedInput-root": {
                      height: "48px",
                      "&.Mui-focused fieldset": {
                        border: `1px solid ${theme.palette.primary.main}`,
                      },
                      "&:hover fieldset": {
                        border: `1px solid ${theme.palette.primary.main}`,
                      },
                    },
                  }}
                  onChange={(e) => handlesearchChange(e)}
                />
              </Grid>
              <Grid
                container
                lg={6}
                justifyContent="space-between"
                sx={{ marginRight: "1rem" }}
              >
                <Grid item lg={4}>
                  <TextField
                    id="outlined-select-album"
                    select
                    defaultValue="Album1"
                    variant="outlined"
                    sx={{
                      height: "48px",
                      width: "157px",
                      "& .MuiOutlinedInput-root": {
                        height: "48px",
                        borderRadius: "15px",
                        backgroundColor: "#F5F4FF",

                        "&.Mui-focused fieldset": {
                          border: `1px solid ${theme.palette.primary.main}`,
                        },
                        "&:hover fieldset": {
                          border: `1px solid ${theme.palette.primary.main}`,
                        },
                      },
                      "& .MuiSelect-outlined": {
                        display: "flex",
                        alignItems: "center",
                      },
                    }}
                    InputProps={{
                      disableUnderline: true,
                      style: {
                        fontSize: "15px",
                        fontWeight: "500",
                        lineHeight: "16.8px",
                        letterSpacing: "0.02em",
                      },
                    }}
                  >
                    <MenuItem key="Album1" value="Album1" sx={albumStyle}>
                      Album1
                    </MenuItem>
                    <MenuItem key="Album2" value="Album2" sx={albumStyle}>
                      Album2
                    </MenuItem>
                    <MenuItem key="Album3" value="Album3" sx={albumStyle}>
                      Album3
                    </MenuItem>
                  </TextField>
                </Grid>
                <Grid item lg={4}>
                  <TextField
                    id="outlined-select-even"
                    select
                    defaultValue="None"
                    variant="outlined"
                    sx={{
                      height: "48px",
                      width: "157px",
                      "& .MuiOutlinedInput-root": {
                        backgroundColor: "#F5F4FF",
                        height: "48px",
                        borderRadius: "15px",
                      },
                      "& .MuiSelect-outlined": {
                        display: "flex",
                        alignItems: "center",
                      },
                    }}
                    InputProps={{
                      disableUnderline: true,
                      style: {
                        fontSize: "15px",
                        fontWeight: "500",
                        lineHeight: "16.8px",
                        letterSpacing: "0.02em",
                      },
                    }}
                    onChange={(e) => handletypeChange(e)}
                  >
                    <MenuItem key="Even" value="Even" sx={albumStyle}>
                      Even
                    </MenuItem>
                    <MenuItem key="Odd" value="Odd" sx={albumStyle}>
                      Odd
                    </MenuItem>
                    <MenuItem key="Prime" value="Prime" sx={albumStyle}>
                      Prime
                    </MenuItem>
                    <MenuItem key="None" value="None" sx={albumStyle}>
                      None
                    </MenuItem>
                  </TextField>
                </Grid>
                <Grid item lg={4}>
                  <Button
                    sx={{
                      backgroundColor: theme.palette.primary.main,
                      color: "#ffffff",
                      borderRadius: "15px",
                      width: "157px",
                      height: "48px",
                      "&:hover": {
                        backgroundColor: "#195c5c",
                      },
                    }}
                  >
                    Add Employee
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            {/* **************** Search Bar and Button End **************** */}

            {/* **************** Cards Display Start **************** */}
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                marginRight: "2.5rem",
                marginLeft: "2rem",
              }}
            >
              {employeeData.map((itr: any) => {
                return (
                  <ImageCard
                    data={itr}
                    isTrue={checkCondition(type, itr.id)}
                    type={type}
                  />
                );
              })}
            </Box>

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
              bottom: "1rem",
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
                Showing {currentPage * pageLimit + 1} to{" "}
                {currentPage * pageLimit + pageLimit + 1} of {dataCount} entries
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
