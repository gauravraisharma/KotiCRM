import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
import { GetPermissionsList, GetRolesList, UpdatePermission } from "../../redux-saga/modules/permissionManagement/apiService";
import { useSelector } from "react-redux";
import { RoleList } from "../../models/permissionManagement/RoleList";
import {Permission } from "../../models/permissionManagement/Permissions";

const ManagePermission = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [permissionList, setPermissionList] = useState<Permission[]>([]);
    const [permission, setPermission] = useState<Permission>();
  const [roleId, setRoleId] = useState<string>("");
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState<boolean>(false);
  

const userType = useSelector((state: any) => state.authReducer.userType);

  useEffect(() => {
    GetPermissions();
  }, []);

  const GetPermissions = async () => {
    try {
      const response = await GetPermissionsList(userType);
      setPermissionList(response.modulePermissions);
    } catch (error) {
      console.error("Error fetching modules:", error);
      toast.error("Failed to fetch modules.");
    } finally {
      setIsLoading(false);
    }
  };

  const UpdatePermissions = async (permissionId: number) =>{
    try {
        permission.permissionId = permissionId;
        const response = await UpdatePermission(permission);
        if (response.status == 200) {
            toast.success("Permission updated successfully");
        setTimeout(() => {
            // navigate("/roles");
        }, 5000);
        } else {
          toast.error("Permission updation failed");
        }
    } catch (error) {
        toast.error("Failed to update permission.");
    } finally {
        setIsLoading(false);
    }
  }

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
              <Link to={`/roles/managePermission`}>
                <CButton color="secondary" variant="outline">
                  Manage Permission
                </CButton>
              </Link>
              <Link to={`/roles`}>
                <CButton color="primary" variant="outline">
                  Roles
                </CButton>
              </Link>
            </CCol>
          </CRow>
        </CCol>
      </CRow>
      <CCard  className="mb-4 mt-2">
        <CCardHeader>
          <h5 className="mb-0"><strong>Manage Permission</strong></h5>
        </CCardHeader>
        <CCardBody>
          <CTable responsive striped hover>
            <CTableHead>
              <CTableRow>
                <CTableDataCell scope="col">Module Name</CTableDataCell>
                <CTableDataCell scope="col">View</CTableDataCell>
                <CTableDataCell scope="col">Add</CTableDataCell>
                <CTableDataCell scope="col">Edit</CTableDataCell>
                <CTableDataCell scope="col">Delete</CTableDataCell>
                <CTableDataCell scope="col">Actions</CTableDataCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {permissionList?.map((permission: any) => (
                <CTableRow key={permission.permissionId}>
                  <CTableDataCell>{permission.moduleName}</CTableDataCell>
                  <CTableDataCell><CFormCheck type="checkbox" name="isView" checked={permission.isView}/></CTableDataCell>
                  <CTableDataCell><CFormCheck type="checkbox" name="isAdd" checked={permission.isAdd}/></CTableDataCell>
                  <CTableDataCell><CFormCheck type="checkbox" name="isEdit" checked={permission.isEdit}/></CTableDataCell>
                  <CTableDataCell><CFormCheck type="checkbox" name="isDelete" checked={permission.isDelete}/></CTableDataCell>
                  <CTableDataCell>
                    <CButton color="secondary" variant="outline" onClick={() => {UpdatePermissions(permission?.permissionId)}}>
                        Update
                    </CButton>
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

export default ManagePermission;
