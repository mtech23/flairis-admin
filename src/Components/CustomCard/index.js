import React from "react";
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
import { imgUrl } from "../../utils/convertToFormData";
import ImageHandler from "../ImageHandler/ImageHandler";
import "./style.css";
const CustomCard = (props) => {
  const { item, handleDelete, handleEdit, images = null } = props;
  console.log("imagesimages", Array.isArray(images));

  return (
    <div>
      <div key={item.id}>
        <article class="article-recent">
          <div class="article-recent-main">
            <h2 class="article-title">{item.title} </h2>
            <p class="article-body">
              {item.short_description || item.description}
            </p>
            <div className="d-flex flex-row g-5">
              <button className="iconButton" variant="primaryButton">
                <FontAwesomeIcon
                  onClick={handleEdit}
                  icon={faEdit}
                ></FontAwesomeIcon>
              </button>
              <button
                className="iconButton"
                variant="primaryButton"
                onClick={() => handleDelete(item.id)}
              >
                <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
              </button>
              <button className="iconButton" variant="primaryButton">
                <FontAwesomeIcon icon={faEye}></FontAwesomeIcon>
              </button>
            </div>
            <div className="img-div">
              {Array.isArray(images) &&
                images?.slice(0,4).map(
                  (image, index) =>
                    index < 6 && (
                      <img
                        src={`${imgUrl}/${image}`}
                        height="80px"
                        width="80px"
                        className="rounded-3 list-image"
                      />
                    )
                )}
            </div>
            {/* <div className="d-flex flex-row gap-5 mt-auto">
              {images &&
                images?.map((image, index) => {
                  return (
                    <img
                      src={`${imgUrl}/${image}`}
                      alt="two dumplings on a wood plate with chopsticks"
                      class="variation-image"
                    />
                  );
                })}
            </div> */}
          </div>
          <div class="article-recent-secondary">
            <img
              src={`${imgUrl}/${item.image || item.primary_image}`}
              alt="two dumplings on a wood plate with chopsticks"
              class="article-image rounded-2"
            />
          </div>
        </article>
      </div>
    </div>
  );
};

export default CustomCard;
