import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import {
    CTable,
    CTableHead,
    CTableRow,
    CTableDataCell,
    CTableBody,
    CCard,
    CCardHeader,
    CCardBody,
    CPagination,
    CRow,
    CCol,
    CInputGroup,
    CInputGroupText,
    CFormInput,
    CPaginationItem
} from '@coreui/react';
import { AiFillEye } from 'react-icons/ai';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { GetEmployeeById, GetManageTaxes12BB } from '../../redux-saga/modules/userManagement/apiService';
import { ManageTaxes } from '../../models/userManagement/employees';
import { toast } from 'react-toastify';


const ManageTaxes12BB = () => {
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [manageTaxList, setManageTaxList] = useState<ManageTaxes[]>([]);
    const [searchParams] = useSearchParams();

    const { employeeId, userId } = useParams();
    // alert(employeeId)


    const navigate = useNavigate();
    const params = useParams();
    const pageSize = 10;


    useEffect(() => {
        if (employeeId) {
            getEmployeeById(employeeId);
            getForm12BbsById(employeeId);
        }
    }, [employeeId]);

    const getEmployeeById = async (employeeId: string) => {
        try {
            const response = await GetEmployeeById(employeeId);
            setFormData(response);
        } catch (error) {
            toast.error("Fetch User failed");
        }
    };

    // Function to fetch taxes based on search query and page number
    const GetManageTax = async (financialYearId) => {
        try {

            const response = await GetManageTaxes12BB(financialYearId, "", pageNumber, pageSize);
            if (response.data) { // Check if data exists
                setManageTaxList(response.data);
            } else {
                console.warn('No data returned from API'); // Add this line for debugging
            }
        } catch (error) {
            toast.error("Failed to fetch taxes. Please try again later.");
            console.error('Data Fetch Error:', error); // Add this line for debugging
        }
    };
    console.log(employeeId)

    useEffect(() => {

        const financialYearId = params['financialYearId'];
        GetManageTax(financialYearId);
    }, [pageNumber, params]);

    const handlePageChange = (pageNumber: number) => {
        setPageNumber(pageNumber);
    };

    const handleSearchChange = (e: any) => {
        setSearchQuery(e.target.value);
        setPageNumber(1);
    };

    const handleKeyDown = (e: any) => {
        if (e.keyCode === 13) {
            GetManageTax();
        }
    };


    const filteredManageTaxList = manageTaxList.filter((employee) => employee.submittedOn);
    const totalCount = manageTaxList.length;
    const totalPages = Math.ceil(totalCount / pageSize);
    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, totalCount);
    const displayedRoles = filteredManageTaxList.slice(startIndex, endIndex);
    const timezone = useSelector((state: any) => state.sharedReducer.timezone);



    return (
        <>
            <CRow>
                <CCol xs={12}>
                    <CRow className="align-items-center m-1">
                        <CCol xs={4} className="text-start">
                            <CInputGroup>
                                <CInputGroupText htmlFor="searchInput">Search</CInputGroupText>
                                <CFormInput
                                    id="searchInput"
                                    type="text"
                                    placeholder="Search by userName..."
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                    onKeyDown={handleKeyDown}
                                />
                            </CInputGroup>
                        </CCol>
                    </CRow>
                </CCol>
            </CRow>
            <CCard className="mb-4 mt-2">
                <CCardHeader>
                    <h5 className="mb-0"><strong>Manage Form 12BB</strong></h5>
                </CCardHeader>
                <CCardBody>
                    {filteredManageTaxList.length === 0 ? (
                        <p>No records found</p>
                    ) : (
                        <CTable responsive striped hover>
                            <CTableHead>
                                <CTableRow>
                                    <CTableDataCell scope="col">Emp Code</CTableDataCell>
                                    <CTableDataCell scope="col">Full Name</CTableDataCell>
                                    <CTableDataCell scope="col">Contact</CTableDataCell>
                                    <CTableDataCell scope="col">Email</CTableDataCell>
                                    <CTableDataCell scope="col">Submitted On</CTableDataCell>
                                    <CTableDataCell scope="col">Actions</CTableDataCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                {displayedRoles.map((employee) => (
                                    <CTableRow key={employee.employeeId}>
                                        <CTableDataCell>{employee.empCode}</CTableDataCell>
                                        <CTableDataCell>{employee.name}</CTableDataCell>
                                        <CTableDataCell>{employee.contactNumber}</CTableDataCell>
                                        <CTableDataCell>{employee.email}</CTableDataCell>
                                        <CTableDataCell>
                                            {employee.submittedOn
                                                ? moment.utc(employee.submittedOn).tz(timezone)?.format('DD/MM/YYYY hh:mm A')
                                                : 'No Submission Date'}
                                        </CTableDataCell>

                                        <CTableDataCell>
                                            {/* <CTableDataCell>
                                                <Link to="/proofs" className="view-link">
                                                    <AiFillEye className="me-2" />
                                                    <span>View Proofs</span>
                                                </Link>
                                            </CTableDataCell> */}
                                            <CTableDataCell>
                                                <Link to={`/proofs/${employee.employeeId}`} className="view-link">
                                                    <AiFillEye className="me-2" />
                                                    <span>View Proofs</span>
                                                </Link>
                                            </CTableDataCell>
                                        </CTableDataCell>


                                    </CTableRow>
                                ))}
                            </CTableBody>
                        </CTable>
                    )}
                    <CPagination
                        size="sm"
                        align="end"
                        aria-label="Page navigation example"
                        className="m-auto"
                    >
                        <CPaginationItem
                            onClick={() => handlePageChange(pageNumber - 1)}
                            disabled={pageNumber === 1}
                            style={{ margin: "0 2px", cursor: "pointer", fontSize: "12px" }}
                        >
                            <span aria-hidden="true">&laquo;</span>
                        </CPaginationItem>
                        {Array.from({ length: totalPages }, (_, index) => (
                            <CPaginationItem
                                key={index}
                                active={pageNumber === index + 1}
                                onClick={() => handlePageChange(index + 1)}
                                style={{ margin: "0 2px", cursor: "pointer", fontSize: "12px" }}
                            >
                                {index + 1}
                            </CPaginationItem>
                        ))}
                        <CPaginationItem
                            onClick={() => handlePageChange(pageNumber + 1)}
                            disabled={pageNumber === totalPages}
                            style={{ margin: "0 2px", cursor: "pointer", fontSize: "12px" }}
                        >
                            <span aria-hidden="true">&raquo;</span>
                        </CPaginationItem>
                    </CPagination>
                </CCardBody>
            </CCard>


        </>
    );
};

export default ManageTaxes12BB;