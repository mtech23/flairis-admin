import { useState, useEffect } from "react";
import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import BackButton from "../../Components/BackButton";
import CustomModal from "../../Components/CustomModal";
import CustomInput from "../../Components/CustomInput";
import { SelectBox } from "../../Components/CustomSelect";
import CustomButton from "../../Components/CustomButton";

import { getEntity, addEntity } from "../../services/commonServices";

import Select from "react-select";
import { useNavigate } from "react-router";
import { imgUrl } from "../../utils/convertToFormData";

export const AddProduct = () => {
  const navigate = useNavigate();
  const [colorOptions, setColorOptions] = useState([]);
  const [addonsOptions, setAddonsOptions] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [modalHeading, setmodalHeading] = useState("");
  const [edit, setEdit] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    image: "",
    staff_users: [],
    color: [],
    addon: [],
    category: [],
    warranty_options: [],
    videos: [],
  });
  const Menu = [
    { id: 0, name: "no" },
    { id: 1, name: "yes " },
  ];
  console.log("Select Menu*", Menu);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [colors, categories, addons] = await Promise.all([
          getEntity("/admin/colors"),
          getEntity("/admin/categories"),
          getEntity("/admin/addons"),
        ]);
        setColorOptions(
          colors.data.map((item) => ({
            value: item.id,
            label: item.title,
            primary_image: `${imgUrl}/${item.primary_image}`,
          }))
        );
        setCategoryOptions(
          categories.data.map((item) => ({ value: item.id, label: item.title }))
        );
        setAddonsOptions(
          addons.data.map((item) => ({ value: item.id, label: item.title }))
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const filehandleChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileName = file;
      setFormData((prevData) => ({
        ...prevData,
        image: fileName,
      }));
    }
  };

  const handleSubmit = async (event) => {
    console.log("formData", formData);
    event.preventDefault();
    // const formDataa = new FormData();
    // for (const key in formData) {
    //   if (Array.isArray(formData[key])) {
    //     formData[key].forEach((value, index) => {
    //       if (key === "warranty_options") {
    //         formDataa.append(`${key}[${index}]`, JSON.stringify(value));
    //       } else if (key != "warranty_options") {
    //         console.log("warranty_options");
    //         formDataa.append(`${key}[${index}]`, value);
    //       }
    //     });
    //   } else {
    //     formDataa.append(key, formData[key]);
    //   }
    // }
    try {
      const response = await addEntity("/admin/add-product", formData);
      if (response.status) {
        console.log("response before if", response.status);
        setmodalHeading("product added");
        setSuccess(true);
        setEdit(true);
        setTimeout(() => {
          navigate(-1);
        }, 1500);
      } else if (!response.status) {
        console.log("response before if", response.status);
        setmodalHeading("error adding product ");
        setSuccess(false);
        setEdit(true);
      }
    } catch (error) {
      // console.log("response before if", response.status);
      setmodalHeading("error adding product ");
      setSuccess(false);
      setEdit(true);
      // console.error("Error submitting form:", error);
      // alert("error", error.message);

      console.error("Error submitting form:", error);
    }
    // finally {
    //   setTimeout(() => {
    //     navigate(-1);
    //   }, 1500);
    // }
  };

  const handleChangePrevSubSelect = (name) => (selectedData) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: selectedData ? selectedData.map((item) => item.value) : [],
    }));
  };

  const getSelectedOptions = (options, selectedIds) => {
    return options.filter((option) => selectedIds?.includes(option.value));
  };
  const handleWarrantyOptionChange = (index, event) => {
    const { name, value } = event.target;
    setFormData((prevData) => {
      const updatedWarrantyOptions = [...prevData.warranty_options];
      updatedWarrantyOptions[index] = {
        ...updatedWarrantyOptions[index],
        [name]: value,
      };
      return {
        ...prevData,
        warranty_options: updatedWarrantyOptions,
      };
    });
  };

  const addWarrantyOption = (event) => {
    event.preventDefault();
    setFormData((prevData) => ({
      ...prevData,
      warranty_options: [
        ...prevData.warranty_options,
        { title: "", price: "" },
      ],
    }));
  };
  console.log("is_stock", formData.is_stock);

  const formatOptionLabel = ({ value, label, isSelected, primary_image }) => {
    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        {
          <img
            src={primary_image}
            alt={value}
            className="selectImage"
            style={{ marginRight: "8px", width: "20px", height: "20px" }}
          />
        }
        <span>{label}</span>
      </div>
    );
  };
  const handleVideoChange = (index, event) => {
    const { value } = event.target;
    setFormData((prevData) => {
      const updatedVideos = [...prevData.videos];
      updatedVideos[index] = value;
      return {
        ...prevData,
        videos: updatedVideos,
      };
    });
  };

  const addVideoLink = (event) => {
    event.preventDefault();
    setFormData((prevData) => ({
      ...prevData,
      videos: [...prevData.videos, ""], // Add an empty string for the new video link
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
                Add New Product
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
                          label="Add Product Name"
                          required
                          id="name"
                          type="text"
                          placeholder="Enter Product Name"
                          labelClass="mainLabel"
                          inputClass="mainInput"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-md-6 mb-4">
                        <CustomInput
                          label="short desc"
                          required
                          id="short_desc"
                          type="text"
                          placeholder="Enter Product Name"
                          labelClass="mainLabel"
                          inputClass="mainInput"
                          name="short_desc"
                          value={formData.short_desc}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-md-6 mb-4">
                        <CustomInput
                          label="long desc"
                          required
                          id="long_desc"
                          type="text"
                          placeholder="Enter Product Name"
                          labelClass="mainLabel"
                          inputClass="mainInput"
                          name="long_desc"
                          value={formData.long_desc}
                          onChange={handleChange}
                        />
                      </div>
                      {/* <div className="col-md-6 mb-4">
                        <CustomInput
                          label="video link"
                          required
                          id="videos"
                          type="text"
                          placeholder="Enter Product Name"
                          labelClass="mainLabel"
                          inputClass="mainInput"
                          name="videos"
                          value={formData.videos}
                          onChange={handleChange}
                        />
                      </div> */}
                      <div className="col-md-6 mb-4">
                        <CustomInput
                          label="shipping desc"
                          required
                          id="videos"
                          type="text"
                          placeholder="Enter Product Name"
                          labelClass="mainLabel"
                          inputClass="mainInput"
                          name="shipping_desc"
                          value={formData.shipping_desc}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-md-6 mb-4">
                        <CustomInput
                          label="product max width"
                          required
                          id="width_max"
                          type="number"
                          placeholder="Enter Product Name"
                          labelClass="mainLabel"
                          inputClass="mainInput"
                          name="width_max"
                          value={formData.width_max}
                          onChange={handleChange}
                        />
                      </div>{" "}
                      <div className="col-md-6 mb-4">
                        <CustomInput
                          label="product min width"
                          required
                          id="width_min"
                          type="number"
                          placeholder="Enter Product Name"
                          labelClass="mainLabel"
                          inputClass="mainInput"
                          name="width_min"
                          value={formData.width_min}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-md-6 mb-4">
                        <CustomInput
                          label="product max height"
                          required
                          id="height_max"
                          type="number"
                          placeholder="Enter Product Name"
                          labelClass="mainLabel"
                          inputClass="mainInput"
                          name="height_max"
                          value={formData.height_max}
                          onChange={handleChange}
                        />
                      </div>{" "}
                      <div className="col-md-6 mb-4">
                        <CustomInput
                          label="product min height"
                          required
                          id="height_min"
                          type="number"
                          placeholder="Enter Product Name"
                          labelClass="mainLabel"
                          inputClass="mainInput"
                          name="height_min"
                          value={formData.height_min}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-md-6 mb-4">
                        <CustomInput
                          label="Enter price"
                          required
                          id="price"
                          type="number"
                          placeholder="Enter price"
                          labelClass="mainLabel"
                          inputClass="mainInput"
                          name="price"
                          value={formData.price}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-md-6 mb-4">
                        <SelectBox
                          selectClass="mainInput"
                          name="is_hidden"
                          label="is hidden"
                          placeholder="is hidden"
                          required
                          value={formData.is_hidden}
                          option={Menu}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-md-6 mb-4">
                        <SelectBox
                          selectClass="mainInput"
                          name="is_stock"
                          label="is stock item"
                          placeholder="select "
                          required
                          value={formData.is_stock}
                          option={Menu}
                          onChange={handleChange}
                        />
                      </div>
                      {formData.is_stock == 1 && (
                        <div className="col-md-6 mb-4">
                          <CustomInput
                            label="Stock value"
                            required
                            id="height_min"
                            type="number"
                            placeholder="Enter Product Stock value"
                            labelClass="mainLabel"
                            inputClass="mainInput"
                            name="stock_value"
                            value={formData.stock_value}
                            onChange={handleChange}
                          />
                        </div>
                      )}
                      <div className="col-md-6 mb-4">
                        <SelectBox
                          selectClass="mainInput"
                          name="shipping"
                          label="shipping"
                          placeholder="select "
                          required
                          value={formData.shipping}
                          option={Menu}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-md-6 mb-4">
                        <SelectBox
                          selectClass="mainInput"
                          name="Menu"
                          label="is kid friendly"
                          placeholder="is hidden"
                          required
                          value={formData.Menu}
                          option={Menu}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-md-6 mb-4">
                        <CustomInput
                          label="Upload Product Image"
                          required
                          id="file"
                          type="file"
                          labelClass="mainLabel"
                          inputClass="mainInput"
                          name="image"
                          onChange={filehandleChange}
                        />
                      </div>
                      <div className="col-md-6 mb-4">
                        <label className="mainLabel">Select Colors</label>
                        <Select
                          isMulti
                          name="colors"
                          options={colorOptions}
                          value={getSelectedOptions(
                            colorOptions,
                            formData.color
                          )}
                          className="basic-multi-select mainInput"
                          classNamePrefix="select"
                          onChange={handleChangePrevSubSelect("color")}
                          formatOptionLabel={formatOptionLabel}
                        />
                      </div>
                      <div className="col-md-6 mb-4">
                        <label className="mainLabel">Select Categories</label>
                        <Select
                          isMulti
                          name="categories"
                          options={categoryOptions}
                          value={getSelectedOptions(
                            categoryOptions,
                            formData.category
                          )}
                          className="basic-multi-select mainInput"
                          classNamePrefix="select"
                          onChange={handleChangePrevSubSelect("category")}
                        />
                      </div>
                      <div className="col-md-6 mb-4">
                        <label className="mainLabel">Select Addons</label>
                        <Select
                          isMulti
                          name="addons"
                          options={addonsOptions}
                          value={getSelectedOptions(
                            addonsOptions,
                            formData.addon
                          )}
                          className="basic-multi-select mainInput"
                          classNamePrefix="select"
                          onChange={handleChangePrevSubSelect("addon")}
                        />
                      </div>
                      <section class="accordion">
                        <input type="checkbox" name="collapse2" id="handle3" />
                        <h2 class="handle">
                          <label for="handle3" className="dropdownLabel">
                            Add warranty options{" "}
                          </label>
                        </h2>
                        <div class="content">
                          {formData.warranty_options.map((option, index) => (
                            <div key={index} className="row">
                              <div className="col-md-6 ">
                                <CustomInput
                                  label="Title"
                                  required
                                  id={`title-${index}`}
                                  type="text"
                                  placeholder="Enter Title"
                                  labelClass="mainLabel p-1"
                                  inputClass="mainInput"
                                  name="title"
                                  value={option.title}
                                  onChange={(event) =>
                                    handleWarrantyOptionChange(index, event)
                                  }
                                />
                              </div>
                              <div className="col-md-6 ">
                                <CustomInput
                                  label="Price"
                                  required
                                  id={`price-${index}`}
                                  type="text"
                                  placeholder="Enter Price"
                                  labelClass="mainLabel p-1"
                                  inputClass="mainInput"
                                  name="price"
                                  value={option.price}
                                  onChange={(event) =>
                                    handleWarrantyOptionChange(index, event)
                                  }
                                />
                              </div>
                            </div>
                          ))}
                          <div className="col-md-3 mb-2">
                            <div className="addUser">
                              <CustomButton
                                btnClass="primaryBtn"
                                text="Add Warranty Option"
                                // variant="primaryButton"
                                onClick={addWarrantyOption}
                              />
                              {/* <CustomInput
                        type="text"
                        placeholder="Search Here..."
                        value={inputValue}
                        inputClass="mainInput"
                        onChange={handleChange}
                      /> */}
                            </div>
                          </div>
                        </div>
                      </section>
                      <section className="accordion">
                        <input
                          type="checkbox"
                          name="collapseVideos"
                          id="handleVideos"
                        />
                        <h2 className="handle">
                          <label
                            htmlFor="handleVideos"
                            className="dropdownLabel"
                          >
                            Add Video Links
                          </label>
                        </h2>
                        <div className="content">
                          {formData.videos.map((video, index) => (
                            <div key={index} className="row">
                              <div className="col-md-12 mb-2">
                                <CustomInput
                                  label={`Video Link ${index + 1}`}
                                  required
                                  id={`video-${index}`}
                                  type="text"
                                  placeholder="Enter Video Link"
                                  labelClass="mainLabel"
                                  inputClass="mainInput"
                                  name={`video-${index}`}
                                  value={video}
                                  onChange={(event) =>
                                    handleVideoChange(index, event)
                                  }
                                />
                              </div>
                            </div>
                          ))}
                          <div className="col-md-3 mb-2">
                            <div className="addUser">
                              <CustomButton
                                btnClass="primaryBtn"
                                text="Add Video Link"
                                onClick={addVideoLink}
                              />
                            </div>
                          </div>
                        </div>
                      </section>
                    </div>
                    <CustomButton
                      btnClass="primaryBtn"
                      variant="primaryButton"
                      text="Add Product"
                      type="submit"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
          <CustomModal
            autoClose={false}
            show={edit}
            success={success}
            close={() => setEdit(false)}
            heading={modalHeading}
          ></CustomModal>
        </div>
      </DashboardLayout>
    </>
  );
};
