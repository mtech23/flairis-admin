import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./style.css";

import { AuthLayout } from "../../Components/Layout/AuthLayout";
import CustomInput from "../../Components/CustomInput";
import CustomButton from "../../Components/CustomButton";
import { verifyOTP } from "../../services/authServices";

const ForgetPassword2 = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ code: ["", "", "", ""] });

  useEffect(() => {
    document.title = "Blinds And Shades | Password Recovery";
  }, []);

  const handleClick = async (e) => {
    e.preventDefault();
    document.querySelector(".loaderBox").classList.remove("d-none");

    try {
      const combinedCode = formData.code.join("");
      const response = await verifyOTP(combinedCode);
      console.log("response", response);
      navigate("/forget-password3");
    } catch (error) {
      console.log("error", error);
    } finally {
      document.querySelector(".loaderBox").classList.add("d-none");
    }
  };

  const handleInputChange = (index, value) => {
    const newCode = [...formData.code];
    newCode[index] = value;
    setFormData({ code: newCode });
  };

  console.log("otp", formData);

  return (
    <>
      <AuthLayout
        authTitle="Verification Code"
        authPara="Please Check Your Email For Verification Code."
        subauthPara="Your Code is 4 digit in Length"
        backOption={true}
      >
        <form>
          <div className="inputWrapper">
            <label htmlFor="verificationCode" className="mainLabel">
              Verification Code<span>*</span>
            </label>
          </div>
          <div className="verification-box justify-content-between">
            {formData.code.map((_, index) => (
              <CustomInput
                key={index}
                required
                id={`verificationCode-${index}`}
                type="number"
                labelClass="mainLabel"
                inputClass="mainInput text-center"
                onChange={(event) =>
                  handleInputChange(index, event.target.value)
                }
              />
            ))}
          </div>
          <div className="d-flex align-items-baseline justify-content-between mt-1">
            <p className="text-danger fw-bold">Resending in 00:50</p>
            <button
              type="button"
              className="notButton primaryColor fw-bold text-decoration-underline"
            >
              Resend Code
            </button>
          </div>
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

export default ForgetPassword2;
