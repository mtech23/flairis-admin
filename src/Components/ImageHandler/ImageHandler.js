import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import "./ImageHandler.css";
import { imgUrl } from "../../utils/convertToFormData";

const ImageHandler = ({
  imagePath = null,
  onDelete,
  onUpload,
  showEdit = false,
  showDelete = false,
  height = "200px",
  width = "200px",
  text = null,showPreview=true
}) => {
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (imagePath && !imagePreview) {
      const pathWithBase = `${imgUrl}/${imagePath}`;
      setImagePreview(pathWithBase);
    }
  }, [imagePath]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      onUpload({ file, event, previewUrl });
    }
  };

  const handleEditClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div
      className="image-handler-wrapper"
      style={{ height: height, width: width }}
    >
      {imagePreview && showPreview ? (
        <div
          className="image-container"
          style={{ height: height, width: width }}
        >
          <img
            src={imagePreview}
            alt="Uploaded"
            className="image-preview"
            style={{ height: height, width: width }}
          />
          {(showDelete || showEdit) && (
            <div
              className="icon-overlay"
              style={{ height: height, width: width }}
            >
              {showEdit && (
                <div className="icon-button" onClick={handleEditClick}>
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleImageUpload}
                    ref={fileInputRef}
                  />
                  <FontAwesomeIcon icon={faEdit} />
                </div>
              )}
              {showDelete && (
                <div className="icon-button" onClick={onDelete}>
                  <FontAwesomeIcon icon={faTrash} />
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <label className="upload-placeholder">
          <div className="d-flex flex-column">
            <FontAwesomeIcon icon={faPlus} className="plus-icon " />
            {text && <span className="mb-0 text-secondary mt-1">{text}</span>}
          </div>
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageUpload}
          />
        </label>
      )}
    </div>
  );
};

export default ImageHandler;
