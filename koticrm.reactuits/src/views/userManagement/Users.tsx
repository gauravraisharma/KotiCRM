import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AiFillEye } from "react-icons/ai";
import { MdDelete, MdEdit } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import { GetEmployeesList } from "../../redux-saga/modules/userManagement/apiService";
import { Employees } from "../../models/userManagement/employees";
import DeleteConfirmationModal from "../account/accountsList/DeleteConfirmation";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CPagination,
  CPaginationItem,
  CRow,
  CSpinner,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableRow,
} from "@coreui/react";
import "../../css/style.css";

const Users = () => {
  const [employeesList, setEmployeesList] = useState<Employees[]>([]);
  const [userId, setUserId] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [dropdownValue, setDropdownValue] = useState("Name");
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState('')

  const [pageNumber, setPageNumber] = useState<number>(1);


  const GetEmployees = async () => {
    try {
      const response = await GetEmployeesList(searchQuery, pageNumber, pageSize);
      setEmployeesList(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
      toast.error("Failed to fetch employees. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };


  //Handle dropdown change
  const handleDropdownChange = (newValue: any) => {
    setDropdownValue(newValue);
  };

  const handleDeleteClick = (id: string) => {
    setUserId(id);
    setShowDeleteConfirmation(true);
  };

  const confirmDelete = () => {
    // Implement delete functionality
    setShowDeleteConfirmation(false);
  };

  const cancelDelete = () => {
    setShowDeleteConfirmation(false);
  };

  // Pagination
  const pageSize = 5;
  const totalCount = employeesList.userCount
  const totalPages = Math.ceil(totalCount / pageSize);

  //Handle page change
  const handlePageChange = (pageNumber: number) => {
    setPageNumber(pageNumber);
  };

  //Handle enter click to search account
  const handleKeyDown = (e: any) => {
    if (e.keyCode === 13) {
      GetEmployees()
    }
  }
  //Focus out event to searchh
  const handleBlur = () => {
    GetEmployees()
  }
  //Effects
  useEffect(() => {
    GetEmployees();
  }, [pageNumber, pageSize, showDeleteConfirmation]);

  return (
    <>
      <ToastContainer />

      {isLoading && (
        <div className="spinner-backdrop">
          <CSpinner
            size="sm"
            color="white"
            style={{
              width: "5rem",
              height: "5rem",
              borderWidth: "0.60rem",
              zIndex: "9999",
            }}
          />
        </div>
      )}
      <CRow className="mb-3">
        <CCol xs={12}>
          <CRow className="align-items-center m-1">
            {/* <CCol xs={2}>
              <CDropdown className="custom-dropdown">
                <CDropdownToggle color="none" className="custom-toggle">
                  {dropdownValue}
                </CDropdownToggle>
                <CDropdownMenu className="custom-menu">
                  <CDropdownItem onClick={() => handleDropdownChange("Name")}>
                    Name
                  </CDropdownItem>
                  <CDropdownItem
                    onClick={() => handleDropdownChange("Emp code")}
                  >
                    Emp code
                  </CDropdownItem>
                  <CDropdownItem
                    onClick={() => handleDropdownChange("Blood Group")}
                  >
                    Blood Group
                  </CDropdownItem>
                  <CDropdownItem
                    onClick={() => handleDropdownChange("Birthday")}
                  >
                    Birthday
                  </CDropdownItem>
                  <CDropdownItem onClick={() => handleDropdownChange("RoleId")}>
                    RoleId
                  </CDropdownItem>
                  <CDropdownItem
                    onClick={() => handleDropdownChange("Designation")}
                  >
                    Designation
                  </CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
            </CCol>
            <CCol xs={4}>
              <CInputGroup>
                <CInputGroupText htmlFor="searchInput">Search</CInputGroupText>
                <CFormInput
                  id="searchInput"
                  type="text"
                  placeholder={`Search by ${dropdownValue}...`}
                  className="border-bottom-0"
                />
              </CInputGroup>
            </CCol> */}
            <CCol xs={2} md={2} lg={4}>
              <div className="input-group mb-3 custom-input-group">
                <select
                  className="form-select custom-select"
                  id="searchInput"
                  onChange={(e) => handleDropdownChange(e.target.value)}
                  style={{ backgroundColor: '#f0f0f0', borderRadius: '8px', marginRight: '10px', border: '1px solid #ccc' }}
                >
                  {/* <option value="" disabled selected>Select an option</option> */}
                  <option value="Name">Name</option>
                  <option value="Emp code">Emp code</option>
                  <option value="Blood Group">Blood Group</option>
                  <option value="Birthday">Birthday</option>
                  <option value="RoleId">RoleId</option>
                  <option value="Designation">Designation</option>
                </select>
                <input
                  type="text"
                  className="form-control custom-input"
                  placeholder={`Enter ${dropdownValue}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onBlur={handleBlur}
                  style={{ borderRadius: '8px', border: '1px solid #ccc' }}
                />
              </div>
            </CCol>


            <CCol xs={8} className="text-end">
              <Link to={`/users/createOrUpdateUser`}>
                <CButton color="primary" variant="outline">
                  + New
                </CButton>
              </Link>
            </CCol>
          </CRow>
        </CCol>
      </CRow>

      <DeleteConfirmationModal
        isOpen={showDeleteConfirmation}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        userId={userId}
      />
      <CCard>
        <CCardHeader>
          <h5 className="mb-0">Users</h5>
        </CCardHeader>
        <CCardBody>
          <CTable responsive striped hover>
            <CTableHead>
              <CTableRow>
                <CTableDataCell scope="col">UserName</CTableDataCell>
                <CTableDataCell scope="col">Contact No.</CTableDataCell>
                <CTableDataCell scope="col">Official Email</CTableDataCell>
                <CTableDataCell scope="col">Joining Date</CTableDataCell>
                <CTableDataCell scope="col">Actions</CTableDataCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {employeesList.employee?.map((employee: Employees) => (
                <CTableRow key={employee.employeeId}>
                  <CTableDataCell>{employee.name}</CTableDataCell>
                  <CTableDataCell>{employee.contactNumber1}</CTableDataCell>
                  <CTableDataCell>{employee.officialEmail}</CTableDataCell>
                  <CTableDataCell>{employee.joiningDate}</CTableDataCell>
                  <CTableDataCell>
                    <Link to={`/users/updateUser/${employee.employeeId}`}>
                      <MdEdit
                        style={{
                          color: "green",
                          marginRight: "10px",
                          fontSize: "20px",
                        }}
                        className="mr-4 text-success"
                      />
                    </Link>
                    <Link to={`/users/userDetail/${employee.employeeId}`}>
                      <AiFillEye
                        style={{
                          color: "darkblue",
                          marginRight: "10px",
                          fontSize: "20px",
                        }}
                        className="mr-4 text-primary"
                      />
                    </Link>
                    <MdDelete
                      style={{
                        color: "red",
                        marginRight: "10px",
                        fontSize: "20px",
                        cursor: "pointer",
                      }}
                      className="text-danger"
                      onClick={() => handleDeleteClick(employee.employeeId)}
                    />
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
          <CPagination
            size="sm"
            align="end"
            aria-label="Page navigation example"
            className="m-auto"
          >
            <CPaginationItem
              onClick={() => handlePageChange(pageNumber - 1)}
              disabled={pageNumber === 1}
              style={{ margin: "0 2px", cursor: "pointer", fontSize: "12px" }}

            >
              <span aria-hidden="true">&laquo;</span>
            </CPaginationItem>
            {Array.from({ length: totalPages }, (_, index) => (
              <CPaginationItem
                key={index}
                active={pageNumber === index + 1}
                onClick={() => handlePageChange(index + 1)}
                style={{ margin: "0 2px", cursor: "pointer", fontSize: "12px" }}
              >
                {index + 1}
              </CPaginationItem>
            ))}
            <CPaginationItem
              onClick={() => handlePageChange(pageNumber + 1)}
              disabled={pageNumber === totalPages}
              style={{ margin: "0 2px", cursor: "pointer", fontSize: "12px" }}
            >
              <span aria-hidden="true">&raquo;</span>
            </CPaginationItem>
          </CPagination>
        </CCardBody>
      </CCard>
    </>
  );
};

export default Users;
