import { useState, useEffect } from "react";
import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import BackButton from "../../Components/BackButton";
import CustomModal from "../../Components/CustomModal";
import CustomInput from "../../Components/CustomInput";
import { SelectBox } from "../../Components/CustomSelect";
import CustomButton from "../../Components/CustomButton";
import {
  getEntity,
  editEntity,
  updateEntity,
} from "../../services/commonServices";
import Select from "react-select";
import { useNavigate, useParams } from "react-router";
import { imgUrl } from "../../utils/convertToFormData";
import { fetchImageFile } from "../../utils/fetchImageFile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import ImageHandler from "../../Components/ImageHandler/ImageHandler";

export const EditProduct = () => {
  const { id } = useParams(); // Get product ID from URL params
  const navigate = useNavigate();
  const [ImagePreview, setImagePreview] = useState();

  const [colorOptions, setColorOptions] = useState([]);
  const [addonsOptions, setAddonsOptions] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
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

  const fileFromUrl = async (url) => {
    try {
      const file = await urlToFile(url, "image"); // Replace 'image' with appropriate filename
      // setFormData((prevData) => ({
      //   ...prevData,
      //   image: file,
      // }));
      return;
      console.log("file", file);
    } catch (error) {
      console.error("Error converting URL to file:", error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [product, colors, categories, addons] = await Promise.all([
          editEntity(`/admin/edit-product/${id}`),
          getEntity("/admin/colors"),
          getEntity("/admin/categories"),
          getEntity("/admin/addons"),
        ]);

        // Format the colors
        const formattedColors = product.data.color.map((element) => {
          return element.color_id;
        });
        const formattedCategory = product.data.category.map((element) => {
          return element.category.id;
        });
        const formattedAddons = product.data.addon.map((element) => {
          return element.addon.id;
        });
        console.log("formattedColors", formattedColors);
        // fileFromUrl(formData.image)
        // Push the formatted colors into the product data
        const updatedProductData = {
          ...product.data,
          color: formattedColors,
          category: formattedCategory,
          addon: formattedAddons,
          // Replace the old color array with the new formatted array
        };
        setFormData(updatedProductData);
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
  }, [id]);

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
    const formDataa = new FormData();
    for (const key in formData) {
      if (Array.isArray(formData[key])) {
        formData[key].forEach((value, index) => {
          if (key === "warranty_options") {
            formDataa.append(`${key}[${index}]`, JSON.stringify(value));
          } else if (key != "warranty_options") {
            console.log("warranty_options");
            formDataa.append(`${key}[${index}]`, value);
          }
        });
      } else {
        formDataa.append(key, formData[key]);
      }
    }
    try {
      const response = await updateEntity(
        `/admin/update-product/${id}`,
        formDataa
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
                    <div>
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
                    {/* <div className="post-img-box col-md-6 mb-4">
                      <img
                        src={ImagePreview || `${imgUrl}/${formData.image}`}
                        alt="product img"
                        className="rounded-4"
                        height={400}
                        width={700}
                      />
                      <div className="transparent-box-img">
                        <div className="caption">
                          <p className="Danger">
                            <input
                              name="image"
                              accept="image/*"
                              id="profileImage"
                              type="file"
                              style={{ display: "none" }}
                              onChange={filehandleChange}
                            />
                            <label htmlFor="profileImage" className="">
                              <FontAwesomeIcon icon={faEdit} />
                            </label>
                          </p>
                        </div>
                      </div>
                    </div> */}
                    <div className="col-md-6 mb-4">
                      <CustomInput
                        label="Product Name"
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
                        label="Short Description"
                        required
                        id="short_desc"
                        type="text"
                        placeholder="Enter Short Description"
                        labelClass="mainLabel"
                        inputClass="mainInput"
                        name="short_desc"
                        value={formData.short_desc}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6 mb-4">
                      <CustomInput
                        label="Long Description"
                        required
                        id="long_desc"
                        type="text"
                        placeholder="Enter Long Description"
                        labelClass="mainLabel"
                        inputClass="mainInput"
                        name="long_desc"
                        value={formData.long_desc}
                        onChange={handleChange}
                      />
                    </div>
                    {/* <div className="col-md-6 mb-4">
                      <CustomInput
                        label="Video Link"
                        required
                        id="videos"
                        type="text"
                        placeholder="Enter Video Link"
                        labelClass="mainLabel"
                        inputClass="mainInput"
                        name="videos"
                        value={formData.videos}
                        onChange={handleChange}
                      />
                    </div> */}
                    <div className="col-md-6 mb-4">
                      <CustomInput
                        label="Shipping Description"
                        id="shipping_desc"
                        type="text"
                        placeholder="Enter Shipping Description"
                        labelClass="mainLabel"
                        inputClass="mainInput"
                        name="shipping_desc"
                        value={formData.shipping_desc}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6 mb-4">
                      <CustomInput
                        label="Product Max Width"
                        required
                        id="width_max"
                        type="number"
                        placeholder="Enter Product Max Width"
                        labelClass="mainLabel"
                        inputClass="mainInput"
                        name="width_max"
                        value={formData.width_max}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6 mb-4">
                      <CustomInput
                        label="Product Min Width"
                        required
                        id="width_min"
                        type="number"
                        placeholder="Enter Product Min Width"
                        labelClass="mainLabel"
                        inputClass="mainInput"
                        name="width_min"
                        value={formData.width_min}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6 mb-4">
                      <CustomInput
                        label="Product Max Height"
                        required
                        id="height_max"
                        type="number"
                        placeholder="Enter Product Max Height"
                        labelClass="mainLabel"
                        inputClass="mainInput"
                        name="height_max"
                        value={formData.height_max}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6 mb-4">
                      <CustomInput
                        label="Product Min Height"
                        required
                        id="height_min"
                        type="number"
                        placeholder="Enter Product Min Height"
                        labelClass="mainLabel"
                        inputClass="mainInput"
                        name="height_min"
                        value={formData.height_min}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-md-6 mb-4">
                      <label className="mainLabel">Select Colors</label>
                      <Select
                        isMulti
                        name="colors"
                        options={colorOptions}
                        value={getSelectedOptions(colorOptions, formData.color)}
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
                  </div>
                  <section class="accordion">
                    <input type="checkbox" name="collapse2" id="handle3" />
                    <h2 class="handle">
                      <label for="handle3" className="dropdownLabel">
                        warranty options{" "}
                      </label>
                    </h2>
                    <div class="content">
                      {formData?.warranty_options?.map((option, index) => (
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
                      <label htmlFor="handleVideos" className="dropdownLabel">
                        Video Links
                      </label>
                    </h2>
                    <div className="content">
                      <div className="row">
                        {formData?.videos?.map((video, index) => (
                          <div className="col-md-6 mb-2">
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
                        ))}
                      </div>
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
                  <div className="row">
                    <div className="col-12">
                      <CustomButton
                        btnClass="primaryBtn"
                        variant="primaryButton"
                        text="save changes"
                        type="submit"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </form>
            <CustomModal
              autoClose={false}
              show={edit}
              success={success}
              // open={edit}
              // onClose={() => setEdit(false)}
              close={() => setEdit(false)}
              heading={modalHeading}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
