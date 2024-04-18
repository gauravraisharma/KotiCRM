import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AiFillEye } from "react-icons/ai";
import { MdDelete, MdEdit } from "react-icons/md";
import {  toast } from "react-toastify";
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
  const [dropdownValue, setDropdownValue] = useState("Select option")
  const [showDeleteConfirmation, setShowDeleteConfirmation] =
    useState<boolean>(false);

  useEffect(() => {
    GetEmployees();
  }, []);

  const GetEmployees = async () => {
    try {
      const response = await GetEmployeesList();
      setEmployeesList(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
      toast.error("Failed to fetch employees. Please try again later.");
    }finally{
      setIsLoading(false);
    }
  };
  // const isLoading = useSelector((state: any) => state.u.isLoading);

  //Handle dropdown change
  const handleDropdownChange =(newValue:any)=>{
    setDropdownValue(newValue)
  }

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

  return (
    <>
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
  <CCol xs={2}>
  <CDropdown className="custom-dropdown">
            <CDropdownToggle color="none" className="custom-toggle">
                {dropdownValue}
            </CDropdownToggle>
            <CDropdownMenu className="custom-menu">
                <CDropdownItem onClick={() => handleDropdownChange('Name')}>Name</CDropdownItem>
                <CDropdownItem onClick={() => handleDropdownChange('Emp code')}>Emp code</CDropdownItem>
                <CDropdownItem onClick={() => handleDropdownChange('Blood Group')}>Blood Group</CDropdownItem>
                <CDropdownItem onClick={() => handleDropdownChange('Birthday')}>Birthday</CDropdownItem>
                <CDropdownItem onClick={() => handleDropdownChange('RoleId')}>RoleId</CDropdownItem>
                <CDropdownItem onClick={() => handleDropdownChange('Designation')}>Designation</CDropdownItem>
            </CDropdownMenu>
        </CDropdown>
  </CCol>
  <CCol xs={4}>
    <CInputGroup>
      <CInputGroupText htmlFor="searchInput">
        Search
      </CInputGroupText>
      <CFormInput
        id="searchInput"
        type="text"
        placeholder= {`Search by ${dropdownValue}...`}
        className="border-bottom-0" 
      />
    </CInputGroup>
  </CCol>
  <CCol xs={6} className="text-end">
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
              {employeesList?.map((employee: Employees) => (
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
        </CCardBody>
      </CCard>
    </>
  );
};

export default Users;
