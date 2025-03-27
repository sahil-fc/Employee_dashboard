"use client";
import React, { useLayoutEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as yup from "yup";
import YupPassword from "yup-password";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Checkbox, colors, Grid, styled, Typography, MenuItem } from "@mui/material";
import { useTheme } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Container from "@mui/material/Container";
import image1 from "../../utilits/img/amzone.jpg";
import image2 from "../../utilits/img/Flipcard.png";
import image3 from "../../utilits/img/myntra.jpg";
import image4 from "../../utilits/img/Snapdeal.png";
import image5 from "../../utilits/img/meesho.png";
import { Padding } from "@mui/icons-material";
import axios from "axios";
import { notify, failure } from "@/utilits/toasts/toast";
import { ImageStyle } from "../page";
import { userStore } from "@/lib/persistedStore";

YupPassword(yup); // for password validation
const validationSchema = yup.object({
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  companyName: yup.string().required("Company Name is required"),
  companyCategory: yup
    .string()
    .oneOf(["blog", "eCommerce", "content"], "Invalid company category")
    .required("Company Category is required"),
  companyLogo: yup.mixed()
    .required("Company Logo is required")
});

export default function Counter() {
  const [passvisi, setPassvisi] = useState(false); // password icon
  const router = useRouter();
  const theme = useTheme();
  const {
    isLogin,
    token,
    email,
    setIsLogin,
    setToken,
    setEmail,
    setName,
    setCompanyId,
  } = userStore();

  useLayoutEffect(() => {
    if (isLogin) {
      router.push("/dashboard");
    }
  }, [isLogin]);
  /* **************** formik form handling start **************** */
  const handleLogoImageChange = (e: any) => {// Check if function is triggered
    const file = e.target.files[0];
    if (file) {
      formik.setFieldValue("companyLogo", file);
    } else {
      console.log("No file selected");
    }
  };
  
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      companyName: "",
      companyCategory: "E-Commerce", // Default empty or set a default value like "blog"
      companyLogo: null,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log("Form Submitted:", values);
      const formData = new FormData();
      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("companyName", values.companyName);
      formData.append("companyCategory", values.companyCategory);
      if (values.companyLogo) {
        formData.append("companyLogo", values.companyLogo); // Append file if exists
      }

      // Axios request
      const result = await axios.post("http://localhost:5001/api/companies", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Important for file uploads
        },
      });
      if (result.status === 201) {
        console.log(result.data?.user)
        setToken(result.data?.token);
        setEmail(result.data?.user.email);
        setName(result.data?.user.companyName)
        setIsLogin(true);
        notify("login Successfuly");
        router.push("/dashboard");
      } else {
        failure(result.data.message)
      }
      formik.resetForm();
    },
  });
  /* **************** formik form handling end **************** */

  /* **************** form textfield design css object start **************** */

  const InputProps = {
    color: `${theme.palette.secondary.main}`,
    fontFamily: "League Spartan, sans-serif",
    fontSize: "16px",
    fontWeight: 530,
    lineHeight: "22px",
    marginTop: "19px",
  };

  const GridMainInput = {
    boxShadow: "0px 10px 30px 0px #A9A9A940",
    borderRadius: "35px",
    marginLeft: "2.6rem",
    height:
      (formik.touched.email && Boolean(formik.errors.email)) ||
        (formik.touched.password && Boolean(formik.errors.password))
        ? "36rem"
        : "30rem",
  };
  const GridMainInputInner1 = {
    borderBottom: "1px solid #D7D7D7",
    width: "6vw",
    height:
      (formik.touched.email && Boolean(formik.errors.email)) ||
        (formik.touched.password && Boolean(formik.errors.password))
        ? "5.8rem"
        : "4.8rem",
  };

  /* **************** form textfield design css object end **************** */

  const passwordVisibility = {
    color: "#8697B4",
    fontSize: "19px",
    marginRight: ".3rem",
    cursor: "pointer",
  };
  const mainBox = {
    width: "99vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "#ffffff",
  };

  return (
    <Container disableGutters maxWidth={false} sx={mainBox}>
      <Grid
        container
        sx={{
          width: "100vw",
          height: " 100vh",
          justifyContent: { xs: "center", lg: "", md: "center" },
          padding: "8vh 10vw",
        }}
      >
        <Grid
          container
          lg={12}
          sx={{ boxShadow: "0px 20px 30px 0px #A9A9A940" }}
        >
          <Grid item xs={12} lg={5} md={12} sx={{ height: "100%" }}>
            {/* **************** left side box start **************** */}

            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={2}
              sx={{ height: "95%" }}
            >
              <Grid item xs={12} sx={{ margin: "1rem" }}>
                <Typography variant="h1"> Register to CurvScout!</Typography>
              </Grid>
              <form onSubmit={(e) => {
                e.preventDefault();// Debugging step 1
                formik.handleSubmit(e);
              }}>
                {/* **************** Complete Form start **************** */}

                <Grid
                  item
                  xs={11}
                  md={12}
                  lg={12}
                  sx={{ height: "auto", marginTop: "1.2rem" }}
                >
                  {/* **************** TextField start **************** */}

                  <Grid
                    container
                    item
                    xs={10}
                    direction="row"
                    alignItems="start"
                    spacing={2}
                    sx={GridMainInput}
                  >
                    {" "}
                    {/* **************** Name field start **************** */}
                    <Grid item xs={12} sx={GridMainInputInner1}>
                      <TextField
                        id="filled-company-name"
                        label="Company Name"
                        name="companyName"
                        InputLabelProps={{
                          shrink: true,
                          style: { color: "#8697B4", fontSize: "16px" },
                        }}
                        variant="standard"
                        InputProps={{
                          disableUnderline: true,
                          style: InputProps,
                        }}
                        value={formik.values.companyName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.companyName && Boolean(formik.errors.companyName)
                        }
                        helperText={formik.touched.companyName && formik.errors.companyName}
                        sx={{ marginLeft: "1.3rem", width: "89%" }}
                      />
                    </Grid>

                    {/* **************** Email field **************** */}
                    <Grid item xs={12} sx={GridMainInputInner1}>
                      <TextField
                        id="filled-email"
                        label="Email"
                        name="email"
                        InputLabelProps={{
                          shrink: true,
                          style: { color: "#8697B4", fontSize: "16px" },
                        }}
                        variant="standard"
                        InputProps={{
                          disableUnderline: true,
                          style: InputProps,
                        }}
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                        sx={{ marginLeft: "1.3rem", width: "89%" }}
                      />
                    </Grid>

                    {/* **************** Password field **************** */}
                    <Grid item xs={12} sx={{ ...GridMainInputInner1, height: "4.8rem" }}>
                      <label htmlFor="filled-password" style={{ color: "#8697B4" }}>
                        <LockIcon sx={{ fontSize: "14px", marginRight: ".3rem" }} />
                      </label>
                      <TextField
                        id="filled-password"
                        label="Password"
                        name="password"
                        type={passvisi ? "text" : "password"}
                        value={formik.values.password}
                        InputLabelProps={{
                          shrink: true,
                          style: { color: "#8697B4", fontSize: "16px" },
                        }}
                        variant="standard"
                        InputProps={{
                          disableUnderline: true,
                          style: InputProps,
                          endAdornment: (
                            <>
                              {passvisi ? (
                                <VisibilityOffIcon
                                  sx={passwordVisibility}
                                  onClick={() => setPassvisi(false)}
                                />
                              ) : (
                                <VisibilityIcon
                                  sx={passwordVisibility}
                                  onClick={() => setPassvisi(true)}
                                />
                              )}
                            </>
                          ),
                        }}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                        sx={{ width: "89%" }}
                      />
                    </Grid>

                    {/* **************** Company Category Dropdown **************** */}
                    <Grid item xs={12} sx={GridMainInputInner1}>
                      <TextField
                        id="filled-company-category"
                        label="Company Category"
                        name="companyCategory"
                        select
                        InputLabelProps={{
                          shrink: true,
                          style: { color: "#8697B4", fontSize: "16px" },
                        }}
                        variant="standard"
                        InputProps={{
                          disableUnderline: true,
                          style: InputProps,
                        }}
                        value={formik.values.companyCategory}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.companyCategory &&
                          Boolean(formik.errors.companyCategory)
                        }
                        helperText={
                          formik.touched.companyCategory && formik.errors.companyCategory
                        }
                        sx={{ marginLeft: "1.3rem", width: "89%" }}
                      >
                        <MenuItem value="blog">Blog</MenuItem>
                        <MenuItem value="eCommerce">E-Commerce</MenuItem>
                        <MenuItem value="content">Content</MenuItem>
                      </TextField>
                    </Grid>
                    {/* **************** Password field end **************** */}
                    <Grid item xs={12} sx={GridMainInputInner1}>
                      <label htmlFor="company-logo-upload" style={{ color: "#8697B4", fontSize: "16px" }}>
                        Company Logo
                      </label>
                      <input
                        id="company-logo-upload"
                        name="companyLogo"
                        type="file"
                        accept="image/*"
                        onChange={handleLogoImageChange}
                        onBlur={formik.handleBlur}
                        style={{ display: "block", marginTop: "0.5rem" }}
                      />
                      {formik.touched.companyLogo && formik.errors.companyLogo && (
                        <Typography color="error" sx={{ fontSize: "0.875rem", marginTop: "0.2rem" }}>
                          {formik.errors.companyLogo}
                        </Typography>
                      )}
                    </Grid>

                  </Grid>
                  {/* **************** TextField end **************** */}
                  {/* **************** Sign Up button start **************** */}

                  <Grid
                    item
                    xs={10}
                    sx={{
                      marginLeft: "3.4rem",
                      backgroundColor: `${theme.palette.primary.main}`,
                      textAlign: "center",
                      borderRadius: "20px",
                      marginTop: "2rem",
                    }}
                  >
                    <Button
                      type="submit"
                      sx={{
                        width: "100%",
                        overflow: "hidden",
                        borderRadius: "20px",
                      }}
                    >
                      <Typography variant="body1" sx={{ color: "#FFFFFF" }}>
                        Sign Up
                      </Typography>
                    </Button>
                  </Grid>
                  {/* **************** Sign Up button end **************** */}
                </Grid>
                {/* **************** Complete Form end **************** */}
              </form>
            </Grid>
          </Grid>
          {/* **************** Right Side box start **************** */}

          <Grid
            item
            xs={0}
            lg={7}
            md={0}
            sx={{
              backgroundColor: `${theme.palette.primary.main}`,
              display: { xs: "none", md: "none", lg: "grid" },
              width: "100vw",
            }}
            alignItems="flex-end"
          >
            <Box sx={ImageStyle(image1.src, "155px", "7rem", "45rem")} />
            <Box sx={ImageStyle(image2.src, "121px", "18rem", "62rem")} />
            <Box sx={ImageStyle(image3.src, "141px", "6rem", "73rem")} />
            <Box sx={ImageStyle(image4.src, "175px", "26rem", "45rem")} />
            <Box sx={ImageStyle(image5.src, "121px", "34rem", "73rem")} />
            <Grid item lg={7} sx={{ marginLeft: "3rem", marginBottom: "3rem" }}>
              {" "}
              <Typography variant="body2">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Cupiditate minus minima consectetur.
              </Typography>
            </Grid>
          </Grid>
          {/* **************** Right Side box end **************** */}
        </Grid>
      </Grid>
    </Container>
  );
}
