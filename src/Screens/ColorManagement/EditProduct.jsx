import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import BackButton from "../../Components/BackButton";
import CustomInput from "../../Components/CustomInput";
import CustomButton from "../../Components/CustomButton";
import { editEntity, updateEntity } from "../../services/commonServices";
import { imgUrl } from "../../utils/convertToFormData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import ImageHandler from "../../Components/ImageHandler/ImageHandler";
import CustomModal from "../../Components/CustomModal";

export const EditColor = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    primary_image: null,
    variations: [],
    is_hidden: 0,
  });

  const [modalHeading, setModalHeading] = useState("");
  const [editState, setEditState] = useState(false);
  const [success, setSuccess] = useState(false);

  const getColorData = async () => {
    try {
      const response = await editEntity(`/admin/edit-color/${id}`);
      const colorData = response.data;

      setFormData(colorData);

      // setImagePreview(`${imgUrl}/${colorData.primary_image}`);
      // setVariationPreviews(
      //   colorData.variations.map((url) => `${imgUrl}/${url}`)
      // );
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getColorData();
  }, []);

  const filehandleChange = ({ event }) => {
    const file = event.target.files[0];
    // setImagePreview(URL.createObjectURL(file));
    setFormData((prevData) => ({
      ...prevData,
      primary_image: file,
    }));
  };

  const handleVariationChange = async ({ file }) => {
    const imgFromData = new FormData();
    imgFromData.append("images[0]", file);
    try {
      const response = await updateEntity(
        `/admin/color-image/add/${id}`,
        imgFromData
      );
      setFormData(response?.data);
    } catch (error) {}

    // const file = event.target.files[0];
    // if (file) {
    //   const newVariations = [...formData.variations];
    //   const newPreviews = [...variationPreviews];
    //   newVariations[index] = file;
    //   newPreviews[index] = URL.createObjectURL(file);
    //   setFormData((prevData) => ({
    //     ...prevData,
    //     variations: newVariations,
    //   }));
    //   setVariationPreviews(newPreviews);
    // }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Check the format of formData before sending
      const formattedData = {
        ...formData,
        variations:
          formData?.variations && formData?.variations?.filter((file) => file), // Remove any null entries
      };

      // Send the data directly or handle the file uploads appropriately
      const response = await updateEntity(
        `/admin/update-color/${id}`,
        formattedData
      );
      setFormData(response.data);
      // navigate(-1);
      setModalHeading("Color updated successfully");
      setSuccess(true);
      setEditState(true);
      setTimeout(() => {
        navigate(-1);
      }, 1500);
      console.log("response", response);
    } catch (error) {
      console.log("error", error);
    }
  };

  console.log("sssss", formData);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(formData);
  };

  const handleDeleteVariationImage = async (image) => {
    const imgFromData = new FormData();
    imgFromData.append("images[0]", image);
    try {
      const response = await updateEntity(
        `/admin/delete-images/${id}`,
        imgFromData
      );
      console.log("response?.data", response?.data);

      setFormData(response?.data);
    } catch (error) {
      console.log("error");
    }
  };
  return (
    <DashboardLayout>
      <div className="dashCard mb-4">
        <div className="row mb-3">
          <div className="col-12 mb-2">
            <h2 className="mainTitle">
              <BackButton />
              Edit Color
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
                        imagePath={formData?.primary_image}
                        showEdit={true}
                        onUpload={filehandleChange}
                      />
                    </div>
                    <div className="col-md-6 mb-4">
                      <CustomInput
                        label="Add Book Title"
                        required
                        id="name"
                        type="text"
                        placeholder="Enter Book Title"
                        labelClass="mainLabel"
                        inputClass="mainInput"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-12 mb-4">
                      <h3>Variation Images</h3>
                      <div className="row">
                        {Array.isArray(formData?.variations) &&
                          formData?.variations?.map((image, index) => (
                            <div
                              className="col-12  col-md-4 col-lg-2 mb-4"
                              key={index}
                            >
                              <ImageHandler
                                key={index}
                                imagePath={image}
                                showDelete={true}
                                onDelete={async () =>
                                  await handleDeleteVariationImage(image)
                                }
                              />
                              {/* <div className="img-box">
                              <img
                                src={variationPreviews[index]}
                                alt={`Variation ${index + 1}`}
                                className="rounded-3 post-images"
                              />
                              <div className="transparent-box">
                                <div className="caption">
                                  <FontAwesomeIcon
                                    icon={faTrash}
                                    onClick={() => {
                                      const newVariations = [
                                        ...formData.variations,
                                      ];
                                      const newPreviews = [
                                        ...variationPreviews,
                                      ];
                                      newVariations.splice(index, 1);
                                      newPreviews.splice(index, 1);
                                      setFormData({
                                        ...formData,
                                        variations: newVariations,
                                      });
                                      setVariationPreviews(newPreviews);
                                    }}
                                  />
                                </div>
                              </div>
                            </div> */}
                            </div>
                          ))}

                        <ImageHandler
                          onUpload={handleVariationChange}
                          showPreview={false}
                        />
                        {/* <div className="col-md-4 mb-4">
                          <input
                            className="hiddenFileInput"
                            id={`variation-${formData.variations.length}`}
                            type="file"
                            onChange={(event) =>
                              handleVariationChange(
                                formData.variations.length,
                                event
                              )
                            }
                          />
                          <FontAwesomeIcon icon={faPlus} />
                        </div> */}
                      </div>
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
        autoClose={true}
        show={editState}
        success={success}
        close={() => setEditState(false)}
        heading={modalHeading}
      ></CustomModal>
    </DashboardLayout>
  );
};
