import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ChangePassword, GetEmployeeById } from "../../redux-saga/modules/userManagement/apiService";
import { Employee, EmployeeClass } from "../../models/userManagement/employee";
import { ToastContainer, toast } from "react-toastify";
import { CRow, CCol, CCard, CCardHeader, CButton, CCardBody } from "@coreui/react";
import * as Yup from "yup";
import { Formik, Field } from "formik";
import "react-toastify/dist/ReactToastify.css";
import { FaDownload } from "react-icons/fa6";

const UserDetails = () => {
  const { employeeId, userId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Employee>(new EmployeeClass());
  const financialYears = ["2024-25", "2023-24"];
  const years = ['2024-25', '2023-24'];

  useEffect(() => {
    const getEmployeeById = async (employeeId: string) => {
      try {
        const response = await GetEmployeeById(employeeId);
        setFormData(response);
      } catch (error) {
        toast.error("Fetch User failed");
      }
    };

    if (employeeId) {
      getEmployeeById(employeeId);
    }
  }, [employeeId]);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    if (values.newPassword === values.confirmPassword) {
      const passwordRequestModal = {
        newPassword: values.newPassword,
        userId: userId,
        isEmailSent: false
      };
      const result = await ChangePassword(passwordRequestModal);
      if (result.status === 200) {
        toast.success("Your Password has been changed successfully");
        resetForm();
      }
    } else {
      toast.error("Passwords do not match");
    }
    setSubmitting(false);
  };

  const handleSaveClick = (formik: any) => {
    // Check if the form is valid
    if (formik.isValid) {
      // If valid, navigate to the "/users" page
      window.location.href = '/users';
    } else {

      console.log('Please fill out the form');
    }
  };


  const validationSchema = Yup.object().shape({
    newPassword: Yup.string()
      .required("New password is required")
      .matches(
        /^(?=.*[0-9])(?=.*[^a-zA-Z0-9])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*]{8,}$/,
        "Password must contain at least one non-alphanumeric character and one letter"
      ),
    confirmPassword: Yup.string()
      .required("Confirm password is required")
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
  });
  // Loop to generate JSX elements
  const financialYearElements = [];
  for (let i = 0; i < financialYears.length; i++) {
    financialYearElements.push(
      <div key={i}>
        <p style={{ fontWeight: 'bold' }}>Financial year {financialYears[i]}</p>
      </div>
    );
  }


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
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="taxation-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#taxation"
                    type="button"
                    role="tab"
                    aria-controls="taxation"
                    aria-selected="false"
                  >
                    Taxation
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
                          <p>{formData.contactNumber}</p>
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
                          Email:
                          <p>{formData.email}</p>
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
                          Role:
                          <p>{formData.roleId}</p>
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

                                  className={`form-control password newPassword-input  ${formik.touched.newPassword &&
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
                                  className={`form-control password1 confirmPassword-input  ${formik.touched.confirmPassword &&
                                    formik.errors.confirmPassword
                                    ? "border border-danger"
                                    : ""
                                    }`}

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
                              type="submit"
                              className="btn btn-primary"
                              onClick={handleSaveClick}
                            >
                              Save
                            </button>
                            <button type="submit"
                              className="btn btn-primary"

                            >
                              Email Password
                            </button>
                          </div>
                        </div>
                      </form>
                    )}
                  </Formik>
                </div>


                <div className="tab-pane fade" id="taxation" role="tabpanel" aria-labelledby="taxation-tab">
                  <CCard className="mb-4" style={{ borderColor: '#4e73df' }}>
                    <CCardHeader className="mb-3" style={{ backgroundColor: '#4e73df', color: 'white' }}>
                      <div className="d-flex justify-content-between align-items-center">
                        <h5 className="mb-0">12 BB Declaration and Details</h5>
                      </div>
                    </CCardHeader>

                    <CCardBody style={{ padding: '20px', backgroundColor: '#f8f9fc' }}>
                      {/* <CRow>
                        <CCol md="6">
                          <div>
                            <p style={{ fontWeight: 'bold' }}>Financial year 2024-25</p>
                          </div>
                          <div>
                            <p style={{ fontWeight: 'bold' }}>Financial year 2023-24</p>
                          </div>
                        </CCol>
                        <CCol md="6" className="text-end">
                          <div>
                          <Link to={`/Form12BB`}>
                            Submit Proofs
                          </Link>
                          </div>
                          <br />
                          <div>
                            <p>Last submitted on 21-March-2024 <u style={{ cursor: 'pointer', color: '#4e73df' }}>View Detail</u></p>
                          </div>
                        </CCol>
                      </CRow> */}
                      <CRow>
                        <CCol md="6">
                          {financialYearElements}
                        </CCol>
                        <CCol md="6" className="text-end">
                          <div>
                            <Link to={`/Form12BB`}>
                              Submit Proofs
                            </Link>
                          </div>
                          <br />
                          {/* <div>
                            <p>Last submitted on 21-March-2024 <u style={{ cursor: 'pointer', color: '#4e73df' }}>View Detail</u></p>
                          </div> */}
                        </CCol>
                      </CRow>
                    </CCardBody>

                  </CCard>
                  <CCard className="mb-4" style={{ borderColor: '#1cc88a' }}>
                    <CCardHeader className="mb-3" style={{ backgroundColor: '#1cc88a', color: 'white' }}>
                      <div className="d-flex justify-content-between align-items-center">
                        <h5 className="mb-0">Form 16</h5>
                      </div>
                    </CCardHeader>
                    <CCardBody style={{ padding: '20px', backgroundColor: '#f8f9fc' }}>
                      <CRow>
                        {years.map((year, index) => (
                          <CCol md="12" key={index}>
                            <div>
                              <p style={{ fontWeight: 'bold' }}>Financial year {year}</p>
                            </div>
                            <div className="text-end">
                              <div>
                                <u style={{ cursor: 'pointer', color: '#1cc88a' }}><FaDownload /> Download</u>
                              </div>


                            </div>
                      
                          </CCol>
                        ))}
                      </CRow>
                    </CCardBody>
                  </CCard>
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
