import { useState } from "react";
import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import BackButton from "../../Components/BackButton";
import CustomModal from "../../Components/CustomModal";
import CustomInput from "../../Components/CustomInput";
import CustomButton from "../../Components/CustomButton";
import { addEntity } from "../../services/commonServices";
import { useNavigate } from "react-router";
import ImageHandler from "../../Components/ImageHandler/ImageHandler";

export const AddColor = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    primary_image: "",
    is_hidden: 0,
    variations: [], // Array to hold variation images
  });

  const [modalHeading, setModalHeading] = useState("");
  const [addState, setAddState] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const filehandleChange = ({ event }, index = null) => {
    const file = event.target.files[0];
    if (file) {
      if (index === null) {
        // If no index is passed, it means the file is for the primary image
        setFormData((prevData) => ({
          ...prevData,
          primary_image: file,
        }));
      } else {
        // If an index is passed, update the specific variation image
        const updatedVariations = [...formData.variations];
        updatedVariations[index] = file;
        setFormData((prevData) => ({
          ...prevData,
          variations: updatedVariations,
        }));
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await addEntity("admin/add-color", formData);
      setModalHeading("Color added successfully");
      setSuccess(true);
      setAddState(true);
      setTimeout(() => {
        navigate(-1);
      }, 1500);
      console.log("response", response);
    } catch (error) {
      console.log("error", error);
    }
  };

  const addVariationOption = (e) => {
    e.preventDefault();
    setFormData((prevData) => ({
      ...prevData,
      variations: [...prevData.variations, ""], // Add an empty string as a placeholder for the new variation image
    }));
  };

  return (
    <>
      <DashboardLayout>
        <div className="dashCard mb-4">
          <div className="row mb-3">
            <div className="col-12 mb-2">
              <h2 className="mainTitle">
                <BackButton />
                Add New Color
              </h2>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-12">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="row">
                      <div className="col-md-12 mb-4">
                        <ImageHandler
                          onUpload={filehandleChange}
                          text={"Primary Image "}
                          showEdit={true}
                        />
                      </div>
                      <div className="col-md-6 mb-4">
                        <CustomInput
                          label="Title"
                          required
                          id="name"
                          type="text"
                          placeholder="Enter Product Name"
                          labelClass="mainLabel"
                          inputClass="mainInput"
                          name="title"
                          value={formData.title}
                          onChange={handleChange}
                        />
                      </div>
                      {formData?.variations?.map((variation, index) => (
                        <div className="col-md-6 mb-4" key={index}>
                          <CustomInput
                            label={`Upload Variation Image ${index + 1}`}
                            required
                            id={`variation_${index}`}
                            type="file"
                            labelClass="mainLabel"
                            inputClass="mainInput"
                            name={`variation_${index}`}
                            onChange={(e) =>
                              filehandleChange({ event: e }, index)
                            }
                          />
                        </div>
                      ))}
                      <div className="col-md-12 mb-4">
                        <CustomButton
                          onClick={addVariationOption}
                          variant="primaryButton"
                          text="Add Variation Image"
                        />
                      </div>
                      <div className="col-md-12">
                        <CustomButton
                          variant="primaryButton"
                          text="Submit"
                          type="submit"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <CustomModal
          show={showModal}
          close={() => {
            setShowModal(false);
          }}
          success
          heading="Color added Successfully."
        />

        <CustomModal
          autoClose={true}
          show={addState}
          success={success}
          close={() => setAddState(false)}
          heading={modalHeading}
        ></CustomModal>
      </DashboardLayout>
    </>
  );
};
