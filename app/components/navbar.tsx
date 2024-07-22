"use client";
import "./navbar.css";
import Link from "next/link";
import Image from "next/image";
import styles from "../page.module.css";
import { redirect, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/store";
import { setisLogin } from "@/lib/features/profileSlicer";
import { signOut } from "next-auth/react";
import { useEffect, useLayoutEffect, useState } from "react";



export function NavBar() {
  const router = useRouter();
  const isLogin = useSelector(
    (state: RootState) => state.profileReducer.isLogin
  );

  const dispatch = useDispatch();
  async function handleLogout(){
    const data= await signOut({redirect:true,callbackUrl:"/"})
    dispatch(setisLogin(false))
  }
  const [log, setLog] = useState("login");
  useLayoutEffect(() => {
    if (isLogin) {
      setLog("logout");
    }
    return () => {};
  }, [isLogin]);

  return (
    <>
      <nav className="nav">
        <Image
          src="/vercel.svg"
          alt="Vercel Logo"
          className={`${styles.vercelLogo} ${styles.image}`}
          width={100}
          height={24}
          priority
        />
        <ul className="ul">
          <li className="li" onClick={() => router.push("/home")}>
            Home
          </li>
          <li className="li" onClick={() => router.push("/projects")}>
            Projects
          </li>
          <li className="li" onClick={() => router.push("/about")}>
            About
          </li>
          <li className="li" onClick={() => router.push("/contact")}>
            Contact us
          </li>
          <li
            className="li"
            onClick={() => {
              if (isLogin) {
                handleLogout()
              }
            }}
          >
            {" "}
            {log}
          </li>
        </ul>
      </nav>
    </>
  );
}
