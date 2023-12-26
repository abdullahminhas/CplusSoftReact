"use client";
import React, { useEffect, useContext } from "react";
import style from "@/styles/userAccount.module.css";
import { useRouter } from "next/navigation";
import { AppContext } from "@/context/appContext";
import Link from "next/link";

const userAccount = () => {
  const router = useRouter();
  const { userName } = useContext(AppContext);

  useEffect(() => {
    const token = localStorage.getItem("auth-token");

    if (!token) {
      router.push("./loginUser");
    }
  }, []);

  return (
    <React.Fragment>
      <div className="container">
        <div className={style.flexBehaviour}>
          <img
            style={{
              width: "250px",
              height: "250px",
              objectFit: "cover",
              borderRadius: "50%",
            }}
            src={
              userName?.profile_image ||
              "https://cdn.vectorstock.com/i/preview-1x/17/61/male-avatar-profile-picture-vector-10211761.jpg"
            }
            alt=""
          />
          <div style={{ marginLeft: "1rem" }}>
            <h3 style={{ textTransform: "capitalize" }}>{userName?.name}</h3>
            <p>{userName?.email}</p>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "1rem",
              }}
            >
              <Link href="./updateUser">Edit</Link>
              <button
                onClick={() => {
                  localStorage.removeItem("auth-token");
                  router.push("./loginUser");
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default userAccount;
