import { FaDownload } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import { GetFinancialYears, addNewFinancialYear, getFinancialYearById } from '../../redux-saga/modules/userManagement/apiService'; // Adjust import names as per your actual API service
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { CButton, CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react';
import GetModulePermissions from '../../utils/Shared/GetModulePermissions';
import { FinancialYearDTO } from '../../models/Form12BB/Form12BB';

// Function to determine the financial year based on the current date
const getFinancialYear = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth(); // 0 for January, 1 for February, etc.

  // Financial year starts on April 1st
  if (month >= 3) { // If current month is April or later
    return `${year}-${year + 1}`;
  } else { // If current month is before April
    return `${year - 1}-${year}`;
  }
};

const ManageTaxes = () => {
  
  const [years, setYears] = useState([]);
  const [selectedFinancialYear, setSelectedFinancialYear] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const manangeTaxesPermissions = GetModulePermissions('ManageUsers');

  useEffect(() => {
    fetchFinancialYears();
    if (id) {
      fetchFinancialYearById(id);
    }
  }, [id]);

  const fetchFinancialYearById = async (id) => {
    try {
      const response = await getFinancialYearById(id);
      if (response.status === 200 && response.data) {
        setSelectedFinancialYear(response.data);
      } else {
        toast.error('Failed to fetch financial year details.');
      }
    } catch (error) {
      console.error('Error fetching financial year by ID:', error);
      toast.error('Failed to fetch financial year details. Please try again.');
    }
  };

  const fetchFinancialYears = async () => {
    try {
      const response = await GetFinancialYears(); // Call your API service function to fetch financial years
      if (response.status === 200 && response.data) {
        setYears(response.data); // Update state with fetched financial years
      } else {
        toast.error('Failed to fetch financial years.');
      }
    } catch (error) {
      console.error('Error fetching financial years:', error);
      toast.error('Failed to fetch financial years. Please try again.');
    }
  };

  const handleNavigate = (id) => {
    navigate(`/manageTaxes12bb/${id}`);
  };

  const handleAddNewFinancialYear = async () => {
    try {
      const financialYearName = getFinancialYear();

      const financialYearData: FinancialYearDTO = {
        financialYearName: financialYearName,
        createdOn: new Date(), // Make sure the format matches your backend's expectations
        createdBy: '5faccdc7-7ddb-4b14-9295-f3a933bef7f1', // Replace with actual user ID or get dynamically
        isActive: true,
        startDate: new Date(), // Adjust as necessary
        endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)), // Example end date, adjust as necessary
      };

      const response = await addNewFinancialYear(financialYearData);
      if (response.status === 200 && response.data) {
        toast.success('Financial year added successfully.');
        setYears([...years, response.data]); // Add the newly created financial year to the state
        handleNavigate(financialYearName);
      } else {
        toast.error('Failed to add financial year.');
      }
    } catch (error) {
      console.error('Error adding new financial year:', error);
      toast.error('Failed to add new financial year. Please try again.');
    }
  };

  // Function to get the latest financial year from the state
  const getLatestFinancialYear = () => {
    const currentYear = getFinancialYear();
    return years.some(year => year.financialYearName === currentYear);
  };

  return (
    <CCard>
      <CCardHeader className="mb-3">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5>Manage Taxes</h5>
                </div>
                <div className="text-end">
                  <CButton
                    component="input"
                    type="button"
                    color="secondary"
                    value="Back To users"
                    onClick={() => navigate("/users")}
                  />
                </div>
              </div>
            </CCardHeader>
      <CCard className="mb-4" style={{ borderColor: '#4e73df' }}>
        <CCardHeader className="mb-3" style={{ backgroundColor: '#4e73df', color: 'white' }}>
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="mb-0">12 BB Declaration and Details</h5>
            {manangeTaxesPermissions.isAdd && (
              <CButton
                onClick={handleAddNewFinancialYear}
                color="primary"
                className="ms-auto"
                style={{ backgroundColor: 'white', color: 'black' }}
                disabled={getLatestFinancialYear()} // Disable if latest year already exists
              >
                + Add FY {getFinancialYear()}
              </CButton>
            )}
          </div>
        </CCardHeader>

        <CCardBody style={{ padding: '20px', backgroundColor: '#f8f9fc' }}>
          {years.length > 0 ? (
            years.map((financialYear) => (
              <CRow key={financialYear.id}>
                <CCol md="6">
                  <div>
                    <p style={{ fontWeight: 'bold' }}>
                      <span
                        style={{ cursor: 'pointer', textDecoration: 'underline' }}
                        onClick={() => handleNavigate(financialYear.id)}
                      >
                        Financial year {financialYear.financialYearName}
                      </span>
                    </p>
                  </div>
                </CCol>
              </CRow>
            ))
          ) : (
            <h6>No data available.</h6>
          )}
        </CCardBody>
      </CCard>

      <CCard className="mb-4" style={{ borderColor: '#1cc88a' }}>
        <CCardHeader className="mb-3" style={{ backgroundColor: '#1cc88a', color: 'white' }}>
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Form 16</h5>
            {/* {manangeTaxesPermissions.isAdd && (
              <CButton
                onClick={handleAddNewFinancialYear}
                color="primary"
                className="ms-auto"
                style={{ backgroundColor: 'white', color: 'black' }}
                disabled={getLatestFinancialYear()} // Disable if latest year already exists
              >
                + Add FY {getFinancialYear()}
              </CButton>
            )} */}
          </div>
        </CCardHeader>

        {/* <CCardBody style={{ padding: '20px', backgroundColor: '#f8f9fc' }}>
          {years.length > 0 ? (
            years.map((financialYear) => (
              <CRow key={financialYear.id}>
                <CCol md="12">
                  <div>
                    <p style={{ fontWeight: 'bold' }}>Financial year {financialYear.financialYearName}</p>
                  </div>
                  <div className="text-end">
                    <div>
                      <u style={{ cursor: 'pointer', color: '#1cc88a' }}>
                        <FaDownload /> Download
                      </u>
                    </div>
                  </div>
                </CCol>
              </CRow>
            ))
          ) : (
            <h6>No data available.</h6>
          )}
        </CCardBody> */}
      </CCard>
    </CCard>
  );
};

export default ManageTaxes;
