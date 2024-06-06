import { CCard, CCardBody, CCardHeader, CCol, CRow, CButton, CFormSelect } from '@coreui/react';
import { Field, Formik, ErrorMessage, Form } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import CIcon from '@coreui/icons-react';
import { cilChevronDoubleDown, cilChevronDoubleUp } from '@coreui/icons';
import "../../css/style.css";
import { GetEightyD, GetEightyG, GetEmployee12BB, GetHouseRent, GetInterestPayableOnHomeLoan, GetLeaveTravelExpenditure, GetOtherInvestment, SaveEightyD, SaveHouseRent, SaveInterestPayableOnHomeLoan, SaveLeaveTravelExpenditure, SaveOtherInvestment, } from '../../redux-saga/modules/userManagement/apiService';
import { EmployeeFinancialRecord, initialEmployeeRecord } from '../../models/Form12BB/Form12BB';
import { MdDelete } from 'react-icons/md';

// Separate validation schemas for each section
const houseRentAmountValidationSchema = Yup.object().shape({
  houseRentRecord: Yup.object().shape({
    amount: Yup.number().required('Amount is required'),
  }),
});

const houseRentProofValidationSchema = Yup.object().shape({
  houseRentRecord: Yup.object().shape({
    ownerPanCard: Yup.string().required('PAN is required'),
    proofdocumentLink: Yup.mixed().required('Proof document is required'),
  }),
});
const leaveTravelValidationSchema = Yup.object().shape({
  travelExpenditureRecord: Yup.object().shape({
    amount: Yup.number().required('Amount is required'),
    proofdocumentLink: Yup.mixed().required('Proof document is required'),
  }),
});
// Define the validation schema for Interest Payable on Home Loan
const interestHomeLoanValidationSchema = Yup.object().shape({
  homeLoanRecord: Yup.object().shape({
    amount: Yup.number().required('Interest amount is required'),
    lenderName: Yup.string().required('Name of lender is required'),
    lenderAddress: Yup.string().required('Address of lender is required'),
    lenderPanNumber: Yup.string().required('PAN number of lender is required'),
  }),
});

// 80-C
const eightyCValidationSchema = Yup.object().shape({
  rows: Yup.array().of(
    Yup.object().shape({
      selectOption: Yup.string()
        .required('Select Medical Expenses is required')
        .oneOf(['0', '25000', '50000'], 'Invalid option selected'),
      amount: Yup.number()
        .typeError('Amount must be a number')
        .required('Amount is required')
        .positive('Amount must be a positive number'),
      proofSubmitted: Yup.boolean(),
      file: Yup.mixed().when('proofSubmitted', {
        is: true,
        then: Yup.mixed().required('Proof document is required when proof is submitted'),
        otherwise: Yup.mixed().notRequired()
      })
    })
  ),
  noInvestments: Yup.boolean(),
  houseRentProofSubmitted: Yup.boolean()
});
//80-D
const eightyDValidationSchema = Yup.object().shape({
  eightyDRecord: Yup.object().shape({
    insuranceAmount: Yup.number().required('Amount is required'),
    medicalExpenseAmount: Yup.number().required('Amount is required'),
    insuranceProof: Yup.mixed().required('Insurance proof document is required'),
    MedicalExpenseProof: Yup.mixed().required('Medicalproof document is required'),

  }),
});
//80-G
const eightyGValidationSchema = Yup.object().shape({
  eightyGRecord: Yup.object().shape({
    nameofdonee: Yup.string().required('Name of the Donee is required'),
    panNumber: Yup.string().required('PAN Details are required').matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'PAN Details must be in the correct format'),
    address: Yup.string().required('Address is required'),
    amount: Yup.number().required('Interest amount is required'),
    proofdocumentLink: Yup.mixed().required('Proof document is required'),
  }),
});
// Define the validation schema for Other Investment Proofs
const otherInvestmentValidationSchema = Yup.object().shape({
  otherInvestmentRecord: Yup.object().shape({
    description: Yup.string().required('Description is required'),
  }),
});


const Form12BB = () => {
  const [employee12BBData, setEmployee12BBData] = useState<EmployeeFinancialRecord>();
  const [formData, setFormData] = useState<EmployeeFinancialRecord>(new initialEmployeeRecord());
  // Collapse checks
  const [isCollapsedOne, setIsCollapsedOne] = useState(true);
  const [isCollapsedTwo, setIsCollapsedTwo] = useState(true);
  const [isCollapsedThree, setIsCollapsedThree] = useState(false);
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
  const [submissionType, setSubmissionType] = useState('declaration');
  const { employeeId } = useParams<{ employeeId: string }>();
  const [rows, setRows] = useState([{id: 1,amount: '',proofSubmitted: false}]);
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



  useEffect(() => {
    if (employeeId !== undefined) {
      employee12BB(employeeId, '2024-2025');
    }
  }, [employeeId]);

  const employee12BB = async (id: string, financialYear: string) => {
    try {
      const response = await GetEmployee12BB(id, financialYear);
      if (response != null) {
        setEmployee12BBData(response.data);
        if (response.data?.houseRentRecordId) {
          HouseRent(response.data.houseRentRecordId);
        }
        if (response.data?.travelExpenditureRecordId) {
          LeaveTravel(response.data.travelExpenditureRecordId);
        }
        if (response.data?.homeLoanRecordId) {
          interestHomeLoan(response.data.homeLoanRecordId);

        }
        // if(response)

        if (response.data.eightyDRecordId) {
          getEightyD(response.data.eightyDRecordId)
        }
        if (response.data?.eightyGRecordId) {
          getEightyG(response.data.eightyGRecordId);
        }
        if (response.data?.otherInvestmentRecordId)
          otherInvestment(response.data.otherInvestmentRecordId);

      }
    } catch (error) {
      console.error('Error fetching employee 12BB data:', error);
    }
  };

  useEffect(() => {
    if (employee12BBData && employee12BBData.houseRentRecord) {
      setFormData({
        ...formData,
        houseRentRecord: {
          ...formData.houseRentRecord,
          amount: employee12BBData.houseRentRecord.amount,
          ownerPanCard: employee12BBData.houseRentRecord.ownerPanCard,
          proofdocumentLink: employee12BBData.houseRentRecord.proofdocumentLink,
        }
      });
    }
    if (employee12BBData && employee12BBData.travelExpenditureRecord) {
      setFormData({
        ...formData,
        travelExpenditureRecord: {
          ...formData.travelExpenditureRecord,
          amount: employee12BBData.travelExpenditureRecord.amount,
          proofdocumentLink: employee12BBData.travelExpenditureRecord.proofdocumentLink,
        }
      });
    }
  }, [employee12BBData]);

  // Update handleFormChange to handle all parameters
  const handleFormChange = (e: any, fieldName: string, section: string) => {
    const value = e.target.type === 'file' ? e.target.files[0] : e.target.value;
    setFormData(prevData => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [fieldName]: value,
      }
    }));
  };


  //get house rent 
  const HouseRent = async (id: number) => {
    try {
      const response = await GetHouseRent(id);
      if (response?.data != null) {
        const { amount, ownerPanCard, proofdocumentLink } = response.data;
        setFormData(prevState => ({
          ...prevState,
          houseRentRecord: {
            ...prevState.houseRentRecord,
            amount,
            ownerPanCard,
            proofdocumentLink,
          }
        }));
      }
    } catch (error) {
      console.error('Error fetching House Rent:', error);
    }
  };
  //save house rent 

  const handleSaveHouseRent = async (formData:any) => {
    try {
      debugger;
      // Validate specific field
      //  await validateForm('houseRentRecord.amount'); 
      if (!formData.houseRentRecord.amount) return;
    

      const response = await SaveHouseRent(formData.houseRentRecord);
      if (response.status === 200) {
        console.log('House rent data saved:', response.data);
      } else {
        console.log('Unable to save', response.status);
      }
    } catch (error) {
      console.error('Error saving house rent data:', error);
    }
  };

  const handleSaveOwnerPanRentSlips = async (validateField: any) => {
    try {
      // Validate specific fields
      await Promise.all([
        validateField('houseRentRecord.ownerPanCard'),
        validateField('houseRentRecord.proofdocumentLink'),
      ]);
      if (!formData.houseRentRecord.ownerPanCard || !formData.houseRentRecord.proofdocumentLink) return;

      const response = await SaveHouseRent(formData.houseRentRecord);
      if (response.status === 200) {
        console.log('House rent data saved:', response.data);
      } else {
        console.log('Unable to save', response.status);
      }
    } catch (error) {
      console.error('Error saving house rent data:', error);
    }
  };

  // get leave travel
  const LeaveTravel = async (id: number) => {
    try {
      const response = await GetLeaveTravelExpenditure(id);
      if (response?.data != null) {
        const { amount, proofdocumentLink } = response.data;
        setFormData(prevState => ({
          ...prevState,
          travelExpenditureRecord: {
            ...prevState.travelExpenditureRecord,
            amount,
            proofdocumentLink,
          }
        }));
      }
    } catch (error) {
      console.error('Error fetching Leave Travel:', error);
    }
  };
  //save leave travel
  const handleSaveLeaveTravel = async (validateForm: any) => {
    try {
      await validateForm();
      if (!formData.travelExpenditureRecord.amount || !formData.travelExpenditureRecord.proofdocumentLink) return;

      const response = await SaveLeaveTravelExpenditure(formData.travelExpenditureRecord);
      if (response.status === 200) {
        console.log('Leave travel data saved:', response.data);
      } else {
        console.log('Unable to save', response.status);
      }
    } catch (error) {
      console.error('Error saving leave travel data:', error);
    }
  };


  // get homeloan 
  const interestHomeLoan = async (id: number) => {
    try {
      const response = await GetInterestPayableOnHomeLoan(id);
      console.log('API Response:', response); 
      if (response && response.data) {
        console.log('Data:', response.data); 
        setFormData((prevState) => ({
          ...prevState,
          homeLoanRecord: {
            amount: response.data.amount || 0,
            lenderName: response.data.lenderName || '',
            lenderAddress: response.data.lenderAddress || '',
            lenderPanNumber: response.data.lenderPanNumber || ''
          },
        }));
      }
    } catch (error) {
      console.error('Error fetching interest payable on home loan:', error);
    }
  };
  
  //save 
  const handleSaveHomeLoan = async (validateForm: any) => {
    try {
      debugger;
      await validateForm();
  
      if (
        !formData.homeLoanRecord.amount ||
        !formData.homeLoanRecord.lenderName ||
        !formData.homeLoanRecord.lenderAddress ||
        !formData.homeLoanRecord.lenderPanNumber
      ) {
        // If any required field is empty, return without saving
        return;
      }
  
      const response = await SaveInterestPayableOnHomeLoan(formData.homeLoanRecord);
  
      if (response.status === 200) {
        console.log('Home loan saved successfully:', response.data);
      } else {
        console.log('Unable to save home loan:', response.status);
      }
    } catch (error) {
      console.error('Error saving home loan:', error);
    }
  };

  // get 80 D

  const getEightyD = async (id: number) => {
    try {
      const response = await GetEightyD(id);
      if (response.data) {
        setFormData((prevState) => ({
          ...prevState,
          eightyDRecord: {
            insuranceAmount: response.data.insuranceAmount || '',
            medicalExpenseAmount: response.data.medicalExpenseAmount || '',

          },
        }));
      }
    } catch (error) {
      console.error('Error fetching Eighty D data:', error);
    }
  };


  // save 80 D
  const handleSaveEightyDRecord = async (validateForm: any) => {
    try {
      await validateForm();
      if (!formData.eightyDRecord.insuranceAmount ||
        !formData.eightyDRecord.medicalExpenseAmount) {
        return;
      }
      const response = await SaveEightyD(formData.eightyDRecord);
      if (response.status === 200) {
        console.log('Saved Eighty D Record:', response);
        // You can add further logic here if needed, like updating state or showing a success message
      } else {
        console.error('Error saving Eighty D record:', response.error);
        // Handle error scenarios, e.g., show error message to the user
      }
    } catch (error) {
      console.error('Error saving Eighty D record:', error);
    }
  };

  //get80 G

  const getEightyG = async (id: number) => {
    try {
      const response = await GetEightyG(id);
      if (response?.data) {
        setFormData((prevState) => ({
          ...prevState,
          eightyGRecord: {
            nameofdonee: response.data.nameofdonee || '',
            panNumber: response.data.panNumber || '',
            address: response.data.address || '',
            amount: response.data.amount || 0,
            proofdocumentLink: response.data.proofdocumentLink || ''
          },
        }));
      }
    } catch (error) {
      console.error('Error fetching EightyG data:', error);

    }
  };



  //otherInvestment
  //get 

  const otherInvestment = async (id: number) => {
    try {
      const response = await GetOtherInvestment(id);
      if (response?.data) {
        setFormData(prevState => ({
          ...prevState,
          otherInvestmentRecord: {
            ...prevState.otherInvestmentRecord,
            description: response.data.description || '',
            amount: response.data.amount || 0,
          },
        }));
      }
    } catch (error) {
      console.error('Error fetching other investment:', error);
    }
  };

  //save 
  const handleSaveOtherInvestment = async (validateForm:any) => {
    try {
      await validateForm();
      if (!formData.otherInvestmentRecord.description || !formData.otherInvestmentRecord.proofdocumentLink) {
        return
      }
      const response = await SaveOtherInvestment(formData.otherInvestmentRecord);
      if (response.status === 200) {
        console.log('Home loan saved successfully:', response.data);
      } else {
        console.log('Unable to save home loan:', response.status);
      }
    } catch (error) {
      console.error('Error saving home loan:', error);
    }


  };
  const handleOptionChange = (event: any) => {
    setSelectedOption(event.target.value);
  };



  const addRow = () => {
    const newRow = {
      id: rows.length + 1,
      amount: '',
      proofSubmitted: false
    };
    setRows([...rows, newRow]);
  };



  const handleFinalSubmit = (values, actions) => {
    if (submissionType === 'declaration') {
      // Handle submission for declaration
      console.log('Submitting declaration:', values);
      // Perform declaration submission logic
    } else if (submissionType === 'proof') {
      // Handle submission for proof
      console.log('Submitting proof:', values);
      // Perform proof submission logic
    }

    // Reset form fields and any other necessary actions
    actions.resetForm();
  };

  // Function to handle switching between submission types
  const handleSwitchSubmissionType = () => {
    // Toggle between 'declaration' and 'proof'
    const newSubmissionType = submissionType === 'declaration' ? 'proof' : 'declaration';
    setSubmissionType(newSubmissionType);
  };


  return (
    <Formik
      initialValues={formData}
      validationSchema={Yup.object()} // General validation schema
      onSubmit={handleFinalSubmit}
      enableReinitialize
    >
      {({ validateForm, setFieldValue }) => (
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
            {/* House rent  */}
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
                    <Field
                      type="checkbox"
                      checked={isRentChecked}
                      onChange={toggleRentCheckbox}
                      id="rent"
                      className="custom-checkbox checkbox-spacing"
                    />
                    <label htmlFor="houseRentNoInvestments" className="ml-2 mb-0" style={{ marginBottom: '10px' }}>No Investments</label>
                  </CCol>
                </CRow>
              </CCardHeader>
              {!isCollapsedOne && !isRentChecked && (
                <CCardBody>
                  <Formik
                    initialValues={formData}
                    validationSchema={houseRentAmountValidationSchema}
                    onSubmit={(values, actions) => {
                       handleSaveHouseRent(validateForm);
                      actions.setSubmitting(false);
                    }}
                    enableReinitialize
                  >
                    {({ errors, touched }) => (
                      <Form>
                        <CRow className="align-items-center">
                          <CCol md="5" className="mb-3">
                            <label htmlFor="amount" style={{ marginBottom: '10px' }}>Enter annual house rent:</label>
                            <Field
                              type="number"
                              id="amount"
                              name="houseRentRecord.amount"
                              // value={formData.houseRentRecord.amount}
                              onChange={(e) => handleFormChange(e, 'amount', 'houseRentRecord')}
                              className={`form-control${touched.houseRentRecord?.amount && errors.houseRentRecord?.amount ? ' is-invalid' : ''}`}
                              placeholder="Amount of House Rent in a year"
                              disabled={isRentChecked}
                            />
                            <ErrorMessage name="houseRentRecord.amount" component="div" className="invalid-feedback" />
                          </CCol>
                          <CCol md="4" className="d-flex justify-content-center">
                            <CButton type="submit" color="primary">Save</CButton>
                          </CCol>
                        </CRow>
                      </Form>
                    )}
                  </Formik>
                  <hr />
                  <Formik
                    initialValues={formData}
                    validationSchema={houseRentProofValidationSchema}
                    onSubmit={(values, actions) => {
                      handleSaveOwnerPanRentSlips(validateForm, setFieldValue);
                      actions.setSubmitting(false);
                    }}
                    enableReinitialize
                  >
                    {({ errors, touched }) => (
                      <Form>
                        <CRow className="align-items-center">
                          <CCol md="3" style={{ marginTop: '20px' }}>
                            <p>This section will be made visible in Feb to submit the final proofs</p>
                          </CCol>
                          <CCol md="3" style={{ marginTop: '40px' }}>
                            <Field
                              type="file"
                              className="custom-file-input"
                              name="houseRentRecord.proofdocumentLink"
                              id="rentSlips"
                              style={{ display: 'none' }}
                              onChange={(e) => handleFormChange(e, 'proofdocumentLink', 'houseRentRecord')}
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
                              id="ownerPanCard"
                              name="houseRentRecord.ownerPanCard"
                              // value={formData.houseRentRecord.ownerPanCard}
                              onChange={(e) => handleFormChange(e, 'ownerPanCard', 'houseRentRecord')}
                              className={`form-control${touched.houseRentRecord?.ownerPanCard && errors.houseRentRecord?.ownerPanCard ? ' is-invalid' : ''}`}
                              placeholder="Owner PAN Number"
                            />
                            <ErrorMessage name="houseRentRecord.ownerPanCard" component="div" className="invalid-feedback" />
                          </CCol>
                          <CCol md="3" className="d-flex justify-content-end">
                            <CButton type="submit" color="primary">Save</CButton>
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
                      onClick={toggleCollapseTwo}
                      style={{ cursor: 'pointer' }}
                    />
                    <h5 className="m-0">Leave travel expenditure details</h5>
                  </CCol>
                  <CCol md="4" className="d-flex align-items-center">
                    <Field type="checkbox" checked={isLeaveChecked}
                      onChange={toggleLeaveCheckbox} id="rent" className="custom-checkbox checkbox-spacing" />
                    <label htmlFor="noTravelDeclaration" className="ml-2 mb-0" style={{ marginBottom: '10px' }}>No Investments</label>
                  </CCol>
                </CRow>
              </CCardHeader>
              {!isCollapsedTwo && !isLeaveChecked && (
                <CCardBody>
                  <Formik
                    initialValues={formData}
                    validationSchema={leaveTravelValidationSchema}
                    onSubmit={(values, actions) => {
                      handleSaveLeaveTravel(validateForm, setFieldValue);
                      actions.setSubmitting(false);
                    }}
                    enableReinitialize
                  >
                    {({ errors, touched }) => (
                      <Form>
                        <CRow className="align-items-center">
                          <CCol md="5" className="mb-3">
                            <label htmlFor="amount" style={{ marginBottom: '10px' }}>
                              Enter Amount of any travel to claim in a year:
                            </label>
                            <Field
                              type="text"
                              id="amount"
                              name="travelExpenditureRecord.amount"
                              value={formData.travelExpenditureRecord.amount}
                              onChange={(e) => handleFormChange(e, 'amount', 'travelExpenditureRecord')}

                              className={`form-control${touched.travelExpenditureRecord?.amount && errors.travelExpenditureRecord?.amount ? ' is-invalid' : ''}${isLeaveChecked ? ' no-border' : ''}`}
                              disabled={isLeaveChecked}
                              placeholder="Amount of any travel to claim in an year"
                            />
                            {!isLeaveChecked && (
                              <ErrorMessage name="travelExpenditureRecord.amount" component="div" className="invalid-feedback" />
                            )}
                          </CCol>
                          <CCol md="4" className="d-flex justify-content-center">
                            <CButton type="submit" color="primary">Save</CButton>
                          </CCol>
                        </CRow>
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
                              name="travelExpenditureRecord.proofdocumentLink"
                              style={{ display: 'none' }}
                            // onChange={(e) => handleFormChange(e, 'proofdocumentLink', 'travelExpenditureRecord')}
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
                                name="travelExpenditureRecord.proofdocumentLink"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                          </CCol>
                          <CCol md="4" className="d-flex justify-content-end">
                            <CButton type="submit" color="primary">Save</CButton>
                          </CCol>
                        </CRow>
                      </Form>
                    )}
                  </Formik>
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
                      onChange={toggleInterestPayableChecked}
                      id="interestPayable"
                      className="custom-checkbox checkbox-spacing"
                    />
                    <label htmlFor="interestPayable" className="ml-2 mb-0">No Investments</label>
                  </CCol>
                </CRow>
              </CCardHeader>
              {!isCollapsedThree && !isInterestPaybleChecked && (
                <CCardBody>
                  <Formik
                    initialValues={formData}
                    validationSchema={interestHomeLoanValidationSchema}
                    onSubmit={(values, actions) => {
                      handleSaveHomeLoan(actions.validateForm, actions.setFieldValue);
                      actions.setSubmitting(false);
                    }}
                    enableReinitialize
                  >
                    {({ errors, touched }) => (
                      <Form>
                        <CRow className="align-items-center">
                          <CCol md="5" className="mb-3">
                            <label htmlFor="amount" style={{ marginBottom: '10px' }}>Interest Amount on home loan in an year:</label>
                            <Field
                              type="number"

                              id="amount"
                              name="homeLoanRecord.amount"
                              value={formData.homeLoanRecord.amount}
                              onChange={(e) => handleFormChange(e, 'amount', 'homeLoanRecord')}
                              className={`form-control${touched?.homeLoanRecord?.amount && errors?.homeLoanRecord?.amount ? ' is-invalid' : ''}${isInterestPaybleChecked ? ' no-border' : ''}`}
                              placeholder="Interest Amount on home loan in an year"
                              disabled={isInterestPaybleChecked}
                            />
                            {!isInterestPaybleChecked && (
                              <ErrorMessage name="homeLoanRecord.amount" component="div" className="invalid-feedback" />
                            )}
                          </CCol>
                          <CCol md="2" className="mb-3">
                            <label htmlFor="lenderName" style={{ marginBottom: '10px' }}>Name of Lender</label>
                            <Field
                              type="text"
                              id="lenderName"
                              name="homeLoanRecord.lenderName"
                              // value={formData.homeLoanRecord.lenderName || ''} // Controlled component
                              className={`form-control${touched?.homeLoanRecord?.lenderName && errors?.homeLoanRecord?.lenderName ? ' is-invalid' : ''}${isInterestPaybleChecked ? ' no-border' : ''}`}
                              placeholder="Name of Lender"
                              disabled={isInterestPaybleChecked}
                            />
                            {!isInterestPaybleChecked && (
                              <ErrorMessage name="homeLoanRecord.lenderName" component="div" className="text-danger" />
                            )}
                          </CCol>
                          <CCol md="2" className="mb-3">
                            <label htmlFor="lenderAddress" style={{ marginBottom: '10px' }}>Address of Lender</label>
                            <Field
                              type="text"
                              id="lenderAddress"
                              name="homeLoanRecord.lenderAddress"
                              // value={formData.homeLoanRecord.lenderAddress || ''} // Controlled component
                              className={`form-control${touched?.homeLoanRecord?.lenderAddress && errors?.homeLoanRecord?.lenderAddress ? ' is-invalid' : ''}${isInterestPaybleChecked ? ' no-border' : ''}`}
                              placeholder="Address of Lender"
                              disabled={isInterestPaybleChecked}
                            />
                            {!isInterestPaybleChecked && (
                              <ErrorMessage name="homeLoanRecord.lenderAddress" component="div" className="text-danger" />
                            )}
                          </CCol>
                          <CCol md="3" className="mb-3">
                            <label htmlFor="lenderPan" style={{ marginBottom: '10px' }}>PAN Number of Lender</label>
                            <Field
                              type="text"
                              id="lenderPan"
                              name="homeLoanRecord.lenderPanNumber"

                              className={`form-control${touched?.homeLoanRecord?.lenderPanNumber && errors?.homeLoanRecord?.lenderPanNumber ? ' is-invalid' : ''}${isInterestPaybleChecked ? ' no-border' : ''}`}
                              placeholder="PAN No. of Lender"
                              disabled={isInterestPaybleChecked}
                            />
                            {!isInterestPaybleChecked && (
                              <ErrorMessage name="homeLoanRecord.lenderPanNumber" component="div" className="text-danger" />
                            )}
                          </CCol>
                          <CCol md="8" className="d-flex justify-content-end">
                            <CButton color="primary">Save</CButton>
                          </CCol>
                        </CRow>
                      </Form>
                    )}
                  </Formik>

                  <hr />
                  <Formik
                    initialValues={formData}
                    validationSchema={houseRentProofValidationSchema}
                    onSubmit={(values, actions) => {
                      handleSaveOwnerPanRentSlips(validateForm, setFieldValue);
                      actions.setSubmitting(false);
                    }}
                    enableReinitialize
                  >
                    {() => (
                      <Form>
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

                            </div>
                          </CCol>
                          <CCol md="4" className="d-flex justify-content-end">
                            <CButton type="submit" color="primary">Save</CButton>
                          </CCol>
                        </CRow>
                      </Form>
                    )}
                  </Formik>
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
                        />
                        <label htmlFor="80C" className="ml-2 mb-0">No Investments</label>
                      </CCol>

                    </CRow>
                  </CCardHeader>

                  {!isCollapsedFour && !is80CChecked && (
                    <Formik
                      initialValues={formData}
                      validationSchema={eightyCValidationSchema}
                      onSubmit={(values) => {
                        console.log(values);
                      }}
                    >
                      {() => (
                        <Form>
                          <CCardBody>
                            <label htmlFor="deduction" className="ml-2 mb-0">Deduction Type</label>
                            {rows.map((row, index) => (
                              <CRow key={row.id} className="align-items-center">
                                <CCol md="4" className="mb-3" style={{ textAlign: 'center' }}>
                                  <CFormSelect>
                                    <option value="">Select Medical Expenses</option>
                                    <option value="0">None</option>
                                    <option value="25000">Up to Rs.25,000</option>
                                    <option value="50000">Up to Rs.50,000</option>
                                  </CFormSelect>
                                </CCol>
                                <CCol md="2" className="mb-3">
                                  <label htmlFor={`amount${row.id}`} style={{ marginBottom: '10px' }}>Amount:</label>
                                  <input
                                    type="text"
                                    id={`amount${row.id}`}
                                    className="form-control"
                                    placeholder="Amount"
                                    value={row.amount}
                                    onChange={(e) => {
                                      const updatedRows = [...rows];
                                      updatedRows[index].amount = e.target.value;
                                      setRows(updatedRows);
                                    }}
                                  />
                                </CCol>
                                <CCol md="2">
                                  <input
                                    type="checkbox"
                                    id={`proofSubmitted${row.id}`}
                                    className="custom-checkbox"
                                    checked={row.proofSubmitted}
                                    onChange={(e) => {
                                      const updatedRows = [...rows];
                                      updatedRows[index].proofSubmitted = e.target.checked;
                                      setRows(updatedRows);
                                    }}
                                  />
                                </CCol>
                                <CCol md="2" className="mb-3">
                                  <div>
                                    <input
                                      type="file"
                                      className="custom-file-input"
                                      id={`rentSlips${row.id}`}
                                      style={{ display: 'none' }}
                                    />
                                    <label
                                      className="custom-file-label"
                                      htmlFor={`rentSlips${row.id}`}
                                      style={{ cursor: 'pointer' }}
                                    >
                                      <u>Upload Proof</u>
                                    </label>
                                  </div>
                                </CCol>
                                <CCol md="2" className="mb-3">
                                  <MdDelete
                                    style={{
                                      color: "red",
                                      fontSize: "30px",
                                      cursor: "pointer",
                                      marginLeft: "10px"
                                    }}
                                    className="text-danger"
                                    onClick={() => {
                                      const updatedRows = rows.filter(r => r.id !== row.id);
                                      setRows(updatedRows);
                                    }}
                                  />
                                </CCol>
                              </CRow>
                            ))}
                            <div className="mb-3">
                              <button className="btn btn-primary" onClick={addRow}>+</button>
                            </div>
                            <div className="d-flex justify-content-end">
                              <CButton color="primary" type="submit">Save</CButton>
                            </div>
                          </CCardBody>
                        </Form>
                      )}
                    </Formik>
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
                    </CRow>
                  </CCardHeader>
                  {!isCollapsedFive && !is80DChecked && (
                    <Formik
                      initialValues={formData}
                      validationSchema={eightyDValidationSchema}
                      onSubmit={(values, actions) => {
                        handleSaveEightyDRecord(values);
                        actions.setSubmitting(false);
                      }}
                      enableReinitialize
                    >
                      {({ values, errors, touched }) => (
                        <Form>
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
                                  name="eightyDRecord.insuranceAmount"
                                  className={`form-control${touched.eightyDRecord?.insuranceAmount && errors.eightyDRecord?.insuranceAmount ? ' is-invalid' : ''}`}
                                  placeholder="Amount"
                                />
                                <ErrorMessage name="eightyDRecord.insuranceAmount" component="div" className="invalid-feedback" />
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
                                    <label htmlFor="medicalExpenseAmount" className="mb-10">Amount:</label>
                                    <Field
                                      type="text"
                                      id="medicalExpenseAmount"
                                      name="eightyDRecord.medicalExpenseAmount"
                                      className={`form-control${touched.eightyDRecord?.medicalExpenseAmount && errors.eightyDRecord?.medicalExpenseAmount ? ' is-invalid' : ''}`}
                                      placeholder="Amount"
                                    />
                                    <ErrorMessage name="eightyDRecord.medicalExpenseAmount" component="div" className="invalid-feedback" />
                                  </CCol>
                                  <CCol md="2" className="mb-3">
                                    <div>
                                      <Field
                                        type="file"
                                        name="medicalProof"
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
                                  <CCol md="3" className="d-flex justify-content-end">
                                    <CButton color="primary" type="submit">Save</CButton>
                                  </CCol>
                                </CRow>
                              </>
                            )}
                          </CCardBody>
                        </Form>
                      )}
                    </Formik>
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
                    </CRow>
                  </CCardHeader>
                  {!isCollapsedSix && !is80GChecked && (
                    <Formik
                      initialValues={formData}
                      validationSchema={eightyGValidationSchema}
                      onSubmit={(values, actions) => {
                        handleSaveHomeLoan(actions.validateForm, actions.setFieldValue);
                        actions.setSubmitting(false);
                      }}
                      enableReinitialize
                    >
                      {({ errors, touched }) => (
                        <Form>
                          <CCardBody>
                            <CRow className="align-items-center">
                              <CCol md="4" className="mb-3">
                                <label htmlFor="nameofdonee" style={{ marginBottom: '10px' }}>Name of the Donee:</label>
                                <Field
                                  type="text"
                                  id="nameofdonee"
                                  name="eightyGRecord.nameofdonee"
                                  className={`form-control${touched.eightyGRecord?.nameofdonee && errors.eightyGRecord?.nameofdonee ? ' is-invalid' : ''}`}
                                  placeholder="Name of the Donee"
                                />
                                <ErrorMessage name="eightyGRecord.nameofdonee" component="div" className="invalid-feedback" />
                              </CCol>
                              <CCol md="2" className="mb-3">
                                <label htmlFor="panNumber" style={{ marginBottom: '10px' }}>PAN Details:</label>
                                <Field
                                  type="text"
                                  id="panNumber"
                                  name="eightyGRecord.panNumber"
                                  className={`form-control${touched.eightyGRecord?.panNumber && errors.eightyGRecord?.panNumber ? ' is-invalid' : ''}`}
                                  placeholder="PAN Details"
                                />
                                <ErrorMessage name="eightyGRecord.panNumber" component="div" className="invalid-feedback" />
                              </CCol>
                              <CCol md="2" className="mb-3">
                                <label htmlFor="address" style={{ marginBottom: '10px' }}>Address:</label>
                                <Field
                                  type="text"
                                  id="address"
                                  name="eightyGRecord.address"
                                  className={`form-control${touched.eightyGRecord?.address && errors.eightyGRecord?.address ? ' is-invalid' : ''}`}
                                  placeholder="Address"
                                />
                                <ErrorMessage name="eightyGRecord.address" component="div" className="invalid-feedback" />
                              </CCol>
                              <CCol md="2" className="mb-3">
                                <label htmlFor="amount" style={{ marginBottom: '10px' }}>Amount:</label>
                                <Field
                                  type="number"
                                  id="amount"
                                  name="eightyGRecord.amount"
                                  className={`form-control${touched.eightyGRecord?.amount && errors.eightyGRecord?.amount ? ' is-invalid' : ''}`}
                                  placeholder="Amount"
                                />
                                <ErrorMessage name="eightyGRecord.amount" component="div" className="invalid-feedback" />
                              </CCol>
                              <CCol md="2" className="mb-3">
                                <div>
                                  <Field
                                    type="file"
                                    className="custom-file-input"
                                    id="proofdocumentLink"
                                    name="eightyGRecord.proofdocumentLink"
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
                              <CCol md="2" className="d-flex justify-content-end">
                                <CButton color="primary" type="submit">Save</CButton>
                              </CCol>
                            </CRow>
                          </CCardBody>
                        </Form>
                      )}
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
                    </CRow>
                  </CCardHeader>
                  {!isCollapsedSeven && !isOtherChecked && (
                    <CCardBody>
                      <Formik
                        initialValues={formData}
                        validationSchema={otherInvestmentValidationSchema}
                        onSubmit={(values, actions) => {
                          handleSaveOtherInvestment(validateForm, setFieldValue);
                          actions.setSubmitting(false);
                        }}
                        enableReinitialize
                      >
                        {({ errors, touched }) => (
                          <Form>
                            <CRow className="align-items-center">
                              <CCol md="5" className="mb-3">
                                <label htmlFor="description" style={{ marginBottom: '10px' }}>
                                  Type Description of investment type:
                                </label>
                                <Field
                                  as="textarea" // Change to textarea
                                  id="description"
                                  name="otherInvestmentRecord.description"
                                  // value={formData.otherInvestmentRecord.description}
                                  rows={2} 
                                  className={`form-control${touched.otherInvestmentRecord?.description && errors.otherInvestmentRecord?.description ? ' is-invalid' : ''}`}
                                  placeholder="Type Description of investment type"
                                />
                                <ErrorMessage name="otherInvestmentRecord.description" component="div" className="text-danger" /> {/* Fix the casing */}
                              </CCol>
                              <CCol md="3" className="mb-3">
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
                              <CCol md="4" className="d-flex justify-content-end">
                                <CButton color="primary" type="submit">Save</CButton>
                              </CCol>
                            </CRow>
                          </Form>
                        )}
                      </Formik>
                    </CCardBody>
                  )}
                </CCard>


              </CCardBody>


            </CCard>
            <CRow className="mt-3 mb-2">
              <CCol className="d-flex justify-content-end">
                <CButton
                  type="button"
                  style={{ marginRight: '20px' }}
                  color="warning"
                  onClick={handleSwitchSubmissionType}
                >
                  Switch Submission Type
                </CButton>

                <CButton
                  type="submit"
                  style={{ marginRight: '20px' }}
                  color="primary"
                >
                  {submissionType === 'declaration' ? 'Submit Declaration' : 'Submit Proof'}
                </CButton>
              </CCol>
            </CRow>




          </CCard>
        </Form>
      )}
    </Formik>
  );
};

export default Form12BB;






