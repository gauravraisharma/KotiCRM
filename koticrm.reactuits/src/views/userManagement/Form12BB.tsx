import { CCard, CCardBody, CCardHeader, CCol, CRow, CButton } from '@coreui/react';
import { Field, Formik, ErrorMessage, Form } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import CIcon from '@coreui/icons-react';
import { cilCheckCircle, cilChevronDoubleDown, cilChevronDoubleUp } from '@coreui/icons';
import "../../css/style.css";
import { GetEmployee12BB, SaveForm12BB, UploadDocuments } from '../../redux-saga/modules/userManagement/apiService';
import { DocumentPaths, EightyCDeclaration, EmployeeFinancialRecord, InitialEmployeeRecord } from '../../models/Form12BB/Form12BB';
import { MdDelete } from 'react-icons/md';
import { Deduction } from './deduction';
import { DocumentProofs } from '../../models/Form12BB/DocumentProofs';
import { toast } from 'react-toastify';

// Separate validation schemas for each section
const houseRentAmountValidationSchema = Yup.object().shape({
  houseRentRecord: Yup.object().shape({
    amount: Yup.number().required('Amount is required'),
  }),
});

const houseRentProofValidationSchema = Yup.object().shape({
  houseRentRecord: Yup.object().shape({
    ownerPanCard: Yup.string().required('PAN is required'),
  }),
});

//leave travel
const leaveTravelValidationSchema = Yup.object().shape({
  travelExpenditureRecord: Yup.object().shape({
    amount: Yup.number().required('Amount is required'),
  }),
});

// Interest Payable on Home Loan
const interestHomeLoanValidationSchema = Yup.object().shape({
  homeLoanRecord: Yup.object().shape({
    amount: Yup.number().required('Interest amount is required'),
    lenderName: Yup.string().required('Name of lender is required'),
    lenderAddress: Yup.string().required('Address of lender is required'),
    lenderPanNumber: Yup.string().required('PAN number of lender is required'),
  }),
});

const eightyCValidationSchema = Yup.object().shape({
  rows: Yup.array().of(
    Yup.object().shape({
      deductionTypeId: Yup.string().required("Deduction Type is required"),
      amount: Yup.number().typeError("Amount must be a number").required("Amount is required").min(0, "Amount must be greater than or equal to 0"),
    })
  ),
});

//80-D
const eightyDValidationSchema = Yup.object().shape({
  eightyDRecord: Yup.object().shape({
    insuranceAmount: Yup.number().required('Amount is required'),
    medicalExpenseAmount: Yup.number().required('Amount is required'),
  }),
});

//80-G
const eightyGValidationSchema = Yup.object().shape({
  eightyGRecord: Yup.object().shape({
    nameOfDonee: Yup.string().required('Name of the Donee is required'),
    panNumber: Yup.string().required('PAN Details must be in the correct format'),
    address: Yup.string().required('Address is required'),
    amount: Yup.number().required('Interest amount is required'),
  }),
});

// Other Investment
const otherInvestmentValidationSchema = Yup.object().shape({
  otherInvestmentRecord: Yup.object().shape({
    description: Yup.string().required('Description is required'),
  }),
});

const Form12BB = () => {
  const { employeeId, userId } = useParams<{ employeeId: string, userId: string}>();
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

  // Documents upload
  const [documentProofs, setDocumentProofs] = useState<DocumentProofs[]>([]);

  const submitButtonEnable = isRentChecked && isLeaveChecked && isInterestPaybleChecked && is80CChecked && is80DChecked && is80GChecked && isOtherChecked;

  const addRow = () => {
    const newRow = { key: Date.now(), id: '', amount: 0, deductionTypeId: 0, proofSubmitted: false };
    setRows([...rows, newRow]);
  };

  const handleDeleteRow = (indexToDelete) => {
    const updatedRows = [...rows];
    updatedRows.splice(indexToDelete, 1); // Remove the row at the specified index
    setRows(updatedRows);
  };
  const handleOptionChange = (event: any) => {
    setSelectedOption(event.target.value);
  };

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
              // proofDocumentLink,
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
              // proofDocumentLink,
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
              // proofDocumentLink,
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
              // insuranceProofLink,
              // medicalExpenseProof,
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
              // proofDocumentLink,
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
              // proofDocumentLink
            }
          }));
        }
      }
    } catch (error) {
      console.error('Error fetching employee 12BB data:', error);
    }
  };

  // Handle file change
  const handleFileChange = (e: any, fieldName: string, section: string) => {
    const selectedFile = e.target.files ? e.target.files[0] : null; 
    if (selectedFile) {
      const fileToSend = {
        section,
        fieldName,
        file: selectedFile,
      };
      const newFiles = [...documentProofs, fileToSend];
      setDocumentProofs(newFiles);
    }
  };

  // Handle form change
  const handleFormChange = (e: any, fieldName: string, section: string) => {
    const value = e.target.value;
    // if (section === 'houseRentRecord' && fieldName === 'amount') {
    //   const amount = formData.houseRentRecord.amount ?? 0;
    //   if (amount <= 100000 && fieldName === 'ownerPanCard') {
    //     // If amount is less than or equal to 1 Lac, don't update the ownerPanCard
    //     return;
    //   }
    // }
    setFormData(prevData => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [fieldName]: value,
      }
    }));
  }

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


  const uploadDocuments = async () => {
    // Create a replica of formData
    const formDataReplica = { ...formData };
    let formDataFiles = new FormData();
    documentProofs.forEach((fileToSend, index) => {
      formDataFiles.append(`files[${index}].files`, fileToSend.file);
      formDataFiles.append(`files[${index}].sections`, fileToSend.section);
      formDataFiles.append(`files[${index}].fieldNames`, fileToSend.fieldName);
    });
    if(documentProofs.length > 0){
      let section = "" as keyof EmployeeFinancialRecord;
      let fieldName = "";
      let fullPath = "";
      const response = await UploadDocuments(formDataFiles);
      if(response.status == 200){
        const res = response?.data;
        res?.map(link => {
          section = link.section as keyof EmployeeFinancialRecord;
          fieldName = link.fieldName;
          fullPath = link.fullPath;

          if (Array.isArray(formDataReplica[section])) {
            // Handle the case where section is a list type
            (formDataReplica[section] as any[]).forEach(entry => {
              entry[fieldName] = fullPath;
            });
          } else {
            // Handle the normal case
            (formDataReplica[section] as any)[fieldName] = fullPath;
          }
        });
        // Call save method 
        await SaveForm12BB(formDataReplica);
        res?.forEach(link => {
          const section = link.section as keyof EmployeeFinancialRecord;
          const fieldName = link.fieldName;
          (formData[section] as any)[fieldName] = null;
        });
        setFormData(formData);
        formDataFiles = new FormData();
        
        if (formData.isDeclarationComplete === false) {
          toast.success('Saved as draft');
        } else {
          toast.success('Final submission successful');
        }
        navigate(`/users`);
        }
        else {
          toast.error('Unable to save');
          console.log("Unable to update data");
        }
      }        
    else{
      // Call save method 
      const response = await SaveForm12BB(formDataReplica);
      if(response.status == 200){
        if(formDataReplica.isDeclarationComplete == false){
          toast.success('Saved as draft');
        }
        else{
          toast.success('Final submission successful');
        }
        navigate(`/users`);
      }
      else{
        toast.error('Saved as draft');
      }
    }
  };

  // Fill form data before save
  const prepareFormData = () => {
    formData.id = id ? id : 0;
    formData.employeeId = getEmployeeId ? getEmployeeId : "";
    // formData.financialYear = financialYear ? financialYear : "";
    formData.houseRentRecordId = houseRentRecordId ? houseRentRecordId : 0;
    formData.travelExpenditureRecordId = travelExpenditureRecordId ? travelExpenditureRecordId : 0;
    formData.homeLoanRecordId = homeLoanRecordId ? homeLoanRecordId : 0;
    formData.eightyDRecordId = eightyDRecordId ? eightyDRecordId : 0;
    formData.eightyGRecordId = eightyGRecordId ? eightyGRecordId : 0;
    formData.otherInvestmentRecordId = otherInvestmentRecordId ? otherInvestmentRecordId : 0;
    formData.eightyCDeclarations = rows;
    formData.modifiedBy = userId ? userId : "";
    formData.modifiedOn = null;
  };

  const handleSubmit = async (type: string) => {
    prepareFormData();
    // Update formData based on the type of submission
    if (type === "draftSubmit") {
      formData.isDeclarationComplete = false;
    } else if (type === "finalSubmit") {
      formData.isDeclarationComplete = true;
    }
    
    // Upload documents and handle the form submission
    await uploadDocuments();
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
                  <CCol md="4" className="d-flex justify-content-end align-items-center">
                    {isRentChecked || formData.houseRentRecord.amount && formData.houseRentRecord.ownerPanCard && (
                      <CIcon
                        icon={cilCheckCircle}
                        className="ml-2 check-icon"
                        size="xl"
                      />
                    )}
                  </CCol>
                </CRow>
              </CCardHeader>
              {!isCollapsedOne && !isRentChecked && (
                <CCardBody>
                  <Formik
                    initialValues={formData}
                    validationSchema={houseRentAmountValidationSchema}
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
                              onChange={(e) => handleFormChange(e, 'amount', 'houseRentRecord')}
                              className={`form-control${touched.houseRentRecord?.amount && errors.houseRentRecord?.amount ? ' is-invalid' : ''}`}
                              placeholder="Amount of House Rent in a year"
                              disabled={isRentChecked}
                            />
                            <ErrorMessage name="houseRentRecord.amount" component="div" className="invalid-feedback" />
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
                    validationSchema={houseRentProofValidationSchema}
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
                              name="houseRentRecord.proofDocumentLink"
                              id="rentSlips"
                              style={{ display: 'none' }}
                              onChange={(e) => handleFileChange(e, 'proofDocumentLink', 'houseRentRecord')}
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
                              onChange={(e) => handleFormChange(e, 'ownerPanCard', 'houseRentRecord')}
                              className={`form-control${touched.houseRentRecord?.ownerPanCard && errors.houseRentRecord?.ownerPanCard ? ' is-invalid' : ''}`}
                              placeholder="Owner PAN Number"
                              disabled={(formData.houseRentRecord.amount ?? 0) <= 100000}
                            />
                            <p>(if amount greater than 1 Lac)</p>
                            <ErrorMessage name="houseRentRecord.ownerPanCard" component="div" className="invalid-feedback" />
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
                  <CCol md="4" className="d-flex justify-content-end align-items-center">
                    {isLeaveChecked || formData.travelExpenditureRecord.amount && formData.travelExpenditureRecord.proofDocumentLink && (
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
                    validationSchema={leaveTravelValidationSchema}

                    enableReinitialize
                  >
                    {({ errors, touched, validateForm }) => (
                      <Form>
                        <CRow className="align-items-center">
                          <CCol md="5" className="mb-3">
                            <label htmlFor="amount" style={{ marginBottom: '10px' }}>
                              Enter Amount of any travel to claim in a year:
                            </label>
                            <Field
                              type="number"
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
                            <p>This section will be made visible in Feb to submit the final proofs</p>
                          </CCol>
                          <CCol md="4" style={{ marginTop: '40px' }}>
                            <Field
                              type="file"
                              className="custom-file-input"
                              id="proofDocumentLink"
                              name="travelExpenditureRecord.proofDocumentLink"
                              style={{ display: 'none' }}
                              onChange={(e) => handleFileChange(e, 'proofDocumentLink', 'travelExpenditureRecord')}
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
                                name="travelExpenditureRecord.proofDocumentLink"
                                component="div"
                                className="text-danger"
                              />
                            </div>
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
                  <CCol md="4" className="d-flex justify-content-end align-items-center">
                    {isInterestPaybleChecked || formData.homeLoanRecord.proofDocumentLink && formData.homeLoanRecord.amount && formData.homeLoanRecord.lenderName && formData.homeLoanRecord.lenderAddress &&
                            formData.homeLoanRecord.lenderPanNumber && (
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
                  <Formik
                    initialValues={formData}
                    validationSchema={interestHomeLoanValidationSchema}

                    enableReinitialize
                  >
                    {({ errors, touched }) => (
                      <Form>
                        <CRow className="align-items-center">
                          <CCol md="4" className="mb-3">
                            <label htmlFor="amount" style={{ marginBottom: '10px' }}>Interest Amount on home loan in an year:</label>
                            <Field
                              type="number"

                              id="amount"
                              name="homeLoanRecord.amount"
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
                              onChange={(e) => handleFormChange(e, 'lenderName', 'homeLoanRecord')}
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
                              onChange={(e) => handleFormChange(e, 'lenderAddress', 'homeLoanRecord')}
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
                              onChange={(e) => handleFormChange(e, 'lenderPanNumber', 'homeLoanRecord')}
                              className={`form-control${touched?.homeLoanRecord?.lenderPanNumber && errors?.homeLoanRecord?.lenderPanNumber ? ' is-invalid' : ''}${isInterestPaybleChecked ? ' no-border' : ''}`}
                              placeholder="PAN No. of Lender"
                              disabled={isInterestPaybleChecked}
                            />
                            {!isInterestPaybleChecked && (
                              <ErrorMessage name="homeLoanRecord.lenderPanNumber" component="div" className="text-danger" />
                            )}
                          </CCol>
                          <CCol md="1" className="d-flex justify-content-end align-items-center">
                            {formData.homeLoanRecord.amount && formData.homeLoanRecord.lenderName && formData.homeLoanRecord.lenderAddress &&
                            formData.homeLoanRecord.lenderPanNumber && (
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
                    validationSchema={houseRentProofValidationSchema}

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
                              <Field
                                type="file"
                                className="custom-file-input"
                                id="rentSlips"
                                name="homeLoanRecord.proofDocumentLink"
                                style={{ display: 'none' }}
                                onChange={(e) => handleFileChange(e, 'proofDocumentLink', 'homeLoanRecord')}
                              />

                            </div>
                          </CCol>
                          <CCol md="2" className="d-flex justify-content-end align-items-center">
                            {formData.homeLoanRecord.proofDocumentLink && (
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

                    <Formik
                      initialValues={{
                        rows: rows.map((row) => ({
                          id: row.id,
                          deductionTypeId: row.deductionTypeId || 0, // Use existing value or default
                          amount: row.amount || 0, // Use existing value or default
                          proofDocumentLink: row.proofDocumentLink || '', // Use existing value or default
                          eightyCDeductionTypes: row.eightyCDeductionTypes,
                          file: null
                        })),
                      }}
                      validationSchema={eightyCValidationSchema}
                    >
                      {({ validateForm, values, setFieldValue, errors, touched }) => (
                        <Form>
                          <CCardBody>

                            {rows.map((row, index) => (
                              <CRow key={row.id} className="align-items-center">
                                <CCol md="4" className="mb-3" style={{ textAlign: 'center' }}>
                                  <label htmlFor="deduction" className="ml-2 mb-0">Deduction Type</label>
                                  <Field as="select"
                                    name={`rows[${index}].deductionTypeId`}
                                    className={`form-control ${touched.rows && touched.rows[index] && errors.rows && errors.rows[index] && errors.rows[index].deductionTypeId ? 'is-invalid' : ''}`}
                                    onChange={(e) => {
                                      const updatedRows = [...values.rows];
                                      updatedRows[index] = { ...updatedRows[index], deductionTypeId: e.target.value };
                                      setFieldValue('rows', updatedRows);
                                      setEightyCDeclarationRows(updatedRows);
                                    }}
                                  >
                                    <option value="">Select Medical Expenses</option>
                                    {deductionList.map(item => (
                                      <option key={item.id} value={item.id}>
                                        {item.name}
                                      </option>
                                    ))}
                                    <ErrorMessage name={`rows[${index}].deductionTypeId`} component="div" className="invalid-feedback" />
                                  </Field>
                                </CCol>
                                <CCol md="2" className="mb-3">
                                  <label htmlFor={`amount${row.id}`} style={{ marginBottom: '10px' }}>Amount:</label>
                                  <Field
                                    type="number"
                                    name={`rows[${index}].amount`}
                                    className={`form-control ${touched.rows && touched.rows[index] && errors.rows && errors.rows[index] && errors.rows[index].amount ? 'is-invalid' : ''}`}
                                    placeholder="Amount"

                                    onChange={(e) => {
                                      const updatedRows = [...values.rows];
                                      updatedRows[index].amount = e.target.value;
                                      setFieldValue('rows', updatedRows);
                                      setEightyCDeclarationRows(updatedRows);
                                    }}
                                  />
                                  <ErrorMessage name={`rows[${index}].amount`} component="div" className="invalid-feedback" />
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
                                  <div>
                                    <input
                                      type="file"
                                      className="custom-file-input"
                                      id={`rentSlips${row.id}`}
                                      style={{ display: 'none' }}
                                      // onChange={(e) => {
                                      //   const file = e.currentTarget.files[0];
                                      //   const updatedRows = [...values.rows];
                                      //   updatedRows[index].file = file;
                                      //   setFieldValue('rows', updatedRows);
                                      // }}
                                      onChange={(e) => handleFileChange(e, 'proofDocumentLink', 'eightyCDeclarations')}
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
                                <CCol md="1" className="mb-3">
                                  <MdDelete
                                    style={{
                                      color: "red",
                                      fontSize: "30px",
                                      cursor: "pointer",
                                      marginLeft: "10px"
                                    }}
                                    className="text-danger"
                                    onClick={() => handleDeleteRow(index)} // Assuming handleDeleteRow is your delete function
                                  />
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
                            ))}
                            <div className="mb-3">
                              {/* <button className="btn btn-primary" onClick={addRow}>+</button> */}
                              <button className="btn btn-primary" onClick={(e) => { e.preventDefault(); addRow(); }}>+</button>

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
                    <Formik
                      initialValues={formData}
                      validationSchema={eightyDValidationSchema}

                      enableReinitialize
                    >
                      {({ errors, touched, validateForm }) => (
                        <Form>
                          <CCardBody>
                            <CRow className="align-items-center">
                              <CCol md="4" className="mb-3 text-center">
                                <p>Self and Family Insurance</p>
                              </CCol>
                              <CCol md="2" className="mb-3">
                                <label htmlFor="insuranceAmount" className="mb-10">Amount:</label>
                                <Field
                                  type="number"
                                  id="insuranceAmount"
                                  name="eightyDRecord.insuranceAmount"
                                  className={`form-control${touched.eightyDRecord?.insuranceAmount && errors.eightyDRecord?.insuranceAmount ? ' is-invalid' : ''}`}
                                  placeholder="Amount"
                                  onChange={(e) => handleFormChange(e, 'insuranceAmount', 'eightyDRecord')}
                                />
                                <ErrorMessage name="eightyDRecord.insuranceAmount" component="div" className="invalid-feedback" />
                              </CCol>
                              <CCol md="2" className="mb-3">
                                <div>
                                  <Field
                                    type="file"
                                    name="eightyDRecord.insuranceProofLink"
                                    className="custom-file-input"
                                    id="insuranceProof"
                                    style={{ display: 'none' }}
                                    onChange={(e) => handleFileChange(e, 'insuranceProofLink', 'eightyDRecord')}
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
                                      type="number"
                                      id="medicalExpenseAmount"
                                      onChange={(e) => handleFormChange(e, 'medicalExpenseAmount', 'eightyDRecord')}
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
                                        name="eightyDRecord.medicalProof"
                                        className="custom-file-input"
                                        id="medicalProof"
                                        style={{ display: 'none' }}
                                        onChange={(e) => handleFileChange(e, 'medicalExpenseProof', 'eightyDRecord')}
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
                      <CCol md="4" className="d-flex justify-content-end align-items-center">
                        {is80GChecked || formData.eightyGRecord.nameOfDonee && formData.eightyGRecord.panNumber && formData.eightyGRecord.address &&  formData.eightyGRecord.amount && (
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
                      validationSchema={eightyGValidationSchema}

                      enableReinitialize
                    >
                      {({ errors, touched }) => (
                        <Form>
                          <CCardBody>
                            <CRow className="align-items-center">
                              <CCol md="3" className="mb-3">
                                <label htmlFor="nameOfDonee" style={{ marginBottom: '10px' }}>Name of the Donee:</label>
                                <Field
                                  type="text"
                                  id="nameOfDonee"
                                  name="eightyGRecord.nameOfDonee"
                                  onChange={(e: any) => handleFormChange(e, 'nameOfDonee', 'eightyGRecord')}
                                  className={`form-control${touched.eightyGRecord?.nameOfDonee && errors.eightyGRecord?.nameOfDonee ? ' is-invalid' : ''}`}
                                  placeholder="Name of the Donee"
                                />
                                <ErrorMessage name="eightyGRecord.nameOfDonee" component="div" className="invalid-feedback" />
                              </CCol>
                              <CCol md="2" className="mb-3">
                                <label htmlFor="panNumber" style={{ marginBottom: '10px' }}>PAN Details:</label>
                                <Field
                                  type="text"
                                  id="panNumber"
                                  name="eightyGRecord.panNumber"
                                  onChange={(e: any) => handleFormChange(e, 'panNumber', 'eightyGRecord')}
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
                                  onChange={(e: any) => handleFormChange(e, 'address', 'eightyGRecord')}
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
                                  onChange={(e: any) => handleFormChange(e, 'amount', 'eightyGRecord')}
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
                                    id="proofDocumentLink"
                                    name="eightyGRecord.proofDocumentLink"
                                    style={{ display: 'none' }}
                                    onChange={(e) => handleFileChange(e, 'proofDocumentLink', 'eightyGRecord')}
                                  />
                                  <label
                                    className="custom-file-label"
                                    htmlFor="proofDocumentLink"
                                    style={{ cursor: 'pointer' }}
                                  >
                                    <u>Upload Proof</u>
                                  </label>
                                </div>
                              </CCol>
                              <CCol md="1" className="d-flex justify-content-end align-items-center">
                                {formData.eightyGRecord.nameOfDonee && formData.eightyGRecord.panNumber && formData.eightyGRecord.address &&  formData.eightyGRecord.amount && (
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
                        validationSchema={otherInvestmentValidationSchema}
                        enableReinitialize
                      >
                        {({ errors, touched, validateForm }) => (
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
                                  rows={2}
                                  onChange={(e: any) => handleFormChange(e, 'description', 'otherInvestmentRecord')}
                                  className={`form-control${touched.otherInvestmentRecord?.description && errors.otherInvestmentRecord?.description ? ' is-invalid' : ''}`}
                                  placeholder="Type Description of investment type"
                                />
                                <ErrorMessage name="otherInvestmentRecord.description" component="div" className="text-danger" /> {/* Fix the casing */}
                              </CCol>
                              <CCol md="3" className="mb-3">
                              <div>
                                  <input
                                    type="file"
                                    className="custom-file-input"
                                    id="proofDocumentLink"
                                    name="otherInvestmentRecord.proofDocumentLink"
                                    style={{ display: 'none' }}
                                    onChange={(e) => handleFileChange(e, 'proofDocumentLink', 'otherInvestmentRecord')}
                                  />
                                  <label
                                    className="custom-file-label"
                                    htmlFor="proofDocumentLink"
                                    style={{ cursor: 'pointer' }}
                                  >
                                    <u>Upload Proof</u>
                                  </label>
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
                  color="outline-primary"
                  onClick={() => handleSubmit("draftSubmit")}
                >
                  Save As Draft
                </CButton>
                <CButton
                  type="button"
                  style={{ marginRight: '20px' }}
                  color="primary"
                  disabled={!submitButtonEnable}
                  onClick={() => handleSubmit("finalSubmit")}
                >
                  Final Submit
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






