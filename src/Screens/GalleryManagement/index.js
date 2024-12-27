import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faUpload } from "@fortawesome/free-solid-svg-icons";
import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import CustomModal from "../../Components/CustomModal";
import {
  getEntity,
  addEntity,
  deleteEntity,
} from "../../services/commonServices";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import "./style.css";

export const GalleryManagement = () => {
  const imgUrl = process.env.REACT_APP_IMG_URL;
  const [data, setData] = useState([]);
  const [ImagePreview, setImagePreview] = useState();
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [showModal4, setShowModal4] = useState(false);
  const [selectedFile, setSelectedFile] = useState("");
  const [newUserData, setNewUserData] = useState();
  const navigate = useNavigate();

  const [modalHeading, setModalHeading] = useState("");
  const [addState, setAddState] = useState(false);
  const [deleteState, setDeleteState] = useState(false);
  const [success, setSuccess] = useState(false);

  const hanldeRoute = () => {
    navigate("/add-product");
  };

  const inActive = () => {
    setShowModal(false);
    setShowModal2(true);
  };

  const ActiveMale = () => {
    setShowModal3(false);
    setShowModal4(true);
  };

  const ProductData = async () => {
    try {
      const response = await getEntity("/admin/gallery");
      setData(response.data);
      console.log("response", response);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    document.title = "Blinds And Shades | Product Management";
    ProductData();
  }, []);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    console.log("ssssss", file);
    setSelectedFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleUploadClick = async () => {
    if (true) {
      try {
        const response = await addEntity("/admin/add-gallery", {
          image: selectedFile,
          is_hidden: 0,
        });
        console.log("Upload response", response);
        setModalHeading("Images added successfully");
        setSuccess(true);
        setAddState(true);
        ProductData(); // Refresh the gallery data after upload
        setSelectedFile(null); // Reset the file input
        setImagePreview(false);
      } catch (error) {
        console.log("Upload error", error);
      }
    }
  };
  const handleDelete = async (id) => {
    await deleteEntity(`/admin/delete-gallery/${id}`);
    setModalHeading("Images deleted successfully");
    setSuccess(true);
    setDeleteState(true);
    ProductData();
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
                    <h2 className="mainTitle">Gallery Management</h2>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-12">
                    <div className="row gy-5">
                      <div className="gallery-image">
                        {data.map((item, index) => (
                          <div className="img-box" key={index}>
                            <img
                              src={`${imgUrl}/${item.image}`}
                              alt={`Post file ${index + 1}`}
                              className="rounded-3 post-images"
                            />
                            <div className="transparent-box">
                              <div className="caption">
                                <p className="Danger">
                                  <FontAwesomeIcon
                                    icon={faTrash}
                                    onClick={() => handleDelete(item.id)}
                                  />
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div
                      className={`addGalleryImg ${
                        ImagePreview ? "border-0" : ""
                      }`}
                      // onClick={() =>
                      //   document.getElementById("fileInput").click()
                      // }
                    >
                      {ImagePreview ? (
                        <div className="gallery-image">
                          <div className="img-box">
                            <img
                              src={ImagePreview}
                              // alt={`Post file ${index + 1}`}
                              className="rounded-3 post-images"
                            />
                            <div className="upload-transparent-box">
                              <div className="upload-caption">
                                <FontAwesomeIcon
                                  icon={faUpload}
                                  onClick={() => handleUploadClick()}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <FontAwesomeIcon icon={faPlus} />
                      )}
                      {!ImagePreview && (
                        <>
                          <input
                            accept="image/*"
                            id="profileImage"
                            type="file"
                            style={{ display: "none" }}
                            onChange={handleImageChange}
                          />
                          <label
                            htmlFor="profileImage"
                            className="imageUploadButton"
                          ></label>
                        </>
                      )}
                    </div>
                    {/* {ImagePreview && <button>Upload</button>} */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <CustomModal
            show={showModal}
            close={() => setShowModal(false)}
            action={inActive}
            heading="Are you sure you want to mark this user as inactive?"
          />
          <CustomModal
            show={showModal2}
            close={() => setShowModal2(false)}
            success
            heading="Marked as Inactive"
          />
          <CustomModal
            show={showModal3}
            close={() => setShowModal3(false)}
            action={ActiveMale}
            heading="Are you sure you want to mark this user as Active?"
          />
          <CustomModal
            show={showModal4}
            close={() => setShowModal4(false)}
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
            show={addState}
            success={success}
            close={() => setAddState(false)}
            heading={modalHeading}
          ></CustomModal>
        </div>
      </DashboardLayout>
    </>
  );
};
