import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./style.css";

import { AuthLayout } from "../../Components/Layout/AuthLayout";
import CustomInput from "../../Components/CustomInput";
import CustomButton from "../../Components/CustomButton";
import { forgotPassword } from "../../services/authServices";

const ForgetPassword = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({});

  useEffect(() => {
    document.title = "Blinds And Shades | Password Recovery";
  }, []);

  const handleClick = async (e) => {
    e.preventDefault();
    document.querySelector(".loaderBox").classList.remove("d-none");

    try {
      const response = await forgotPassword(formData.email);
      console.log("response", response);
      localStorage.setItem("email", response.data.email);
      navigate("/forget-password2");
    } catch (error) {
      document.querySelector(".loaderBox").classList.add("d-none");

      console.log("error", error);
    } finally {
      document.querySelector(".loaderBox").classList.add("d-none");
    }
  };

  return (
    <>
      <AuthLayout
        authTitle="Password Recovery"
        authPara="Enter your email address to receive a verification code."
        backOption={true}
      >
        <form>
          <CustomInput
            label="Email Address"
            required
            id="userEmail"
            type="email"
            // name='email'
            placeholder="Enter Your Email Address"
            labelClass="mainLabel"
            inputClass="mainInput"
            onChange={(event) => {
              setFormData({ ...formData, email: event.target.value });
            }}
          />
          <div className="mt-4 text-center">
            <CustomButton
              type="button"
              variant="primaryButton"
              text="Continue"
              onClick={handleClick}
            />
          </div>
        </form>
      </AuthLayout>
    </>
  );
};

export default ForgetPassword;
