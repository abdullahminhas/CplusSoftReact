"use client";
import React, { useEffect, useState } from "react";
import style from "@/styles/home.module.css";
import Link from "next/link";

export default function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/users/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setUsers(result);
      });
  }, []);

  useEffect(() => {
    console.log(users);
  }, [users]);

  return (
    <React.Fragment>
      <div className={style.homeFlexWrapper}>
        {users.length ? (
          users.map((user, index) => (
            <div key={index} className={style.homeItemFlex}>
              <img
                style={{
                  width: "100px",
                  aspectRatio: "1/1",
                  objectFit: "cover",
                  borderRadius: "50%",
                }}
                src={user.profile_image}
                alt=""
              />
              <div style={{ marginLeft: "1rem" }}>
                <h3 style={{ textTransform: "capitalize" }}>{user?.name}</h3>
                <p>{user?.email}</p>
              </div>
            </div>
          ))
        ) : (
          <div className={style.card}>No Data found, please login</div>
        )}

        <div className={style.horizontalDivider}></div>
        <div className={style.rowFlex}>
          <Link href="/loginUser">Login</Link>
          <Link href="/registerUser">Sign Up</Link>
        </div>
      </div>
    </React.Fragment>
  );
}
