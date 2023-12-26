"use client";
import React, { useRef, useContext, useEffect } from "react";
import Image from "next/image";
import style from "@/styles/page.module.css";
import InputField from "@/components/inputField";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AppContext } from "@/context/appContext";

const loginUser = () => {
  const router = useRouter();
  const { setUserName, setShowError } = useContext(AppContext);
  const emailRef = useRef();
  const passwordRef = useRef();

  useEffect(() => {
    const token = localStorage.getItem("auth-token");

    if (token) {
      router.push("./userAccount");
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const isEmailEmpty = emailRef.current.value.trim() === "";
    const isPasswordEmpty = passwordRef.current.value.trim() === "";

    if (isEmailEmpty || isPasswordEmpty) {
      console.error("in error");
      setShowError(true);
    } else {
      const tempData = {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      };

      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tempData),
      });
      if (response.ok) {
        const data = await response.json();
        const token = data.token;
        localStorage.setItem("auth-token", token);
        setUserName(data.user);
        router.push("/userAccount");
        console.log("authenticated", data);
      } else {
        console.error("Error logging in");
      }

      console.log(tempData);
    }
  };

  return (
    <React.Fragment>
      <div className={style.loginWrapper}>
        <form className="card w-50" onSubmit={handleSubmit}>
          <h4>Sign In</h4>
          <InputField
            type="email"
            placeholder="Email Address"
            inputRef={emailRef}
          />
          <InputField
            type="password"
            placeholder="Password"
            inputRef={passwordRef}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <p className={style.textBody1}>Don’t have an account?</p>
            <Link href="/registerUser" className={style.textSubtitle2}>
              Sign Up
            </Link>
          </div>
          <button className={`btn ${style.secondarySocialBtn}`}>Sign In</button>
        </form>
      </div>
    </React.Fragment>
  );
};

export default loginUser;
