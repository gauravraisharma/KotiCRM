import { CButton, CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react';
import React, { useEffect, useState } from 'react';
import { FaDownload } from 'react-icons/fa';
import moment from 'moment';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AddNewFinancial, GetEmployee12BBs, GetEmployeeById } from '../../redux-saga/modules/userManagement/apiService';
import { EmployeeFinancialRecordDummy } from '../../models/Form12BB/Form12BB';


const ManageTaxes: React.FC = () => {
  const { employeeId, userId } = useParams<{ employeeId: string; userId: string }>();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [recordExists, setRecordExists] = useState(false);
  const [employee12BBData, setEmployee12BBData] = useState<EmployeeFinancialRecordDummy[]>([]);
  const navigate = useNavigate();
  const [years, setYears] = useState<string[]>([]); // Assuming it's a list of strings

  useEffect(() => {
    if (employeeId) {
      getEmployeeById(employeeId);
      getForm12BbsById(employeeId);
    }
  }, [employeeId]);

  const getEmployeeById = async (employeeId: string) => {
    try {
      const response = await GetEmployeeById(employeeId);
    
    } catch (error) {
      toast.error("Fetch User failed");
    }
  };

  const getForm12BbsById = async (employeeId: string) => {
    try {
      const response = await GetEmployee12BBs(employeeId);
      if (response.status === 200) {
        setEmployee12BBData(response.data);
        const recordFor2024_2025 = response.data.some(record => record.financialYear === '2024-2025');
        setRecordExists(recordFor2024_2025);
      }
    } catch (error) {
      console.error('Failed to fetch 12BB data:', error);
    }
  };

  const handleAddNew = async () => {
    if (!employeeId) {
      debugger
      console.error('Employee ID is missing.');
      alert('helo');
      return;
    }
    const newEmployeeRecord: EmployeeFinancialRecordDummy = {
      employeeId: employeeId,
      financialYear: '2024-2025',
      createdBy: '5faccdc7-7ddb-4b14-9295-f3a933bef7f1',
      modifiedBy: '24d59f65-7aad-4b0e-b821-f07ca663a32b',
      isDelete: false,
      isActive: true,
      isFormVerified: false,
      isDeclarationComplete: false,
    };

    try {
      const response = await AddNewFinancial(newEmployeeRecord);
      if (response.status === 200) {
        toast.success('Employee record inserted successfully.');
        setTimeout(() => {
          navigate('/users');
          // navigate(`/users/userDetail/${userId}/${employeeId}`);
        }, 3000);
        setFormSubmitted(true);
      } else {
        toast.error('Failed to insert the record.');
      }
    } catch (error) {
      console.error('Error adding new financial record:', error);
      toast.error('Failed to add new financial record. Please try again.');
    }
  };

  const handleClick = (element: EmployeeFinancialRecordDummy) => {
    const financialYear = element.financialYear;
    navigate(`/Form12BB/${userId}/${element.employeeId}/${financialYear}`);
  };

  return (
    <>
      <CCard>
        <CCardHeader>
          <CRow>
            <CCol xs={6} className="d-flex align-items-center">
              <h5>
                <strong>Manage Taxes</strong>
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

        <CCard className="mb-4" style={{ borderColor: '#4e73df' }}>
          <CCardHeader className="mb-3" style={{ backgroundColor: '#4e73df', color: 'white' }}>
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0">12 BB Declaration and Details</h5>
              <button
                onClick={handleAddNew}
                className="btn btn-primary ms-auto"
                style={{ backgroundColor: 'white', color: 'black' }}
                disabled={formSubmitted || recordExists} // Disable the button if form is submitted
              >
                + Add FY 2024-25
              </button>
            </div>
          </CCardHeader>

          <CCardBody style={{ padding: '20px', backgroundColor: '#f8f9fc' }}>
            {employee12BBData.length > 0 ? employee12BBData.map((element, index) => (
              <CRow key={index}>
                <CCol md="6">
                  <CCol md="12">
                    <div>
                      <p style={{ fontWeight: 'bold' }}>Financial year {element.financialYear}</p>
                    </div>
                  </CCol>
                </CCol>
                <CCol md="6" className="text-end">
                  <div>
                    {element.isDeclarationComplete ? (
                      <p>Last submitted on {moment(element.modifiedOn).format('DD MMMM YYYY')} <u style={{ cursor: 'pointer', color: '#4e73df' }}>View Detail</u></p>
                    ) : (
                      <button onClick={() => handleClick(element)} className="btn btn-warning">Submit Proofs</button>
                    )}
                  </div>
                </CCol>
              </CRow>
            )) : <h6>No data available.</h6>}
          </CCardBody>
        </CCard>

        <CCard className="mb-4" style={{ borderColor: '#1cc88a' }}>
          <CCardHeader className="mb-3" style={{ backgroundColor: '#1cc88a', color: 'white' }}>
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Form 16</h5>
              <button onClick={handleAddNew} className="btn btn-primary ms-auto">
                + Add FY 2024-25
              </button>
            </div>
          </CCardHeader>

          <CCardBody style={{ padding: '20px', backgroundColor: '#f8f9fc' }}>
            <CRow>
              {years.length > 0 ? years.map((year, index) => (
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
              )) : <h6>No data available.</h6>}
            </CRow>
          </CCardBody>
        </CCard>
      </CCard>
    </>
  );
}

export default ManageTaxes;
