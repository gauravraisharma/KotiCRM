
import { useEffect, useState } from "react";
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
import moment from "moment";
import { useSelector } from "react-redux";
const Users = () => {
  //  const [employeesList, setEmployeesList] = useState<Employees[]>([]);
  const [userList, setUserList] = useState<Employees[]>([]);

  const [profileImage, setProfileImage] = useState('/profilePlaceholder.jpg');
  const [userId, setUserId] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [dropdownValue, setDropdownValue] = useState("Name");
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [totalUserCount, setTotalUserCount] = useState(0)
  const timezone = useSelector((state: any) => state.sharedReducer.timezone);
  const pageSize = 10;

  

  const GetEmployees = async () => {
    debugger
    try {
      // let searchField = dropdownValue.toLowerCase().replace(' ', '');

      const response = await GetEmployeesList(
        searchQuery,
        pageNumber,
        pageSize,
      );


      setUserList(response.data.employee);
      debugger
      setTotalUserCount(response.data.userCount)
    } catch (error) {
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

  const totalCount = totalUserCount
  const totalPages = Math.ceil(totalCount / pageSize);
  const startIndex = (pageNumber - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalCount);
  const employeesList = userList.slice(startIndex, endIndex);


  //Handle page change
  const handlePageChange = (pageNumber: number) => {
    setPageNumber(pageNumber);
  };
  //Handle enter click to search account
  const handleKeyDown = (e: any) => {
    if (e.keyCode === 13) {
      GetEmployees();
    }
  };

  //Focus out event to search
  const handleBlur = () => {
    GetEmployees()
  };

  // Effects
  useEffect(() => {
    GetEmployees();
  }, [pageNumber, pageSize,showDeleteConfirmation]);

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
            <CCol xs={2} md={2} lg={8}>
              <div className="custom-input-group d-flex">
                <select
                  className="form-select custom-select"
                  id="searchInput"
                  onChange={(e) => handleDropdownChange(e.target.value)}
                  style={{
                    backgroundColor: "#f0f0f0",
                    borderRadius: "8px",
                    marginRight: "10px",
                    border: "1px solid #ccc",
                    width: "160px",
                  }}
                > 
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
                  placeholder={`Enter by ${dropdownValue}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onBlur={handleBlur}
                  style={{
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                    width: "300px",
                  }}
                />
              </div>
            </CCol>
            <CCol xs={4} className="text-end">
              <Link to={`/roles`}>
                <CButton color="primary" variant="outline">
                  Manage Roles
                </CButton>
              </Link>
              <Link to={`/users/createOrUpdateUser`}>
                <CButton color="primary">
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
      <CCard className="mb-4 mt-2">
        <CCardHeader>
          <h5 className="mb-0"><strong>Users</strong></h5>
        </CCardHeader>
        <CCardBody>
          {userList.length === 0 ? (
            <p>No Users record found</p>
          ) : (
            <CTable responsive striped hover>
              <CTableHead>
                <CTableRow>
                  <CTableDataCell scope="col">UserName</CTableDataCell>
                  <CTableDataCell scope="col">Contact No.</CTableDataCell>
                  <CTableDataCell scope="col">Email</CTableDataCell>
                  <CTableDataCell scope="col">Joining Date</CTableDataCell>
                  <CTableDataCell scope="col">Profile Picture</CTableDataCell>
                  <CTableDataCell scope="col">Actions</CTableDataCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {userList.map((employee: Employees) => (
                  <CTableRow key={employee.employeeId}>
                    <CTableDataCell>{employee.name}</CTableDataCell>
                    <CTableDataCell>{employee.contactNumber}</CTableDataCell>
                    <CTableDataCell>{employee.email}</CTableDataCell>
                    <CTableDataCell>  {moment.utc(employee.joiningDate).tz(timezone)?.format('DD/MM/YYYY hh:mm A')}</CTableDataCell>
                    <CTableDataCell>
                    <img src={employee.profilePicturePath ? employee.profilePicturePath : profileImage} className="profile-picture"/>
                    </CTableDataCell>

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
                      <Link to={`/users/userDetail/${employee.userId}/${employee.employeeId}`}>
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
          )}
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





