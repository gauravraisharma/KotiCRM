import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import { AiFillEye } from "react-icons/ai";
import { MdDelete, MdEditSquare } from "react-icons/md";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { GetEmployeesList } from "../../redux-saga/modules/userManagement/apiService";
import { Employees } from "../../models/userManagement/employees";

const Users = () => {

  // States
  const [employeesList, setEmployeesList] = useState<Employees[]>([]);

  useEffect(() => {
    GetEmployees();
  },[]);

  const GetEmployees = async () => {
    const response = await GetEmployeesList();
    console.log("response", response.data);
    if(response)
      {
        setEmployeesList(response.data);
      }
  }
  return (
    <>
      <ToastContainer />

      <div className="head" style={{ padding: "20px" }}>
        <CRow>
          <CCol xs={6}>
            <CInputGroup>
              <CInputGroupText as="label" htmlFor="searchInput">
                Search
              </CInputGroupText>
              <CFormInput
                id="searchInput"
                type="text"
                style={{ height: "50px" }}
                //  value={searchQuery}
                //  onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name,email,mobile..."
              />
            </CInputGroup>
          </CCol>
          <CCol xs={6} className="text-end">
            {
              <Link to={`/users/createOrUpdateUser`}>
                <CButton
                  component="input"
                  type="button"
                  style={{ width: "100px", padding: "10px", fontSize: "18px" }}
                  color="primary"
                  value="+ New"
                  variant="outline"
                />
              </Link>
            }
          </CCol>
        </CRow>
      </div>

      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <CRow>
                <CCol xs={6} className="d-flex align-items-center">
                  <h5>
                    <strong>Users</strong>
                  </h5>
                </CCol>
              </CRow>
            </CCardHeader>
            <CCardBody>
              <CTable>
                <CTableHead>
                  <CTableRow>
                  <CTableDataCell scope="col">UserName</CTableDataCell>
                    {/* <CTableDataCell scope="col">Employee Id</CTableDataCell>
                    <CTableDataCell scope="col">EmployeeCode</CTableDataCell> */}
                    <CTableDataCell scope="col">Contact No.</CTableDataCell>
                    <CTableDataCell scope="col">Officail Email</CTableDataCell>
                    <CTableDataCell scope="col">Joining Date</CTableDataCell>
                    {/* <CTableDataCell scope="col">Department</CTableDataCell>
                    <CTableDataCell scope="col">Designation</CTableDataCell> */}

                  <CTableDataCell scope="col">Actions</CTableDataCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {employeesList?.map((employee: any) => (
                    <CTableRow> 
                    <CTableDataCell>{employee.name}</CTableDataCell>
                    {/* <CTableDataCell>{employee.id}</CTableDataCell>
                    <CTableDataCell>{employee.employeeCode}</CTableDataCell> */}
                    <CTableDataCell>{employee.contactNumber1}</CTableDataCell>
                    <CTableDataCell>{employee.officialEmail}</CTableDataCell>
                    <CTableDataCell>{employee.joiningDate}</CTableDataCell>
                    {/* <CTableDataCell>{employee.department}</CTableDataCell>
                    <CTableDataCell>{employee.designation}</CTableDataCell> */}

                  

                    <CTableDataCell>
                      <Link to={`/users/updateUser/${employee?.employeeId}`}>
                        <MdEditSquare
                          style={{
                            color: "green",
                            marginRight: "10px",
                            fontSize: "20px",
                          }}
                        />
                      </Link>
                        {/* <Link to={`/contacts/${contact?.id}`}> */}
                        <AiFillEye
                          style={{
                            color: "darkblue",
                            marginRight: "10px",
                            fontSize: "20px",
                          }}
                        />
                        {/* </Link> */}
                        <MdDelete
                          style={{
                            color: "red",
                            marginRight: "10px",
                            fontSize: "20px",
                            cursor: "pointer",
                          }}
                          //  onClick={() => handleDeleteClick(contact.id)}
                        />
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                  
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default Users;
