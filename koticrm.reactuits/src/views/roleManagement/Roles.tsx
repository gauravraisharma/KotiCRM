import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdDelete, MdEdit } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormCheck,
  CRow,
  CSpinner,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableRow,
} from "@coreui/react";
import "../../css/style.css";
import { GetRolesList } from "../../redux-saga/modules/permissionManagement/apiService";
import { useSelector } from "react-redux";
import { RoleList } from "../../models/permissionManagement/RoleList";
import moment from "moment";
import DeleteConfirmationModal from "../account/accountsList/DeleteConfirmation";
import { color } from "html2canvas/dist/types/css/types/color";

const Roles = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [roleList, setRoleList] = useState<RoleList[]>([]);
  const [roleId, setRoleId] = useState<string>("");
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState<boolean>(false);
//   const [searchQuery, setSearchQuery] = useState('')
//   const [pageNumber, setPageNumber] = useState<number>(1);

const userType = useSelector((state: any) => state.authReducer.userType);
const timezone = useSelector((state: any) => state.sharedReducer.timezone);


  useEffect(() => {
    GetRoles();
  }, [showDeleteConfirmation]);

  const GetRoles = async () => {
    try {
      const response = await GetRolesList();
      setRoleList(response.roles);
    } catch (error) {
      console.error("Error fetching roles:", error);
      toast.error("Failed to fetch roles.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteClick = (id: string) => {
    setRoleId(id);
    setShowDeleteConfirmation(true);
  };

  const confirmDelete = () => {
    setShowDeleteConfirmation(false);
  };

  const cancelDelete = () => {
    setShowDeleteConfirmation(false);
  };

//   // Pagination
//   const pageSize = 10;
//   const totalCount = employeesList.userCount
//   const totalPages = Math.ceil(totalCount / pageSize);

//   //Handle page change
//   const handlePageChange = (pageNumber: number) => {
//     setPageNumber(pageNumber);
//   };

//   //Handle enter click to search account
//   const handleKeyDown = (e: any) => {
//     if (e.keyCode === 13) {
//       GetEmployees();
//     }
//   };
//   //Focus out event to searchh
//   const handleBlur = () => {
//     GetEmployees()
//   }

  //Effects
  
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
            <CCol xs={2} md={2} lg={6}>
            </CCol>
            <CCol xs={6} className="text-end">
              <Link to={`/roles/createRole`}>
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
        roleId={roleId}
      />
      <CCard  className="mb-4 mt-2">
        <CCardHeader>
          <h5 className="mb-0"><strong>Roles</strong></h5>
        </CCardHeader>
        <CCardBody>
          <CTable responsive striped hover>
            <CTableHead>
              <CTableRow>
                <CTableDataCell scope="col">Role Name</CTableDataCell>
                <CTableDataCell scope="col">IsActive</CTableDataCell>
                <CTableDataCell scope="col">Created Date</CTableDataCell>
                <CTableDataCell scope="col">Actions</CTableDataCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {roleList?.map((role: RoleList) => (
                <CTableRow key={role.id}>
                  <CTableDataCell>{role.name}</CTableDataCell>
                  <CTableDataCell>{role.isactive ? (<span style={{color: "green"}}>Yes</span>) : (<span style={{color: "red"}}>No</span>)}</CTableDataCell>
                  <CTableDataCell>
                    {moment.utc(role.createdOn).tz(timezone)?.format('DD/MM/YYYY hh:mm A')}
                  </CTableDataCell>

                  <CTableDataCell>
                    {role.name.toLocaleLowerCase() === "administrator" ? (
                      <>
                        <MdEdit
                          style={{
                            color: "green",
                            marginRight: "10px",
                            fontSize: "20px",
                            opacity: "0.5",
                            cursor: "not-allowed",
                          }}
                          title="Not allowed"
                        />
                        <MdDelete
                          style={{
                            color: "red",
                            marginRight: "10px",
                            fontSize: "20px",
                            opacity: "0.5",
                            cursor: "not-allowed",
                          }}
                          title="Not allowed"
                        />
                      </>
                    ) : (
                      <>
                        <Link to={`/roles/UpdateRole/${role?.id}`}>
                          <MdEdit
                            style={{
                              color: "green",
                              marginRight: "10px",
                              fontSize: "20px",
                            }}
                            className="mr-4 text-success"
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
                          onClick={() => handleDeleteClick(role.id)}
                        />
                      </>
                    )}           

                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
          {/* <CPagination
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
          </CPagination> */}
        </CCardBody>
      </CCard>
    </>
  );
};

export default Roles;
