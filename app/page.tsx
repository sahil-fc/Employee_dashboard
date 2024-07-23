"use client";
import React, { useLayoutEffect, useState } from "react";
import type { RootState } from "../lib/store";
import { useSelector, useDispatch } from "react-redux";
import { setEmail, setPass, setisLogin } from "../lib/features/profileSlicer";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { useSession, signIn } from "next-auth/react";
import * as yup from "yup";
import YupPassword from "yup-password";
import GoogleIcon from "@mui/icons-material/Google";
import discord from "../utilits/icon/icons8-discord-48.png";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Checkbox, colors, Grid, IconButton, styled, Typography } from "@mui/material";
import { useTheme } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import { InputLabel } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Container from "@mui/material/Container";
import image1 from "../utilits/img/image1.png";
import image2 from "../utilits/img/image2.png";
import image3 from "../utilits/img/image3.png";
import image4 from "../utilits/img/image4.png";
import image5 from "../utilits/img/image5.png";
import { Padding } from "@mui/icons-material";
import shadows from "@mui/material/styles/shadows";

YupPassword(yup);
const validationSchema = yup.object({
  email: yup.string().email().required("Email is required"),
  password: yup.string().password().required("Password is required"),
});
export default function Counter() {
  const email = useSelector((state: RootState) => state.profileReducer.email);
  const pass = useSelector((state: RootState) => state.profileReducer.password);
  const [passvisi, setPassvisi] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const theme = useTheme();
  const session = useSession();
  const isLogin = useSelector(
    (state: RootState) => state.profileReducer.isLogin
  );
  useLayoutEffect(() => {
    if (isLogin) {
      router.push("/dashboard");
    }
  }, [isLogin]);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if (
        values.email === "sah.kha18@gmail.com" &&
        values.password === "Sahil@0786"
      ) {
        dispatch(setisLogin(true));
        dispatch(setEmail(values.email));
        dispatch(setPass(values.password));
        router.push("/dashboard");
      } else {
        alert("credential are invalid ");
      }
      formik.resetForm();
    },
  });
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
        ? "12rem"
        : "10rem",
  };
  const GridMainInputInner1 = {
    borderBottom: "1px solid #D7D7D7",
    width: "100%",
    height:
      (formik.touched.email && Boolean(formik.errors.email)) ||
      (formik.touched.password && Boolean(formik.errors.password))
        ? "5.8rem"
        : "4.8rem",
    marginTop: ".2rem",
  };

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
  useLayoutEffect(() => {
    if (session.status === "authenticated") {
      dispatch(setisLogin(true));
    }
  }, [session.status]);

  return (
    <Container disableGutters maxWidth={false} sx={mainBox}>
      <Grid
        container
        sx={{
          width: "100vw",
          height: " 100vh",
          justifyContent: { xs: "center", lg: "", md: "center" },
          padding:"8vh 10vw",
          
        }}
      >
        <Grid container lg={12} sx={{boxShadow: "0px 20px 30px 0px #A9A9A940",}}>
        <Grid item xs={12} lg={5} md={12} sx={{height:"100%"}}>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
            sx={{height:"100%"}}
          >
            <Grid item xs={12} sx={{ margin: "1rem" }}>
              <Typography variant="h1"> Welcome to FewerClicks!</Typography>
            </Grid>
            <form onSubmit={formik.handleSubmit}>
              <Grid
                item
                xs={11}
                md={12}
                lg={12}
                sx={{ height: "auto", marginTop: "1.2rem" }}
              >
                <Grid
                  container
                  item
                  xs={10}
                  direction="row"
                  alignItems="start"
                  spacing={2}
                  sx={GridMainInput}
                >
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
                      error={
                        formik.touched.email && Boolean(formik.errors.email)
                      }
                      helperText={formik.touched.email && formik.errors.email}
                      sx={{ marginLeft: "1.3rem", width: "89%" }}
                    />
                  </Grid>
                  <Grid item xs={12} sx={{ height: "4.8rem" }}>
                    <label
                      htmlFor="filled-password"
                      style={{ color: "#8697B4" }}
                    >
                      <LockIcon
                        sx={{ fontSize: "14px", marginRight: ".3rem" }}
                      />
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
                      error={
                        formik.touched.password &&
                        Boolean(formik.errors.password)
                      }
                      helperText={
                        formik.touched.password && formik.errors.password
                      }
                      sx={{ width: "89%" }}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={10} sx={{ marginLeft: "3.4rem" }}>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography
                      variant="h3"
                      sx={{
                        color: `${theme.palette.secondary.main}`,
                        marginLeft: ".1rem",
                      }}
                    >
                      <Checkbox onChange={formik.handleChange} sx={{"& .MuiSvgIcon-root":{
                        width:".7em"
                      }}} />
                      Remember me
                    </Typography>
                    <Typography
                      variant="h3"
                      sx={{
                        color: `${theme.palette.primary.main}`,
                        marginTop: "10px",
                      }}
                    >
                      Forgot Password?
                    </Typography>
                  </Box>
                </Grid>
                <Grid
                  item
                  xs={10}
                  sx={{
                    marginLeft: "3.4rem",
                    backgroundColor: `${theme.palette.primary.main}`,
                    textAlign: "center",
                    borderRadius: "20px",
                    marginTop: "6rem",
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
                      Log in
                    </Typography>
                  </Button>
                </Grid>
                <Grid
                  item
                  xs={12}
                  justifyContent="center"
                  alignItems="center"
                  sx={{
                    textAlign: "center",
                    marginTop: "1rem",
                    marginLeft: "1.3rem",
                    color: theme.palette.secondary.main,
                  }}
                >
                  <Typography variant="h2">Or Login with</Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{
                    textAlign: "center",
                    borderRadius: "20px",
                    marginTop: ".3rem",
                    marginLeft:"1rem"
                  }}
                  justifyContent="center"
                  alignItems="center"
                >
                  <IconButton
                    onClick={() => signIn("google")}  
                    sx={{ color: "black" }}
                  >
                    <GoogleIcon sx={{ fontSize: 25 }} />
                  </IconButton>
                  <IconButton
                    onClick={() => signIn("discord")}
                    sx={{ color: "black" }}
                  >
                    <Box
                      sx={{
                        backgroundImage: `url(${discord.src})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        borderRadius: "50%",
                        overflow: "hidden",
                        width: 30,
                        height: 30,
                      }}
                    />
                  </IconButton>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{
                    marginLeft: "2rem",
                    marginTop: "1rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      color: theme.palette.secondary.main,
                      fontSize: "15px",
                    }}
                  >
                    Don't have an account{" "}
                  </Typography>
                  <Box
                    onClick={() => router.push("/registration")}
                    sx={{
                      color: "#257ded",
                      marginLeft: ".3rem",
                      fontSize: "15px",
                      cursor: "pointer",
                    }}
                  >
                    Sign Up
                  </Box>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>

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
          <Box
            sx={{
              position: "absolute",
              backgroundImage: `url(${image1.src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: "50%",
              overflow: "hidden",
              width: "155px",
              height: "155px",
              top: "7rem",
              left: "45rem",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              backgroundImage: `url(${image3.src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: "50%",
              overflow: "hidden",
              width: "141px",
              height: "141px",
              top: "6rem",
              left: "73rem",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              backgroundImage: `url(${image4.src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: "50%",
              overflow: "hidden",
              width: "175px",
              height: "175px",
              top: "26rem",
              left: "45rem",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              backgroundImage: `url(${image2.src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: "50%",
              overflow: "hidden",
              width: "122px",
              height: "122px",
              top: "18rem",
              left: "62rem",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              backgroundImage: `url(${image5.src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: "50%",
              overflow: "hidden",
              width: "121px",
              height: "121px",
              top: "34rem",
              left: "73rem",
            }}
          />
          <Grid item lg={7} sx={{ marginLeft: "3rem", marginBottom: "3rem" }}>
            {" "}
            <Typography variant="body2">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Cupiditate minus minima consectetur.
            </Typography>
          </Grid>
        </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

const ImageStyle = (image: any, position: any) => {
  return;
};
