"use client";
import React, { useLayoutEffect, useState } from "react";
import type { RootState } from "../lib/store";
import { useSelector, useDispatch } from "react-redux";
import {
  setEmail,
  setName,
  setToken,
  setisLogin,
} from "../lib/features/profileSlicer";
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
import { Checkbox, Grid, IconButton, Typography } from "@mui/material";
import { useTheme } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Container from "@mui/material/Container";
import image1 from "../utilits/img/image1.png";
import image2 from "../utilits/img/image2.png";
import image3 from "../utilits/img/image3.png";
import image4 from "../utilits/img/image4.png";
import image5 from "../utilits/img/image5.png";
import axios from "axios";
import { notify, failure } from "@/utilits/toasts/toast";

YupPassword(yup); // for password validation
const validationSchema = yup.object({
  email: yup.string().email().required("Email is required"),
  password: yup.string().password().required("Password is required"),
});

export default function Counter() {
  const [passvisi, setPassvisi] = useState(false); // password icon
  const router = useRouter();
  const dispatch = useDispatch();
  const theme = useTheme();
  const session = useSession();
  const isLogin = useSelector(
    (state: RootState) => state.profileReducer.isLogin
  );

  /* **************** API Call for Google and Discord auth start **************** */

  const apicall = async (name: any, email: any) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/nextauth`,
        {
          name: name,
          email: email,
        }
      );
      if (response.data.status === 201) {
        dispatch(setToken(response.data.token));
        dispatch(setEmail(response.data.user.email));
        dispatch(setName(response.data.user.name));
        dispatch(setisLogin(true));
        notify("login Successfully");
        router.push("/dashboard");
      } else {
        alert(response.data.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useLayoutEffect(() => {
    if (session.status === "authenticated") {
      const name = session.data.user?.name;
      const email = session.data.user?.email;
      apicall(name, email);
    }
  }, [session.status]);

  /* **************** API Call for Google and Discord auth end **************** */

  useLayoutEffect(() => {
    if (isLogin) {
      router.push("/dashboard");
    }
  }, [isLogin]);

  /* **************** formik form handling start **************** */

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/userlogin`,
          values
        );
        if (response.data.status === 201) {
          dispatch(setToken(response.data.token));
          dispatch(setEmail(response.data.user.email));
          dispatch(setName(response.data.user.name));
          dispatch(setisLogin(true));
          notify("login Successfuly");
          router.push("/dashboard");
        } else {
          failure(response.data.msg);
        }
      } catch (error) {
        console.log(error);
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
              sx={{ height: "100%" }}
            >
              <Grid item xs={12} sx={{ margin: "1rem" }}>
                <Typography variant="h1"> Welcome to FewerClicks!</Typography>
              </Grid>
              <form onSubmit={formik.handleSubmit}>
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
                    <Grid item xs={12} sx={GridMainInputInner1}>
                      {/* **************** Email field start **************** */}

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
                        error={
                          formik.touched.email && Boolean(formik.errors.email)
                        }
                        helperText={formik.touched.email && formik.errors.email}
                        sx={{ marginLeft: "1.3rem", width: "89%" }}
                      />
                      {/* **************** Email field end **************** */}
                    </Grid>
                    <Grid item xs={12} sx={{ height: "4.8rem" }}>
                      {/* **************** Password field start **************** */}
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
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.password &&
                          Boolean(formik.errors.password)
                        }
                        helperText={
                          formik.touched.password && formik.errors.password
                        }
                        sx={{ width: "89%" }}
                      />
                      {/* **************** Password field end **************** */}
                    </Grid>
                  </Grid>
                  {/* **************** TextField end **************** */}

                  {/* **************** Remember me and forgot password start **************** */}
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
                        <Checkbox
                          onChange={formik.handleChange}
                          sx={{
                            "& .MuiSvgIcon-root": {
                              width: ".7em",
                            },
                          }}
                        />
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
                  {/* **************** Remember me and forgot password end **************** */}

                  {/* **************** Login button start **************** */}
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
                  {/* **************** Login button end **************** */}

                  {/* **************** Google and Discord auth start **************** */}
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
                      marginLeft: "1rem",
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
                  {/* **************** Google and Discord auth end **************** */}

                  {/* **************** Sign up start **************** */}

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
                  {/* **************** Sign up end **************** */}
                </Grid>
                {/* **************** Complete Form end **************** */}
              </form>
            </Grid>
            {/* **************** left side box end **************** */}
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

{
  /* **************** Right side image design  start **************** */
}
export const ImageStyle = (image: any, size: any, top: any, left: any) => ({
  position: "absolute",
  backgroundImage: `url(${image})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  borderRadius: "50%",
  overflow: "hidden",
  width: size,
  height: size,
  top: top,
  left: left,
});
{
  /* **************** Right side image design  end **************** */
}
