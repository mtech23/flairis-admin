import React, { useEffect } from "react";
import { Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faQuestionCircle,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";

import CustomButton from "../CustomButton";

import "./style.css";
import { faExclamation } from "@fortawesome/free-solid-svg-icons/faExclamation";

const CustomModal = (props) => {
  useEffect(() => {
    let timer;
    if (props.show && props.autoClose) {
      timer = setTimeout(() => {
        props.close();
      }, 1000); // Close the modal after 1 second
    }
    return () => clearTimeout(timer); // Clear timeout if modal closes before 1 second
  }, [props.show, props.close]);

  return (
    <>
      <Modal show={props?.show} centered onHide={props?.close}>
        <button className="closeButton" onClick={props?.close}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <Modal.Body className={props.children ? "" : "text-center"}>
          {props?.children ? (
            ""
          ) : props?.success ? (
            <FontAwesomeIcon icon={faCheckCircle} className="checkMark" />
          ) : (
            <FontAwesomeIcon icon={faExclamation} className="questionMark" />
          )}

          <div className="modalContent">
            <h2 className="modalHeading text-center text-capitalize">
              {props?.heading}
            </h2>
            {props?.children ? (
              <p>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                  className="formDataStyle"
                >
                  {props?.children}
                </form>
              </p>
            ) : props?.success ? null : (
              <>
                {/* <CustomButton
                  onClick={props?.action}
                  variant="primaryButton"
                  text="Yes"
                  className="me-2"
                />
                <CustomButton
                  onClick={props?.close}
                  variant="secondaryButton"
                  text="No"
                /> */}
              </>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CustomModal;
