"use Client";
import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import style from "@/styles/page.module.css";
import { AppContext } from "@/context/appContext";

const inputField = ({ type, placeholder, inputRef, defaultValue }) => {
  const { showError } = useContext(AppContext);
  const [showPassword, setShowPassword] = useState(false);
  const value = defaultValue ? defaultValue : "";

  return (
    <div
      className={
        showError
          ? `${style.formControl} ${style.formControlDanger}`
          : style.formControl
      }
    >
      {type === "email" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M16 12C16 10.9391 15.5786 9.92172 14.8284 9.17158C14.0783 8.42143 13.0609 8 12 8C10.9391 8 9.92172 8.42143 9.17158 9.17158C8.42143 9.92172 8 10.9391 8 12C8 13.0609 8.42143 14.0783 9.17158 14.8284C9.92172 15.5786 10.9391 16 12 16C13.0609 16 14.0783 15.5786 14.8284 14.8284C15.5786 14.0783 16 13.0609 16 12ZM16 12V13.5C16 14.163 16.2634 14.7989 16.7322 15.2678C17.2011 15.7366 17.837 16 18.5 16C19.163 16 19.7989 15.7366 20.2678 15.2678C20.7366 14.7989 21 14.163 21 13.5V12C21 10.22 20.4722 8.47991 19.4832 6.99987C18.4943 5.51983 17.0887 4.36628 15.4442 3.68509C13.7996 3.0039 11.99 2.82567 10.2442 3.17294C8.49836 3.5202 6.89472 4.37737 5.63604 5.63604C4.37737 6.89472 3.5202 8.49836 3.17294 10.2442C2.82567 11.99 3.0039 13.7996 3.68509 15.4442C4.36628 17.0887 5.51983 18.4943 6.99987 19.4832C8.47991 20.4722 10.22 21 12 21C13.5802 21.0016 15.1327 20.5862 16.5 19.794"
            stroke="#6B7280"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : type === "text" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M10 19H12M12 19H14M12 19V5M12 5H6V6M12 5H18V6"
            stroke="#6B7280"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M12 15V17M6 21H18C18.5304 21 19.0391 20.7893 19.4142 20.4142C19.7893 20.0391 20 19.5304 20 19V13C20 12.4696 19.7893 11.9609 19.4142 11.5858C19.0391 11.2107 18.5304 11 18 11H6C5.46957 11 4.96086 11.2107 4.58579 11.5858C4.21071 11.9609 4 12.4696 4 13V19C4 19.5304 4.21071 20.0391 4.58579 20.4142C4.96086 20.7893 5.46957 21 6 21ZM16 11V7C16 5.93913 15.5786 4.92172 14.8284 4.17157C14.0783 3.42143 13.0609 3 12 3C10.9391 3 9.92172 3.42143 9.17157 4.17157C8.42143 4.92172 8 5.93913 8 7V11H16Z"
            stroke="#6B7280"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}

      <input
        type={showPassword ? `text` : type}
        placeholder={placeholder}
        ref={inputRef}
        defaultValue={value}
      />
      {type === "password" && (
        <button
          className="btn p-0"
          type="button"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="18"
              viewBox="0 0 20 18"
              fill="none"
            >
              <path
                d="M18.7994 8.21558L19.6768 7.73577L18.7994 8.21558ZM18.7994 9.78456L19.6768 10.2644L18.7994 9.78456ZM1.20058 8.21544L2.07795 8.69526L1.20058 8.21544ZM1.20057 9.78442L0.323197 10.2642L0.323197 10.2642L1.20057 9.78442ZM17.6981 5.13007C17.3027 4.74451 16.6696 4.75251 16.284 5.14794C15.8985 5.54336 15.9065 6.17648 16.3019 6.56204L17.6981 5.13007ZM7.74837 13.7175C7.21339 13.5803 6.66851 13.9028 6.53134 14.4378C6.39416 14.9727 6.71665 15.5176 7.25163 15.6548L7.74837 13.7175ZM12.604 3.34114L12.3452 4.30707L12.604 3.34114ZM5.07264 13.7089L4.58078 14.5796L5.64878 12.8915L5.07264 13.7089ZM2.07795 8.69526C3.60871 5.89624 6.58274 4 9.99997 4V2C5.82397 2 2.1913 4.31981 0.323217 7.73562L2.07795 8.69526ZM17.9221 9.30474C16.3913 12.1038 13.4173 14 10 14V16C14.176 16 17.8087 13.6802 19.6768 10.2644L17.9221 9.30474ZM17.9221 8.69539C18.026 8.88542 18.026 9.11471 17.9221 9.30474L19.6768 10.2644C20.1077 9.47639 20.1077 8.52377 19.6768 7.73577L17.9221 8.69539ZM0.323217 7.73562C-0.107732 8.52361 -0.107739 9.47623 0.323197 10.2642L2.07794 9.30461C1.97402 9.11458 1.97402 8.8853 2.07795 8.69526L0.323217 7.73562ZM16.3019 6.56204C16.9425 7.18668 17.49 7.90542 17.9221 8.69539L19.6768 7.73577C19.1486 6.76984 18.4798 5.89223 17.6981 5.13007L16.3019 6.56204ZM10 14C9.22131 14 8.46704 13.9017 7.74837 13.7175L7.25163 15.6548C8.13125 15.8803 9.05237 16 10 16V14ZM9.99997 4C10.8125 4 11.5985 4.10699 12.3452 4.30707L12.8628 2.37522C11.9488 2.1303 10.9889 2 9.99997 2V4ZM4.09358 11.8014C3.28126 11.0981 2.59643 10.2527 2.07794 9.30461L0.323197 10.2642C0.957107 11.4234 1.79346 12.4554 2.78453 13.3134L4.09358 11.8014ZM5.56451 12.8382C5.03935 12.5415 4.54675 12.1937 4.09358 11.8014L2.78453 13.3134C3.33758 13.7922 3.93905 14.217 4.58078 14.5796L5.56451 12.8382ZM2.86292 13.3748L4.4965 14.5262L5.64878 12.8915L4.0152 11.74L2.86292 13.3748ZM12.3452 4.30707C13.0427 4.49396 13.7069 4.76235 14.3271 5.10153L15.2868 3.34681C14.5287 2.93223 13.7163 2.6039 12.8628 2.37522L12.3452 4.30707Z"
                fill="#6B7280"
              />
              <path
                d="M17.4648 1.46484L2.46484 16.4648"
                stroke="#6B7280"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7 9C7 7.34315 8.34315 6 10 6"
                stroke="#6B7280"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="14"
              viewBox="0 0 20 14"
              fill="none"
            >
              <path
                d="M1.20057 7.78442C0.933139 7.2954 0.933144 6.70445 1.20058 6.21544C2.9 3.10803 6.20336 1 9.99997 1C13.7966 1 17.1 3.10809 18.7994 6.21558C19.0669 6.7046 19.0669 7.29555 18.7994 7.78456C17.1 10.892 13.7966 13 10 13C6.20336 13 2.89997 10.8919 1.20057 7.78442Z"
                stroke="#6B7280"
                strokeWidth="2"
              />
              <circle cx="10" cy="7" r="3" stroke="#6B7280" strokeWidth="2" />
            </svg>
          )}
        </button>
      )}
    </div>
  );
};

inputField.propTypes = {
  type: PropTypes.string.isRequired, // Specify the input type (e.g., 'text', 'email', 'password', etc.)
  placeholder: PropTypes.string,
  inputRef: PropTypes.object, // Ref for accessing the input value
};

export default inputField;
