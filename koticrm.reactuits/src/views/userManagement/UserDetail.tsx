import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ChangePassword,
  GetEmployeeById,
} from "../../redux-saga/modules/userManagement/apiService";
import { Employee, EmployeeClass } from "../../models/userManagement/employee";
import { ToastContainer, toast } from "react-toastify";
import {
  CRow,
  CCol,
  CCard,
  CCardHeader,
  CButton,
  CCardBody,
} from "@coreui/react";
import "../../../src/css/style.css";
import {  Field, Formik } from "formik";
import * as Yup from "yup";

const UserDetails = () => {
  const data = useParams<{}>();
  // const email = data.email;
  const employeeId = data.employeeId;
  const userId = data.userId;
  console.log(employeeId);
  console.log(userId);
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [formData, setFormData] = useState<Employee>(new EmployeeClass());

  useEffect(() => {
    if (employeeId) {
      getEmployeeById(employeeId);
    }
  }, [employeeId]);

  const getEmployeeById = async (employeeId: string) => {
    try {
      const response = await GetEmployeeById(employeeId);
      setFormData(response);
      console.log(response);
    } catch (error) {
      toast.error("Fetch User failed");
    }
  };

  // const handleSubmit = async () => {
  //   debugger;

  //   if (password === confirmPassword) {
  //     const result = await ChangePassword(userId, password);

  //     if (result.status == 200) {
  //       toast.success("Password changed successfully");
  //     }
  //   } else {
  //     toast.error("Failed to change password");
  //   }
  // };
  const handleSubmit = async (values, { setSubmitting, setValues }) => {
    if (values.newPassword === values.confirmPassword) {

      const passwordRequestModal = {
        newPassword : values.newPassword,
        userId: userId,
        isEmailSent : false
      }
      const result = await ChangePassword(passwordRequestModal);
      if (result.status === 200) {
        toast.success("Your Password has been changed successfully");
        // Reset form values upon successful password change
        setValues({
          newPassword: "",
          confirmPassword: "",
        });
      }
    } else {
      toast.error("Failed to change password");
    }
    setSubmitting(false);
  };

  const handleBlur = () => {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    }
  };

  const validationSchema = Yup.object({
    newPassword: Yup.string()
    .required("New password is required")
    .matches(/^(?=.*[0-9])(?=.*[^a-zA-Z0-9])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*]{8,}$/, "Password must contain at least one non-alphanumeric character and one letter"),
    confirmPassword: Yup.string()
      .required("Confirm password is required")
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match"),
  });

  return (
    <>
      <ToastContainer />
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <CRow>
                <CCol xs={6} className="d-flex align-items-center">
                  <h5>
                    <strong>User Detail</strong>
                  </h5>
                </CCol>
                <CCol xs={6}>
                  <div className="text-end">
                    <CButton
                      component="input"
                      type="button"
                      color="secondary"
                      value="Back To users"
                      onClick={() => navigate("/users")}
                    />
                  </div>
                </CCol>
              </CRow>
            </CCardHeader>
            <CCardBody>
              <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link active"
                    id="home-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#home"
                    type="button"
                    role="tab"
                    aria-controls="home"
                    aria-selected="true"
                  >
                    User Detail
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="manageuser-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#manageuser"
                    type="button"
                    role="tab"
                    aria-controls="manageuser"
                    aria-selected="false"
                  >
                    Manage Users
                  </button>
                </li>
              </ul>

              <div className="tab-content" id="userdetail">
                <div
                  className="tab-pane fade show active"
                  id="home"
                  role="tabpanel"
                  aria-labelledby="home-tab"
                >
                  <div className="headings">
                    <h5>User information</h5>
                  </div>
                  <ul className="user-list">
                    <CRow>
                      <CCol xs={3}>
                        <li>
                          Employee Code:
                          <p>{formData.employeeCode}</p>
                        </li>
                      </CCol>
                      <CCol xs={3}>
                        <li>
                          Employee Name:
                          <p>{formData.name}</p>
                        </li>
                      </CCol>
                      <CCol xs={3}>
                        <li>
                          Father Name:
                          <p>{formData.fatherName}</p>
                        </li>
                      </CCol>
                      <CCol xs={3}>
                        <li>
                          Contact Number:
                          <p>{formData.contactNumber1}</p>
                        </li>
                      </CCol>
                      <CCol xs={3}>
                        <li>
                          Date of Birth:
                          <p>{formData.dateOfBirth}</p>
                        </li>
                      </CCol>
                      <CCol xs={3}>
                        <li>
                          Official Email:
                          <p>{formData.officialEmail}</p>
                        </li>
                      </CCol>
                      <CCol xs={3}>
                        <li>
                          Personal Email:
                          <p>{formData.personalEmail}</p>
                        </li>
                      </CCol>
                      <CCol xs={3}>
                        <li>
                          Skype Id:
                          <p>{formData.skypeId}</p>
                        </li>
                      </CCol>
                      <CCol xs={3}>
                        <li>
                          Designation:
                          <p>{formData.designationId}</p>
                        </li>
                      </CCol>
                      <CCol xs={3}>
                        <li>
                          Department:
                          <p>{formData.departmentId}</p>
                        </li>
                      </CCol>
                      <CCol xs={3}>
                        <li>
                          Aadhar Number:
                          <p>{formData.adharCardNumber}</p>
                        </li>
                      </CCol>
                      <CCol xs={3}>
                        <li>
                          Branch of bank:
                          <p>{formData.branch}</p>
                        </li>
                      </CCol>
                      <CCol xs={3}>
                        <li>
                          Account Number:
                          <p>{formData.bankAccountNumber}</p>
                        </li>
                      </CCol>
                      <CCol xs={3}>
                        <li>
                          IFSC code:
                          <p>{formData.ifsc}</p>
                        </li>
                      </CCol>
                    </CRow>
                  </ul>
                </div>
                <div
                  className="tab-pane fade"
                  id="manageuser"
                  role="tabpanel"
                  aria-labelledby="manageuser-tab"
                >
                  
                  <Formik
                    initialValues={{
                      newPassword: "",
                      confirmPassword: "",
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                  >
                    {(formik) => (
                      <form onSubmit={formik.handleSubmit}>
                        <div className="headings">
                          <h5>Change Password</h5>
                        </div>

                        <div className="card">
                          <div className="card-body">
                            <div
                              className="mb-3"
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                margin: "20px",
                              
                              }}
                            >
                              <label htmlFor="newPassword" className="col-sm-4">
                                New Password:
                              </label>
                            <div className="col-sm-8">
                            <Field
                                type="password"
                                id="newPassword"
                                name="newPassword"
                                
                                className={`form-control password newPassword-input  ${
                                  formik.touched.newPassword &&
                                  formik.errors.newPassword
                                    ? "border border-danger"
                                    : ""
                                }`}
                                style={{ height: "50px" }}
                                placeholder="Enter new password"
                              />
                              {formik.touched.newPassword &&
                                formik.errors.newPassword && (
                                  <div className="text-danger">
                                    {formik.errors.newPassword}
                                  </div>
                                )}
                            </div>
                            </div>
                            <div
                              className="mb-3"
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                margin: "20px",
                              }}
                            >
                              <label
                                htmlFor="confirmPassword"
                                className="col-sm-4"
                              >
                                Confirm New Password:
                              </label>
                              <div className="col-sm-8">
                              <Field
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                className={`form-control password1 confirmPassword-input  ${
                                  formik.touched.confirmPassword &&
                                  formik.errors.confirmPassword
                                    ? "border border-danger"
                                    : ""
                                }`}
                                onClick={handleBlur}
                                style={{ height: "50px" }}
                                placeholder="Confirm new password"
                                
                              />
                              {formik.touched.confirmPassword &&
                                formik.errors.confirmPassword && (
                                  <div className="text-danger">
                                    {formik.errors.confirmPassword}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-sm-12 text-end">
                            <button
                              type="button"
                              className="btn btn-primary"
                              color="secondary"
                              onClick={formik.handleReset}
                            >
                              Reset
                            </button>
                            <button type="submit" className="btn btn-primary">
                              Save
                            </button>
                            <button type="submit" 
                            className="btn btn-primary"
                            // onClick={handleEmail}
                            >
                              Email Password
                            </button>
                          </div>
                        </div>
                      </form>
                    )}
                  </Formik>
                </div>
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default UserDetails;
