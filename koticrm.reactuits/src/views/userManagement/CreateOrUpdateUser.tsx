import React, { useEffect, useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormCheck,
  CFormSelect,
  CImage,
  CRow,
} from "@coreui/react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link, useNavigate, useParams, useRoutes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SearchDropdown from "../../components/base/select/SearchDropdown";
import { ToastContainer } from "react-toastify";
import { User, UserClass } from "../../models/userManagement/user";

const CreateOrUpdateUser = () => {
  // Parameters
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useParams<{ userId: string }>();

  // States
  const [user, setUser] = useState<User>(new UserClass());
  const [employeeCount, setEmployeeCount] = useState(0);
  const [employeeId, setEmployeeId] = useState("");
  const [employeeCode, setEmployeeCode] = useState("");
  const [isActiveChecked, setIsActiveChecked] = useState(true);
  const [isRelievedChecked, setIsRelievedChecked] = useState(false);

  // Effects
  useEffect(() => {
    const employeeId = generateEmployeeId();
    setEmployeeId(employeeId);
    if (employeeId !== "0") {
      const employeeCode = generateEmployeeCode("tcs", 3, employeeId);
      setEmployeeCode(employeeCode);
    }
  }, []);

  // Handlers
  const handleCheckbox = (event: any) => {
    // setIsActiveChecked(!event.target.checked); // Uncheck isActive if isRelieved is checked
    // if(event.target.name){
    //     setIsRelievedChecked(true);
    // }
    // isActiveChecked ? setIsRelievedChecked(false) : "";

    const { id, checked } = event.target;

    if (id === "isActive" && checked) {
      // If Active is checked, uncheck isRelieved
      setIsRelievedChecked(false);
    } else if (id === "isRelieved" && checked) {
      // If isRelieved is checked, uncheck Active
      setIsActiveChecked(false);
    }

    // Update the checked status of the corresponding checkbox
    if (id === "isActive") {
      setIsActiveChecked(checked);
    } else if (id === "isRelieved") {
      setIsRelievedChecked(checked);
    }
  };

  // Generate Employee Number
  const generateEmployeeId = () => {
    const paddedCount = String(employeeCount).padStart(7, "0"); // Ensure 8 characters with leading zeros
    const employeeId = `0000000${paddedCount}`.slice(-8); // Ensure exactly 8 characters
    setEmployeeCount((prevCount) => prevCount + 1); // Increment employee count for uniqueness
    return employeeId;
  };

  // Generate EmployeeCode
  const generateEmployeeCode = (
    organizationName: string,
    departmentId: number,
    employeeId: string
  ) => {
    // Generate a random 4-letter combination for the organization name
    // const generateRandomLetters = () => {
    //     const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    //     let result = '';
    //     for (let i = 0; i < 4; i++) {
    //         result += letters.charAt(Math.floor(Math.random() * letters.length));
    //     }
    //     return result;
    // };

    // // Format employee code
    // const randomLetters = generateRandomLetters();
    // return `${randomLetters}-EMP-${departmentId}-${employeeId.padStart(8, '0')}`;

    const name = organizationName.toUpperCase();
    return `${name}-EMP-${departmentId}-${employeeId}`;
  };

  // Submit
  const handleFormSubmit = async (
    user: User,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    try {
    } catch (error) {}
  };

  return (
    <>
      <ToastContainer />
      <CCard>
        <CCardHeader className="mb-3">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h5 className="mb-0">
                {userId ? "Update" + userId : "Create"} User
              </h5>
            </div>
            <div className="text-end">
              <Link to={`/users`}>
                <CButton
                  component="input"
                  type="button"
                  color="secondary"
                  value="Back to Users"
                />
              </Link>
            </div>
          </div>
        </CCardHeader>
        <CCardBody>
          <Formik
            initialValues={user}
            enableReinitialize
            // validationSchema={validationSchema}
            onSubmit={handleFormSubmit}
          >
            {({ handleSubmit, isValid, isSubmitting, touched, errors }) => (
              <Form onSubmit={handleSubmit} autoComplete="off">
                <CRow className="justify-content-between">
                  <h4>Employee Code</h4>
                  <CCol xs={4}>
                    <CRow className="mb-3">
                      <CCol sm={12}>
                        <CImage
                          rounded
                          thumbnail
                          src=""
                          width={120}
                          height={120}
                          className="rounded-circle"
                          style={{
                            borderRadius: "50%",
                            marginLeft: "5rem",
                            marginTop: "2rem",
                          }}
                        />
                      </CCol>
                    </CRow>
                  </CCol>
                  <CCol xs={4}>
                    <CRow className="mb-3">
                      <CCol sm={12}>
                        <label htmlFor="employeeID">
                          Id
                          <span style={{ color: "red", fontSize: "25px" }}>
                            *
                          </span>
                        </label>
                        <Field
                          type="number"
                          id="employeeID"
                          value={employeeId}
                          name="employeeID"
                          className="form-control"
                          disabled
                          style={{
                            borderBottom: "1px solid gray",
                            borderLeft: "none",
                            borderRight: "none",
                            borderTop: "none",
                            height: "50%",
                          }}
                        />
                        <ErrorMessage
                          name="employeeID"
                          className="invalid-feedback"
                          render={(error) => (
                            <label style={{ color: "#dc3545" }}>{error}</label>
                          )}
                        />
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CCol sm={12}>
                        <label htmlFor="joiningDate">Joining Date</label>
                        <Field
                          type="date"
                          id="joiningDate"
                          name="joiningDate"
                          className="form-control"
                          //   className={`form-control ${touched.joiningDate && errors.joiningDate
                          //       ? "is-invalid"
                          //       : ""
                          //     }`}
                          style={{
                            borderBottom: "1px solid gray",
                            borderLeft: "none",
                            borderRight: "none",
                            borderTop: "none",
                            height: "50%",
                          }}
                        />
                        <ErrorMessage
                          name="joiningDate"
                          className="invalid-feedback"
                          render={(error) => (
                            <label style={{ color: "#dc3545" }}>{error}</label>
                          )}
                        />
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CCol sm={12}>
                        <CFormCheck
                          id="isRelieved"
                          name="isRelieved"
                          label="isRelieved"
                          onChange={handleCheckbox}
                        />
                        <ErrorMessage
                          name="isRelieved"
                          className="invalid-feedback"
                          render={(error) => (
                            <label style={{ color: "#dc3545" }}>{error}</label>
                          )}
                        />
                      </CCol>
                    </CRow>
                  </CCol>
                  <CCol xs={4}>
                    <CRow className="mb-3">
                      <CCol sm={12}>
                        <label htmlFor="employeeCode">
                          Employee Code
                          <span style={{ color: "red", fontSize: "25px" }}>
                            *
                          </span>
                        </label>
                        <Field
                          type="text"
                          id="employeeCode"
                          name="employeeCode"
                          value={employeeCode}
                          className="form-control"
                          //   className={`form-control ${touched.employeeCode && errors.employeeCode
                          //       ? "is-invalid"
                          //       : ""
                          //     }`}
                          disabled
                          style={{
                            borderBottom: "1px solid gray",
                            borderLeft: "none",
                            borderRight: "none",
                            borderTop: "none",
                            height: "50%",
                          }}
                        />
                        <ErrorMessage
                          name="employeeCode"
                          className="invalid-feedback"
                          render={(error) => (
                            <label style={{ color: "#dc3545" }}>{error}</label>
                          )}
                        />
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CCol sm={12}>
                        <CFormCheck
                          id="isActive"
                          label="Active"
                          checked={isActiveChecked} // Set checked status based on isActiveChecked state
                          onChange={() => setIsActiveChecked(!isActiveChecked)} // Toggle isActiveChecked state
                        />
                        <ErrorMessage
                          name="isActive"
                          className="invalid-feedback"
                          render={(error) => (
                            <label style={{ color: "#dc3545" }}>{error}</label>
                          )}
                        />
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CCol sm={12}>
                        <label htmlFor="relievingDate">Relieving Date</label>
                        {isRelievedChecked && ( // Render relievingDate field only if isRelieved is checked
                          <Field
                            type="date"
                            id="relievingDate"
                            name="relievingDate"
                            className="form-control"
                            // Add validation rules for relievingDate if needed
                            style={{
                              borderBottom: "1px solid gray",
                              borderLeft: "none",
                              borderRight: "none",
                              borderTop: "none",
                              height: "50%",
                            }}
                          />
                        )}
                        <ErrorMessage
                          name="relievingDate"
                          className="invalid-feedback"
                          render={(error) => (
                            <label style={{ color: "#dc3545" }}>{error}</label>
                          )}
                        />
                      </CCol>
                    </CRow>
                  </CCol>
                </CRow>
                <CRow>
                  <h4 className="mt-4">Demographic Detail</h4>
                  <CCol xs={4}>
                    <CRow className="mb-3">
                      <CCol sm={12}>
                        <label htmlFor="name">Employee Name</label>
                        <Field
                          type="text"
                          id="name"
                          name="name"
                          className="form-control"
                          //   className={`form-control ${touched.name && errors.name
                          //       ? "is-invalid"
                          //       : ""
                          //     }`}
                          placeholder="Employee Name"
                          style={{
                            borderBottom: "1px solid gray",
                            borderLeft: "none",
                            borderRight: "none",
                            borderTop: "none",
                            height: "50%",
                          }}
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
                    <CRow className="mb-3">
                      <CCol sm={12}>
                        <label htmlFor="panNumber">Pan Number</label>
                        <Field
                          type="text"
                          id="panNumber"
                          name="panNumber"
                          className="form-control"
                          //   className={`form-control ${touched.panNumber && errors.panNumber
                          //       ? "is-invalid"
                          //       : ""
                          //     }`}
                          placeholder="Pan Number"
                          style={{
                            borderBottom: "1px solid gray",
                            borderLeft: "none",
                            borderRight: "none",
                            borderTop: "none",
                            height: "50%",
                          }}
                        />
                        <ErrorMessage
                          name="panNumber"
                          className="invalid-feedback"
                          render={(error) => (
                            <label style={{ color: "#dc3545" }}>{error}</label>
                          )}
                        />
                      </CCol>
                    </CRow>
                  </CCol>
                  <CCol xs={4}>
                    <CRow className="mb-3">
                      <CCol sm={12}>
                        <label htmlFor="fatherName">Father Name</label>
                        <Field
                          type="text"
                          id="fatherName"
                          name="fatherName"
                          className="form-control"
                          //   className={`form-control ${touched.fatherName && errors.fatherName
                          //       ? "is-invalid"
                          //       : ""
                          //     }`}
                          placeholder="Father Name"
                          style={{
                            borderBottom: "1px solid gray",
                            borderLeft: "none",
                            borderRight: "none",
                            borderTop: "none",
                            height: "50%",
                          }}
                        />
                        <ErrorMessage
                          name="fatherName"
                          className="invalid-feedback"
                          render={(error) => (
                            <label style={{ color: "#dc3545" }}>{error}</label>
                          )}
                        />
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CCol sm={12}>
                        <label htmlFor="aadharCardNumber">Aadhar Number</label>
                        <Field
                          type="text"
                          id="aadharCardNumber"
                          name="aadharCardNumber"
                          className="form-control"
                          //   className={`form-control ${touched.aadharCardNumber && errors.aadharCardNumber
                          //       ? "is-invalid"
                          //       : ""
                          //     }`}
                          placeholder="Aadhar Number"
                          style={{
                            borderBottom: "1px solid gray",
                            borderLeft: "none",
                            borderRight: "none",
                            borderTop: "none",
                            height: "50%",
                          }}
                        />
                        <ErrorMessage
                          name="aadharCardNumber"
                          className="invalid-feedback"
                          render={(error) => (
                            <label style={{ color: "#dc3545" }}>{error}</label>
                          )}
                        />
                      </CCol>
                    </CRow>
                  </CCol>
                  <CCol xs={4}>
                    <CRow className="mb-3">
                      <CCol sm={12}>
                        <label htmlFor="dateOfBirth">Date of Birth</label>
                        <Field
                          type="date"
                          id="dateOfBirth"
                          name="dateOfBirth"
                          className="form-control"
                          //   className={`form-control ${touched.dateOfBirth && errors.dateOfBirth
                          //       ? "is-invalid"
                          //       : ""
                          //     }`}
                          style={{
                            borderBottom: "1px solid gray",
                            borderLeft: "none",
                            borderRight: "none",
                            borderTop: "none",
                            height: "50%",
                          }}
                        />
                        <ErrorMessage
                          name="dateOfBirth"
                          className="invalid-feedback"
                          render={(error) => (
                            <label style={{ color: "#dc3545" }}>{error}</label>
                          )}
                        />
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CCol sm={12}>
                        <label htmlFor="bloodGroup">Blood Group</label>
                        <CFormSelect
                          id="bloodGroup"
                          name="bloodGroup"
                          aria-label="Default select example"
                          options={[
                            { label: "select" },
                            { label: "A+", value: "1" },
                            { label: "B+", value: "2" },
                            { label: "O-", value: "3" },
                          ]}
                        />
                        <ErrorMessage
                          name="bloodGroup"
                          className="invalid-feedback"
                          render={(error) => (
                            <label style={{ color: "#dc3545" }}>{error}</label>
                          )}
                        />
                      </CCol>
                    </CRow>
                  </CCol>
                </CRow>
                <CRow>
                  <h4 className="mt-4">Contact Detail</h4>
                  <CCol xs={12}>
                    <CRow className="mb-3">
                      <CCol sm={12}>
                        <label htmlFor="correspondenceAddress">
                          Correspondence Address
                        </label>
                        <Field
                          type="text"
                          id="correspondenceAddress"
                          name="correspondenceAddress"
                          className="form-control"
                          //   className={`form-control ${touched.correspondenceAddress && errors.correspondenceAddress
                          //       ? "is-invalid"
                          //       : ""
                          //     }`}
                          placeholder="Correspondence Address"
                          style={{
                            borderBottom: "1px solid gray",
                            borderLeft: "none",
                            borderRight: "none",
                            borderTop: "none",
                            height: "50%",
                          }}
                        />
                        <ErrorMessage
                          name="correspondenceAddress"
                          className="invalid-feedback"
                          render={(error) => (
                            <label style={{ color: "#dc3545" }}>{error}</label>
                          )}
                        />
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CCol sm={12}>
                        <label htmlFor="permanentAddress">
                          Permanent Address
                        </label>
                        <Field
                          type="text"
                          id="permanentAddress"
                          name="permanentAddress"
                          className="form-control"
                          //   className={`form-control ${touched.permanentAddress && errors.permanentAddress
                          //       ? "is-invalid"
                          //       : ""
                          //     }`}
                          placeholder="Permanent Address"
                          style={{
                            borderBottom: "1px solid gray",
                            borderLeft: "none",
                            borderRight: "none",
                            borderTop: "none",
                            height: "50%",
                          }}
                        />
                        <ErrorMessage
                          name="permanentAddress"
                          className="invalid-feedback"
                          render={(error) => (
                            <label style={{ color: "#dc3545" }}>{error}</label>
                          )}
                        />
                      </CCol>
                    </CRow>
                  </CCol>
                </CRow>
                <CRow>
                  <span className="mt-4"></span>
                  <CCol xs={4}>
                    <CRow className="mb-3">
                      <CCol sm={12}>
                        <label htmlFor="contactNumber1">Contact Number 1</label>
                        <Field
                          type="text"
                          id="contactNumber1"
                          name="contactNumber1"
                          className="form-control"
                          //   className={`form-control ${touched.contactNumber1 && errors.contactNumber1
                          //       ? "is-invalid"
                          //       : ""
                          //     }`}
                          placeholder="Contact Number 1"
                          style={{
                            borderBottom: "1px solid gray",
                            borderLeft: "none",
                            borderRight: "none",
                            borderTop: "none",
                            height: "50%",
                          }}
                        />
                        <ErrorMessage
                          name="contactNumber1"
                          className="invalid-feedback"
                          render={(error) => (
                            <label style={{ color: "#dc3545" }}>{error}</label>
                          )}
                        />
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CCol sm={12}>
                        <label htmlFor="officialEmail">Official Email</label>
                        <Field
                          type="text"
                          id="officialEmail"
                          name="officialEmail"
                          className="form-control"
                          //   className={`form-control ${touched.officialEmail && errors.officialEmail
                          //       ? "is-invalid"
                          //       : ""
                          //     }`}
                          placeholder="Official Email"
                          style={{
                            borderBottom: "1px solid gray",
                            borderLeft: "none",
                            borderRight: "none",
                            borderTop: "none",
                            height: "50%",
                          }}
                        />
                        <ErrorMessage
                          name="officialEmail"
                          className="invalid-feedback"
                          render={(error) => (
                            <label style={{ color: "#dc3545" }}>{error}</label>
                          )}
                        />
                      </CCol>
                    </CRow>
                  </CCol>
                  <CCol xs={4}>
                    <CRow className="mb-3">
                      <CCol sm={12}>
                        <label htmlFor="contactNumber2">Contact Number 2</label>
                        <Field
                          type="text"
                          id="contactNumber2"
                          name="contactNumber2"
                          className="form-control"
                          //   className={`form-control ${touched.contactNumber2 && errors.contactNumber2
                          //       ? "is-invalid"
                          //       : ""
                          //     }`}
                          placeholder="Contact Number 2"
                          style={{
                            borderBottom: "1px solid gray",
                            borderLeft: "none",
                            borderRight: "none",
                            borderTop: "none",
                            height: "50%",
                          }}
                        />
                        <ErrorMessage
                          name="contactNumber2"
                          className="invalid-feedback"
                          render={(error) => (
                            <label style={{ color: "#dc3545" }}>{error}</label>
                          )}
                        />
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CCol sm={12}>
                        <label htmlFor="officialEmailPassword">
                          Official Email Password
                        </label>
                        <Field
                          type="password"
                          id="officialEmailPassword"
                          name="officialEmailPassword"
                          className="form-control"
                          //   className={`form-control ${touched.officialEmailPassword && errors.officialEmailPassword
                          //       ? "is-invalid"
                          //       : ""
                          //     }`}
                          placeholder="Official Email Password"
                          style={{
                            borderBottom: "1px solid gray",
                            borderLeft: "none",
                            borderRight: "none",
                            borderTop: "none",
                            height: "50%",
                          }}
                        />
                        <ErrorMessage
                          name="officialEmailPassword"
                          className="invalid-feedback"
                          render={(error) => (
                            <label style={{ color: "#dc3545" }}>{error}</label>
                          )}
                        />
                      </CCol>
                    </CRow>
                  </CCol>
                  <CCol xs={4}>
                    <CRow className="mb-3">
                      <CCol sm={12}>
                        <label htmlFor="personalEmail">Personal Email</label>
                        <Field
                          type="text"
                          id="PersonalEmail"
                          name="PersonalEmail"
                          className="form-control"
                          //   className={`form-control ${touched.PersonalEmail && errors.PersonalEmail
                          //       ? "is-invalid"
                          //       : ""
                          //     }`}
                          placeholder="Personal Email"
                          style={{
                            borderBottom: "1px solid gray",
                            borderLeft: "none",
                            borderRight: "none",
                            borderTop: "none",
                            height: "50%",
                          }}
                        />
                        <ErrorMessage
                          name="PersonalEmail"
                          className="invalid-feedback"
                          render={(error) => (
                            <label style={{ color: "#dc3545" }}>{error}</label>
                          )}
                        />
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CCol sm={12}>
                        <label htmlFor="officialSkype">Official Skype</label>
                        <Field
                          type="text"
                          id="officialSkype"
                          name="officialSkype"
                          className="form-control"
                          //   className={`form-control ${touched.officialSkype && errors.officialSkype
                          //       ? "is-invalid"
                          //       : ""
                          //     }`}
                          placeholder="Official Skype"
                          style={{
                            borderBottom: "1px solid gray",
                            borderLeft: "none",
                            borderRight: "none",
                            borderTop: "none",
                            height: "50%",
                          }}
                        />
                        <ErrorMessage
                          name="officialSkype"
                          className="invalid-feedback"
                          render={(error) => (
                            <label style={{ color: "#dc3545" }}>{error}</label>
                          )}
                        />
                      </CCol>
                    </CRow>
                  </CCol>
                </CRow>
                <CRow>
                  <h4 className="mt-4">Company Detail</h4>
                  <CCol xs={4}>
                    <CRow className="mb-3">
                      <CCol sm={12}>
                        <label htmlFor="designationID">Designation</label>
                        <CFormSelect
                          id="designationID"
                          name="designationID"
                          aria-label="Default select example"
                          options={[
                            { label: "select" },
                            { label: "A+", value: "1" },
                            { label: "B+", value: "2" },
                            { label: "O-", value: "3" },
                          ]}
                        />
                        <ErrorMessage
                          name="designationID"
                          className="invalid-feedback"
                          render={(error) => (
                            <label style={{ color: "#dc3545" }}>{error}</label>
                          )}
                        />
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CCol sm={12}>
                        <label htmlFor="bankID">Bank Name</label>
                        <CFormSelect
                          id="bankID"
                          name="bankID"
                          aria-label="select bank"
                          options={[
                            { label: "select" },
                            { label: "A+", value: "1" },
                            { label: "B+", value: "2" },
                            { label: "O-", value: "3" },
                          ]}
                        />
                        <ErrorMessage
                          name="bankID"
                          className="invalid-feedback"
                          render={(error) => (
                            <label style={{ color: "#dc3545" }}>{error}</label>
                          )}
                        />
                      </CCol>
                    </CRow>
                  </CCol>
                  <CCol xs={4}>
                    <CRow className="mb-3">
                      <CCol sm={12}>
                        <label htmlFor="departmentID">Department</label>
                        <CFormSelect
                          id="departmentID"
                          name="departmentID"
                          aria-label="Default select example"
                          options={[
                            { label: "select" },
                            { label: "A+", value: "1" },
                            { label: "B+", value: "2" },
                            { label: "O-", value: "3" },
                          ]}
                        />
                        <ErrorMessage
                          name="departmentID"
                          className="invalid-feedback"
                          render={(error) => (
                            <label style={{ color: "#dc3545" }}>{error}</label>
                          )}
                        />
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CCol sm={12}>
                        <label htmlFor="accountNumber">Account Number</label>
                        <Field
                          type="number"
                          id="accountNumber"
                          name="accountNumber"
                          className="form-control"
                          //   className={`form-control ${touched.accountNumber && errors.accountNumber
                          //       ? "is-invalid"
                          //       : ""
                          //     }`}
                          placeholder="Account Number"
                          style={{
                            borderBottom: "1px solid gray",
                            borderLeft: "none",
                            borderRight: "none",
                            borderTop: "none",
                            height: "50%",
                          }}
                        />
                        <ErrorMessage
                          name="accountNumber"
                          className="invalid-feedback"
                          render={(error) => (
                            <label style={{ color: "#dc3545" }}>{error}</label>
                          )}
                        />
                      </CCol>
                    </CRow>
                  </CCol>
                  <CCol xs={4}>
                    <CRow className="mb-3">
                      <CCol sm={12}>
                        <label htmlFor="ifscCode">IFSC Code</label>
                        <Field
                          type="text"
                          id="ifscCode"
                          name="ifscCode"
                          className="form-control"
                          //   className={`form-control ${touched.ifscCode && errors.ifscCode
                          //       ? "is-invalid"
                          //       : ""
                          //     }`}
                          placeholder="IFSC Code"
                          style={{
                            borderBottom: "1px solid gray",
                            borderLeft: "none",
                            borderRight: "none",
                            borderTop: "none",
                            height: "50%",
                          }}
                        />
                        <ErrorMessage
                          name="ifscCode"
                          className="invalid-feedback"
                          render={(error) => (
                            <label style={{ color: "#dc3545" }}>{error}</label>
                          )}
                        />
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CCol sm={12}>
                        <label htmlFor="shiftID">Shift</label>
                        <CFormSelect
                          id="shiftID"
                          name="shiftID"
                          aria-label="Default select example"
                          options={[
                            { label: "select" },
                            { label: "A+", value: "1" },
                            { label: "B+", value: "2" },
                            { label: "O-", value: "3" },
                          ]}
                        />
                        <ErrorMessage
                          name="shiftID"
                          className="invalid-feedback"
                          render={(error) => (
                            <label style={{ color: "#dc3545" }}>{error}</label>
                          )}
                        />
                      </CCol>
                    </CRow>
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CCol sm={12} className="text-end">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={isSubmitting || !isValid}
                    >
                      {isSubmitting ? "Submitting..." : "Submit"}
                    </button>
                    <Link to={`/users`}>
                      <CButton
                        component="input"
                        type="button"
                        color="secondary"
                        value="cancel"
                      />
                    </Link>
                  </CCol>
                </CRow>
              </Form>
            )}
          </Formik>
        </CCardBody>
      </CCard>
    </>
  );
};

export default CreateOrUpdateUser;
