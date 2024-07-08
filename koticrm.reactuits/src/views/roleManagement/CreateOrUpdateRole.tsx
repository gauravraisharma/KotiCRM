import { useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CButton, CCard, CCardBody, CCardHeader, CCol, CFormCheck, CRow } from "@coreui/react";
import { Role, RoleClass } from "../../models/permissionManagement/Role";
import { CreateRole, GetPermissionsList, GetRoleById, UpdatePermission, UpdateRole, GetModules, createModulePermission } from "../../redux-saga/modules/permissionManagement/apiService";
import { Permission } from "../../models/permissionManagement/Permissions";


const CreateOrUpdateRole = () => {
  const { id } = useParams<{ id: string }>();
  const [role, setRole] = useState<Role>(new RoleClass());
  const [isActive, setIsActive] = useState(false);
  const [permissionList, setPermissionList] = useState<Permission[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [roleModules, setRoleModules] = useState([]);
  const [roleModuleList, setRoleModuleList] = useState<Permission[]>([]);


  const navigate = useNavigate();


  useEffect(() => {
    if (id) {
      GetRole(id);
      GetPermissions(id);


    } else {
      setRole(new RoleClass());
    }
    GetModule(null)
  }, [id]);



  const GetRole = async (roleId: string) => {
    const response = await GetRoleById(roleId);
    setRole(response.role);
    setIsActive(response.role.isactive);
  };


  const GetPermissions = async (roleId: string) => {
    try {
      const response = await GetPermissionsList(roleId);
      console.log(response)
      if (response.status == 'SUCCEED' ){
        setPermissionList(response.modulePermissions);
        GetModule(response.modulePermissions)
      
    } else {
      console.error("Failed to fetch modules. Response status:", response.status);
      toast.error("Failed to fetch modules.");
    }

     
    } catch (error) {
      console.error("Error fetching modules:", error);
      toast.error("Failed to fetch modules.");
    } finally {
      //   setIsLoading(false);
    }
  };
  console.log(permissionList)

  const GetModule = async (modulePermission: any) => {
    try {
      const response = await GetModules();
      setRoleModules(response);
  
      const permissions = response.map((module: any) => {
        const storedPermission = modulePermission?.find((permission: any) => permission.moduleId === module.id);
        return {
          moduleId: module.id,
          roleId: id,
          permissionId: storedPermission ? storedPermission.permissionId : 0,
          moduleName: module.name,
          isView: storedPermission ? storedPermission.isView : false,
          isEdit: storedPermission ? storedPermission.isEdit : false,
          isDelete: storedPermission ? storedPermission.isDelete : false,
          isAdd: storedPermission ? storedPermission.isAdd : false,
        };
      });
  
      setRoleModuleList(permissions);
    } catch (error) {
      console.error("Error fetching modules:", error);
      toast.error("Failed to fetch modules.");
    }
  };
  

  const handleIsActiveChange = (e: any) => {
    setIsActive(e.target.checked);

    if (id && e.target.checked) {
      setShowPopup(true);
    }
  };
  const handleClosePopup = () => {
    setShowPopup(false);
  };

  // const handleCheckboxChange = (e: any, passedId: number) => {
  //   const { name, checked } = e.target;

  //   //edit case 
  //   if (passedId) {
  //     setPermissionList(prevPermissions =>
  //       prevPermissions.map(permission =>
  //         permission.permissionId === passedId
  //           ? { ...permission, [name]: checked ? checked : false, roleId: id ? id : "" }
  //           : { ...permission, roleId: permission.permissionId !== passedId ? (id ? id : "") : permission.roleId }
  //         // : permission
  //       )
  //     );
  //   }

  //   //Add case 
  //   else if (id == null || id == undefined) {
  //     setPermissionList(prevPermissions =>
  //       prevPermissions.map(permission =>
  //         permission.moduleId === passedId

  //           ? { ...permission, [name]: checked ? checked : false, roleId: id ? id : "" }
  //           : { ...permission, roleId: '' }
  //         // : permission
  //       )
  //     );

  //   }
  //   else {
  //     toast.error("PermissionId not found");
  //   }
  // };

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
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, moduleId: number) => {
    const { name, checked } = e.target;

    setPermissionList((prevPermissions:any) => {
      const permissionExists = prevPermissions.some((permission:Permission) => permission.moduleId === moduleId);
  
      if (permissionExists) {
        return prevPermissions.map((permission:Permission) =>
          permission.moduleId === moduleId
            ? { ...permission, [name]: checked, roleId: id || "" }
            : permission
        );
      } else {
        return [
          ...prevPermissions,
          { moduleId, [name]: checked, roleId: id || "" }
        ];
      }
    });

   setRoleModuleList((prevPermissions:any) => {
      const permissionExists = prevPermissions.some((permission:any) => permission.moduleId === moduleId);
  
      if (permissionExists) {
        return prevPermissions.map((permission:any) =>
          permission.moduleId === moduleId
            ? { ...permission, [name]: checked, roleId: id || "" }
            : permission
        );
      } else {
        return [
          ...prevPermissions,
          { moduleId, [name]: checked, roleId: id || "" }
        ];
      }
    });
};


  // const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, moduleId: number) => {
  //   const { name, checked } = e.target;
  
  //   setroleModuleList((prevPermissions) =>
  //     prevPermissions.map((permission) =>
  //       permission.moduleId === moduleId
  //         ? { ...permission, [name]: checked, roleId: id || "" }
  //         : permission
  //     )
  //   );
  // };

  const handleFormSubmit = async (
    role: Role,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    if (id && !isActive) {
      setShowPopup(true);
      setSubmitting(false);
      return;
    }
    try {
      role.isactive = isActive;
      // if (!id) {
        let response:any;
        if (!id) {
          response = await CreateRole(role);
          if (permissionList.length > 0) {
              const updatedPermissionList = permissionList.map(permission => ({
                ...permission,
                roleId: response.data.roleId
              }));
            const permissionResponse = await createModulePermission(updatedPermissionList);
            if (permissionResponse.status === 200) {
              toast.success("Permissions created successfully");
            } else {
              throw new Error("Failed");
            }
          }
        } else {
          response = await UpdateRole(role);
          if (permissionList.length > 0) {
            const permissionResponse = await UpdatePermission(permissionList);
            if (permissionResponse.status === 200) {
              toast.success("Permissions updated successfully");
            } else {
              throw new Error("Permissions update failed");
            }
          }
        }
        // const response = await CreateRole(role);
        if (response.status == 200) {
          toast.success(id? "Role updated successfully":"Role created successfully");
        //   setTimeout(() => {
        //     navigate("/roles");
        //   }, 800);
        // } else {
        //   toast.error("You are not allowed to add roles. Please contact your administrator.");
        // }
        
        
        setTimeout(() => navigate("/roles"), 3000);
      } else {
        toast.error("Role operation failed");
      }
    }catch (error) {
        console.error("Error during form submission:", error);
        toast.error("Permission is failed");
      } finally {
        setSubmitting(false);
      }
    };
  //     }
  //     else {
  //       const roleResponse = await UpdateRole(role);
  //       if (roleResponse.status == 200) {
  //         toast.success("Role updated successfully");
  //         setTimeout(() => {
  //           navigate("/roles");
  //         }, 1000);
  //       } else {
  //         toast.error("Role updation failed");
  //       }
  //       if (roleModuleList.length > 0) {
  //         const permissionresponse = await UpdatePermission(roleModuleList);
  //         if (permissionresponse.status == 200) {
  //           console.log("Permissions updated successfully");
  //           setTimeout(() => {
  //             navigate("/roles");
  //           }, 1000);
  //         } else {
  //           toast.error("Permissions updation failed");
  //         }
  //       }
  //     }
  //   } catch (error) {
  //     console.log("error message:", error);
  //   } finally {
  //     setSubmitting(false);
  //   }
  // };

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
                          className={`form-control ${touched.name && errors.name
                              ? "is-invalid"
                              : ""
                            }`}
                          placeholder="Enter role here"
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
                    {showPopup && (
                      <div className="backdrop">
                        <div className="delete-confirmation-modal card">
                          <div className="modal-content">
                            <div className="modal-header flex-column">
                              <h4 className="modal-title w-100">Warning!</h4>
                            </div>
                            <div className="modal-body">
                              <p> If <b>'Is Active'</b> is not checked, users assigned to this role will not be able to log in.</p>
                            </div>
                            <div className="modal-footer justify-content-center">
                              <button
                                type="button"
                                className="btn btn-success mx-2"
                                onClick={handleClosePopup}
                                data-dismiss="modal"
                              >
                                Okay
                              </button>
                              <button
                                type="button"
                                className="btn btn-secondary mx-2"
                                onClick={handleClosePopup}
                                data-dismiss="modal"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </CCol>


                  <>
                    <CRow>
                      <h5 className="mb-0 mb-3 mt-5">Manage Permissions</h5><hr />
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

                      {roleModuleList?.map((permission: Permission) => (
                        <CRow className="mb-3 pl-6">
                          <CCol sm={4}>
                            {permission.moduleName}
                          </CCol>
                          <CCol sm={2}>
                            <CFormCheck id="isView" name="isView" checked={permission.isView} onChange={(e) => handleCheckboxChange(e, permission.moduleId)} />
                          </CCol>
                          <CCol sm={2}>
                            <CFormCheck id="isAdd" name="isAdd" checked={permission.isAdd} onChange={(e) => handleCheckboxChange(e, permission.moduleId)} />
                          </CCol>
                          <CCol sm={2}>
                            <CFormCheck id="isEdit" name="isEdit" checked={permission.isEdit} onChange={(e) => handleCheckboxChange(e, permission.moduleId)} />
                          </CCol>
                          <CCol sm={2}>
                            <CFormCheck id="isDelete" name="isDelete" checked={permission.isDelete} onChange={(e) => handleCheckboxChange(e, permission.moduleId)} />
                          </CCol>
                        </CRow>
                      ))}
                    </CRow>
                  </>


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
