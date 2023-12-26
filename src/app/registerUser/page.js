"use client";
import React, { useRef, useState } from "react";
import InputField from "@/components/inputField";
import style from "@/styles/page.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";

const registerUser = () => {
  const router = useRouter();
  const [imageThumbnail, setImageThumbnail] = useState(null);
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

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

    const tempData = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      profile_image: imageThumbnail,
    };

    const apiUrl = "http://localhost:5000/users";

    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tempData),
    })
      .then((response) => {
        if (response.ok) {
          console.log(response);
          console.log("pushed");
        } else {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        console.log(response.json());
        // return response.json();
      })
      .then((data) => {
        console.log("Data posted successfully:", data);
        // Assuming your server responds with the created resource
        // You can access the created resource in the 'data' variable
        router.push("./loginUser");
      })
      .catch((error) => {
        console.error("Error posting data:", error);
      });

    console.log(tempData);
  };

  return (
    <React.Fragment>
      <div className={style.loginWrapper}>
        <form className="card w-50" onSubmit={handleSubmit}>
          <h4>Sign Up</h4>
          <InputField type="text" placeholder="Name" inputRef={nameRef} />
          <InputField type="email" placeholder="Email" inputRef={emailRef} />
          <InputField
            type="password"
            placeholder="Password"
            inputRef={passwordRef}
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
            <p className={style.textBody1}>Already have an account?</p>
            <Link href="./loginUser" className={style.textSubtitle2}>
              Sign In
            </Link>
          </div>
          <button className={`btn ${style.secondarySocialBtn}`}>Sign Up</button>
        </form>
      </div>
    </React.Fragment>
  );
};

export default registerUser;
