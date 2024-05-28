import { CCard, CCardBody, CCardHeader, CCol, CRow, CButton, CFormSelect } from '@coreui/react';
import { Field, Formik, ErrorMessage, Form } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import CIcon from '@coreui/icons-react';
import { cilChevronDoubleDown, cilChevronDoubleUp } from '@coreui/icons';
import { MdDelete } from 'react-icons/md';
import "../../css/style.css";

const Form12BB = () => {
  const initialValues = {
    EmployeeId: '',
    FinancialYear: '',
    HouseRentRecord: {
      Id: '',
      Amount: '',
      ownerPanCard: '',
      proofdocumentLink: '',
      isVerified: false,
      remarks: ''
    },
    IsNoHouseRentDeclaration: false,
    TravelExpenditureRecord: {
      Id: '',
      Amount: '',
      proofdocumentLink: '',
      isVerified: false,
      remarks: ''
    },
    IsNoTravelDeclaration: false,
    HomeLoanRecord: {
      Id: '',
      lenderName: '',
      lenderAddress: '',
      lenderPanNumber: '',
      Amount: '',
      proofdocumentLink: '',
      isVerfied: false,
      remarks: ''
    },
    IsNoHomeDeclaration: false,
    '80CRecord': [
      {
        Id: '',
        DeductionTypeId: '',
        Amount: '',
        proofdocumentLink: '',
        isVerfied: false,
        remarks: ''
      },
      {
        Id: '',
        DeductionTypeId: '',
        Amount: '',
        proofdocumentLink: '',
        isVerfied: false,
        remarks: ''
      },
      {
        Id: '',
        DeductionTypeId: '',
        Amount: '',
        proofdocumentLink: '',
        isVerfied: false,
        remarks: ''
      }
    ],
    '80DRecordId': {
      Id: '',
      InsuranceAmount: '',
      InsuranceProofLink: '',
      MedicalExpenseAmount: '',
      MedicalExpenseProof: '',
      isVerfied: false,
      remarks: ''
    },
    // '80GRecord': {
    //   Id: '',
    //   nameofdonee: '',
    //   PanNumber: '',
    //   Address: '',
    //   Amount: '',
    //   proofdocumentLink: '',
    //   isVerfied: false,
    //   remarks: ''
    // },
    EightyDRecord: {
      Id: 0,
      InsuranceAmount: 0,
      InsuranceProofLink: null,
      MedicalExpenseAmount: 0,
      MedicalExpenseProof: null,
      isVerfied: false,
      remarks: ''
    },
    EightyGRecord: {
      Id: 0,
      nameofdonee: '',
      PanNumber: '',
      Address: '',
      Amount: 0,
      proofdocumentLink: null,
      isVerified: false,
      remarks: ''
    },
    OtherInvestmentRecord: {
      Id: '',
      description: '',
      proofdocumentLink: '',
      isVerfied: false,
      remarks: ''
    }
  };
  const initialRows = [
    // Initial row
    {
      id: 1,
      amount: '',
      proofSubmitted: false,
      proofFileName: '', // New property to store uploaded file name
    },
  ];

  //collapse checks
  const [isCollapsedOne, setIsCollapsedOne] = useState(true);
  const [isCollapsedTwo, setIsCollapsedTwo] = useState(true);
  const [isCollapsedThree, setIsCollapsedThree] = useState(true);
  const [isCollapsedFour, setIsCollapsedFour] = useState(true);
  const [isCollapsedFive, setIsCollapsedFive] = useState(true);
  const [isCollapsedSix, setIsCollapsedSix] = useState(true);
  const [isCollapsedSeven, setIsCollapsedSeven] = useState(true);
  //checkboxes checks
  const [isRentChecked, setIsRentChecked] = useState(false);
  const [isLeaveChecked, setIsLeaveChecked] = useState(false);
  const [isInterestPaybleChecked, setIsInterestPaybleChecked] = useState(false);
  const [is80CChecked, setIs80CChecked] = useState(false);
  const [is80DChecked, setIs80DChecked] = useState(false);
  const [is80GChecked, setIs80GChecked] = useState(false);
  const [isOtherChecked, setIsOtherChecked] = useState(false);
  const [isRightChecked, setIsRightChecked] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [rows, setRows] = useState(initialRows);

  const navigate = useNavigate();
  //dynamic row for 80 C column


  const addRow = () => {
    const newRow = {
      id: rows.length + 1,
      amount: '',
      proofSubmitted: false,
      proofFileName: '',
    };
    setRows([...rows, newRow]);
  };

  // checkboxes checks
  //First
  const toggleRentCheckbox = () => {
    setIsRentChecked(!isRentChecked);
  };
  //second
  const toggleLeaveCheckbox = () => {
    setIsLeaveChecked(!isLeaveChecked);
  };

  const toggleRightCheckbox = () => {
    setIsRightChecked(!isRightChecked);
  };

  //third


  const toggleInterestPaybleChecked = () => {
    setIsInterestPaybleChecked(!isInterestPaybleChecked);
  };
  const toggle80CChecked = () => {
    setIs80CChecked(!is80CChecked);
  };

  const toggle80DChecked = () => {
    setIs80DChecked(!is80DChecked);
  };
  const toggle80GChecked = () => {
    setIs80GChecked(!is80GChecked);
  };
  const toggleOtherChecked = () => {
    setIsOtherChecked(!isOtherChecked);
  };


  const handleOptionChange = (event: any) => {
    setSelectedOption(event.target.value);
  };

  // collapse checks
  const toggleCollapseOne = () => {
    setIsCollapsedOne(!isCollapsedOne);
  };
  const toggleCollapseTwo = () => {
    setIsCollapsedTwo(!isCollapsedTwo);
  };
  const toggleCollapseThree = () => {
    setIsCollapsedThree(!isCollapsedThree);
  };
  const toggleCollapseFour = () => {
    setIsCollapsedFour(!isCollapsedFour);
  };
  const toggleCollapseFive = () => {
    setIsCollapsedFive(!isCollapsedFive);
  };
  const toggleCollapseSix = () => {
    setIsCollapsedSix(!isCollapsedSix);
  };
  const toggleCollapseSeven = () => {
    setIsCollapsedSeven(!isCollapsedSeven);
  };

  const validationSchema = Yup.object().shape({
    EmployeeId: Yup.string().required('Employee ID is required'),
    FinancialYear: Yup.string().required('Financial Year is required'),
    HouseRentRecord: Yup.object().shape({
      Amount: Yup.number().required('Amount is required'),
      ownerPanCard: Yup.string().required('Owner PAN Card is required'),
    }),
    TravelExpenditureRecord: Yup.object().shape({
      Amount: Yup.number()
        .required('Amount is required')
        .positive('Amount must be positive')
        .integer('Amount must be an integer'),
    }),
    HomeLoanRecord: Yup.object().shape({
      Amount: Yup.string().required('Interest amount is required'),
      lenderName: Yup.string().required('Lender name is required'),
      lenderAddress: Yup.string().required('Lender address is required'),
      lenderPanNumber: Yup.string().required('PAN number is required'),
    }),
    // EightyDRecord: Yup.object().shape({
    //   InsuranceAmount: Yup.number()
    //     .typeError('Amount must be a number')
    //     .required('Insurance amount is required'),
    //   MedicalExpenseAmount: Yup.number()
    //     .typeError('Amount must be a number')
    //     .when('parentAge', {
    //       is: (value) => value === 'lessThan60' || value === 'greaterThan60',
    //       then: Yup.number().required('Medical expense amount is required')
    //     }),
    // }),
    EightyGRecord: Yup.object().shape({
      nameofdonee: Yup.string().required('Name of the Done is required'),
      PanNumber: Yup.string()
        .matches(/^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/, 'Invalid PAN Number')
        .required('PAN Details is required'),
      Address: Yup.string().required('Address is required'),
      Amount: Yup.number()
        .typeError('Amount must be a number')
        .positive('Amount must be a positive number')
        .required('Amount is required'),

    }),
    OtherInvestmentRecord: Yup.object().shape({
      description: Yup.string().required('Description is required'),
    }),
  });




  const handleSubmit = (values, { setSubmitting }) => {
    console.log(values);
    setSubmitting(false);
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ touched, errors }) => (
          <Form>
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
                      value="Back To users"
                      onClick={() => navigate("/users")}
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
              {/* house rent declaration */}
              <CCard className="mt-3">
                <CCardHeader>
                  <CRow className="align-items-center">
                    <CCol md="4 mb-2 mt-2" className="d-flex align-items-center">
                      <CIcon
                        icon={isCollapsedOne ? cilChevronDoubleDown : cilChevronDoubleUp}
                        className="ml-2"
                        size="lg"
                        onClick={toggleCollapseOne}
                        style={{ cursor: 'pointer' }}
                      />
                      <h5 className="m-0">House Rent Declaration</h5>
                    </CCol>
                    <CCol md="4" className="d-flex align-items-center">
                      <Field type="checkbox" checked={isRentChecked}
                        onChange={toggleRentCheckbox} id="rent" className="custom-checkbox checkbox-spacing" />
                      <label htmlFor="houseRentNoInvestments" className="ml-2 mb-0" style={{ marginBottom: '10px' }}>No Investments</label>
                    </CCol>
                    <CCol md="4" className="d-flex justify-content-end align-items-center">
                      <Field type="checkbox"
                        id="rightCheck"
                        className="custom-checkbox"
                        checked={isRightChecked}
                        onChange={toggleRightCheckbox} />
                    </CCol>
                  </CRow>
                </CCardHeader>
                {!isCollapsedOne && (
                  <CCardBody>
                    <CRow className="align-items-center">
                      <CCol md="5" className="mb-3">
                        <label htmlFor="amount" style={{ marginBottom: '10px' }}>Enter annual house rent:</label>
                        <Field
                          type="text"
                          id="amount"
                          name="HouseRentRecord.Amount"
                          className={`form-control${touched.HouseRentRecord?.Amount && errors.HouseRentRecord?.Amount ? ' is-invalid' : ''}${isRentChecked ? ' no-border' : ''}`}
                          placeholder="Amount of House Rent in a year"
                          disabled={isRentChecked}
                        />
                        {!isRentChecked && (
                          <ErrorMessage name="HouseRentRecord.Amount" component="div" className="invalid-feedback" />
                        )}
                      </CCol>
                      <CCol md="4" className="d-flex justify-content-center">
                        <CButton color="primary" type="submit">Save</CButton>
                      </CCol>
                    </CRow>
                    {!isRentChecked && (
                      <>
                        <hr />
                        <CRow className="align-items-center">
                          <CCol md="3" style={{ marginTop: '20px' }}>
                            <p>This section will be made visible in Feb to submit the final proofs</p>
                          </CCol>
                          <CCol md="3" style={{ marginTop: '40px' }}>
                            <Field
                              type="file"
                              className="custom-file-input"
                              name="HouseRentRecord.proofdocumentLink"
                              id="rentSlips"
                              style={{ display: 'none' }}
                            />
                            <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px', marginBottom: '10px' }}>
                              <label
                                className="custom-file-label"
                                htmlFor="rentSlips"
                                style={{ cursor: 'pointer' }}
                              >
                                Upload Rent slips in a zip file
                              </label>
                            </div>
                          </CCol>
                          <CCol md="3">
                            <label htmlFor="ownerPan" style={{ marginBottom: '10px' }}>Owner PAN Number</label>
                            <Field
                              type="text"
                              id="ownerPan"
                              name="HouseRentRecord.ownerPanCard"
                              className={`form-control${touched.HouseRentRecord?.ownerPanCard && errors.HouseRentRecord?.ownerPanCard ? ' is-invalid' : ''}`}
                              // className={`form-control${touched.HouseRentRecord?.Amount && errors.HouseRentRecord?.Amount ? ' is-invalid' : ''}${isRentChecked ? ' no-border' : ''}`}
                              placeholder="Owner PAN Number"
                            />
                            <ErrorMessage name="HouseRentRecord.ownerPanCard" component="div" className="invalid-feedback" />
                          </CCol>
                          <CCol md="3" className="d-flex justify-content-end">
                            <CButton color="primary" type="submit">Save</CButton>
                          </CCol>
                        </CRow>
                      </>
                    )}
                  </CCardBody>
                )}
              </CCard>
              {/* Leave check expenditure */}
              <CCard className="mt-3">
                <CCardHeader>
                  <CRow className="align-items-center">
                    <CCol md="4" className="d-flex align-items-center mb-2 mt-2">
                      <CIcon
                        icon={isCollapsedTwo ? cilChevronDoubleDown : cilChevronDoubleUp}
                        className="ml-2"
                        size="lg"
                        onClick={toggleCollapseTwo}
                        style={{ cursor: 'pointer' }}
                      />
                      <h5 className="m-0">Leave travel expenditure details</h5>
                    </CCol>
                    <CCol md="4" className="d-flex align-items-center">
                      <Field type="checkbox" checked={isLeaveChecked}
                        onChange={toggleLeaveCheckbox} id="rent" className="custom-checkbox checkbox-spacing" />
                      <label htmlFor="houseRentNoInvestments" className="ml-2 mb-0" style={{ marginBottom: '10px' }}>No Investments</label>
                    </CCol>
                  </CRow>
                </CCardHeader>
                {!isCollapsedTwo && (
                  <CCardBody>
                    <CRow className="align-items-center">
                      <CCol md="5" className="mb-3">
                        <label htmlFor="amount" style={{ marginBottom: '10px' }}>
                          Enter Amount of any travel to claim in a year:
                        </label>
                        <Field
                          type="text"
                          id="amount"
                          name="TravelExpenditureRecord.Amount"
                          className={`form-control${touched.TravelExpenditureRecord?.Amount && errors.TravelExpenditureRecord?.Amount ? ' is-invalid' : ''}${isLeaveChecked ? ' no-border' : ''}`}
                          disabled={isLeaveChecked}
                          placeholder="Amount of any travel to claim in an year"
                        />
                        {!isLeaveChecked && (
                          <ErrorMessage name="TravelExpenditureRecord.Amount" component="div" className="invalid-feedback" />
                        )}
                      </CCol>
                      <CCol md="4" className="d-flex justify-content-center">
                        <CButton type="submit" color="primary">
                          Save
                        </CButton>
                      </CCol>
                    </CRow>
                    {!isLeaveChecked && (
                      <>
                        <hr />
                        <CRow className="align-items-center">
                          <CCol md="4" style={{ marginTop: '20px' }}>
                            <p>This section will be made visible in Feb to submit the final proofs</p>
                          </CCol>
                          <CCol md="4" style={{ marginTop: '40px' }}>
                            <Field
                              type="file"
                              className="custom-file-input"
                              id="proofDocumentLink"
                              name="TravelExpenditureRecord.proofdocumentLink"
                              style={{ display: 'none' }}
                            />
                            <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px', marginBottom: '10px' }}>
                              <label
                                className="custom-file-label"
                                htmlFor="proofDocumentLink"
                                style={{ cursor: 'pointer' }}
                              >
                                Upload final proof in a zip
                              </label>
                              <ErrorMessage
                                name="TravelExpenditureRecord.proofdocumentLink"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                          </CCol>
                          <CCol md="4" className="d-flex justify-content-end">
                            <CButton type="submit" color="primary">
                              Save
                            </CButton>
                          </CCol>
                        </CRow>
                      </>
                    )}
                  </CCardBody>
                )}
              </CCard>
              {/* interest  payable on home  loan */}
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
                      <h5>Interest Payable on Home Loan</h5>
                    </CCol>
                    <CCol md="4" className="d-flex align-items-center">
                      <Field
                        type="checkbox"
                        checked={isInterestPaybleChecked}
                        onChange={toggleInterestPaybleChecked}
                        id="interestPayable"
                        className="custom-checkbox checkbox-spacing"
                      />
                      <label htmlFor="interestPayable" className="ml-2 mb-0">No Investments</label>
                    </CCol>
                  </CRow>
                </CCardHeader>
                {!isCollapsedThree && (
                  <CCardBody>
                    <CRow className="align-items-center">
                      <CCol md="5" className="mb-3">
                        <label htmlFor="amount" style={{ marginBottom: '10px' }}>Interest Amount on home loan in an year:</label>
                        <Field
                          type="text"
                          id="amount"
                          name="HomeLoanRecord.Amount"
                          className={`form-control${touched.HomeLoanRecord?.Amount && errors.HomeLoanRecord?.Amount ? ' is-invalid' : ''}${isInterestPaybleChecked ? ' no-border' : ''}`}
                          placeholder="Interest Amount on home loan in an year"
                          disabled={isInterestPaybleChecked}
                        />
                        {!isInterestPaybleChecked && (
                          <ErrorMessage name="HomeLoanRecord.Amount" component="div" className="invalid-feedback" />
                        )}
                      </CCol>
                      <CCol md="2" className="mb-3">
                        <label htmlFor="lenderName" style={{ marginBottom: '10px' }}>Name of Lender</label>
                        <Field
                          type="text"
                          id="lenderName"
                          name="HomeLoanRecord.lenderName"
                          className={`form-control${touched.HomeLoanRecord?.lenderName && errors.HomeLoanRecord?.lenderName ? ' is-invalid' : ''}${isInterestPaybleChecked ? ' no-border' : ''}`}
                          placeholder="Name of Lender"
                          disabled={isInterestPaybleChecked}
                        />
                        {!isInterestPaybleChecked && (
                          <ErrorMessage name="HomeLoanRecord.lenderName" component="div" className="text-danger" />
                        )}
                      </CCol>
                      <CCol md="2" className="mb-3">
                        <label htmlFor="lenderAddress" style={{ marginBottom: '10px' }}>Address of Lender</label>
                        <Field
                          type="text"
                          id="lenderAddress"
                          name="HomeLoanRecord.lenderAddress"
                          className={`form-control${touched.HomeLoanRecord?.lenderAddress && errors.HomeLoanRecord?.lenderAddress ? ' is-invalid' : ''}${isInterestPaybleChecked ? ' no-border' : ''}`}
                          placeholder="Address of Lender"
                          disabled={isInterestPaybleChecked}
                        />
                        {!isInterestPaybleChecked && (
                          <ErrorMessage name="HomeLoanRecord.lenderAddress" component="div" className="text-danger" />
                        )}
                      </CCol>
                      <CCol md="3" className="mb-3">
                        <label htmlFor="lenderPan" style={{ marginBottom: '10px' }}>PAN Number of Lender</label>
                        <Field
                          type="text"
                          id="lenderPan"
                          name="HomeLoanRecord.lenderPanNumber"
                          className={`form-control${touched.HomeLoanRecord?.lenderPanNumber && errors.HomeLoanRecord?.lenderPanNumber ? ' is-invalid' : ''}${isInterestPaybleChecked ? ' no-border' : ''}`}
                          placeholder="PAN No. of Lender"
                          disabled={isInterestPaybleChecked}
                        />
                        {!isInterestPaybleChecked && (
                          <ErrorMessage name="HomeLoanRecord.lenderPanNumber" component="div" className="text-danger" />
                        )}
                      </CCol>
                      <CCol md="8" className="d-flex justify-content-end">
                        <CButton type="submit" color="primary">Save</CButton>
                      </CCol>
                    </CRow>
                    {!isInterestPaybleChecked && (
                      <>
                        <hr />
                        <CRow className="align-items-center">
                          <CCol md="4" className="mb-2">
                            <p>This section will be made visible in Feb to submit the final proofs</p>
                          </CCol>
                          <CCol md="4" style={{ marginTop: '10px' }}>
                            <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
                              <label htmlFor="rentSlips" style={{ cursor: 'pointer' }}>
                                Upload Rent slips in a zip file
                              </label>
                              <input
                                type="file"
                                className="custom-file-input"
                                id="rentSlips"
                                style={{ display: 'none' }}
                              />
                              <ErrorMessage name="rentSlips" component="div" className="text-danger" />
                            </div>
                          </CCol>
                          <CCol md="4" className="d-flex justify-content-end">
                            <CButton type="submit" color="primary">Save</CButton>
                          </CCol>
                        </CRow>
                      </>
                    )}
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
                            <Field
                              type="text"
                              id="insuranceAmount"
                              name="EightyDRecord.InsuranceAmount"
                              className={`form-control${touched.EightyDRecord?.InsuranceAmount && errors.EightyDRecord?.InsuranceAmount ? ' is-invalid' : ''}`}
                              placeholder="Amount"
                            />
                            <ErrorMessage name="EightyDRecord.InsuranceAmount" component="div" className="invalid-feedback" />
                          </CCol>
                          <CCol md="2" className="mb-3">
                            <div>
                              <Field
                                type="file"
                                name="insuranceProof"
                                className="custom-file-input"
                                id="insuranceProof"
                                style={{ display: 'none' }}
                              />
                              <label
                                className="custom-file-label"
                                htmlFor="insuranceProof"
                                style={{ cursor: 'pointer' }}
                              >
                                <u>Upload Proof</u>
                              </label>
                            </div>
                          </CCol>
                        </CRow>
                        <CRow className="align-items-center">
                          <CCol md="4" className="mb-3 text-center">
                            <p>Medical Expenses if parents are</p>
                            <Field
                              type="radio"
                              id="lessThan60"
                              name="parentAge"
                              value="lessThan60"
                              checked={selectedOption === 'lessThan60'}
                              onChange={handleOptionChange}
                              className="mr-2"
                            />
                            <label htmlFor="lessThan60" className="mr-3">Less than 60</label>
                            <Field
                              type="radio"
                              id="greaterThan60"
                              name="parentAge"
                              value="greaterThan60"
                              checked={selectedOption === 'greaterThan60'}
                              onChange={handleOptionChange}
                              className="mr-2"
                            />
                            <label htmlFor="greaterThan60">Greater than 60</label>
                          </CCol>
                        </CRow>
                        {selectedOption && (
                          <>
                            <CRow className="align-items-center">
                              <CCol md="4" className="mb-3 text-center">
                                <p>
                                  Medical Expenses if parents are {selectedOption === 'lessThan60' ? 'Less than 60 (Maximum Exemption Rs.25,000)' : 'Greater than 60 (Maximum Exemption Rs.50,000)'}
                                </p>
                              </CCol>
                              <CCol md="2" className="mb-3">
                                <label htmlFor="MedicalExpenseAmount" className="mb-10">Amount:</label>
                                <Field
                                  type="text"
                                  id="MedicalExpenseAmount"
                                  name="EightyDRecord.MedicalExpenseAmount"
                                  className={`form-control${touched.EightyDRecord?.MedicalExpenseAmount && errors.EightyDRecord?.MedicalExpenseAmount ? ' is-invalid' : ''}`}
                                  placeholder="Amount"
                                />
                                <ErrorMessage name="EightyDRecord.MedicalExpenseAmount" component="div" className="invalid-feedback" />
                              </CCol>
                              <CCol md="2" className="mb-3">
                                <div>
                                  <Field
                                    type="file"
                                    name="MedicalExpenseProof"
                                    className="custom-file-input"
                                    id="medicalProof"
                                    style={{ display: 'none' }}
                                  />
                                  <label
                                    className="custom-file-label"
                                    htmlFor="medicalProof"
                                    style={{ cursor: 'pointer' }}
                                  >
                                    <u>Upload Proof</u>
                                  </label>
                                </div>
                              </CCol>
                            </CRow>
                          </>
                        )}
                      </CCardBody>
                    )}
                  </CCard>


                  {/* 80 G */}
                  <CCard className="mt-3">
                    <CCardHeader>
                      <CRow className="align-items-center">
                        <CCol md="4 mb-2 mt-2" className="d-flex align-items-center"  >
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
                          <Field type="checkbox"
                            id="80GDonations"
                            checked={is80GChecked}
                            onChange={toggle80GChecked}
                            className="custom-checkbox checkbox-spacing" />
                          <label htmlFor="80GDonations" className="ml-2 mb-0">No Investments</label>
                        </CCol>
                      </CRow>
                    </CCardHeader>
                    {!isCollapsedSix && !is80GChecked && (
                      <CCardBody>
                        <CRow className="align-items-center">
                          <CCol md="4" className="mb-3">
                            <label htmlFor="nameofdonee" style={{ marginBottom: '10px' }}>Name of the Done:</label>
                            <Field
                              type="text"
                              id="nameofdonee"
                              name="EightyGRecord.nameofdonee"
                              className={`form-control${touched.EightyGRecord?.nameofdonee && errors.EightyGRecord?.nameofdonee ? ' is-invalid' : ''}`}
                              placeholder="Name of the Done"
                            />
                            <ErrorMessage name="EightyGRecord.nameofdonee" component="div" className="invalid-feedback" />
                          </CCol>
                          <CCol md="2" className="mb-3">
                            <label htmlFor="panNumber" style={{ marginBottom: '10px' }}>PAN Details:</label>
                            <Field
                              type="text"
                              id="panNumber"
                              name="EightyGRecord.PanNumber"
                              className={`form-control${touched.EightyGRecord?.PanNumber && errors.EightyGRecord?.PanNumber ? ' is-invalid' : ''}`}
                              placeholder="PAN Details"
                            />
                            <ErrorMessage name="EightyGRecord.PanNumber" component="div" className="invalid-feedback" />
                          </CCol>
                          <CCol md="2" className="mb-3">
                            <label htmlFor="address" style={{ marginBottom: '10px' }}>Address:</label>
                            <Field
                              type="text"
                              id="address"
                              name="EightyGRecord.Address"
                              className={`form-control${touched.EightyGRecord?.Address && errors.EightyGRecord?.Address ? ' is-invalid' : ''}`}
                              placeholder="Address"
                            />
                            <ErrorMessage name="EightyGRecord.Address" component="div" className="invalid-feedback" />
                          </CCol>
                          <CCol md="2" className="mb-3">
                            <label htmlFor="amount" style={{ marginBottom: '10px' }}>Amount:</label>
                            <Field
                              type="text"
                              id="amount"
                              name="EightyGRecord.Amount"
                              className={`form-control${touched.EightyGRecord?.Amount && errors.EightyGRecord?.Amount ? ' is-invalid' : ''}`}
                              placeholder="Amount"
                            />
                            <ErrorMessage name="EightyGRecord.Amount" component="div" className="invalid-feedback" />
                          </CCol>
                          <CCol md="2" className="mb-3">
                            <div>
                              <Field
                                type="file"
                                className="custom-file-input"
                                id="proofdocumentLink"
                                name="EightyGRecord.proofdocumentLink"
                                style={{ display: 'none' }}
                              />
                              <label
                                className="custom-file-label"
                                htmlFor="proofdocumentLink"
                                style={{ cursor: 'pointer' }}
                              >
                                <u>Upload Proof</u>
                              </label>
                            </div>
                          </CCol>
                        </CRow>

                      </CCardBody>
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
                      </CRow>
                    </CCardHeader>
                    {!isCollapsedSeven && !isOtherChecked && (
                      <CCardBody>
                        <CRow className="align-items-center">
                          <CCol md="6" className="mb-3">
                            <label htmlFor="description" style={{ marginBottom: '10px' }}>
                              Type Description of investment type:
                            </label>
                            <Field
                              type="text"
                              id="description"
                              name="OtherInvestmentRecord.description"
                              className={`form-control${touched.OtherInvestmentRecord?.description && errors.OtherInvestmentRecord?.description ? ' is-invalid' : ''}`}
                              placeholder="Type Description of investment type"
                            />
                            <ErrorMessage name="OtherInvestmentRecord.description" component="div" className="text-danger" />
                          </CCol>
                          <CCol md="6" className="mb-3">
                            <div>
                              <Field
                                type="file"
                                name="rentSlips"
                                className="custom-file-input"
                                id="rentSlips"
                                style={{ display: 'none' }}
                              />
                              <label
                                className="custom-file-label"
                                htmlFor="rentSlips"
                                style={{ cursor: 'pointer' }}
                              >
                                <u>Upload Proof</u>
                              </label>
                            </div>
                          </CCol>
                        </CRow>
                      </CCardBody>
                    )}
                  </CCard>


                </CCardBody>
                <CRow className="mt-3 mb-2">
                  <CCol className="d-flex justify-content-end">
                    <CButton type="submit" style={{ marginRight: '20px' }} color="primary">Submit</CButton>
                  </CCol>
                </CRow>
              </CCard>

            </CCard>

          </Form>
        )}

      </Formik>
    </>

  );
};

export default Form12BB;



