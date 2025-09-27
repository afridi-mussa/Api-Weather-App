import React from "react";
import "./ErrorMessage.css";

const ErrorMessage = ({ message }) => {
  return <div className="error-box">⚠️ {message}</div>;
};

export default ErrorMessage;
