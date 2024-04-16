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
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { Employee, EmployeeClass } from "../../models/userManagement/employee";
import {
  CreateEmployee,
  GetEmployeeId,
} from "../../redux-saga/modules/userManagement/apiService";
import {
  Department,
  Designation,
  Shift,
} from "../../models/commonModels/SharedModels";
import {
  GetDepartments,
  GetDesignations,
  GetShifts,
} from "../../redux-saga/modules/shared/apiService";
import * as Yup from "yup";

const CreateOrUpdateUser = () => {
  //initial values
  const initialValues = {
    employeeId: "",
    joiningDate: "",
    employeeCode: "",
    isActive: false,
    isRelieved: false,
    relievingDate: "",
    employeeName: "",
    fatherName: "",
    panNumber: "",
    adharNumber: "",
    permanentAddress: "",
    personalEmail: "",
    contactNumber1: "",
    officialSkype: "",
    designation: "",
    department: "",
    ifscCode: "",
    bankName: "",
    accountNumber: "",
  };

  // Parameters
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useParams<{ userId: string }>();
  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  // States
  const [formData, setFormData] = useState<Employee>(new EmployeeClass());
  // const [employeeCount, setEmployeeCount] = useState(0);
  const [employeeId, setEmployeeId] = useState("");
  const [isActiveChecked, setIsActiveChecked] = useState(true);
  const [isRelievedChecked, setIsRelievedChecked] = useState(false);
  const [relievingDateRequired, setRelievingDateRequired] = useState(false);
  const [departmentList, setDepartmentList] = useState<
    Department[] | undefined
  >([]);
  const [designationList, setDesignationList] = useState<
    Designation[] | undefined
  >([]);
  const [shiftList, setShiftList] = useState<Shift[] | undefined>([]);
  const [bloodGroup, setBloodGroup] = useState("");
  const [departmentId, setDepartmentId] = useState(0);
  const [designationId, setDesignationId] = useState(0);
  const [shiftId, setShiftId] = useState(0);

  // Effects
  useEffect(() => {
    getEmployeeId();
    getDepartmentList();
    getDesignationList();
    getShiftList();
  }, []);

  useEffect(() => {
    if (employeeId != null) {
      const employeeCode = generateEmployeeCode(
        "tech",
        departmentId,
        employeeId
      );
      formData.employeeCode = employeeCode;
    }
  }, [employeeId, departmentId]);

  useEffect(() => {
    if (userId) {
    }
  });

  // Handlers
  const handleCheckbox = (event: any) => {
    const { id, checked } = event.target;

    if (id === "isActive" && checked) {
      setIsRelievedChecked(false);
      setRelievingDateRequired(false);
    } else if (id === "isRelieved" && checked) {
      setIsActiveChecked(false);
      setRelievingDateRequired(true);
    }

    // Update the checked status of the corresponding checkbox
    if (id === "isActive") {
      setIsActiveChecked(checked);
    } else if (id === "isRelieved") {
      setIsRelievedChecked(checked);
    }
  };

  // Generate EmployeeId
  const getEmployeeId = async () => {
    const employeeId = await GetEmployeeId();
    setEmployeeId(employeeId.data);
    formData.employeeId = employeeId.data;
  };

  // Generate EmployeeCode
  const generateEmployeeCode = (
    organizationName: string,
    departmentId: number,
    employeeId: string
  ) => {
    const name = organizationName.toUpperCase();
    return `${name}-EMP-${departmentId}-${employeeId}`;
  };

  // Department list
  const getDepartmentList = () => {
    GetDepartments()
      .then((response) => {
        setDepartmentList(response.data);
      })
      .catch((error) => {
        console.error("Error getting department list:", error.statusText);
      });
  };

  // Designation list
  const getDesignationList = () => {
    GetDesignations()
      .then((response) => {
        setDesignationList(response.data);
      })
      .catch((error) => {
        console.error("Error getting designation list:", error.statusText);
      });
  };

  // Shift list
  const getShiftList = () => {
    GetShifts()
      .then((response) => {
        setShiftList(response.data);
      })
      .catch((error) => {
        console.error("Error getting shift list:", error.statusText);
      });
  };

  // Submit
  const handleFormSubmit = async (
    employee: Employee,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    try {
      employee.employeeId = employeeId;
      employee.bloodGroup = bloodGroup;
      employee.departmentId = departmentId;
      employee.designationId = designationId;
      employee.shiftId = shiftId;
      await CreateEmployee(employee)
        .then((response) => {
          // Handle success response
          console.log("response", response);
          console.log("employeeId", response.data?.employeeId);
          toast.success("Employee created successfully");
        })
        .catch((error) => {
          // Handle error response
          toast.error("Employee creation failed");
          console.error("Error creating employee:", error.statusText);
        });
    } catch (error) {
      console.log("error message:", error);
    } finally {
      setSubmitting(false);
      navigate("/users");
    }
  };
  const validationSchema = Yup.object().shape({
    employeeId: Yup.number().required("Employee ID is required"),
    joiningDate: Yup.date().required("Joining Date is required"),
    employeeCode: Yup.string().required("Employee Code is required"),
    isActive: Yup.boolean(),
    correspondenceAddress: Yup.string().required(
      "Correspondence address is required"
    ),
    permanentAddress: Yup.string().required("Permanent address is required"),
    guardianName: Yup.string().required("Guardian name is required"),
    contactNumber1: Yup.string().required("Contact number 1 is required"),
    officialEmail: Yup.string()
      .email("Invalid email format")
      .required("Official email is required"),
    guardianContactNumber: Yup.string().required(
      "Guardian contact number is required"
    ),
    contactNumber2: Yup.string(),
    personalEmail: Yup.string().email("Invalid email format"),
    skypeId: Yup.string(),
    designationID: Yup.number().required("Designation is required"),
    bank: Yup.string().required("Bank name is required"),
    departmentID: Yup.number().required("Department is required"),
    bankAccountNumber: Yup.string().required("Bank account number is required"),
    ifsc: Yup.string().required("IFSC code is required"),
    shiftID: Yup.number().required("Shift is required"),
  });

  return (
    <>
      <ToastContainer />
      <CCard>
        <CCardHeader className="mb-3">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h5 className="mb-0">
                {userId == null ? "Create" : "Update"} User
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
            initialValues={formData}
            enableReinitialize
            validationSchema={validationSchema}
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
                        <label htmlFor="employeeId">
                          Id
                          <span style={{ color: "red", fontSize: "25px" }}>
                            *
                          </span>
                        </label>
                        <Field
                          type="number"
                          id="employeeId"
                          name="employeeId"
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
                          name="employeeId"
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
                          // className="form-control"
                          className={`form-control ${
                            touched.joiningDate && errors.joiningDate
                              ? "is-invalid"
                              : ""
                          }`}
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
                          checked={isRelievedChecked}
                          onChange={handleCheckbox}
                          disabled={!isActiveChecked}
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
                          // className="form-control"
                          className={`form-control ${
                            touched.employeeCode && errors.employeeCode
                              ? "is-invalid"
                              : ""
                          }`}
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
                          checked={isActiveChecked}
                          onChange={handleCheckbox}
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
                          // className="form-control"
                          className={`form-control ${
                            touched.name && errors.name ? "is-invalid" : ""
                          }`}
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
                          // className="form-control"
                          className={`form-control ${
                            touched.panNumber && errors.panNumber
                              ? "is-invalid"
                              : ""
                          }`}
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
                          // className="form-control"
                          className={`form-control ${
                            touched.fatherName && errors.fatherName
                              ? "is-invalid"
                              : ""
                          }`}
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
                        <label htmlFor="adharCardNumber">Aadhar Number</label>
                        <Field
                          type="text"
                          id="adharCardNumber"
                          name="adharCardNumber"
                          // className="form-control"
                          className={`form-control ${
                            touched.adharCardNumber && errors.adharCardNumber
                              ? "is-invalid"
                              : ""
                          }`}
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
                          name="adharCardNumber"
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
                          value={bloodGroup}
                          options={bloodGroups}
                          onChange={(e) => setBloodGroup(e.target.value)}
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
                          // className="form-control"
                          className={`form-control ${
                            touched.permanentAddress && errors.permanentAddress
                              ? "is-invalid"
                              : ""
                          }`}
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
                        <label htmlFor="guardianName">Guardian Name</label>
                        <Field
                          type="text"
                          id="guardianName"
                          name="guardianName"
                          className="form-control"
                          //   className={`form-control ${touched.guardianName && errors.guardianName
                          //       ? "is-invalid"
                          //       : ""
                          //     }`}
                          placeholder="Guardian Name"
                          style={{
                            borderBottom: "1px solid gray",
                            borderLeft: "none",
                            borderRight: "none",
                            borderTop: "none",
                            height: "50%",
                          }}
                        />
                        <ErrorMessage
                          name="guardianName"
                          className="invalid-feedback"
                          render={(error) => (
                            <label style={{ color: "#dc3545" }}>{error}</label>
                          )}
                        />
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CCol sm={12}>
                        <label htmlFor="contactNumber1">Contact Number 1</label>
                        <Field
                          type="text"
                          id="contactNumber1"
                          name="contactNumber1"
                          // className="form-control"
                          className={`form-control ${
                            touched.contactNumber1 && errors.contactNumber1
                              ? "is-invalid"
                              : ""
                          }`}
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
                          // className="form-control"
                          className={`form-control ${
                            touched.officialEmail && errors.officialEmail
                              ? "is-invalid"
                              : ""
                          }`}
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
                        <label htmlFor="guardianContactNumber">
                          Guardian Contact Number
                        </label>
                        <Field
                          type="text"
                          id="guardianContactNumber"
                          name="guardianContactNumber"
                          className="form-control"
                          //   className={`form-control ${touched.guardianContactNumber && errors.guardianContactNumber
                          //       ? "is-invalid"
                          //       : ""
                          //     }`}
                          placeholder="Guardian Contact Number"
                          style={{
                            borderBottom: "1px solid gray",
                            borderLeft: "none",
                            borderRight: "none",
                            borderTop: "none",
                            height: "50%",
                          }}
                        />
                        <ErrorMessage
                          name="guardianContactNumber"
                          className="invalid-feedback"
                          render={(error) => (
                            <label style={{ color: "#dc3545" }}>{error}</label>
                          )}
                        />
                      </CCol>
                    </CRow>
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
                          // className="form-control"
                          className={`form-control ${
                            touched.officialEmailPassword &&
                            errors.officialEmailPassword
                              ? "is-invalid"
                              : ""
                          }`}
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
                          id="personalEmail"
                          name="personalEmail"
                          // className="form-control"
                          className={`form-control ${
                            touched.personalEmail && errors.personalEmail
                              ? "is-invalid"
                              : ""
                          }`}
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
                          name="personalEmail"
                          className="invalid-feedback"
                          render={(error) => (
                            <label style={{ color: "#dc3545" }}>{error}</label>
                          )}
                        />
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CCol sm={12}>
                        <label htmlFor="skypeId">Official Skype</label>
                        <Field
                          type="text"
                          id="skypeId"
                          name="skypeId"
                          // className="form-control"
                          className={`form-control ${
                            touched.skypeId && errors.skypeId
                              ? "is-invalid"
                              : ""
                          }`}
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
                          name="skypeId"
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
                          value={designationId}
                          onChange={(e) =>
                            setDesignationId(parseInt(e.target.value))
                          }
                        >
                          <option value="">Select a Designation</option>
                          {designationList?.map((designation) => (
                            <option
                              key={designation.designationId}
                              value={designation.designationId}
                            >
                              {designation.name}
                            </option>
                          ))}
                        </CFormSelect>
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
                        <label htmlFor="bank">Bank Name</label>
                        <Field
                          type="text"
                          id="bank"
                          name="bank"
                          // className="form-control"
                          className={`form-control ${
                            touched.bank && errors.bank ? "is-invalid" : ""
                          }`}
                          placeholder="Bank"
                          style={{
                            borderBottom: "1px solid gray",
                            borderLeft: "none",
                            borderRight: "none",
                            borderTop: "none",
                            height: "50%",
                          }}
                        />
                        <ErrorMessage
                          name="bank"
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
                          value={departmentId}
                          onChange={(e) =>
                            setDepartmentId(parseInt(e.target.value))
                          }
                        >
                          <option value="">Select a Department</option>
                          {departmentList?.map((department) => (
                            <option
                              key={department.departmentId}
                              value={department.departmentId}
                            >
                              {department.name}
                            </option>
                          ))}
                        </CFormSelect>
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
                        <label htmlFor="bankAccountNumber">
                          Account Number
                        </label>
                        <Field
                          type="text"
                          id="bankAccountNumber"
                          name="bankAccountNumber"
                          // className="form-control"
                          className={`form-control ${
                            touched.bankAccountNumber &&
                            errors.bankAccountNumber
                              ? "is-invalid"
                              : ""
                          }`}
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
                          name="bankAccountNumber"
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
                        <label htmlFor="ifsc">IFSC Code</label>
                        <Field
                          type="text"
                          id="ifsc"
                          name="ifsc"
                          // className="form-control"
                          className={`form-control ${
                            touched.ifsc && errors.ifsc ? "is-invalid" : ""
                          }`}
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
                          name="ifsc"
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
                          value={shiftId}
                          onChange={(e) => setShiftId(parseInt(e.target.value))}
                        >
                          <option value="">Select a Shift</option>
                          {shiftList?.map((shift) => (
                            <option key={shift.shiftId} value={shift.shiftId}>
                              {shift.name}
                            </option>
                          ))}
                        </CFormSelect>
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
                <CRow>
                  <CCol xs={4}>
                    <CRow className="mb-3">
                      <CCol sm={12}>
                        <label htmlFor="branch">Branch</label>
                        <Field
                          type="text"
                          id="branch"
                          name="branch"
                          // className="form-control"
                          className={`form-control ${
                            touched.branch && errors.branch ? "is-invalid" : ""
                          }`}
                          placeholder="Branch"
                          style={{
                            borderBottom: "1px solid gray",
                            borderLeft: "none",
                            borderRight: "none",
                            borderTop: "none",
                            height: "50%",
                          }}
                        />
                        <ErrorMessage
                          name="branch"
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
