import { useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate, useParams } from "react-router-dom";
import { createContact, updateContact } from "../../redux-saga/modules/contact/action";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CButton, CCard, CCardBody, CCardHeader, CCol, CFormCheck, CRow, CTableBody, CTableDataCell, CTableRow } from "@coreui/react";
import { Role, RoleClass } from "../../models/permissionManagement/Role";
import { CreateRole, GetPermissionsList, GetRoleById, GetRolesList, UpdatePermission, UpdateRole } from "../../redux-saga/modules/permissionManagement/apiService";
import { Permission } from "../../models/permissionManagement/Permissions";


const CreateOrUpdateRole = () => {
   const { id } = useParams<{ id: string }>();
   const [role, setRole] = useState<Role>(new RoleClass());
   const [isActive, setIsActive] = useState(true);
   const [permissionList, setPermissionList] = useState<Permission[]>([]);


  const navigate = useNavigate();
 

    useEffect(() => {
    if (id) {
        GetRole(id);
        GetPermissions(id);
    } else {
        setRole(new RoleClass());
    }
    }, [id]);

    const GetRole = async (roleId: string) => {
        const response = await GetRoleById(roleId);
        setRole(response.role);
        setIsActive(response.role.isactive);
    };

    const GetPermissions = async (roleId: string) => {
        try {
          const response = await GetPermissionsList(roleId);
          setPermissionList(response.modulePermissions);
        } catch (error) {
          console.error("Error fetching modules:", error);
          toast.error("Failed to fetch modules.");
        } finally {
        //   setIsLoading(false);
        }
      };

    const handleIsActiveChange = (e:any) => {
        setIsActive(e.target.checked);
    };

    const handleCheckboxChange = (e: any, permissionId: number) => {
        const { name, checked } = e.target;
    
        if (permissionId) {
            setPermissionList(prevPermissions =>
                prevPermissions.map(permission =>
                    permission.permissionId === permissionId
                        ? { ...permission, [name]: checked ? checked : false, roleId: id ? id : ""}
                        : { ...permission, roleId: permission.permissionId !== permissionId ? (id ? id : "") : permission.roleId }
                        // : permission
                )
            );
        } else {
            toast.error("PermissionId not found");
        }
    };

    // const handleCheckboxChange = (e: any, permissionId: number) => {
    //     // setIsActive(e.target.checked);
    //     const { name, checked } = e.target;
    //     if(permissionId){
    //         setPermissionList(prevPermissions =>
    //             prevPermissions.map(permission =>
    //                 permission.permissionId === permissionId
    //                     ? { ...permission, [name]: checked, roleId: id ? id : ""}
    //                     : permission
    //             )
    //         );
    //     }
    //     else{
    //         toast.error("RoleId not found");
    //     }
        
    // };


  const handleFormSubmit = async (
    role: Role,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    try {
        role.isactive = isActive;
      if (!id) {
        const response = await CreateRole(role);
        if (response.status == 200) {
            toast.success("Role created successfully");
        setTimeout(() => {
            navigate("/roles");
        }, 5000);
        } else {
          toast.error("Role creation failed");
        }
      } 
      else {
        const roleResponse = await UpdateRole(role);
        if (roleResponse.status == 200) {
            toast.success("Role updated successfully");
            setTimeout(() => {
                navigate("/roles");
            }, 5000);
        } else {
          toast.error("Role updation failed");
        }
        if(permissionList.length > 0){
            const permissionresponse = await UpdatePermission(permissionList);
            if (permissionresponse.status == 200) {
                console.log("Permissions updated successfully");
                setTimeout(() => {
                    navigate("/roles");
                }, 5000);
            } else {
                toast.error("Permissions updation failed");
            }
        }
      }
    } catch (error) {
      console.log("error message:", error);
    } finally {
      setSubmitting(false);
    }
  };



  const validationSchema = Yup.object({
    name: Yup.string().required("Required (Role Name)"),
  });

  return (
    <>
      <ToastContainer />
      <CCard>
        <CCardHeader className="mb-3">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h5 className="mb-0">{id == null ? "Create" : "Update"} Role</h5>
            </div>
            <div className="text-end">
            <Link to={`/roles`}>
              <CButton
                component="input"
                type="button"
                color="secondary"
                value="Back To Roles"
              />
              </Link>
            </div>
          </div>
        </CCardHeader>
        <CCardBody>
          <Formik
            initialValues={role}
            enableReinitialize
            validationSchema={validationSchema}
            onSubmit={handleFormSubmit}
          >
            {({ handleSubmit, isSubmitting, touched, errors }) => (
              <Form onSubmit={handleSubmit} autoComplete="off">
                <CRow className="justify-content-between">
                  <CCol xs={6}>
                    <CRow className="mb-3">
                      <CCol sm={4}>
                        <label htmlFor="name" className="col-form-label">
                          Role Name
                          <span style={{ color: "red", fontSize: "25px" }}>
                            *
                          </span>
                        </label>
                      </CCol>
                      <CCol sm={8}>
                        <Field
                          type="text"
                          id="name"
                          name="name"
                          className={`form-control ${
                            touched.name && errors.name
                              ? "is-invalid"
                              : ""
                          }`}
                          placeholder="Enter your first name"
                          style={{ height: "50px" }}
                        />
                        <ErrorMessage
                          name="name"
                          className="invalid-feedback"
                          render={(error) => (
                            <label style={{ color: "#dc3545" }}>{error}</label>
                          )}
                        />
                      </CCol>
                    </CRow>
                  </CCol>
                  <CCol xs={6}>
                    <CRow className="mb-3">
                      <CCol sm={4}>
                        <label htmlFor="isactive" className="col-form-label">
                          Is Active
                        </label>
                      </CCol>
                      <CCol sm={8}>
                        <CFormCheck
                            id="isactive"
                            name="isactive"
                            checked={isActive}
                            onChange={handleIsActiveChange}
                        />
                        <ErrorMessage
                          name="isactive"
                          className="invalid-feedback"
                          render={(error) => (
                            <label style={{ color: "#dc3545" }}>{error}</label>
                          )}
                        />
                      </CCol>
                    </CRow>
                  </CCol>
                  {id ? permissionList.length > 0 ?
                    (
                        <>
                            <CRow>
                                <h5 className="mb-0 mb-3 mt-5">Manage Permissions</h5><hr/>
                            </CRow>
                            <CRow className="mb-3 ml-2">
                                <CCol sm={4}>
                                    <label htmlFor="name" className="col-form-label" style={{ fontWeight: 'bold' }}>Module Name</label>
                                </CCol>
                                <CCol sm={2}>
                                    <label htmlFor="isView" className="col-form-label" style={{ fontWeight: 'bold' }}>View</label>
                                </CCol>
                                <CCol sm={2}>
                                    <label htmlFor="isAdd" className="col-form-label" style={{ fontWeight: 'bold' }}>Add</label>
                                </CCol>
                                <CCol sm={2}>
                                    <label htmlFor="isEdit" className="col-form-label" style={{ fontWeight: 'bold' }}>Edit</label>
                                </CCol>
                                <CCol sm={2}>
                                    <label htmlFor="isDelete" className="col-form-label" style={{ fontWeight: 'bold' }}>Delete</label>
                                </CCol>
                            </CRow>
                            <CRow>
                                {permissionList?.map((permission: Permission) => (
                                    <CRow className="mb-3 pl-6">
                                        <CCol sm={4}>
                                            {permission.moduleName}
                                        </CCol>
                                        <CCol sm={2}>
                                            <CFormCheck id="isView" name="isView" checked={permission.isView} onChange={(e) => handleCheckboxChange(e, permission.permissionId)} />
                                        </CCol>
                                        <CCol sm={2}>
                                            <CFormCheck id="isAdd" name="isAdd" checked={permission.isAdd} onChange={(e) => handleCheckboxChange(e,permission.permissionId)} />
                                        </CCol>
                                        <CCol sm={2}>
                                            <CFormCheck id="isEdit" name="isEdit" checked={permission.isEdit} onChange={(e) => handleCheckboxChange(e,permission.permissionId)} />
                                        </CCol>
                                        <CCol sm={2}>
                                            <CFormCheck id="isDelete" name="isDelete" checked={permission.isDelete} onChange={(e) => handleCheckboxChange(e,permission.permissionId)} />
                                        </CCol>
                                    </CRow>    
                                ))}
                            </CRow>
                        </>
                    ) : 
                    <CRow>
                        <h3 className="mb-0 mb-5 mt-5 text-center">No module found.</h3>
                    </CRow>
                    : ""
                  }
                  

                  <CRow className="mb-3">
                    <CCol sm={12} className="text-end">
                      <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Submitting..." : "Submit"}
                      </button>
                      <Link to={`/roles`}>
                        <CButton
                          component="input"
                          type="button"
                          color="secondary"
                          value="cancel"
                        />
                      </Link>
                    </CCol>
                  </CRow>
                </CRow>
              </Form>
            )}
          </Formik>
        </CCardBody>
      </CCard>
    </>
  );
};

export default CreateOrUpdateRole;
