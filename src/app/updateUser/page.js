"use client";
import React, { useContext, useRef, useEffect, useState } from "react";
import InputField from "@/components/inputField";
import style from "@/styles/page.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AppContext } from "@/context/appContext";

const updateUser = () => {
  const router = useRouter();
  const { userName, setUserName } = useContext(AppContext);
  const [imageThumbnail, setImageThumbnail] = useState(null);
  const nameRef = useRef();
  const emailRef = useRef();
  const fileRef = useRef();

  useEffect(() => {
    const token = localStorage.getItem("auth-token");

    if (!token) {
      router.push("./loginUser");
    }
  }, []);

  const handleImageThumbnailUpload = (event) => {
    const file = event.target.files[0]; // Access the selected file

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageData = e.target.result;
        console.log(imageData);
        setImageThumbnail(imageData);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const token = localStorage.getItem("auth-token");

    const tempData = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      profile_image: imageThumbnail || userName.profile_image,
    };

    fetch("http://localhost:5000/user/me", {
      method: "PUT", // or 'PUT'
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Accept: "application/json",
        authorization: `${token}`,
      },
      body: JSON.stringify(tempData),
    })
      .then((data) => {
        console.log(data);
        console.log("done");
        setUserName(tempData);
        router.push("./userAccount");
      })
      .catch((error) => console.error(error));

    console.log(tempData);
  };

  const handleDelete = async () => {
    const token = localStorage.getItem("auth-token");
    try {
      await fetch("http://localhost:5000/user/me", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Accept: "application/json",
          authorization: `${token}`,
        },
      });
      console.log("User deleted successfully");
      setUserName(null); // Clear user data after deletion
      localStorage.removeItem("auth-token");
      router.push("./loginUser");
    } catch (error) {
      console.error("Error deleting user data:", error.message);
    }
  };

  return (
    <React.Fragment>
      <div className={style.loginWrapper}>
        <form className="card w-50" onSubmit={handleSubmit}>
          <h4>Update User</h4>
          <img
            src={
              imageThumbnail ||
              userName?.profile_image ||
              "https://cdn.vectorstock.com/i/preview-1x/17/61/male-avatar-profile-picture-vector-10211761.jpg"
            }
            style={{
              width: "150px",
              height: "150px",
              objectFit: "cover",
              borderRadius: "50%",
              display: "block",
              margin: "auto",
            }}
            alt=""
          />
          <InputField
            type="text"
            placeholder="Name"
            inputRef={nameRef}
            defaultValue={userName?.name}
          />
          <InputField
            type="email"
            placeholder="Email"
            inputRef={emailRef}
            defaultValue={userName?.email}
          />
          <div>
            <small style={{ display: "block", marginBottom: "0.35rem" }}>
              Upload Photo
            </small>
            <input type="file" onChange={handleImageThumbnailUpload} />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <p className={style.textBody1}>Don't want to update?</p>
            <Link href="./userAccount" className={style.textSubtitle2}>
              Go back
            </Link>
          </div>
          <button className={`btn ${style.secondarySocialBtn}`}>Update</button>
          <button
            className={`btn ${style.dangerSocialBtn}`}
            onClick={handleDelete}
            type="button"
          >
            Delete
          </button>
        </form>
      </div>
    </React.Fragment>
  );
};

export default updateUser;
