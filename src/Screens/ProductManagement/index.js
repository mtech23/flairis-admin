import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisV,
  faEye,
  faEdit,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";

import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import CustomTable from "../../Components/CustomTable";
import CustomModal from "../../Components/CustomModal";

import CustomPagination from "../../Components/CustomPagination";
import CustomButton from "../../Components/CustomButton";

import "./style.css";
import { getEntity, deleteEntity } from "../../services/commonServices";
import { imgUrl } from "../../utils/convertToFormData";
import Chip from "../../Components/chip";
export const ProductManagement = () => {
  const [data, setData] = useState([]);
  const [category, setCategory] = useState([])
  const [dropdownOpen, setDropdownOpen] = useState({});

  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [showModal4, setShowModal4] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [inputValue, setInputValue] = useState("");

  const navigate = useNavigate();

  const [modalHeading, setModalHeading] = useState("");
  const [edit, setEdit] = useState(false);
  const [success, setSuccess] = useState(false);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  console.log();

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

  // const filterData = data?.filter((item) =>
  //   item.title.toLowerCase().includes(inputValue.toLowerCase())
  // );

  // const indexOfLastItem = currentPage * itemsPerPage;
  // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const currentItems = filterData?.slice(indexOfFirstItem, indexOfLastItem);
  const categoryData = async () => {
    const response = await getEntity("/admin/category");
    if (response) {
      console.log('response.categories', response.categories);

      setCategory(response.data);
    }
  };
  const ProductData = async () => {
    const response = await getEntity("/admin/products");
    if (response) {
      setData(response.data);
    }
  };

  useEffect(() => {
    document.title = "Flairis | Product Management";
    categoryData()
    ProductData();
  }, []);
  const handleDropdownToggle = (userId) => {
    setDropdownOpen((prevState) => ({
      ...prevState,
      [userId]: !prevState[userId],
    }));
  };

  const handleDelete = async (id) => {
    await deleteEntity(`admin/delete-product/${id}`);
    setModalHeading("Product deleted successfully");
    setSuccess(true);
    setEdit(true);
    ProductData();
  };
  const maleHeaders = [
    {
      key: "image",
      title: "Thumbnail",
    },
    {
      key: "username",
      title: "Product Name",
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
      key: "in_stock",
      title: "Stock Status",
    },

    {
      key: "Actions",
      title: "Actions",
    },
  ];
  console.log('daaaaaaaaa', data);
  return (
    <>
      <DashboardLayout>
        <div className="container-fluid">
          <div className="row mb-3">
            <div className="col-12">
              <div className="dashCard">
                <div className="row mb-3 justify-content-between">
                  <div className="col-md-6 mb-2">
                    <h2 className="mainTitle">Product Management</h2>
                  </div>
                  <div className="col-md-3 mb-2">
                    <div className="addUser">
                      <CustomButton
                        text="Add New Product"
                        variant="primaryButton"
                        onClick={hanldeRoute}
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
                <div className="row mb-3">
                  <div className="col-12">
                    <CustomTable headers={maleHeaders}>
                      <tbody>
                        {data?.map((item, index) => (
                          <tr key={index}>
                            <td>
                              <img
                                src={`${item?.image}`}
                                className="avatarIcon"
                              />
                            </td>
                            <td className="text-capitalize">{item?.name}</td>
                            <td>{item?.price ? `$ ${item?.price}` : `$0`}</td>
                            <td>{category?.find(i => i.id === item?.category_id)?.category_name}</td>
                            <td>
                              {" "}
                              <Chip
                                stock={item.stock}

                              />
                            </td>
                            <td>
                              <Dropdown
                                className="tableDropdown"
                                show={dropdownOpen[item.id]}
                                onToggle={() => handleDropdownToggle(item.id)}
                              >
                                <Dropdown.Toggle
                                  variant="transparent"
                                  className="notButton classicToggle"
                                >
                                  <FontAwesomeIcon icon={faEllipsisV} />
                                </Dropdown.Toggle>
                                <Dropdown.Menu
                                  align="end"
                                  className="tableDropdownMenu"
                                >

                                  <Link
                                    to={`/product-management/edit-product/${item.id}`}
                                    className="tableAction"
                                  >
                                    <FontAwesomeIcon
                                      icon={faEdit}
                                      className="tableActionIcon"
                                    />
                                    Edit
                                  </Link>
                                  <Link
                                    className="tableAction"
                                    onClick={() => handleDelete(item?.id)}
                                  >
                                    <FontAwesomeIcon
                                      icon={faTrashCan}
                                      className="tableActionIcon"
                                    />
                                    Delete
                                  </Link>
                                </Dropdown.Menu>
                              </Dropdown>
                            </td>
                            {/* <td className={item.status == 1 ? 'greenColor' : "redColor"}>{item.status == 1 ? 'Active' : "Inactive"}</td> */}
                            {/* <td>
                              <Dropdown className="tableDropdown">
                                <Dropdown.Toggle variant="transparent" className="notButton classicToggle">
                                  <FontAwesomeIcon icon={faEllipsisV} />
                                </Dropdown.Toggle>
                                <Dropdown.Menu align="end" className="tableDropdownMenu">

                                  <Link to={`/book-management/book-details/${item?.id}`} className="tableAction"><FontAwesomeIcon icon={faEye} className="tableActionIcon" />View</Link>
                                  <Link to={`/book-management/edit-book/${item?.id}`} className="tableAction"><FontAwesomeIcon icon={faEdit} className="tableActionIcon" />Edit</Link>

                                </Dropdown.Menu>
                              </Dropdown>
                            </td> */}
                          </tr>
                        ))}
                      </tbody>
                    </CustomTable>
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
            autoClose={true}
            show={edit}
            success={success}
            close={() => setEdit(false)}
            heading={modalHeading}
          ></CustomModal>

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
        </div>
      </DashboardLayout>
    </>
  );
};
