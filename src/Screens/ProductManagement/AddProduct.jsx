import { useState, useEffect } from "react";
import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import BackButton from "../../Components/BackButton";
import CustomModal from "../../Components/CustomModal";
import CustomInput from "../../Components/CustomInput";
import { SelectBox } from "../../Components/CustomSelect";
import CustomButton from "../../Components/CustomButton";

import { getEntity, addEntity } from "../../services/commonServices";

import { useNavigate } from "react-router";
import ImageHandler from "../../Components/ImageHandler/ImageHandler";

export const AddProduct = () => {
  const navigate = useNavigate();
  const [modalHeading, setmodalHeading] = useState("");
  const [edit, setEdit] = useState(false);
  const [success, setSuccess] = useState(false);
  const [categories, setCategories] = useState({});

  const [formData, setFormData] = useState({
    image: "",
    category_id: '',
    variations: [],
  });
  const Menu = [
    { id: 0, name: "no" },
    { id: 1, name: "yes " },
  ];


  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const filehandleChange = ({ file, name }) => {
    if (file) {


      setFormData((prevData) => ({
        ...prevData,
        [name]: file,
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
    //       if (key === "variations") {
    //         formDataa.append(`${key}[${index}]`, JSON.stringify(value));
    //       } else if (key != "variations") {
    //         console.log("variations");
    //         formDataa.append(`${key}[${index}]`, value);
    //       }
    //     });
    //   } else {
    //     formDataa.append(key, formData[key]);
    //   }
    // }
    try {
      const response = await addEntity("admin/store_product", formData);
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

    if (name === "product_image") {
      const file = event.target.files[0];
      setFormData((prevData) => {
        const updatedWarrantyOptions = [...prevData.variations];
        updatedWarrantyOptions[index] = {
          ...updatedWarrantyOptions[index],
          [name]: file,
        };
        return {
          ...prevData,
          variations: updatedWarrantyOptions,
        };
      });
    } else {
      setFormData((prevData) => {
        const updatedWarrantyOptions = [...prevData.variations];
        updatedWarrantyOptions[index] = {
          ...updatedWarrantyOptions[index],
          [name]: value,
        };
        return {
          ...prevData,
          variations: updatedWarrantyOptions,
        };
      });
    }
  };

  const handleAddAttribute = (variationIndex) => {
    setFormData((prevData) => {
      const updatedWarrantyOptions = [...prevData.variations];
      updatedWarrantyOptions[variationIndex] = {
        ...updatedWarrantyOptions[variationIndex],
        attributes: [
          ...(updatedWarrantyOptions[variationIndex].attributes || []),
          { attribute_id: 1, attribute_value_id: "" },
        ],
      };
      return {
        ...prevData,
        variations: updatedWarrantyOptions,
      };
    });
  };

  const handleAttributeChange = (variationIndex, attrIndex, name, value) => {
    setFormData((prevData) => {
      const updatedWarrantyOptions = [...prevData.variations];
      const updatedAttributes = [...updatedWarrantyOptions[variationIndex].attributes];
      updatedAttributes[attrIndex] = {
        ...updatedAttributes[attrIndex],
        [name]: value,
      };
      updatedWarrantyOptions[variationIndex].attributes = updatedAttributes;
      return {
        ...prevData,
        variations: updatedWarrantyOptions,
      };
    });
  };





  const addWarrantyOption = (event) => {
    event.preventDefault();
    setFormData((prevData) => ({
      ...prevData,
      variations: [
        ...prevData.variations,
        { price: "" },
      ],
    }));
  };



  const fetchCatories = () => {
    const LogoutData = localStorage.getItem("token");
    document.querySelector(".loaderBox").classList.remove("d-none");
    fetch(
      `https://custom3.mystagingserver.site/Flaris_api/api/admin/category`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${LogoutData}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        document.querySelector(".loaderBox").classList.add("d-none");
        setCategories(data.data.map((item) => ({ id: item.id, name: item.category_name })));
      })
      .catch((error) => {
        document.querySelector(".loaderBox").classList.add("d-none");
        console.log(error);
      });
  };

  const [AttributeData, setAttributeData] = useState([])
  const getAttributeOptions = async () => {
    try {
      const [attributeOptions, attributeValues] = await Promise.all([getEntity('/admin/products_attribute'), getEntity('admin/products_attribute_value')])
      setAttributeData({ attributeOptions: attributeOptions.data, attributeValues: attributeValues.data })
    } catch (error) {
      console.log('error', error);

    }
  }

  useEffect(() => {
    getAttributeOptions()
    fetchCatories()
  }, [])
  console.log('aaaaaaaaaaaaaaaaaaaaaa', AttributeData);


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
                      <div className="row">
                        <div className="col-md-3 mb-4">

                          <ImageHandler
                            imagePath={formData?.image}
                            showEdit={true}
                            width="100%"
                            text="Upload Product Image"
                            name="image"
                            onUpload={filehandleChange}
                          />
                        </div>
                        {/* <div className="col-md-6 mb-4 opacity-0" >
                        <CustomInput
                          label="Upload Product Image"
                          required
                          value={formData?.image}
                          id="file"
                          type="file"
                          labelClass="mainLabel"
                          inputClass="mainInput"
                          name="image"
                          onChange={(e) => filehandleChange(e)}
                        />
                      </div> */}
                      </div>
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
                        <SelectBox
                          selectClass="mainInput"
                          name="category_id"
                          label="Select Category"
                          required
                          value={formData.category_id}
                          option={categories}
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

                      {/* <div className="col-md-6 mb-4">
                        <CustomInput
                          label="Upload Product Image"
                          required
                          id="file"
                          type="file"
                          labelClass="mainLabel"
                          inputClass="mainInput"
                          name="image"
                          onChange={(e) => filehandleChange(e)}
                        />
                      </div> */}
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
                            Add Product Variations{" "}
                          </label>
                        </h2>
                        <div class="content">
                          {formData.variations.map((variation, variationIndex) => (
                            <div key={variationIndex} className="row">
                              <div className="col-md-3 ">
                                <CustomInput
                                  label="sku"
                                  required
                                  id={`sku-${variationIndex}`}
                                  type="text"
                                  placeholder="Enter sku"
                                  labelClass="mainLabel p-1"
                                  inputClass="mainInput"
                                  name="sku"
                                  value={variation.sku}
                                  onChange={(event) =>
                                    handleWarrantyOptionChange(variationIndex, event)
                                  }
                                />
                              </div>
                              <div className="col-md-3 ">
                                <CustomInput
                                  label="price"
                                  required
                                  id={`price-${variationIndex}`}
                                  type="text"
                                  placeholder="Enter price"
                                  labelClass="mainLabel p-1"
                                  inputClass="mainInput"
                                  name="price"
                                  value={variation.price}
                                  onChange={(event) =>
                                    handleWarrantyOptionChange(variationIndex, event)
                                  }
                                />
                              </div>
                              <div className="col-md-3 ">
                                <CustomInput
                                  label="stock"
                                  required
                                  id={`stock-${variationIndex}`}
                                  type="text"
                                  placeholder="Enter stock"
                                  labelClass="mainLabel p-1"
                                  inputClass="mainInput"
                                  name="stock"
                                  value={variation.stock}
                                  onChange={(event) =>
                                    handleWarrantyOptionChange(variationIndex, event)
                                  }
                                />
                              </div>
                              <div className="col-md-6 mb-4">
                                <CustomInput
                                  label="Upload Variant Image"
                                  required
                                  id="file"
                                  type="file"
                                  labelClass="mainLabel"
                                  inputClass="mainInput"
                                  name="product_image"
                                  onChange={(event) =>
                                    handleWarrantyOptionChange(variationIndex, event)
                                  }
                                />
                              </div>
                              <h4>Attributes</h4>
                              {variation.attributes?.map((attr, attrIndex) => (
                                <div key={attrIndex} style={{ marginBottom: "10px" }}>
                                  <div className="col-md-6 mb-4">
                                    <SelectBox
                                      selectClass="mainInput"
                                      type="text"
                                      option={AttributeData.attributeOptions}
                                      placeholder="Attribute ID"
                                      value={attr.attribute_id}
                                      onChange={(e) =>
                                        handleAttributeChange(variationIndex, attrIndex, "attribute_id", e.target.value)
                                      }
                                    />
                                  </div>
                                  <div className="col-md-6 mb-4">
                                    <SelectBox
                                      selectClass="mainInput"
                                      type="text"
                                      placeholder="Attribute Value ID"
                                      value={attr.attribute_value_id}
                                      option={AttributeData.attributeValues.filter(item => item.attribute_id == attr.attribute_id).map(item => ({ id: item.id, name: item.value }))}
                                      onChange={(e) =>
                                        handleAttributeChange(variationIndex, attrIndex, "attribute_value_id", e.target.value)
                                      }
                                    />
                                  </div>

                                </div>
                              ))}
                              <div className="col-md-6 mb-2">
                                <div className="addUser">

                                  <button type="button" className="btn btn-secondary w-25" onClick={() => handleAddAttribute(variationIndex)}>
                                    Add Attribute
                                  </button>
                                </div>
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
