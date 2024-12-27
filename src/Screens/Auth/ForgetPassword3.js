import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { AuthLayout } from "../../Components/Layout/AuthLayout";
import CustomInput from "../../Components/CustomInput";
import CustomButton from "../../Components/CustomButton";
import CustomModal from "../../Components/CustomModal";
import { resetPassword } from "../../services/authServices";

import "./style.css";

const ForgetPassword3 = () => {
  const navigate = useNavigate();
  const [formData, setformData] = useState({
    password: "",
    password_confirmation: "",
  });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    document.title = "Blinds And Shades | Password Recovery";
  }, []);

  const handleClick = async () => {
    console.log("formData", formData);

    try {
      document.querySelector(".loaderBox").classList.remove("d-none");

      const response = await resetPassword(
        formData.password,
        formData.password_confirmation
      );
      console.log("password_confirmation", response);
      setShowModal(true);
    } catch (error) {
      document.querySelector(".loaderBox").classList.add("d-none");

      console.log("error", error);
    } finally {
      document.querySelector(".loaderBox").classList.add("d-none");
    }
  };

  const redirectHome = async () => {
    setShowModal(false);
    navigate("/login");
  };
  return (
    <>
      <AuthLayout
        authTitle="Password Recovery"
        authPara="Enter a new password."
        backOption={true}
      >
        <form>
          <CustomInput
            label="New Password"
            required
            id="pass"
            type="password"
            placeholder="Enter New Password"
            labelClass="mainLabel"
            inputClass="mainInput"
            onChange={(e) =>
              setformData({ ...formData, password: e.target.value })
            }
          />
          <CustomInput
            label="Confirm Password"
            required
            id="cPass"
            type="password"
            placeholder="Confirm Password"
            labelClass="mainLabel"
            inputClass="mainInput"
            onChange={(e) =>
              setformData({
                ...formData,
                password_confirmation: e.target.value,
              })
            }
          />

          <div className="mt-4 text-center">
            <CustomButton
              type="button"
              variant="primaryButton"
              text="Update"
              onClick={handleClick}
            />
          </div>
        </form>
      </AuthLayout>

      <CustomModal
        show={showModal}
        success
        heading="Password updated successfully. Please login to continue"
        close={redirectHome}
        btnTxt="Continue"
      />
    </>
  );
};

export default ForgetPassword3;
