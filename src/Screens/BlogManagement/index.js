import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Button, Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisV,
  faEye,
  faCheck,
  faTimes,
  faFilter,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import CustomTable from "../../Components/CustomTable";
import CustomModal from "../../Components/CustomModal";

import CustomPagination from "../../Components/CustomPagination";
import CustomInput from "../../Components/CustomInput";
import CustomButton from "../../Components/CustomButton";

import "./style.css";
import {
  deleteEntity,
  editEntity,
  getEntity,
  updateEntity,
} from "../../services/commonServices";
import { imgUrl } from "../../utils/convertToFormData";
import CustomCard from "../../Components/CustomCard";
import ImageHandler from "../../Components/ImageHandler/ImageHandler";

export const BlogManagement = () => {
  const base_url = "https://custom2.mystagingserver.site/food-stadium/public/";
  const [data, setData] = useState([]);
  const [edit, setEdit] = useState(false);
  const [formData, setFormData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [showModal4, setShowModal4] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [inputValue, setInputValue] = useState("");

  const [modalHeading, setModalHeading] = useState("");
  const [deleteState, setDeleteState] = useState(false);
  const [editState, setEditState] = useState(false);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  console.log();

  const hanldeRoute = () => {
    navigate("/add-blog");
  };

  const inActive = () => {
    setShowModal(false);
    setShowModal2(true);
  };
  const ActiveMale = () => {
    setShowModal3(false);
    setShowModal4(true);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(formData);
  };

  const filterData = data?.filter((item) =>
    item.title.toLowerCase().includes(inputValue.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filterData?.slice(indexOfFirstItem, indexOfLastItem);

  const ProductData = async () => {
    try {
      const response = await getEntity("/admin/blogs");
      setData(response.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    document.title = "Blinds And Shades | Product Management";
    ProductData();
  }, []);

  const maleHeaders = [
    {
      key: "id",
      title: "S.No",
    },
    {
      key: "image",
      title: "Thumbnail",
    },
    {
      key: "username",
      title: "Name",
    },
    {
      key: "price",
      title: "Price",
    },
    {
      key: "category",
      title: "Category",
    },
    {
      key: "created_at",
      title: "Created On",
    },
  ];
  console.log("errordataaaaa", data);
  const handleDelete = async (id) => {
    await deleteEntity(`/admin/delete-blog/${id}`);
    setModalHeading("Blog Deleted successfully");
    setSuccess(true);
    setDeleteState(true);
    ProductData();
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

  const handleFetchEdit = async () => {
    setEdit(false);
    await updateEntity(`/admin/update-blog/${formData.id}`, formData);
    setModalHeading("Blog updated successfully");
    setSuccess(true);
    setEditState(true);
    ProductData();
  };
  const handleEdit = (item) => {
    setFormData(item);
    setEdit(true);
  };
  return (
    <>
      <DashboardLayout>
        <div className="container-fluid">
          <div className="row mb-3">
            <div className="col-12">
              <div className="dashCard">
                <div className="row mb-3 justify-content-between">
                  <div className="col-md-6 mb-2">
                    <h2 className="mainTitle">Blogs Management</h2>
                  </div>
                  <div className="col-md-6 mb-2">
                    <div className="addUser">
                      <CustomButton
                        text="Add New Blog"
                        variant="primaryButton"
                        onClick={hanldeRoute}
                      />
                      <CustomInput
                        type="text"
                        placeholder="Search Here..."
                        value={inputValue}
                        inputClass="mainInput"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-12">
                    {data?.length > 0 &&
                      data?.map((item, index) => {
                        return (
                          <CustomCard
                            item={item}
                            onClick={() => setFormData(item)}
                            filehandleChange={filehandleChange}
                            handleDelete={handleDelete}
                            handleEdit={() => handleEdit(item)}
                          />
                        );
                      })}
                    <CustomPagination
                      itemsPerPage={itemsPerPage}
                      totalItems={data?.length}
                      currentPage={currentPage}
                      onPageChange={handlePageChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <CustomModal
            autoClose={false}
            show={edit}
            close={() => setEdit(false)}
            heading="edit Blog"
          >
            <div className="row">
              <div className="col-lg-12">
                <div className="row">
                  <div className="col-md-12 mb-4">
                    <ImageHandler
                      imagePath={formData.image}
                      showEdit={true}
                      width="100%"
                      onUpload={filehandleChange}
                    />
                  </div>
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
                      value={formData?.title}
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
                      value={formData?.short_description}
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
                          value={formData?.long_description}
                          onChange={handleChange}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  {/* <div className="col-md-6 mb-4">
                    <CustomInput
                      label="Image"
                      required
                      id="file"
                      type="file"
                      labelClass="mainLabel"
                      inputClass="mainInput"
                      name="image"
                      // value={formData.image}
                      onChange={handleFetchEdit}
                    />
                  </div> */}

                  <div className="col-md-12">
                    <CustomButton
                      variant="primaryButton"
                      text="Update"
                      // type="submit"
                      onClick={() => handleFetchEdit()}
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
            action={inActive}
            heading="Are you sure you want to mark this user as inactive?"
          />
          <CustomModal
            show={showModal2}
            close={() => {
              setShowModal2(false);
            }}
            success
            heading="Marked as Inactive"
          />

          <CustomModal
            show={showModal3}
            close={() => {
              setShowModal3(false);
            }}
            action={ActiveMale}
            heading="Are you sure you want to mark this user as Active?"
          />
          <CustomModal
            show={showModal4}
            close={() => {
              setShowModal4(false);
            }}
            success
            heading="Marked as Active"
          />
          <CustomModal
            autoClose={true}
            show={deleteState}
            success={success}
            close={() => setDeleteState(false)}
            heading={modalHeading}
          ></CustomModal>
          <CustomModal
            autoClose={true}
            show={editState}
            success={success}
            close={() => setEditState(false)}
            heading={modalHeading}
          ></CustomModal>
        </div>
      </DashboardLayout>
    </>
  );
};
