import { useState, useEffect } from "react";
import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import BackButton from "../../Components/BackButton";
import CustomInput from "../../Components/CustomInput";
import { SelectBox } from "../../Components/CustomSelect";
import CustomButton from "../../Components/CustomButton";
import {
  getEntity,
  editEntity,
  updateEntity,
} from "../../services/commonServices";
import { useNavigate, useParams } from "react-router";
import ImageHandler from "../../Components/ImageHandler/ImageHandler";

export const EditProduct = () => {
  const [data, setData] = useState([]);
  const [category, setCategory] = useState([])
  const { id } = useParams(); // Get product ID from URL params
  const navigate = useNavigate();
  const [ImagePreview, setImagePreview] = useState();

  const [modalHeading, setModalHeading] = useState("");
  const [edit, setEdit] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    image: "",
    color: [],
    addon: [],
    category: [],
    warranty_options: [],
  });

  const Menu = [
    { id: 0, name: "no" },
    { id: 1, name: "yes" },
  ];

  const urlToFile = async (url, filename) => {
    const response = await fetch(url);
    const blob = await response.blob();
    return new File([blob], filename, { type: "image/jpeg" });
  };


  const categoryData = async () => {
    const response = await getEntity("/admin/category");
    if (response) {
      console.log('response.categories', response.categories);

      setCategory(response.data.map((item) => ({ id: item.id, name: item.category_name })));
    }
  };
  const ProductData = async () => {
    const response = await getEntity(`/admin/products/${id}`);
    if (response) {
      setFormData(response.data);
    }
  };

  useEffect(() => {
    document.title = "Flairis | Product Management";
    categoryData()
    ProductData();
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
    setImagePreview(URL.createObjectURL(file));
    if (file) {
      const fileName = file;
      console.log("fileName", fileName);

      setFormData((prevData) => ({
        ...prevData,
        image: fileName,
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await updateEntity(
        `/admin/update_product/${id}`,
        formData
      );

      if (response.status) {
        setModalHeading("Product updated successfully");
        setSuccess(true);
        setEdit(true);
        setTimeout(() => {
          navigate(-1);
        }, 1500);
      }
    } catch (error) {
      setModalHeading("Error updating product");
      setSuccess(false);
      setEdit(true);
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
    return options?.filter((option) => selectedIds?.includes(option.value));
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
  const handleImgEdit = (imgFile) => {
    setFormData((prevData) => ({
      ...prevData,
      image: imgFile.file,
    }));
  };
  console.log("formData..", formData);
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
console.log('ssssssssssssss',formData);

  return (
    <DashboardLayout>
      <div className="dashCard mb-4">
        <div className="row mb-3">
          <div className="col-12 mb-2">
            <h2 className="mainTitle">
              <BackButton />
              Edit Product
            </h2>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-12">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-lg-12">
                  <div className="row">
                  <div className="mb-4">
                      <ImageHandler
                        imagePath={formData.image}
                        showDelete={false}
                        showEdit={true}
                        onUpload={handleImgEdit}
                        // imagePath={formData.image}
                        // showEdit={false}
                        // onUpload={filehandleChange} // No imagePath, so it shows the upload placeholder
                      />
                    </div>
                    <div className="col-md-6 mb-4">
                      <CustomInput
                        label="Add Product Name"
                        
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
                      <SelectBox
                        selectClass="mainInput"
                        name="category_id"
                        label="Select Category"
                        
                        value={formData.category_id}
                        option={category}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6 mb-4">
                      <CustomInput
                        label="Enter price"
                        
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
                      <CustomInput
                        label="Upload Product Image"
                        
                        id="file"
                        type="file"
                        labelClass="mainLabel"
                        inputClass="mainInput"
                        name="image"
                        onChange={(e) => filehandleChange(e)}
                      />
                    </div>
                    {/* <div className="col-md-6 mb-4">
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
                      </div> */}
                    <div className="col-md-12 mb-4">
                      <div className="inputWrapper">
                        <div className="form-controls">
                          <label htmlFor="">Description</label>
                          <textarea
                            name="description"
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
                    <section class="accordion">
                      <input type="checkbox" name="collapse2" id="handle3" />
                      <h2 class="handle">
                        <label for="handle3" className="dropdownLabel">
                          Product Variations{" "}
                        </label>
                      </h2>
                      <div class="content">
                        {formData?.variations?.map((option, index) => (
                          <div key={index} className="row">
                            <div className="col-md-3 ">
                              <CustomInput
                                label="sku"
                                
                                id={`sku-${index}`}
                                type="text"
                                placeholder="Enter sku"
                                labelClass="mainLabel p-1"
                                inputClass="mainInput"
                                name="sku"
                                value={option.sku}
                                onChange={(event) =>
                                  handleWarrantyOptionChange(index, event)
                                }
                              />
                            </div>
                            <div className="col-md-3 ">
                              <CustomInput
                                label="price"
                                
                                id={`price-${index}`}
                                type="text"
                                placeholder="Enter price"
                                labelClass="mainLabel p-1"
                                inputClass="mainInput"
                                name="price"
                                value={option.price}
                                onChange={(event) =>
                                  handleWarrantyOptionChange(index, event)
                                }
                              />
                            </div>
                            <div className="col-md-3 ">
                              <CustomInput
                                label="stock"
                                
                                id={`stock-${index}`}
                                type="text"
                                placeholder="Enter stock"
                                labelClass="mainLabel p-1"
                                inputClass="mainInput"
                                name="stock"
                                value={option.stock}
                                onChange={(event) =>
                                  handleWarrantyOptionChange(index, event)
                                }
                              />
                            </div>
                            <div className="col-md-6 mb-4">
                              <CustomInput
                                label="Upload Product Image"
                                
                                id="file"
                                type="file"
                                labelClass="mainLabel"
                                inputClass="mainInput"
                                name="product_image"
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
                              text="Add Product Variation"
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
      </div>
    </DashboardLayout>
  );
};
