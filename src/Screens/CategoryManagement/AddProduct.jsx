import { useState, useEffect } from "react";
import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import BackButton from "../../Components/BackButton";
import CustomModal from "../../Components/CustomModal";
import CustomInput from "../../Components/CustomInput";
import { SelectBox } from "../../Components/CustomSelect";
import CustomButton from "../../Components/CustomButton";
import {
  CategoryList,
  DietaryList,
  MenuList,
} from "../../Components/CategoryList";
import { useNavigate } from "react-router";
import { addEntity } from "../../services/commonServices";
import ImageHandler from "../../Components/ImageHandler/ImageHandler";
export const AddCategory = () => {
  const navigate = useNavigate();
  const [unit, setUnit] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    image: "", // Initialize image as an empty string
    is_hidden: 0,
  });

  const [modalHeading, setModalHeading] = useState("");
  const [edit, setEdit] = useState(false);
  const [success, setSuccess] = useState(false);

  const categories = CategoryList();
  const dietary = DietaryList();
  const Menu = MenuList();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(formData);
  };

  const filehandleChange = ({ event }) => {
    const file = event.target.files[0];
    // console.log(file.name)
    if (file) {
      const fileName = file;
      setFormData((prevData) => ({
        ...prevData,
        image: fileName,
      }));
    }
    console.log(formData);
  };

  const LogoutData = localStorage.getItem("accessToken");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await addEntity("/admin/add-category", formData);
      setModalHeading("Category Added successfully");
      setSuccess(true);
      setEdit(true);
      console.log("response", response);
      setTimeout(() => {
        navigate(-1);
      }, 1500);
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <>
      <DashboardLayout>
        <div className="dashCard mb-4">
          <div className="row mb-3">
            <div className="col-12 mb-2">
              <h2 className="mainTitle">
                <BackButton />
                Add New Category
              </h2>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-12">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <CustomInput
                          label="Title"
                          required
                          id="name"
                          type="text"
                          placeholder="Enter title"
                          labelClass="mainLabel"
                          inputClass="mainInput"
                          name="title"
                          value={formData.title}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-md-6 mb-4">
                        <CustomInput
                          label="Short description"
                          required
                          id="price"
                          type="text"
                          placeholder="Enter short description"
                          labelClass="mainLabel"
                          inputClass="mainInput"
                          name="description"
                          value={formData.description}
                          onChange={handleChange}
                        />
                      </div>

                      {/* <div className="col-md-12 mb-4">
                        <div className="inputWrapper">
                          <div className="form-controls">
                            <label htmlFor="">Long Description</label>
                            <textarea
                              name="long_description"
                              className="form-control shadow border-0"
                              id=""
                              cols="30"
                              rows="10"
                              value={formData.description}
                              onChange={handleChange}
                            ></textarea>
                          </div>
                        </div>
                      </div> */}
                      <div className="col-md-6 mb-4">
                        <ImageHandler
                          onUpload={filehandleChange}
                          showEdit={true}
                          text={"category Image"}
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
        <CustomModal show={false} close={false} heading="edit Blog">
          <div className="row">
            <div className="col-lg-12">
              <div className="row">
                <div className="col-md-6 mb-4">
                  <CustomInput
                    label="Title"
                    required
                    id="name"
                    type="text"
                    placeholder="Enter Blog Title"
                    labelClass="mainLabel"
                    inputClass="mainInput"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6 mb-4">
                  <CustomInput
                    label="Short description"
                    required
                    id="price"
                    type="text"
                    placeholder="Enter short description"
                    labelClass="mainLabel"
                    inputClass="mainInput"
                    name="short_description"
                    value={formData.product_price}
                    onChange={handleChange}
                  />
                </div>
                {/* <div className="col-md-6 mb-4">
                        <SelectBox
                          selectClass="mainInput"
                          name="category_id"
                          label="Select Category"
                          placeholder="Select Category"
                          required
                          value={formData.category_id}
                          option={categories}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-md-6 mb-4">
                        <SelectBox
                          selectClass="mainInput"
                          name="dietary_id"
                          label="Select Dietary"
                          placeholder="Select Dietary"
                          required
                          value={formData.dietary_id}
                          option={dietary}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-md-6 mb-4">
                        <SelectBox
                          selectClass="mainInput"
                          name="menu_id"
                          label="Select Menu"
                          placeholder="Select Menu"
                          required
                          value={formData.menu_id}
                          option={Menu}
                          onChange={handleChange}
                        />
                      </div> */}
                <div className="col-md-12 mb-4">
                  <div className="inputWrapper">
                    <div className="form-controls">
                      <label htmlFor="">Long Description</label>
                      <textarea
                        name="long_description"
                        className="form-control shadow border-0"
                        id=""
                        cols="30"
                        rows="10"
                        value={formData.description}
                        onChange={handleChange}
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mb-4">
                  <CustomInput
                    label="Image"
                    required
                    id="file"
                    type="file"
                    labelClass="mainLabel"
                    inputClass="mainInput"
                    name="image"
                    // value={formData.image}
                    onChange={filehandleChange}
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
        </CustomModal>
        <CustomModal
          show={showModal}
          close={() => {
            setShowModal(false);
          }}
          success
          heading="Book added Successfully."
        />
        <CustomModal
          autoClose={true}
          show={edit}
          success={success}
          close={() => setEdit(false)}
          heading={modalHeading}
        ></CustomModal>
      </DashboardLayout>
    </>
  );
};
