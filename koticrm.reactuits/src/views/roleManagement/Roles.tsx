import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdDelete, MdEdit } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
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
  const [searchQuery, setSearchQuery] = useState('')
  const [pageNumber, setPageNumber] = useState<number>(1);

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

  // Pagination
  const pageSize = 5;
  const totalCount = roleList.length
  const totalPages = Math.ceil(totalCount / pageSize);
  const startIndex = (pageNumber - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalCount);
  const displayedRoles = roleList.slice(startIndex, endIndex);

  //Handle page change
  const handlePageChange = (pageNumber: number) => {
    setPageNumber(pageNumber);
  };

  //Handle enter click to search role
  const handleKeyDown = async (e: any) => {
    if (e.keyCode === 13) {
      const response = await GetRolesList(searchQuery, pageNumber, pageSize);
      setRoleList(response.roles);
    }
  };
  //Focus out event to searchh
  const handleBlur = async () => {
    const response = await GetRolesList(searchQuery, pageNumber, pageSize);
      setRoleList(response.roles);
  }

  //Effects
  
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
      <ToastContainer />
      <CRow>
        <CCol xs={12}>
          <CRow className="align-items-center m-1">
            <CCol xs={4} className="text-start">
              <CInputGroup>
                <CInputGroupText as="label" htmlFor="searchInput">
                  Search
                </CInputGroupText>
                <CFormInput
                  id="searchInput"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name,email,mobile..."
                  onKeyDown={handleKeyDown}
                  onBlur={handleBlur}
                />
              </CInputGroup>
            </CCol>
            <CCol xs={8} className="text-end">
              <Link to={`/roles/createRole`}>
                <CButton
                  component="input"
                  type="button"
                  style={{ padding: "6px 16px" }}
                  color="primary"
                  value="+ New"
                />
              </Link>
              <Link to={`/users`}>
                <CButton
                  component="input"
                  type="button"
                  color="secondary"
                  value="Back to Users"
                  style={{ padding: "6px 16px" }}
                  variant="outline"
                />
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
              {displayedRoles?.map((role: RoleList) => (
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

export default Roles;
