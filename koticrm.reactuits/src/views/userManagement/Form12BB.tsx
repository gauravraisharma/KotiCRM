import { CCard, CCardBody, CCardHeader, CCol, CRow, CButton } from '@coreui/react';
import { Field, Formik, ErrorMessage, Form } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import CIcon from '@coreui/icons-react';
import { cilChevronDoubleDown, cilChevronDoubleUp } from '@coreui/icons';
import "../../css/style.css";
import { GetEmployee12BB, GetHouseRent, GetInterestPayableOnHomeLoan, GetLeaveTravelExpenditure, SaveHouseRent, SaveInterestPayableOnHomeLoan, SaveLeaveTravelExpenditure } from '../../redux-saga/modules/userManagement/apiService';
import { EmployeeFinancialRecord, initialEmployeeRecord } from '../../models/Form12BB/Form12BB';

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


const Form12BB = () => {
  const [employee12BBData, setEmployee12BBData] = useState<EmployeeFinancialRecord>();
  const [formData, setFormData] = useState<EmployeeFinancialRecord>(new initialEmployeeRecord());
  // Collapse checks
  const [isCollapsedOne, setIsCollapsedOne] = useState(true);
  const [isCollapsedTwo, setIsCollapsedTwo] = useState(true);
  const [isCollapsedThree, setIsCollapsedThree] = useState(false);
  // Checkboxes checks
  const [isRentChecked, setIsRentChecked] = useState(false);
  const [isLeaveChecked, setIsLeaveChecked] = useState(false);
  const [isInterestPaybleChecked, setIsInterestPayableChecked] = useState(false);
  const { employeeId } = useParams<{ employeeId: string }>();
  const navigate = useNavigate();


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
        if (response.data?.homeLoanRecordId){
         interestHomeLoan(response.data.homeLoanRecordId);

        }

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

  const toggleRentCheckbox = () => {
    setIsRentChecked(!isRentChecked);
  };
  const toggleLeaveCheckbox = () => {
    setIsLeaveChecked(!isLeaveChecked);
  };

  const toggleCollapseOne = () => {
    setIsCollapsedOne(!isCollapsedOne);
  };

  const toggleCollapseTwo = () => {
    setIsCollapsedTwo(!isCollapsedTwo);
  };
  const toggleCollapseThree = () => setIsCollapsedThree(!isCollapsedThree);
  const toggleInterestPaybleChecked = () => setIsInterestPayableChecked(!isInterestPaybleChecked);
  //house rent 
  //get
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
  //save

  const handleSaveHouseRent = async (validateField: any, setFieldValue) => {
    try {
      // Validate specific field
      await validateField('houseRentRecord.amount');
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

  const handleSaveOwnerPanRentSlips = async (validateField: any, setFieldValue) => {
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

  //leave travel
  //get
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
  //save
  const handleSaveLeaveTravel = async (validateForm, setFieldValue) => {
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

  // const handleFormChange = (e, fieldName, recordName, setFieldValue) => {
  //   const { value } = e.target;
  //   setFieldValue(`${recordName}.${fieldName}`, value);
  // };

  //homeloan 

  //get 

  const interestHomeLoan = async (id: number) => {
    try {
      const response = await GetInterestPayableOnHomeLoan(id);
      console.log(response.data); 
      if (response?.data) {
        setFormData((prevState) => ({
          ...prevState,
          interestHomeLoanRecord: {
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

  const handleSaveHomeLoan = async (validateForm, touched) => {
    try {
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
  


  const handleSubmit = (values, { setSubmitting }) => {
    console.log(values);
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={formData}
      validationSchema={Yup.object()} // General validation schema
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ validateForm, setFieldValue, errors, touched }) => (
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
                      handleSaveHouseRent(validateForm, setFieldValue);
                      actions.setSubmitting(false);
                    }}
                    enableReinitialize
                  >
                    {({ validateField, setFieldValue, errors, touched }) => (
                      <Form>
                        <CRow className="align-items-center">
                          <CCol md="5" className="mb-3">
                            <label htmlFor="amount" style={{ marginBottom: '10px' }}>Enter annual house rent:</label>
                            <Field
                              type="number"
                              id="amount"
                              name="houseRentRecord.amount"
                              value={formData.houseRentRecord.amount}
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
                    {({ validateField, setFieldValue, errors, touched }) => (
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
  value={formData.houseRentRecord.ownerPanCard}
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
                    {({ validateField, setFieldValue, errors, touched }) => (
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
                      onChange={toggleInterestPaybleChecked}
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
                     {({  values,validateField, setFieldValue, errors, touched }) => (
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


          </CCard>
        </Form>
      )}
    </Formik>
  );
};

export default Form12BB;
