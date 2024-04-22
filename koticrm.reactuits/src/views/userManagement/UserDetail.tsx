import {
  CRow,
  CCol,
  CCard,
  CCardHeader,
  CButton,
  CCardBody,
} from "@coreui/react";
import { useNavigate, useParams } from "react-router-dom";
import { GetEmployeeById } from "../../redux-saga/modules/userManagement/apiService";
import { useEffect, useState } from "react";
import { Employee, EmployeeClass } from "../../models/userManagement/employee";
import { toast } from "react-toastify";
import { Employees } from "../../models/userManagement/employees";
import '../../../src/css/style.css'

const userDetails = () => {
  const { id } = useParams<{ id: string }>();

  const [formData, setFormData] = useState<Employee>(new EmployeeClass());

  useEffect(() => {
    if (id) {
      getEmployeeById(id);
    }
  }, [id]);

  const navigate = useNavigate();

  const getEmployeeById = async (employeeId: string) => {
    await GetEmployeeById(employeeId)
      .then((response) => {
        setFormData(response);
        console.log(response);
      })
      .catch((error) => {
        toast.error("Fetch employee failed");
        console.error("Error fetching employee:", error.statusText);
      });
  };

  return (
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
            </ul>

            <div className="tab-content" id="accountdetail">
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
            </div> 
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default userDetails;
