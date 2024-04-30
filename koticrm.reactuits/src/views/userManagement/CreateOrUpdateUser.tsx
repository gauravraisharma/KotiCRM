import React, { ChangeEvent, useEffect, useId, useState } from "react";
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
import { ToastContainer, toast } from "react-toastify";
import { Employee, EmployeeClass } from "../../models/userManagement/employee";
import {
  CreateEmployee,
  GetEmployeeById,
  GetEmployeeId,
  UpdateEmployee,
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
import "../../../src/css/style.css";
import profile from "../../assets/images/profile.avif";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";

const CreateOrUpdateUser = () => {
  // Parameters
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  // States
  const [formData, setFormData] = useState<Employee>(new EmployeeClass());
  const [employeeID, setEmployeeID] = useState("");
  const [employeeCode, setEmployeeCode] = useState("");
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
  const [selectedImage, setSelectedImage] = useState(null);

  // const handleFileSelect = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setSelectedImage(reader.result);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('image', file);
  
      // Send the file to the server for upload
      fetch('/upload', {
        method: 'POST',
        body: formData,
      })
      .then(response => response.json())
      .then(data => {
        // Assuming the server responds with the URL of the uploaded image
        const imageUrl = data.imageUrl;
  
        // Save the URL in the database
        // saveImageUrlToDatabase(imageUrl);
      })
      .catch(error => {
        console.error('Error uploading file:', error);
      });
    }
  };
  

  // Effects
  useEffect(() => {
    getDepartmentList();
    getDesignationList();
    getShiftList();
  }, []);

  useEffect(() => {
    if (id) {
      getEmployeeById(id);
    } else {
      getEmployeeId();
    }
  }, [id]);

  // Generate EmployeeId
  const getEmployeeId = async () => {
    debugger
    const employeeId = await GetEmployeeId();
    const employeeIdData = employeeId.data;
    setEmployeeID(employeeIdData);
    setFormData(prevFormData => ({
      ...prevFormData,
      employeeId: employeeIdData
    }));
    generateEmployeeCode("tech", departmentId, employeeIdData);
  };

  // Generate EmployeeCode
  const generateEmployeeCode = (
    organizationName: string,
    departmentId: number,
    employeeId: string
  ) => {
    const name = organizationName.toUpperCase();
    const employeeCode = `${name}-EMP-${departmentId}-${employeeId}`;
    setEmployeeCode(employeeCode);
  };

  const getEmployeeById = async (employeeId: string) => {
    await GetEmployeeById(employeeId)
      .then((response) => {
        setFormData(response);
        setEmployeeCode(response.employeeCode);
        setDepartmentId(response.departmentId);
        setDesignationId(response.designationId);
        setShiftId(response.shiftId);
      })
      .catch((error) => {
        toast.error("Fetch employee failed");
        console.error("Error fetching employee:", error.statusText);
      });
  };

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

  // Department change
  const handleDepartmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const changedDepartmentId = parseInt(e.target.value);
    generateEmployeeCode("tech", changedDepartmentId, formData.employeeId);
    setDepartmentId(changedDepartmentId);
    formData.departmentId = changedDepartmentId;
  };

  // Designation change
  const handleDesignationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDesignationId(parseInt(e.target.value));
  };

  // Shift change
  const handleShiftChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setShiftId(parseInt(e.target.value));
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
      employee.departmentId = departmentId;
      employee.designationId = designationId;
      employee.shiftId = shiftId;
      employee.isActive = isActiveChecked;
      employee.employeeCode = employeeCode;
      employee.relievingDate = isRelievedChecked
        ? employee.relievingDate
        : null;
      if (id) {
        const response = await UpdateEmployee(employee);
        if (response.status == 200) {
          toast.success("Employee updated successfully");
          setTimeout(() => {
            navigate("/users");
          }, 5000);
        } else {
          toast.error("Employee updation failed");
        }
      } else {
        employee.employeeId = employeeID;
        employee.bloodGroup = bloodGroup;
        const response = await CreateEmployee(employee);
        if (response.status == 200) {
          toast.success("Employee created successfully");
          navigate("/users");

          setTimeout(() => {
            navigate("/users");
          }, 5000);
        } else {
          toast.error("Employee creation failed");
        }
      }
    } catch (error) {
      console.log("error message:", error);
    } finally {
      setSubmitting(false);
    }
  };

  let validationSchema = Yup.object().shape({
    joiningDate: Yup.date().required("Joining Date is required"),

    officialEmail: Yup.string()
      .email("Invalid email format")
      .required("Official email is required"),

    name: Yup.string().required("Employee Name is required"),

    fatherName: Yup.string().required("Father Name is required"),

    designationId: Yup.number().required("Designation is required"),

    departmentId: Yup.number().required("Department is required"),
    Id: Yup.string().required("ID is required"),
    employeeCode: Yup.string().required("Employee code is required"),

    dateOfBirth: Yup.date().required("Date of birth is required"),
  });
  if (isRelievedChecked) {
    validationSchema = validationSchema.concat(
      Yup.object().shape({
        relievingDate: Yup.string().required("Relieving date is required"),
      })
    );
  }
  return (
    <>
      <ToastContainer />
      <CCard>
        <CCardHeader className="mb-3">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h4 className="mb-0">{id == null ? "Create" : "Update"} User</h4>
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
            {({ handleSubmit, isSubmitting, touched, errors, values }) => (
              <Form
                className="profile-info"
                onSubmit={handleSubmit}
                autoComplete="off"
              >
                <div className="heading">
                  <h5>User Code</h5>

                  <CRow className="justify-content-between">
                    {/* <CCol xs={4}>
                      <CImage
                        rounded
                        thumbnail
                        src={profile}
                        width={120}
                        height={120}
                        className="rounded-circle"
                        style={{
                          borderRadius: "50%",
                          marginLeft: "5rem",
                          marginTop: "2rem",
                        }}
                      />
                    </CCol> */}
                    <CCol xs={4}>
                      <label htmlFor="profile-photo-upload">
                        <CImage
                          rounded
                          thumbnail
                          src={selectedImage || profile} // Assuming profile is your default profile photo
                          width={120}
                          height={120}
                          className="rounded-circle"
                          style={{
                            borderRadius: "50%",
                            marginLeft: "5rem",
                            marginTop: "2rem",
                            cursor: "pointer", // Add cursor pointer to indicate it's clickable
                          }}
                        />
                      </label>
                      <input
                        id="profile-photo-upload"
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }} // Hide the input element
                        onChange={handleFileSelect}
                      />
                    </CCol>

                    <CCol xs={8}>
                      <CRow>
                        <CCol xs={6}>
                          <div className="form-group">
                            <label htmlFor="employeeId">
                              Id
                              <span
                                style={{
                                  color: "red",
                                  fontSize: "25px",
                                  lineHeight: "0",
                                }}
                              >
                                *
                              </span>
                            </label>
                            <Field
                              type="string"
                              id="employeeId"
                              name="employeeId"
                              className="form-control"
                              disabled
                            />
                          </div>
                        </CCol>
                        <CCol sm={6}>
                          <div className="form-group">
                            <label htmlFor="employeeCode">
                              User Code
                              <span
                                style={{
                                  color: "red",
                                  fontSize: "25px",
                                  lineHeight: "0",
                                }}
                              >
                                *
                              </span>
                            </label>
                            <Field
                              type="text"
                              id="employeeCode"
                              name="employeeCode"
                              value={employeeCode}
                              className="form-control"
                              disabled
                            />
                          </div>
                        </CCol>
                        <CCol sm={6}>
                          <div className="form-group">
                            <label htmlFor="joiningDate">
                              Joining Date{" "}
                              <span
                                style={{
                                  color: "red",
                                  fontSize: "25px",
                                  lineHeight: "0",
                                }}
                              >
                                *
                              </span>
                            </label>
                            <Field
                              type="date"
                              id="joiningDate"
                              name="joiningDate"
                              className={`form-control ${
                                touched.joiningDate && errors.joiningDate
                                  ? "is-invalid"
                                  : ""
                              }`}
                            />
                            <ErrorMessage
                              name="joiningDate"
                              className="invalid-feedback"
                              render={(error) => (
                                <label style={{ color: "#dc3545" }}>
                                  {error}
                                </label>
                              )}
                            />
                          </div>
                        </CCol>
                        <CCol sm={6}>
                          <div className="form-group">
                            <label htmlFor="relievingDate">
                              Relieving Date{" "}
                              {isRelievedChecked && (
                                <span
                                  style={{
                                    color: "red",
                                    fontSize: "25px",
                                    lineHeight: "0",
                                  }}
                                >
                                  *
                                </span>
                              )}
                            </label>
                            <Field
                              type="date"
                              id="relievingDate"
                              name="relievingDate"
                              className="form-control"
                              disabled={!isRelievedChecked}
                            />
                            {isRelievedChecked && (
                              <ErrorMessage
                                name="relievingDate"
                                className="invalid-feedback"
                                render={(error) => (
                                  <label style={{ color: "#dc3545" }}>
                                    {error}
                                  </label>
                                )}
                              />
                            )}
                          </div>
                        </CCol>
                        <CCol xs={6} className="align-self-center">
                          <div className="form-group">
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
                                <label style={{ color: "#dc3545" }}>
                                  {error}
                                </label>
                              )}
                            />
                          </div>
                        </CCol>
                        <CCol sm={6} className="align-self-center">
                          <div className="form-group">
                            <CFormCheck
                              id="isRelieved"
                              name="isRelieved"
                              label="isRelieved"
                              checked={isRelievedChecked}
                              onChange={handleCheckbox}
                            />
                            <ErrorMessage
                              name="isRelieved"
                              className="invalid-feedback"
                              render={(error) => (
                                <label style={{ color: "#dc3545" }}>
                                  {error}
                                </label>
                              )}
                            />
                          </div>
                        </CCol>
             
                      </CRow>
                    </CCol>
                  </CRow>
                  <CRow>
                  <CCol sm={4}>
                        <div className="form-group">
                      <label htmlFor="designationId">Designation</label>
                      <Field
                        as="select"
                        id="designationId"
                        name="designationId"
                        aria-label="Default select example"
                        className={`form-control form-select ${
                          touched.designationId && errors.designationId
                            ? "is-invalid"
                            : ""
                        }`}
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
                      </Field>
                      <ErrorMessage
                        name="designationId"
                        component="div"
                        className="invalid-feedback"
                        style={{ color: "#dc3545" }}
                      />
                    </div>
                  </CCol>
                  <CCol sm={4}>
                    <div className="form-group">
                      <label htmlFor="departmentId">Department</label>
                      <Field
                         as="select"
                        id="departmentId"
                        name="departmentId"
                        aria-label="Default select example"
                        className={`form-control form-select ${
                          touched.departmentId && errors.departmentId
                            ? "is-invalid"
                            : ""
                        }`}
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
                      </Field>
                      <ErrorMessage
                        name="departmentId"
                        className="invalid-feedback"
                        render={(error) => (
                          <label style={{ color: "#dc3545" }}>{error}</label>
                        )}
                      />
                    </div>
                  </CCol>
                  <CCol sm={4}>
                    <div className="form-group">
                      <label htmlFor="departmentId">Role</label>
                      <Field
                         as="select"
                        id="departmentId"
                        name="departmentId"
                        aria-label="Default select example"
                        className={`form-control form-select ${
                          touched.departmentId && errors.departmentId
                            ? "is-invalid"
                            : ""
                        }`}
                      >
                        <option value="">Select role</option>
                        {departmentList?.map((department) => (
                          <option
                            key={department.departmentId}
                            value={department.departmentId}
                          >
                            {department.name}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name="departmentId"
                        className="invalid-feedback"
                        render={(error) => (
                          <label style={{ color: "#dc3545" }}>{error}</label>
                        )}
                      />
                    </div>
                  </CCol>
                  </CRow>
                </div>
                <div>
                  <h4 className="mt-4">Demographic Detail</h4>
                  <CRow>
                    <CCol sm={4}>
                      <div className="form-group">
                        <label htmlFor="name">
                          User Name
                          <span
                            style={{
                              color: "red",
                              fontSize: "25px",
                              lineHeight: "0",
                            
                            }}
                          >
                            *
                          </span>
                        </label>
                        <Field
                          type="text"
                          id="name"
                          name="name"
                          autoComplete="new-password"
                          className={`form-control ${
                            touched.name && errors.name ? "is-invalid" : ""
                          }`}
                          placeholder="Employee Name"
                        />
                        <ErrorMessage
                          name="name"
                          className="invalid-feedback"
                          render={(error) => (
                            <label style={{ color: "#dc3545" }}>{error}</label>
                          )}
                        />
                      </div>
                    </CCol>
                    <CCol sm={4}>
                      <div className="form-group">
                        <label htmlFor="panNumber">Pan Number</label>
                        <Field
                          type="text"
                          id="panNumber"
                          name="panNumber"
                          className="form-control"
                          placeholder="Pan Number"
                        />
                      </div>
                    </CCol>

                    <CCol sm={4}>
                      <div className="form-group">
                        <label htmlFor="fatherName">
                          Father Name{" "}
                          <span
                            style={{
                              color: "red",
                              fontSize: "25px",
                              lineHeight: "0",
                            }}
                          >
                            *
                          </span>
                        </label>
                        <Field
                          type="text"
                          id="fatherName"
                          name="fatherName"
                          className={`form-control ${
                            touched.fatherName && errors.fatherName
                              ? "is-invalid"
                              : ""
                          }`}
                          placeholder="Father Name"
                        />
                        <ErrorMessage
                          name="fatherName"
                          className="invalid-feedback"
                          render={(error) => (
                            <label style={{ color: "#dc3545" }}>{error}</label>
                          )}
                        />
                      </div>
                    </CCol>
                    <CCol sm={4}>
                      <div className="form-group">
                        <label htmlFor="adharCardNumber">Aadhar Number</label>
                        <Field
                          type="text"
                          id="adharCardNumber"
                          name="adharCardNumber"
                          className="form-control"
                          placeholder="Aadhar Number"
                        />
                      </div>
                    </CCol>

                    <CCol sm={4}>
                      <div className="form-group">
                        <label htmlFor="dateOfBirth">
                          Date of Birth{" "}
                          <span
                            style={{
                              color: "red",
                              fontSize: "25px",
                              lineHeight: "0",
                            }}
                          >
                            *
                          </span>
                        </label>
                        <Field
                          type="date"
                          id="dateOfBirth"
                          name="dateOfBirth"
                          className={`form-control ${
                            touched.dateOfBirth && errors.dateOfBirth
                              ? "is-invalid"
                              : ""
                          }`}
                        />
                        <ErrorMessage
                          name="dateOfBirth"
                          className="invalid-feedback"
                          render={(error) => (
                            <label style={{ color: "#dc3545" }}>{error}</label>
                          )}
                        />
                      </div>
                    </CCol>

                    <CCol sm={4}>
                      <div className="form-group">
                        <label htmlFor="bloodGroup">Blood Group</label>
                        <CFormSelect
                          id="bloodGroup"
                          name="bloodGroup"
                          aria-label="Default select example"
                          value={bloodGroup}
                          options={bloodGroups}
                          onChange={(e) => setBloodGroup(e.target.value)}
                        />
                      </div>
                    </CCol>
                  </CRow>
                </div>
                <div>
                  <h4 className="mt-4">Contact Detail</h4>

                  <CCol sm={12}>
                    <div className="form-group">
                      <label htmlFor="correspondenceAddress">
                        Correspondence Address
                      </label>
                      <Field
                        type="text"
                        id="correspondenceAddress"
                        name="correspondenceAddress"
                        className={`form-control ${
                          touched.correspondenceAddress &&
                          errors.correspondenceAddress
                            ? "is-invalid"
                            : ""
                        }`}
                        placeholder="Correspondence Address"
                      />
                      <ErrorMessage
                        name="correspondenceAddress"
                        className="invalid-feedback"
                        render={(error) => (
                          <label style={{ color: "#dc3545" }}>{error}</label>
                        )}
                      />
                    </div>
                  </CCol>

                  <CCol sm={12}>
                    <div className="form-group">
                      <label htmlFor="permanentAddress">
                        Permanent Address
                      </label>
                      <Field
                        type="text"
                        id="permanentAddress"
                        name="permanentAddress"
                        className="form-control"
                        placeholder="Permanent Address"
                      />
                    </div>
                  </CCol>
                </div>

                <CRow>
                  <CCol sm={4}>
                    <div className="form-group">
                      <label htmlFor="guardianName">Guardian Name</label>
                      <Field
                        type="text"
                        id="guardianName"
                        name="guardianName"
                        placeholder="Guardian Name"
                        className="form-control"
                      />
                    </div>
                  </CCol>
                  <CCol sm={4}>
                    <div className="form-group">
                      <label htmlFor="contactNumber1">Contact Number 1</label>
                      <Field
                        type="text"
                        id="contactNumber1"
                        name="contactNumber1"
                        className="form-control"
                        placeholder="Contact Number 1"
                      />
                      <ErrorMessage
                        name="contactNumber1"
                        className="invalid-feedback"
                        render={(error) => (
                          <label style={{ color: "#dc3545" }}>{error}</label>
                        )}
                      />
                    </div>
                  </CCol>

                  <CCol sm={4}>
                    <div className="form-group">
                      <label htmlFor="officialEmail">
                        Official Email{" "}
                        <span
                          style={{
                            color: "red",
                            fontSize: "25px",
                            lineHeight: "0",
                          }}
                        >
                          *
                        </span>
                      </label>
                      <Field
                        type="text"
                        id="officialEmail"
                        name="officialEmail"
                        className={`form-control ${
                          touched.officialEmail && errors.officialEmail
                            ? "is-invalid"
                            : ""
                        }`}
                        placeholder="Official Email"
                      />
                      <ErrorMessage
                        name="officialEmail"
                        className="invalid-feedback"
                        render={(error) => (
                          <label style={{ color: "#dc3545" }}>{error}</label>
                        )}
                      />
                    </div>
                  </CCol>

                  <CCol sm={4}>
                    <div className="form-group">
                      <label htmlFor="guardianContactNumber">
                        Guardian Contact Number
                      </label>
                      <Field
                        type="text"
                        id="guardianContactNumber"
                        name="guardianContactNumber"
                        className="form-control"
                        placeholder="Guardian Contact Number"
                      />
                    </div>
                  </CCol>
                  <CCol sm={4}>
                    <div className="form-group">
                      <label htmlFor="contactNumber2">Contact Number 2</label>
                      <Field
                        type="text"
                        id="contactNumber2"
                        name="contactNumber2"
                        className="form-control"
                        placeholder="Contact Number 2"
                      />
                    </div>
                  </CCol>
                  <CCol sm={4}>
                    <div className="form-group">
                      <label htmlFor="officialEmailPassword">
                        Official Email Password{" "}
                      </label>
                      <Field
                        autoComplete="new-password"
                        type="password"
                        id="officialEmailPassword"
                        name="officialEmailPassword"
                        className="form-control"
                        placeholder="Official Email Password"
                      />
                    </div>
                  </CCol>

                  {/* <CCol sm={4}>
                    <div className="form-group">
                      <label htmlFor="personalEmail">
                        Personal Email{" "}
                        <span
                          style={{
                            color: "red",
                            fontSize: "25px",
                            lineHeight: "0",
                          }}
                        >
                          *
                        </span>
                      </label>
                      <Field
                        type="text"
                        id="personalEmail"
                        name="personalEmail"
                        className="form-control"
                        placeholder="Personal Email"
                      />
                    </div>
                  </CCol> */}
                  <CCol sm={4}>
                    <div className="form-group">
                      <label htmlFor="skypeId">Official Skype</label>
                      <Field
                        type="text"
                        id="skypeId"
                        name="skypeId"
                        className="form-control"
                        placeholder="Official Skype"
                      />
                    </div>
                  </CCol>
                </CRow>

                <CRow>
                  <h4 className="mt-4">Bank Detail</h4>
                  <CCol sm={4}>
                    <div className="form-group">
                      <label htmlFor="bank">Bank Name</label>
                      <Field
                        type="text"
                        id="bank"
                        name="bank"
                        className="form-control"
                        placeholder="Bank"
                      />
                    </div>
                  </CCol>

              

          
                  

                  <CCol sm={4}>
                    <div className="form-group">
                      <label htmlFor="bankAccountNumber">Account Number</label>
                      <Field
                        type="text"
                        id="bankAccountNumber"
                        name="bankAccountNumber"
                        className="form-control"
                        placeholder="Account Number"
                      />
                    </div>
                  </CCol>

                  <CCol sm={4}>
                    <div className="form-group">
                      <label htmlFor="ifsc">IFSC Code</label>
                      <Field
                        type="text"
                        id="ifsc"
                        name="ifsc"
                        className="form-control"
                        placeholder="IFSC Code"
                      />
                    </div>
                  </CCol>

                  <CCol sm={4}>
                    <div className="form-group">
                      <label htmlFor="shiftId">Shift</label>
                      <CFormSelect
                        id="shiftId"
                        name="shiftId"
                        value={shiftId}
                        aria-label="Default select example"
                        className="form-control"
                        onChange={handleShiftChange}
                        placeholder="Shift"
                      >
                        <option value="">Select a Shift</option>
                        {shiftList?.map((shift) => (
                          <option key={shift.shiftId} value={shift.shiftId}>
                            {shift.name}
                          </option>
                        ))}
                      </CFormSelect>
                    </div>
                  </CCol>
                  <CCol xs={4}>
                    <div className="form-group">
                      <label htmlFor="branch">Branch</label>
                      <Field
                        type="text"
                        id="branch"
                        name="branch"
                        className="form-control"
                        placeholder="Branch"
                      />
                    </div>
                  </CCol>
                </CRow>

                <CRow>
                  <CCol sm={12} className="text-end">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={isSubmitting}
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
