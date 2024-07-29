
import { CCard, CCardBody, CCardHeader, CCol, CRow, CButton } from '@coreui/react';
import { Field, Formik, ErrorMessage, Form } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import CIcon from '@coreui/icons-react';
import { cilCheckCircle, cilChevronDoubleDown, cilChevronDoubleUp, cilCloudDownload } from '@coreui/icons';
import "../../css/style.css";
import { DownloadDocumentProofAsync, GetEmployee12BB } from '../../redux-saga/modules/userManagement/apiService';
import { EightyCDeclaration, EmployeeFinancialRecord, InitialEmployeeRecord } from '../../models/Form12BB/Form12BB';

import { Deduction } from './deduction';




const Proofs = () => {
    const { employeeId } = useParams<{ employeeId: string }>();
    const [getEmployeeId, setEmployeeId] = useState<string>();
    const [employee12BBData, setEmployee12BBData] = useState<EmployeeFinancialRecord>();
    const [formData, setFormData] = useState<EmployeeFinancialRecord>(new InitialEmployeeRecord());
    // Collapse checks
    const [isCollapsedOne, setIsCollapsedOne] = useState(true);
    const [isCollapsedTwo, setIsCollapsedTwo] = useState(true);
    const [isCollapsedThree, setIsCollapsedThree] = useState(true);
    const [isCollapsedFour, setIsCollapsedFour] = useState(true);
    const [isCollapsedFive, setIsCollapsedFive] = useState(true);
    const [isCollapsedSix, setIsCollapsedSix] = useState(true);
    const [isCollapsedSeven, setIsCollapsedSeven] = useState(true);
    // Checkboxes checks
    const [isRentChecked, setIsRentChecked] = useState(false);
    const [isLeaveChecked, setIsLeaveChecked] = useState(false);
    const [isInterestPaybleChecked, setIsInterestPayableChecked] = useState(false);
    const [is80CChecked, setIs80CChecked] = useState(false);
    const [is80DChecked, setIs80DChecked] = useState(false);
    const [is80GChecked, setIs80GChecked] = useState(false);
    const [isOtherChecked, setIsOtherChecked] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    const [deductionList, setDeductionList] = useState<Deduction[]>([]);
    const [rows, setRows] = useState(formData.eightyCDeclarations);

    const [id, setId] = useState<number>();
    const [houseRentRecordId, setHouseRentRecordId] = useState<number>();
    const [travelExpenditureRecordId, setTravelExpenditureRecordId] = useState<number>();
    const [homeLoanRecordId, setHomeLoanRecordId] = useState<number>();
    const [eightyDRecordId, setEightyDRecordId] = useState<number>();
    const [eightyGRecordId, setEightyGRecordId] = useState<number>();
    const [otherInvestmentRecordId, setOtherInvestmentRecordId] = useState<number>();





    const navigate = useNavigate();

    //toggles
    const toggleCollapseOne = () => setIsCollapsedOne(!isCollapsedOne);
    const toggleCollapseTwo = () => setIsCollapsedTwo(!isCollapsedTwo);
    const toggleCollapseThree = () => setIsCollapsedThree(!isCollapsedThree);
    const toggleCollapseFour = () => setIsCollapsedFour(!isCollapsedFour);
    const toggleCollapseFive = () => setIsCollapsedFive(!isCollapsedFive);
    const toggleCollapseSix = () => setIsCollapsedSix(!isCollapsedSix);
    const toggleCollapseSeven = () => setIsCollapsedSeven(!isCollapsedSeven);
    const toggleRentCheckbox = () => setIsRentChecked(!isRentChecked);
    const toggleLeaveCheckbox = () => setIsLeaveChecked(!isLeaveChecked);
    const toggleInterestPayableChecked = () => setIsInterestPayableChecked(!isInterestPaybleChecked);
    const toggle80CChecked = () => setIs80CChecked(!is80CChecked);
    const toggle80DChecked = () => setIs80DChecked(!is80DChecked);
    const toggle80GChecked = () => setIs80GChecked(!is80GChecked);
    const toggleOtherChecked = () => setIsOtherChecked(!isOtherChecked);

    // Call employee12BB method
    useEffect(() => {
        if (employeeId && employeeId !== undefined) {
            setEmployeeId(employeeId);
            employee12BB(employeeId);
        }
    }, [employeeId]);

    // UseEffect for Filling data in form 
    useEffect(() => {
        setId(employee12BBData?.id);
        if (employee12BBData && employee12BBData.houseRentRecord) {
            setHouseRentRecordId(employee12BBData.houseRentRecordId);
            setFormData({
                ...formData,
                houseRentRecord: {
                    ...formData.houseRentRecord,
                    amount: employee12BBData.houseRentRecord.amount,
                    ownerPanCard: employee12BBData.houseRentRecord.ownerPanCard,
                    proofDocumentLink: employee12BBData.houseRentRecord.proofDocumentLink,
                }
            });
        }
        if (employee12BBData && employee12BBData.travelExpenditureRecord) {
            setTravelExpenditureRecordId(employee12BBData.travelExpenditureRecordId);
            setFormData({
                ...formData,
                travelExpenditureRecord: {
                    ...formData.travelExpenditureRecord,
                    amount: employee12BBData.travelExpenditureRecord.amount,
                    proofDocumentLink: employee12BBData.travelExpenditureRecord.proofDocumentLink,
                }
            });
        }
        if (employee12BBData && employee12BBData.homeLoanRecord) {
            setHomeLoanRecordId(employee12BBData.homeLoanRecordId);
            setFormData({
                ...formData,
                homeLoanRecord: {
                    ...formData.homeLoanRecord,
                    amount: employee12BBData.homeLoanRecord.amount,
                    proofDocumentLink: employee12BBData.homeLoanRecord.proofDocumentLink,
                    isVerified: employee12BBData.homeLoanRecord.isVerified,
                    remarks: employee12BBData.homeLoanRecord.remarks,
                    lenderName: employee12BBData.homeLoanRecord.lenderName,
                    lenderAddress: employee12BBData.homeLoanRecord.lenderAddress,
                    lenderPanNumber: employee12BBData.homeLoanRecord.lenderPanNumber,
                }
            });
            if (employee12BBData && employee12BBData.eightyCDeclarations && employee12BBData.eightyCDeclarations.length > 0) {
                const mappedRecords = employee12BBData.eightyCDeclarations.map(record => ({
                    id: record.id,
                    deductionTypeId: record.deductionTypeId,
                    amount: record.amount,
                    proofDocumentLink: record.proofDocumentLink,
                    isVerified: record.isVerified,
                    remarks: record.remarks,
                    createdBy: record.createdBy,
                    createdOn: record.createdOn,
                    modifiedBy: record.modifiedBy,
                    modifiedOn: record.modifiedOn,
                    isDelete: record.isDelete,
                    employee12BBId: record.employee12BBId,
                    employee12BB: record.employee12BB,
                    eightyCDeductionTypes: record.eightyCDeductionTypes
                }));

                setFormData({
                    ...formData,
                    eightyCDeclarations: mappedRecords
                });
                setRows(mappedRecords);
                setDeductionList(employee12BBData.eightyCDeductionTypes);
            }

            if (employee12BBData && employee12BBData.eightyDRecord) {
                setEightyDRecordId(employee12BBData.eightyDRecordId);
                setFormData({
                    ...formData,
                    eightyDRecord: {
                        id: employee12BBData.eightyDRecord.id,
                        insuranceAmount: employee12BBData.eightyDRecord.insuranceAmount,
                        insuranceProofLink: employee12BBData.eightyDRecord.insuranceProofLink,
                        medicalExpenseAmount: employee12BBData.eightyDRecord.medicalExpenseAmount,
                        medicalExpenseProof: employee12BBData.eightyDRecord.medicalExpenseProof,
                        isVerified: employee12BBData.eightyDRecord.isVerified,
                        remarks: employee12BBData.eightyDRecord.remarks
                    }
                });
            }
            if (employee12BBData && employee12BBData.eightyGRecord) {
                setEightyGRecordId(employee12BBData.eightyGRecordId);
                setFormData({
                    ...formData,
                    eightyGRecord: {
                        id: employee12BBData.eightyGRecord.id,
                        nameOfDonee: employee12BBData.eightyGRecord.nameOfDonee,
                        panNumber: employee12BBData.eightyGRecord.panNumber,
                        address: employee12BBData.eightyGRecord.address,
                        amount: employee12BBData.eightyGRecord.amount,
                        proofDocumentLink: employee12BBData.eightyGRecord.proofDocumentLink,
                        isVerified: employee12BBData.eightyGRecord.isVerified,
                        remarks: employee12BBData.eightyGRecord.remarks
                    }
                });
            }
            if (employee12BBData && employee12BBData.otherInvestmentRecord) {
                setOtherInvestmentRecordId(employee12BBData.otherInvestmentRecordId);
                setFormData({
                    ...formData,
                    otherInvestmentRecord: {
                        id: employee12BBData.otherInvestmentRecord.id,
                        description: employee12BBData.otherInvestmentRecord.description,
                        proofDocumentLink: employee12BBData.otherInvestmentRecord.proofDocumentLink,
                        isVerified: employee12BBData.otherInvestmentRecord.isVerified,
                        remarks: employee12BBData.otherInvestmentRecord.remarks
                    }
                });
            }
        }
    }, [employee12BBData]);

    // Get Employee12BB data
    const employee12BB = async (id: string) => {
        try {
            const response = await GetEmployee12BB(id);
            if (response != null) {
                setEmployee12BBData(response.data);
                if (response.data?.houseRentRecord) {
                    const { id, amount, ownerPanCard, proofDocumentLink } = response.data?.houseRentRecord;
                    setFormData(prevState => ({
                        ...prevState,
                        houseRentRecordId: id,
                        houseRentRecord: {
                            ...prevState.houseRentRecord,
                            id,
                            amount,
                            ownerPanCard,
                            proofDocumentLink,
                        }
                    }));
                }
                if (response.data?.travelExpenditureRecord) {
                    const { id, amount, proofDocumentLink } = response.data?.travelExpenditureRecord;
                    setFormData(prevState => ({
                        ...prevState,
                        travelExpenditureRecordId: id,
                        travelExpenditureRecord: {
                            ...prevState.travelExpenditureRecord,
                            id,
                            amount,
                            proofDocumentLink,
                        }
                    }));
                }
                if (response.data?.homeLoanRecord) {
                    const { id, amount, lenderName, lenderAddress, lenderPanNumber, proofDocumentLink } = response.data?.homeLoanRecord;
                    setFormData((prevState) => ({
                        ...prevState,
                        homeLoanRecordId: id,
                        homeLoanRecord: {
                            ...prevState.homeLoanRecord,
                            id,
                            amount,
                            lenderName,
                            lenderAddress,
                            lenderPanNumber,
                            proofDocumentLink,
                        }
                    }));
                }
                if (response.data?.eightyDRecord) {
                    const { id, insuranceAmount, medicalExpenseAmount, insuranceProofLink, medicalExpenseProof, isVerified, remarks } = response.data?.eightyDRecord;
                    setFormData((prevState) => ({
                        ...prevState,
                        eightyDRecord: {
                            ...prevState.eightyDRecord,
                            id,
                            insuranceAmount,
                            medicalExpenseAmount,
                            insuranceProofLink,
                            medicalExpenseProof,
                            isVerified,
                            remarks
                        }
                    }));
                }
                if (response.data?.eightyGRecord) {
                    const { id, amount, nameOfDonee, panNumber, address, proofDocumentLink } = response.data?.eightyGRecord;
                    setFormData((prevState) => ({
                        ...prevState,
                        eightyGRecordId: id,
                        eightyGRecord: {
                            ...prevState.eightyGRecord,
                            id,
                            nameOfDonee,
                            panNumber,
                            address,
                            amount,
                            proofDocumentLink,
                        }
                    }));
                }
                if (response.data?.otherInvestmentRecord) {
                    const { id, description, proofDocumentLink } = response.data?.otherInvestmentRecord;
                    setFormData((prevState) => ({
                        ...prevState,
                        otherInvestmentRecordId: id,
                        otherInvestmentRecord: {
                            ...prevState.otherInvestmentRecord,
                            id,
                            description,
                            proofDocumentLink
                        }
                    }));
                }
            }
        } catch (error) {
            console.error('Error fetching employee 12BB data:', error);
        }
    };


    // Handle form change
    const handleFormChange = (e: any, fieldName: string, section: string) => {
        const value = e.target.value;

        setFormData(prevData => ({
            ...prevData,
            [section]: {
                ...prevData[section],
                [fieldName]: value,
            }
        }));
    }



// Function to handle download
const handleDownload = async (proofDocumentLink: string) => {
    if (!proofDocumentLink) return;

    const fileName = proofDocumentLink.split('/').pop() || '';

    try {
        const response = await DownloadDocumentProofAsync(proofDocumentLink);

        if (response.status === 200) {
            const blob = response.data;
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url); // Clean up the URL object
        } else {
            console.error('Failed to download the document:', response.statusText);
        }
    } catch (error) {
        console.error('Error downloading the document:', error);
    }
};

  // Set EightyCDeclaration rows
  const setEightyCDeclarationRows = (updatedRows) => {
    const eightyCDeclarations: EightyCDeclaration[] = updatedRows.map(item => ({
      id: item.id,
      deductionTypeId: item.deductionTypeId,
      amount: item.amount,
      proofDocumentLink: null,
      isVerified: false,
      remarks: "",
      createdBy: "",
      createdOn: new Date(),
      modifiedBy: "",
      modifiedOn: new Date(),
      isDelete: false,
      employee12BBId: 0,
      employee12BB: undefined,
      eightyCDeductionTypes: [],
    }));
    setRows(eightyCDeclarations);
  }




    return (
        <Formik
            initialValues={formData}
            validationSchema={Yup.object()} // General validation schema
            enableReinitialize
        >
            {({ validateForm }) => (
                <Form >
                    <CCard>
                        <CCardHeader className="mb-3">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h5>Form 12BB Declaration</h5>
                                </div>
                                <div className="text-end">
                                    <CButton
                                        component="input"
                                        type="button"
                                        color="secondary"
                                        value="Back To Taxes"
                                        onClick={() => navigate("/manageTaxes")}
                                    />
                                </div>
                            </div>
                        </CCardHeader>
                        <div className="p-3">
                            <p>
                                Form 12BB is a statement of claims by an employee for deduction of tax. With effect from 1st June 2016,
                                a salaried employee is required to submit Form 12BB to his or her employer to claim tax benefits or rebates
                                on investments and expenses. Form 12BB has to be submitted at the end of the financial year. Documentary
                                evidence of these investments and expenses has to be provided at the end of the financial year as well.
                            </p>
                        </div>
                        {/* House rent  */}
                        <CCard className="mt-3">
                            <CCardHeader>
                                <CRow className="align-items-center">
                                    <CCol md="4 mb-2 mt-2" className="d-flex align-items-center">
                                        <CIcon
                                            icon={isCollapsedOne ? cilChevronDoubleDown : cilChevronDoubleUp}
                                            className="ml-2"
                                            size="lg"
                                            onClick={!isRentChecked ? toggleCollapseOne : undefined}
                                            style={{ cursor: isRentChecked ? 'default' : 'pointer' }}
                                        />
                                        <h5 className="m-0">House Rent Declaration</h5>
                                    </CCol>
                                    <CCol md="4" className="d-flex align-items-center">
                                        <Field
                                            type="checkbox"
                                            checked={isRentChecked}
                                            onChange={toggleRentCheckbox}
                                            id="rent"
                                            className="custom-checkbox checkbox-spacing"
                                        />
                                        <label htmlFor="houseRentNoInvestments" className="ml-2 mb-0" style={{ marginBottom: '10px' }}>No Investments</label>
                                    </CCol>
                                    <CCol md="4" className="d-flex justify-content-end align-items-center">
                                        {isRentChecked || (formData.houseRentRecord.amount && formData.houseRentRecord.ownerPanCard) && (
                                            <CIcon
                                                icon={cilCheckCircle}
                                                className="ml-2 check-icon"
                                                size="xl"
                                            />
                                        )}
                                    </CCol>
                                </CRow>
                            </CCardHeader>
                            {(!isCollapsedOne && !isRentChecked) && (
                                <CCardBody>
                                    <Formik
                                        initialValues={formData}
                                        enableReinitialize
                                    >
                                        {() => (
                                            <Form>
                                                <CRow className="align-items-center">
                                                    <CCol md="5" className="mb-3">
                                                        <label htmlFor="amount" style={{ marginBottom: '10px' }}>Annual house rent:</label>
                                                        <Field
                                                            type="number"
                                                            id="amount"
                                                            name="houseRentRecord.amount"
                                                            onChange={(e) => handleFormChange(e, 'amount', 'houseRentRecord')}
                                                            className={`form-control`}
                                                            placeholder="Amount of House Rent in a year"
                                                            disabled={isRentChecked || formData.houseRentRecord.amount != null}
                                                        />
                                                    </CCol>
                                                    <CCol md="4" className="d-flex justify-content-end align-items-center">
                                                        {formData.houseRentRecord.amount && (
                                                            <CIcon
                                                                icon={cilCheckCircle}
                                                                className="ml-2 check-icon"
                                                                size="xl"
                                                            />
                                                        )}
                                                    </CCol>
                                                </CRow>
                                            </Form>
                                        )}
                                    </Formik>
                                    <hr />
                                    <Formik
                                        initialValues={formData}
                                        enableReinitialize
                                    >
                                        {() => (
                                            <Form>
                                                <CRow className="align-items-center">
                                                    <CCol md="3" style={{ marginTop: '20px' }}>
                                                        <p style={{ color: 'green', fontWeight: 'bold' }}>Proofs</p>
                                                    </CCol>
                                                    <CCol md="3" style={{ marginTop: '20px' }}>
                                                        <label htmlFor="proof">Proof:</label>
                                                        {formData.houseRentRecord.proofDocumentLink ? (
                                                            // <a
                                                            //     href={formData.houseRentRecord.proofDocumentLink}
                                                            //     download
                                                            //     onClick={(e) => {
                                                            //         e.preventDefault(); // Prevent the default link behavior
                                                            //         handleDownload(formData.houseRentRecord.proofDocumentLink);
                                                            //     }}

                                                            //     target="_blank"
                                                            //     rel="noopener noreferrer"
                                                            //     className="btn btn-success"
                                                            //     style={{ color: 'white', display: 'flex', alignItems: 'center' }}
                                                            // >
                                                            <a
                                                                onClick={(e) => {
                                                                    e.preventDefault(); // Prevent default anchor behavior
                                                                    handleDownload(formData.houseRentRecord.proofDocumentLink);
                                                                }}
                                                                className="btn btn-success"
                                                                style={{ color: 'white', display: 'flex', alignItems: 'center' }}
                                                            >



                                                                <CIcon
                                                                    icon={cilCloudDownload}
                                                                    className="mr-2"
                                                                    size="lg"
                                                                />
                                                                Rent Slips
                                                            </a>
                                                        ) : (
                                                            <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px', marginBottom: '10px' }}>
                                                                <label className="custom-file-label" style={{ cursor: 'pointer' }}>
                                                                    No Document Available
                                                                </label>
                                                            </div>
                                                        )}


                                                    </CCol>
                                                    <CCol md="3">
                                                        <label htmlFor="ownerPan" style={{ marginBottom: '10px' }}>Owner PAN Number</label>
                                                        <Field
                                                            type="text"
                                                            id="ownerPanCard"
                                                            name="houseRentRecord.ownerPanCard"
                                                            onChange={(e) => handleFormChange(e, 'ownerPanCard', 'houseRentRecord')}
                                                            className={`form-control`}
                                                            placeholder="Owner PAN Number"
                                                            disabled={(formData.houseRentRecord.amount ?? 0) <= 100000 || isRentChecked || formData.houseRentRecord.ownerPanCard != null}
                                                        />
                                                        <p>(if amount greater than 1 Lac)</p>
                                                    </CCol>
                                                    <CCol md="2" className="d-flex justify-content-end align-items-center">
                                                        {formData.houseRentRecord.ownerPanCard && (
                                                            <CIcon
                                                                icon={cilCheckCircle}
                                                                className="ml-2 check-icon"
                                                                size="xl"
                                                            />
                                                        )}
                                                    </CCol>
                                                </CRow>
                                            </Form>
                                        )}
                                    </Formik>
                                </CCardBody>
                            )}
                        </CCard>
                        {/* Leave travel expenditure details */}
                        <CCard className="mt-3">
                            <CCardHeader>
                                <CRow className="align-items-center">
                                    <CCol md="4" className="d-flex align-items-center mb-2 mt-2">
                                        <CIcon
                                            icon={isCollapsedTwo ? cilChevronDoubleDown : cilChevronDoubleUp}
                                            className="ml-2"
                                            size="lg"
                                            onClick={!isLeaveChecked ? toggleCollapseTwo : undefined}
                                            style={{ cursor: isLeaveChecked ? 'default' : 'pointer' }}
                                        />
                                        <h5 className="m-0">Leave Travel Expenditure Details</h5>
                                    </CCol>
                                    <CCol md="4" className="d-flex align-items-center">
                                        <Field
                                            type="checkbox"
                                            checked={isLeaveChecked}
                                            onChange={toggleLeaveCheckbox}
                                            id="leave"
                                            className="custom-checkbox checkbox-spacing"
                                        />
                                        <label htmlFor="noTravelDeclaration" className="ml-2 mb-0" style={{ marginBottom: '10px' }}>No Investments</label>
                                    </CCol>
                                    <CCol md="4" className="d-flex justify-content-end align-items-center">
                                        {isLeaveChecked || (formData.travelExpenditureRecord.amount && formData.travelExpenditureRecord.proofDocumentLink) && (
                                            <CIcon
                                                icon={cilCheckCircle}
                                                className="ml-2 check-icon"
                                                size="xl"
                                            />
                                        )}
                                    </CCol>
                                </CRow>
                            </CCardHeader>
                            {!isCollapsedTwo && !isLeaveChecked && (
                                <CCardBody>
                                    <Formik
                                        initialValues={formData}
                                        enableReinitialize
                                    >
                                        {() => (
                                            <Form>
                                                <CRow className="align-items-center">
                                                    <CCol md="5" className="mb-3">
                                                        <label htmlFor="amount" style={{ marginBottom: '10px' }}>
                                                            Amount of any travel to claim in a year:
                                                        </label>
                                                        <Field
                                                            type="number"
                                                            id="amount"
                                                            name="travelExpenditureRecord.amount"
                                                            value={formData.travelExpenditureRecord.amount}
                                                            onChange={(e) => handleFormChange(e, 'amount', 'travelExpenditureRecord')}
                                                            className={`form-control${isLeaveChecked ? ' no-border' : ''}`}
                                                            disabled={isLeaveChecked || !!formData.travelExpenditureRecord.amount}
                                                            placeholder="Amount of any travel to claim in a year"
                                                        />
                                                    </CCol>
                                                    <CCol md="4" className="d-flex justify-content-end align-items-center">
                                                        {formData.travelExpenditureRecord.amount && (
                                                            <CIcon
                                                                icon={cilCheckCircle}
                                                                className="ml-2 check-icon"
                                                                size="xl"
                                                            />
                                                        )}
                                                    </CCol>
                                                </CRow>
                                                <hr />
                                                <CRow className="align-items-center">
                                                    <CCol md="4" style={{ marginTop: '20px' }}>
                                                        <p style={{ color: 'green', fontWeight: 'bold' }}>Proofs</p>
                                                    </CCol>
                                                    <CCol md="4" style={{ marginTop: '40px' }}>
                                                        <label htmlFor="proof">Proof:</label>
                                                        {formData.travelExpenditureRecord.proofDocumentLink ? (
                                                            <a
                                                                href={formData.travelExpenditureRecord.proofDocumentLink}
                                                                onClick={(e) => {
                                                                    e.preventDefault(); // Prevent the default link behavior
                                                                    handleDownload(formData.travelExpenditureRecord.proofDocumentLink);
                                                                }}

                                                                target="_blank"
                                                                download
                                                                rel="noopener noreferrer"
                                                                className="btn btn-success"
                                                                style={{ color: 'white', display: 'flex', alignItems: 'center' }}
                                                            >
                                                                <CIcon
                                                                    icon={cilCloudDownload}
                                                                    className="mr-2"
                                                                    size="lg"
                                                                />
                                                                Final Proofs
                                                            </a>
                                                        ) : (
                                                            <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px', marginBottom: '10px' }}>
                                                                <label className="custom-file-label" style={{ cursor: 'pointer' }}>
                                                                    No Document Available
                                                                </label>
                                                            </div>
                                                        )}





                                                    </CCol>
                                                    <CCol md="4" className="d-flex justify-content-end align-items-center">
                                                        {formData.travelExpenditureRecord.proofDocumentLink && (
                                                            <CIcon
                                                                icon={cilCheckCircle}
                                                                className="ml-2 check-icon"
                                                                size="xl"
                                                            />
                                                        )}
                                                    </CCol>
                                                </CRow>
                                            </Form>
                                        )}
                                    </Formik>
                                </CCardBody>
                            )}
                        </CCard>


                        {/* Interest Payable on Home Loan */}
                        <CCard className="mt-3">
                            <CCardHeader>
                                <CRow className="align-items-center">
                                    <CCol md="4" className="d-flex align-items-center mb-2 mt-2">
                                        <CIcon
                                            icon={isCollapsedThree ? cilChevronDoubleDown : cilChevronDoubleUp}
                                            className="ml-2"
                                            size="lg"
                                            onClick={toggleCollapseThree}
                                            style={{ cursor: 'pointer' }}
                                        />
                                        <h5 className="m-0">Interest Payable on Home Loan</h5>
                                    </CCol>
                                    <CCol md="4" className="d-flex align-items-center">
                                        <Field
                                            type="checkbox"
                                            checked={isInterestPaybleChecked}
                                            onChange={toggleInterestPayableChecked}
                                            id="interestPayable"
                                            className="custom-checkbox checkbox-spacing"
                                        />
                                        <label htmlFor="interestPayable" className="ml-2 mb-0">No Investments</label>
                                    </CCol>
                                    <CCol md="4" className="d-flex justify-content-end align-items-center">
                                        {isInterestPaybleChecked || (formData.homeLoanRecord.amount && formData.homeLoanRecord.lenderName && formData.homeLoanRecord.lenderAddress && formData.homeLoanRecord.lenderPanNumber) && (
                                            <CIcon
                                                icon={cilCheckCircle}
                                                className="ml-2 check-icon"
                                                size="xl"
                                            />
                                        )}
                                    </CCol>
                                </CRow>
                            </CCardHeader>
                            {!isCollapsedThree && !isInterestPaybleChecked && (
                                <CCardBody>
                                    <CRow className="align-items-center">
                                        <CCol md="4" className="mb-3">
                                            <label htmlFor="amount" style={{ marginBottom: '10px' }}>Interest Amount on home loan in a year:</label>
                                            <Field
                                                type="number"
                                                id="amount"
                                                name="homeLoanRecord.amount"
                                                onChange={(e) => handleFormChange(e, 'amount', 'homeLoanRecord')}
                                                className={`form-control${isInterestPaybleChecked ? ' no-border' : ''}`}
                                                placeholder="Interest Amount on home loan in a year"
                                                disabled={isInterestPaybleChecked || !!formData.homeLoanRecord.amount}
                                            />
                                        </CCol>
                                        <CCol md="2" className="mb-3">
                                            <label htmlFor="lenderName" style={{ marginBottom: '10px' }}>Name of Lender</label>
                                            <Field
                                                type="text"
                                                id="lenderName"
                                                name="homeLoanRecord.lenderName"
                                                onChange={(e) => handleFormChange(e, 'lenderName', 'homeLoanRecord')}
                                                className={`form-control${isInterestPaybleChecked ? ' no-border' : ''}`}
                                                placeholder="Name of Lender"
                                                disabled={isInterestPaybleChecked || !!formData.homeLoanRecord.lenderName}
                                            />
                                        </CCol>
                                        <CCol md="2" className="mb-3">
                                            <label htmlFor="lenderAddress" style={{ marginBottom: '10px' }}>Address of Lender</label>
                                            <Field
                                                type="text"
                                                id="lenderAddress"
                                                name="homeLoanRecord.lenderAddress"
                                                onChange={(e) => handleFormChange(e, 'lenderAddress', 'homeLoanRecord')}
                                                className={`form-control${isInterestPaybleChecked ? ' no-border' : ''}`}
                                                placeholder="Address of Lender"
                                                disabled={isInterestPaybleChecked || !!formData.homeLoanRecord.lenderAddress}
                                            />
                                        </CCol>
                                        <CCol md="3" className="mb-3">
                                            <label htmlFor="lenderPan" style={{ marginBottom: '10px' }}>PAN Number of Lender</label>
                                            <Field
                                                type="text"
                                                id="lenderPan"
                                                name="homeLoanRecord.lenderPanNumber"
                                                onChange={(e) => handleFormChange(e, 'lenderPanNumber', 'homeLoanRecord')}
                                                className={`form-control${isInterestPaybleChecked ? ' no-border' : ''}`}
                                                placeholder="PAN No. of Lender"
                                                disabled={isInterestPaybleChecked || !!formData.homeLoanRecord.lenderPanNumber}
                                            />
                                        </CCol>
                                        <CCol md="1" className="d-flex justify-content-end align-items-center">
                                            {formData.homeLoanRecord.amount && formData.homeLoanRecord.lenderName && formData.homeLoanRecord.lenderAddress && formData.homeLoanRecord.lenderPanNumber && (
                                                <CIcon
                                                    icon={cilCheckCircle}
                                                    className="ml-2 check-icon"
                                                    size="xl"
                                                />
                                            )}
                                        </CCol>
                                    </CRow>
                                    <hr />
                                    <CRow className="align-items-center">
                                        <CCol md="4" className="mb-2">
                                            <p style={{ color: 'green', fontWeight: 'bold' }}>Proofs</p>
                                        </CCol>
                                        <CCol md="4" className="d-flex align-items-center">
                                            <label htmlFor="proof">Proof:</label>
                                            {formData.homeLoanRecord.proofDocumentLink ? (
                                                // <a
                                                //     href={formData.homeLoanRecord.proofDocumentLink}
                                                //     target="_blank"
                                                //     download
                                                //     rel="noopener noreferrer"
                                                //     className="btn btn-success"
                                                //     style={{ color: 'white', display: 'flex', alignItems: 'center' }}
                                                // >
                                                <a
                                                                onClick={(e) => {
                                                                    e.preventDefault(); // Prevent default anchor behavior
                                                                    handleDownload(formData.homeLoanRecord.proofDocumentLink);
                                                                }}
                                                                className="btn btn-success"
                                                                style={{ color: 'white', display: 'flex', alignItems: 'center' }}
                                                            >
                                                    <CIcon
                                                        icon={cilCloudDownload}
                                                        className="mr-2"
                                                        size="lg"
                                                    />
                                                    Proofs
                                                 </a>
                                            ) : (
                                                <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px', marginBottom: '10px' }}>
                                                    <label className="custom-file-label" style={{ cursor: 'pointer' }}>
                                                        No Document Available
                                                    </label>
                                                </div>
                                            )}
                                        </CCol>
                                        <CCol md="4"></CCol>
                                    </CRow>
                                </CCardBody>
                            )}
                        </CCard>

                        {/* All tax deductions */}
                        <CCard>
                            <CCardHeader>
                                <CCol md="6 mb-2 mt-2" className="d-flex align-items-center"  >
                                    <h5>All Tax Deductions (80C,80D,80DD,80GGA,80TTA,80U)</h5>
                                </CCol>
                            </CCardHeader>
                            <CCardBody>


                                {/* 80 C */}
                                <CCard className="mt-3">
                                    <CCardHeader>
                                        <CRow className="align-items-center">
                                            <CCol md="4 mb-2 mt-2" className="d-flex align-items-center">
                                                <CIcon
                                                    icon={isCollapsedFour ? cilChevronDoubleDown : cilChevronDoubleUp}
                                                    className="ml-2"
                                                    size="lg"
                                                    onClick={toggleCollapseFour}
                                                    style={{ cursor: 'pointer' }}
                                                />
                                                <h5 className="m-0">80 C</h5>
                                            </CCol>

                                            <CCol md="4" className="d-flex align-items-center">
                                                <Field
                                                    type="checkbox"
                                                    id="80C"
                                                    checked={is80CChecked}
                                                    onChange={toggle80CChecked}
                                                    className="custom-checkbox checkbox-spacing"
                                                    disabled // Make checkbox view-only
                                                />
                                                <label htmlFor="80C" className="ml-2 mb-0">No Investments</label>
                                            </CCol>
                                            <CCol md="4" className="d-flex justify-content-end align-items-center">
                                                {is80CChecked && (
                                                    <CIcon
                                                        icon={cilCheckCircle}
                                                        className="ml-2 check-icon"
                                                        size="xl"
                                                    />
                                                )}
                                            </CCol>
                                        </CRow>
                                    </CCardHeader>

                                    {!isCollapsedFour && !is80CChecked && (
                                        <CCardBody>
                                            {rows.map((row, index) => {
                                                const isPrefilled = row.deductionTypeId !== 0 || row.amount !== 0 || row.proofDocumentLink !== '';
                                                return (
                                                    <CRow key={row.id} className="align-items-center">
                                                        <CCol md="4" className="mb-3" style={{ textAlign: 'center' }}>
                                                            <label htmlFor="deduction" className="ml-2 mb-0">Deduction Type</label>
                                                            <div className="form-control-plaintext">
                                                                {deductionList.find(item => item.id === row.deductionTypeId)?.name || 'Not Selected'}
                                                            </div>
                                                        </CCol>
                                                        <CCol md="2" className="mb-3">
                                                            <label htmlFor={`amount${row.id}`} style={{ marginBottom: '10px' }}>Amount:</label>
                                                            <div className="form-control-plaintext">
                                                                {row.amount || 'Not Provided'}
                                                            </div>
                                                        </CCol>
                                                        <CCol md="1" className="d-flex justify-content-end align-items-center">
                                                            {row.amount && (
                                                                <CIcon
                                                                    icon={cilCheckCircle}
                                                                    className="ml-2 check-icon"
                                                                    size="xl"
                                                                />
                                                            )}
                                                        </CCol>
                                                        <CCol md="2" className="mb-3">
                                                            <label htmlFor="proof">Proof:</label>
                                                            <div style={{ display: 'flex', alignItems: 'center' }}>

                                                                {row.proofDocumentLink ? (
                                                                    // <a
                                                                    //     href={row.proofDocumentLink}
                                                                    //     target="_blank"
                                                                    //     download
                                                                    //     rel="noopener noreferrer"
                                                                    //     className="btn btn-success"
                                                                    //     style={{ color: 'white', display: 'flex', alignItems: 'center' }}
                                                                    // >
                                                                    <a
                                                                    onClick={(e) => {
                                                                        e.preventDefault(); // Prevent default anchor behavior
                                                                        handleDownload(row.proofDocumentLink);
                                                                    }}
                                                                    className="btn btn-success"
                                                                    style={{ color: 'white', display: 'flex', alignItems: 'center' }}
                                                                >
                                                                        <CIcon
                                                                            icon={cilCloudDownload}
                                                                            className="mr-2"
                                                                            size="lg"
                                                                        />
                                                                        Proofs
                                                                    </a>
                                                                ) : (
                                                                    <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px', marginBottom: '10px' }}>
                                                                        <label className="custom-file-label" style={{ cursor: 'pointer' }}>
                                                                            No Document Available
                                                                        </label>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </CCol>
                                                        <CCol md="1" className="mb-3">
                                                            {/* No delete button for view-only */}
                                                        </CCol>
                                                        <CCol md="1" className="d-flex justify-content-end align-items-center">
                                                            {row.proofDocumentLink && (
                                                                <CIcon
                                                                    icon={cilCheckCircle}
                                                                    className="ml-2 check-icon"
                                                                    size="xl"
                                                                />
                                                            )}
                                                        </CCol>
                                                    </CRow>
                                                );
                                            })}
                                        </CCardBody>
                                    )}
                                </CCard>




                                {/* 80 D */}
                                <CCard className="mt-3">
                                    <CCardHeader>
                                        <CRow className="align-items-center">
                                            <CCol md="4" className="d-flex align-items-center mb-2 mt-2">
                                                <CIcon
                                                    icon={isCollapsedFive ? cilChevronDoubleDown : cilChevronDoubleUp}
                                                    className="ml-2"
                                                    size="lg"
                                                    onClick={toggleCollapseFive}
                                                    style={{ cursor: 'pointer' }}
                                                />
                                                <h5 className="m-0">80 D</h5>
                                            </CCol>
                                            <CCol md="4" className="d-flex align-items-center">
                                                <Field
                                                    type="checkbox"
                                                    id="80D"
                                                    checked={is80DChecked}
                                                    onChange={toggle80DChecked}
                                                    className="custom-checkbox checkbox-spacing"
                                                />
                                                <label htmlFor="80D" className="ml-2 mb-0">No Investments</label>
                                            </CCol>
                                            <CCol md="4" className="d-flex justify-content-end align-items-center">
                                                {is80DChecked && (
                                                    <CIcon
                                                        icon={cilCheckCircle}
                                                        className="ml-2 check-icon"
                                                        size="xl"
                                                    />
                                                )}
                                            </CCol>
                                        </CRow>
                                    </CCardHeader>
                                    {!isCollapsedFive && !is80DChecked && (
                                        <CCardBody>
                                            <CRow className="align-items-center">
                                                <CCol md="4" className="mb-3 text-center">
                                                    <p>Self and Family Insurance</p>
                                                </CCol>
                                                <CCol md="2" className="mb-3">
                                                    <label htmlFor="insuranceAmount" className="mb-10">Amount:</label>
                                                    <p>{formData.eightyDRecord.insuranceAmount || 'Not Provided'}</p>
                                                </CCol>
                                                <CCol md="2" className="mb-3">
                                                    <div>
                                                        <label htmlFor="proof">Proof:</label>
                                                        {formData.eightyDRecord.insuranceProofLink ? (
                                                            <a
                                                                href={formData.eightyDRecord.insuranceProofLink}
                                                                target="_blank"
                                                                download
                                                                rel="noopener noreferrer"
                                                                className="btn btn-success"
                                                                style={{ color: 'white', display: 'flex', alignItems: 'center' }}
                                                            >
                                                                <CIcon
                                                                    icon={cilCloudDownload}
                                                                    className="mr-2"
                                                                    size="lg"
                                                                />
                                                                Proofs
                                                            </a>
                                                        ) : (
                                                            <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px', marginBottom: '10px' }}>
                                                                <label className="custom-file-label" style={{ cursor: 'pointer' }}>
                                                                    No Document Available
                                                                </label>
                                                            </div>
                                                        )}



                                                    </div>
                                                </CCol>
                                                <CCol md="4" className="d-flex justify-content-end align-items-center">
                                                    {formData.eightyDRecord.insuranceAmount && (
                                                        <CIcon
                                                            icon={cilCheckCircle}
                                                            className="ml-2 check-icon"
                                                            size="xl"
                                                        />
                                                    )}
                                                </CCol>
                                            </CRow>
                                            <CRow className="align-items-center">
                                                <CCol md="4" className="mb-3 text-center">
                                                    <p>Medical Expenses if parents are</p>
                                                    <p>
                                                        {selectedOption === 'lessThan60' ? 'Less than 60 (Maximum Exemption Rs.25,000)' :
                                                            selectedOption === 'greaterThan60' ? 'Greater than 60 (Maximum Exemption Rs.50,000)' :
                                                                'Not Selected'}
                                                    </p>
                                                </CCol>
                                            </CRow>
                                            {selectedOption && (
                                                <CRow className="align-items-center">
                                                    <CCol md="4" className="mb-3 text-center">
                                                        <p>Medical Expenses Amount:</p>
                                                    </CCol>
                                                    <CCol md="2" className="mb-3">
                                                        <p>{formData.eightyDRecord.medicalExpenseAmount || 'Not Provided'}</p>
                                                    </CCol>
                                                    <CCol md="2" className="mb-3">
                                                        <div>

                                                            {formData.eightyDRecord.medicalProof ? (
                                                                // <a
                                                                //     href={formData.eightyDRecord.medicalProof}
                                                                //     target="_blank"
                                                                //     download
                                                                //     rel="noopener noreferrer"
                                                                //     className="btn btn-success"
                                                                //     style={{ color: 'white', display: 'flex', alignItems: 'center' }}
                                                                // >
                                                                <a
                                                                onClick={(e) => {
                                                                    e.preventDefault(); // Prevent default anchor behavior
                                                                    handleDownload(formData.eightyDRecord.proofDocumentLink);
                                                                }}
                                                                className="btn btn-success"
                                                                style={{ color: 'white', display: 'flex', alignItems: 'center' }}
                                                            >
                                                                    <CIcon
                                                                        icon={cilCloudDownload}
                                                                        className="mr-2"
                                                                        size="lg"
                                                                    />
                                                                    Proofs
                                                                </a>
                                                            ) : (
                                                                <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px', marginBottom: '10px' }}>
                                                                    <label className="custom-file-label" style={{ cursor: 'pointer' }}>
                                                                        No Document Available
                                                                    </label>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </CCol>
                                                </CRow>
                                            )}
                                        </CCardBody>
                                    )}
                                </CCard>

                                {/* 80 G */}
                                <CCard className="mt-3">
                                    <CCardHeader>
                                        <CRow className="align-items-center">
                                            <CCol md="4" className="d-flex align-items-center mb-2 mt-2">
                                                <CIcon
                                                    icon={isCollapsedSix ? cilChevronDoubleDown : cilChevronDoubleUp}
                                                    className="ml-2"
                                                    size="lg"
                                                    onClick={toggleCollapseSix}
                                                    style={{ cursor: 'pointer' }}
                                                />
                                                <h5 className="m-0">80 G-Donations</h5>
                                            </CCol>
                                            <CCol md="4" className="d-flex align-items-center">
                                                <Field
                                                    type="checkbox"
                                                    id="80GDonations"
                                                    checked={is80GChecked}
                                                    onChange={toggle80GChecked}
                                                    className="custom-checkbox checkbox-spacing"
                                                />
                                                <label htmlFor="80GDonations" className="ml-2 mb-0">No Investments</label>
                                            </CCol>
                                            <CCol md="4" className="d-flex justify-content-end align-items-center">
                                                {is80GChecked || (formData.eightyGRecord.nameOfDonee && formData.eightyGRecord.panNumber && formData.eightyGRecord.address && formData.eightyGRecord.amount) && (
                                                    <CIcon
                                                        icon={cilCheckCircle}
                                                        className="ml-2 check-icon"
                                                        size="xl"
                                                    />
                                                )}
                                            </CCol>
                                        </CRow>
                                    </CCardHeader>
                                    {!isCollapsedSix && !is80GChecked && (
                                        <Formik
                                            initialValues={formData}
                                            enableReinitialize
                                        >
                                            <Form>
                                                <CCardBody>
                                                    <CRow className="align-items-center">
                                                        <CCol md="3" className="mb-3">
                                                            <label htmlFor="nameOfDonee" style={{ marginBottom: '10px' }}>Name of the Donee:</label>
                                                            <Field
                                                                type="text"
                                                                id="nameOfDonee"
                                                                name="eightyGRecord.nameOfDonee"
                                                                onChange={(e) => handleFormChange(e, 'nameOfDonee', 'eightyGRecord')}
                                                                className="form-control"
                                                                placeholder="Name of the Donee"
                                                                disabled={!!formData.eightyGRecord.nameOfDonee}
                                                            />
                                                        </CCol>
                                                        <CCol md="2" className="mb-3">
                                                            <label htmlFor="panNumber" style={{ marginBottom: '10px' }}>PAN Details:</label>
                                                            <Field
                                                                type="text"
                                                                id="panNumber"
                                                                name="eightyGRecord.panNumber"
                                                                onChange={(e) => handleFormChange(e, 'panNumber', 'eightyGRecord')}
                                                                className="form-control"
                                                                placeholder="PAN Details"
                                                                disabled={!!formData.eightyGRecord.panNumber}
                                                            />
                                                        </CCol>
                                                        <CCol md="2" className="mb-3">
                                                            <label htmlFor="address" style={{ marginBottom: '10px' }}>Address:</label>
                                                            <Field
                                                                type="text"
                                                                id="address"
                                                                name="eightyGRecord.address"
                                                                onChange={(e) => handleFormChange(e, 'address', 'eightyGRecord')}
                                                                className="form-control"
                                                                placeholder="Address"
                                                                disabled={!!formData.eightyGRecord.address}
                                                            />
                                                        </CCol>
                                                        <CCol md="2" className="mb-3">
                                                            <label htmlFor="amount" style={{ marginBottom: '10px' }}>Amount:</label>
                                                            <Field
                                                                type="number"
                                                                id="amount"
                                                                name="eightyGRecord.amount"
                                                                onChange={(e) => handleFormChange(e, 'amount', 'eightyGRecord')}
                                                                className="form-control"
                                                                placeholder="Amount"
                                                                disabled={!!formData.eightyGRecord.amount}
                                                            />
                                                        </CCol>
                                                        <CCol md="2" className="mb-3">
                                                            <div>
                                                                <label htmlFor="proof">Proof:</label>
                                                                {formData.eightyGRecord.proofDocumentLink ? (
                                                                    <a
                                                                        href={formData.eightyGRecord.proofDocumentLink}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        className="btn btn-success"
                                                                        style={{ color: 'white', display: 'flex', alignItems: 'center' }}
                                                                    >
                                                                        <CIcon
                                                                            icon={cilCloudDownload}
                                                                            className="mr-2"
                                                                            size="lg"
                                                                        />
                                                                        Proofs
                                                                    </a>
                                                                ) : (
                                                                    <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px', marginBottom: '10px' }}>
                                                                        <label className="custom-file-label" style={{ cursor: 'pointer' }}>
                                                                            No Document Available
                                                                        </label>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </CCol>
                                                        <CCol md="1" className="d-flex justify-content-end align-items-center">
                                                            {formData.eightyGRecord.nameOfDonee && formData.eightyGRecord.panNumber && formData.eightyGRecord.address && formData.eightyGRecord.amount && (
                                                                <CIcon
                                                                    icon={cilCheckCircle}
                                                                    className="ml-2 check-icon"
                                                                    size="xl"
                                                                />
                                                            )}
                                                        </CCol>
                                                    </CRow>
                                                </CCardBody>
                                            </Form>
                                        </Formik>
                                    )}
                                </CCard>


                                {/* Other investments */}

                                <CCard className="mt-3">
                                    <CCardHeader>
                                        <CRow className="align-items-center">
                                            <CCol md="4 mb-2 mt-2" className="d-flex align-items-center">
                                                <CIcon
                                                    icon={isCollapsedSeven ? cilChevronDoubleDown : cilChevronDoubleUp}
                                                    className="ml-2"
                                                    size="lg"
                                                    onClick={toggleCollapseSeven}
                                                    style={{ cursor: 'pointer' }}
                                                />
                                                <h5 className="m-0">Other Investment Proofs</h5>
                                            </CCol>
                                            <CCol md="4" className="d-flex align-items-center">
                                                <Field
                                                    type="checkbox"
                                                    id="otherChecked"
                                                    checked={isOtherChecked}
                                                    onChange={toggleOtherChecked}
                                                    className="custom-checkbox checkbox-spacing"
                                                />
                                                <label htmlFor="otherChecked" className="ml-2 mb-0">No Investments</label>
                                            </CCol>
                                            <CCol md="4" className="d-flex justify-content-end align-items-center">
                                                {isOtherChecked || formData.otherInvestmentRecord.description && (
                                                    <CIcon
                                                        icon={cilCheckCircle}
                                                        className="ml-2 check-icon"
                                                        size="xl"
                                                    />
                                                )}
                                            </CCol>
                                        </CRow>
                                    </CCardHeader>
                                    {!isCollapsedSeven && !isOtherChecked && (
                                        <CCardBody>
                                            <Formik
                                                initialValues={formData}
                                                enableReinitialize
                                            >
                                                {({ handleChange }) => {
                                                    const isDisabled = Boolean(formData.otherInvestmentRecord.description);

                                                    return (
                                                        <Form>
                                                            <CRow className="align-items-center">
                                                                <CCol md="5" className="mb-3">
                                                                    <label htmlFor="description" style={{ marginBottom: '10px' }}>
                                                                        Type Description of investment type:
                                                                    </label>
                                                                    <Field
                                                                        as="textarea"
                                                                        id="description"
                                                                        name="otherInvestmentRecord.description"
                                                                        rows={2}
                                                                        onChange={(e) => handleFormChange(e, 'description', 'otherInvestmentRecord')}
                                                                        className={`form-control${isDisabled ? ' disabled' : ''}`}
                                                                        placeholder="Type Description of investment type"
                                                                        disabled={isDisabled}
                                                                    />
                                                                </CCol>
                                                                <CCol md="3" className="mb-3">
                                                                    <div>
                                                                        <label htmlFor="proof">Proof:</label>
                                                                        {formData.otherInvestmentRecord.proofDocumentLink ? (
                                                                            <a
                                                                                href={formData.otherInvestmentRecord.proofDocumentLink}
                                                                                target="_blank"
                                                                                download
                                                                                rel="noopener noreferrer"
                                                                                className="btn btn-success"
                                                                                style={{ color: 'white', display: 'flex', alignItems: 'center' }}
                                                                            >
                                                                                <CIcon
                                                                                    icon={cilCloudDownload}
                                                                                    className="mr-2"
                                                                                    size="lg"
                                                                                />
                                                                                Proofs
                                                                            </a>
                                                                        ) : (
                                                                            <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px', marginBottom: '10px' }}>
                                                                                <label className="custom-file-label" style={{ cursor: 'pointer' }}>
                                                                                    No Document Available
                                                                                </label>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </CCol>
                                                                <CCol md="1" className="d-flex justify-content-end align-items-center">
                                                                    {formData.otherInvestmentRecord.description && (
                                                                        <CIcon
                                                                            icon={cilCheckCircle}
                                                                            className="ml-2 check-icon"
                                                                            size="xl"
                                                                        />
                                                                    )}
                                                                </CCol>
                                                            </CRow>

                                                            {formData.otherInvestmentRecord.description && formData.otherInvestmentRecord.proofDocumentLink && (
                                                                <CRow className="align-items-center">
                                                                    <CCol md="12" className="d-flex justify-content-center">
                                                                        <span style={{ color: 'green' }}>✔ Declaration and Proof provided</span>
                                                                    </CCol>
                                                                </CRow>
                                                            )}
                                                        </Form>
                                                    );
                                                }}
                                            </Formik>
                                        </CCardBody>
                                    )}
                                </CCard>




                            </CCardBody>
                        </CCard>


                    </CCard>
                </Form>
            )}
        </Formik>
    );
};

export default Proofs;






