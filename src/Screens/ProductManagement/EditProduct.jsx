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
import CustomModal from "../../Components/CustomModal";

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
    document.title = "Flairis | Product Management";
    getAttributeOptions()
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
  const handleImgEdit = (imgFile) => {
    setFormData((prevData) => ({
      ...prevData,
      [imgFile.name]: imgFile.file,
    }));
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
                        name="image"
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

                        value={formData?.category_id}
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
                            value={formData?.description}
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
                        {formData?.variations?.map((variation, variationIndex) => (
                          <div key={variationIndex} className="row">
                            <div className="col-md-3 ">
                              <CustomInput
                                label="sku"
                                required
                                id={`sku-${variationIndex}`}
                                type="number"
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
                                type="number"
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
                                type="number"
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
                            {variation?.attributes?.map((attr, attrIndex) => (
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
                    text="Update Product"
                    type="submit"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <CustomModal
        autoClose={false}
        show={edit}
        success={success}
        close={() => setEdit(false)}
        heading={modalHeading}
      ></CustomModal>
    </DashboardLayout>
  );
};
