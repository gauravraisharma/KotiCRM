
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CButton,
  CFormSelect
} from '@coreui/react';
import "../../css/style.css";
import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import CIcon from '@coreui/icons-react';
import { cilChevronDoubleDown, cilChevronDoubleUp } from '@coreui/icons';
import { MdDelete } from 'react-icons/md';

const Form12BB = () => {

  const [isCollapsedOne, setIsCollapsedOne] = useState(true);
  const [isCollapsedTwo, setIsCollapsedTwo] = useState(true);
  const [isCollapsedThree, setIsCollapsedThree] = useState(true);
  const [isCollapsedFour, setIsCollapsedFour] = useState(true);
  const [isCollapsedFive, setIsCollapsedFive] = useState(true);
  const [isCollapsedSix, setIsCollapsedSix] = useState(true);
  const [isCollapsedSeven, setIsCollapsedSeven] = useState(true);
  const [rows, setRows] = useState([{
    id: 1,
    amount: '',
    proofSubmitted: false
  }]);

  const addRow = () => {
    const newRow = {
      id: rows.length + 1,
      amount: '',
      proofSubmitted: false
    };
    setRows([...rows, newRow]);
  };



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

  const navigate = useNavigate();
  return (
    <>

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
              <CCol md="4 mb-2 mt-2" className="d-flex align-items-center"  >
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
                <input type="checkbox" id="rent" className="custom-checkbox checkbox-spacing" />
                <label htmlFor="houseRentNoInvestments" className="ml-2 mb-0" style={{ marginBottom: '10px' }}>No Investments</label>



              </CCol>
              <CCol md="4" className="d-flex justify-content-end align-items-center">
                <input type="checkbox" id="rightCheck" className="custom-checkbox" />


              </CCol>
            </CRow>
          </CCardHeader>
          {!isCollapsedOne && (
            <CCardBody>
              <CRow className="align-items-center">
                <CCol md="5" className="mb-3">
                  <label htmlFor="amount" style={{ marginBottom: '10px' }}>Enter annual house rent:</label>
                  <input
                    type="text"
                    id="amount"
                    className="form-control"
                    placeholder="Amount of House Rent in a year"
                  />
                </CCol>
                <CCol md="4" className="d-flex justify-content-center">
                  <CButton color="primary">Save</CButton>
                </CCol>
                <CCol md="3" className="d-flex justify-content-end">
                  <input type="checkbox" id="midCheck" className="custom-checkbox" />

                </CCol>
              </CRow>
              <hr />
              <CRow className="align-items-center">
                <CCol md="3" style={{ marginTop: '20px' }}>
                  <p>This section will be made visible in Feb to submit the final proofs</p>
                </CCol>
                <CCol md="3" style={{ marginTop: '40px' }}>

                  <input
                    type="file"
                    className="custom-file-input"
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
                  <input
                    type="text"
                    id="ownerPan"
                    className="form-control"
                    placeholder="Owner PAN Number"
                  />
                </CCol>
                <CCol md="3" className="d-flex justify-content-end" >
                  <CButton color="primary">Save</CButton>
                </CCol>
              </CRow>
            </CCardBody>
          )}
        </CCard>

        {/* leave travel  expenditure details  */}

        <CCard className="mt-3">
          <CCardHeader>
            <CCol md="4 mb-2 mt-2" className="d-flex align-items-center"  >
              <CIcon
                icon={isCollapsedTwo ? cilChevronDoubleDown : cilChevronDoubleUp}
                className="ml-2"
                size="lg"
                onClick={toggleCollapseTwo}
                style={{ cursor: 'pointer' }}
              />

              <h5>Leave travel expenditure details</h5>
            </CCol>
          </CCardHeader>
          {!isCollapsedTwo && (
            <CCardBody>
              <CRow className="align-items-center">
                <CCol md="5" className="mb-3">
                  <label htmlFor="amount" style={{ marginBottom: '10px' }}>Enter Amount of  any travel to claim in a year
                    :</label>
                  <input
                    type="text"
                    id="amount"
                    className="form-control"
                    placeholder="Amount of any travel to claim in an year "
                  />
                </CCol>
                <CCol md="4" className="d-flex justify-content-center">
                  <CButton color="primary">Save</CButton>
                </CCol>
                <CCol md="3" className="d-flex justify-content-end">
                  <input type="checkbox" id="houseRentProofFinal" className="custom-checkbox" />

                </CCol>
              </CRow>
              <hr />
              <CRow className="align-items-center">
                <CCol md="3" style={{ marginTop: '20px' }}>
                  <p>This section will be made visible in Feb to submit the final proofs</p>
                </CCol>

                <CCol md="3" style={{ marginTop: '40px' }}>
                  <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px', marginBottom: '10px' }}>
                    <input
                      type="file"
                      className="custom-file-input"
                      id="rentSlips"
                      style={{ display: 'none' }}
                    />
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
                  <input
                    type="text"
                    id="ownerPan"
                    className="form-control"
                    placeholder="Owner PAN Number"
                  />
                </CCol>
                <CCol md="3" className="d-flex justify-content-end" >
                  <CButton color="primary">Save</CButton>
                </CCol>
              </CRow>
            </CCardBody>
          )}
        </CCard>

        {/* interest  payable on home  loan */}
        <CCard className="mt-3">
          <CCardHeader>
            <CRow className="align-items-center">
              <CCol md="4 mb-2 mt-2" className="d-flex align-items-center"  >
                <CIcon
                  icon={isCollapsedThree ? cilChevronDoubleDown : cilChevronDoubleUp}
                  className="ml-2"
                  size="lg"
                  onClick={toggleCollapseThree}
                  style={{ cursor: 'pointer' }}
                />

                <h5>Interest Payable on home loan </h5>
              </CCol>
              <CCol md="4" className="d-flex align-items-center">
                <input type="checkbox" id="houseRentNoInvestments" className="custom-checkbox checkbox-spacing" />
                <label htmlFor="houseRentNoInvestments" className="ml-2 mb-0">No Investments</label>



              </CCol>
              <CCol md="4" className="d-flex justify-content-end align-items-center">
                <input type="checkbox" id="houseRentProofSubmitted" className="custom-checkbox" />

              </CCol>
            </CRow>
          </CCardHeader>
          {!isCollapsedThree && (
            <CCardBody>
              <CRow className="align-items-center">
                <CCol md="5" className="mb-3">
                  <label htmlFor="amount" style={{ marginBottom: '10px' }}>Interest Amount on home loan in an year:</label>
                  <input
                    type="text"
                    id="amount"
                    className="form-control"
                    placeholder="Interest Amount on home loan in an year"
                  />
                </CCol>
                <CCol md="2" className="mb-3">
                  <label htmlFor="nameOfLender" style={{ marginBottom: '10px' }}>Name of Lender</label>
                  <input
                    type="text"
                    id="amount"
                    className="form-control"
                    placeholder="Name of Lend.."
                  />
                </CCol>
                <CCol md="2" className="mb-3">
                  <label htmlFor="addressOfLender" style={{ marginBottom: '10px' }}>Address of Lender</label>
                  <input
                    type="text"
                    id="amount"
                    className="form-control"
                    placeholder="Address of Lend.."
                  />
                </CCol>
                <CCol md="3" className="mb-3">
                  <label htmlFor="ownerPan" style={{ marginBottom: '10px' }}>PAN Number of Lender</label>
                  <input
                    type="text"
                    id="amount"
                    className="form-control"
                    placeholder="PAN No.of Lender"
                  />
                </CCol>
                <CCol md="8" className="d-flex justify-content-end">
                  <CButton color="primary">Save</CButton>
                </CCol>
                <CCol md="4" className="d-flex justify-content-end">
                  <input type="checkbox" id="houseRentProofFinal" className="custom-checkbox" />

                </CCol>
              </CRow>
              <hr />
              <CRow className="align-items-center">
                <CCol md="3" className="mb-2">
                  <p>This section will be made visible in Feb to submit the final proofs</p>
                </CCol>
                <CCol md="3" style={{ marginTop: '10px' }}>
                  <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
                    <input
                      type="file"
                      className="custom-file-input"
                      id="rentSlips"
                      style={{ display: 'none' }}
                    />
                    <label
                      className="custom-file-label"
                      htmlFor="rentSlips"
                      style={{ cursor: 'pointer' }}
                    >
                      Upload Rent slips in a zip file
                    </label>
                  </div>
                </CCol>
                <CCol md="3" className="mb-3">
                  <label htmlFor="ownerPan" style={{ marginBottom: '10px' }}>Owner PAN Number</label>
                  <input
                    type="text"
                    id="ownerPan"
                    className="form-control"
                    placeholder="Owner PAN Number"
                  />
                </CCol>
                <CCol md="3" className="d-flex justify-content-end" >
                  <CButton color="primary">Save</CButton>
                </CCol>
              </CRow>
            </CCardBody>
          )}
        </CCard>





      </CCard>
      <CCard>

        <CCardHeader>
          <CCol md="6 mb-2 mt-2" className="d-flex align-items-center"  >
            <h5>All Tax Deductions (80C,80D,80DD,80GGA,80TTA,80U)</h5>
          </CCol>
        </CCardHeader>

        <CCardBody>


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
                  <input type="checkbox" id="houseRentNoInvestments" className="custom-checkbox checkbox-spacing" />
                  <label htmlFor="houseRentNoInvestments" className="ml-2 mb-0">No Investments</label>
                </CCol>
                <CCol md="4" className="d-flex justify-content-end align-items-center">
                  <input type="checkbox" id="houseRentProofSubmitted" className="custom-checkbox" />
                </CCol>
              </CRow>
            </CCardHeader>
            {!isCollapsedFour && (
              <CCardBody>
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
                <CRow>
                  <CCol md="12">
                    <button className="btn btn-primary" onClick={addRow}>+</button>
                  </CCol>
                </CRow>
              </CCardBody>
            )}
          </CCard>

          <CCard className="mt-3">
            <CCardHeader>
              <CRow className="align-items-center">
                <CCol md="4 mb-2 mt-2" className="d-flex align-items-center"  >
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
                  <input type="checkbox" id="houseRentNoInvestments" className="custom-checkbox checkbox-spacing" />
                  <label htmlFor="houseRentNoInvestments" className="ml-2 mb-0">No Investments</label>



                </CCol>
                <CCol md="4" className="d-flex justify-content-end align-items-center">
                  <input type="checkbox" id="houseRentProofSubmitted" className="custom-checkbox" />

                </CCol>
              </CRow>
            </CCardHeader>
            {!isCollapsedFive && (
              <CCardBody>
                <CRow className="align-items-center">
                  <CCol md="4" className="mb-3" style={{ textAlign: 'center' }}>
                    <p>Self and Family Insurance</p>

                  </CCol>
                  <CCol md="2" className="mb-3">
                    <label htmlFor="amount" style={{ marginBottom: '10px' }}>Amount:</label>
                    <input
                      type="text"
                      id="amount"
                      className="form-control"
                      placeholder="Amount"
                    />
                  </CCol>

                  <CCol md="2" className="mb-3">
                    <div >
                      <input
                        type="file"
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
                <CRow className="align-items-center">
                  <CCol md="4" className="mb-3" style={{ textAlign: 'center' }}>
                    <p>Medical Expenses if parents are Less than 60 (Maximum Exemption Rs.25,000)</p>
                  </CCol>
                  <CCol md="2" className="mb-3">
                    <label htmlFor="amount" style={{ marginBottom: '10px' }}>Amount:</label>
                    <input
                      type="text"
                      id="amount"
                      className="form-control"
                      placeholder="Amount"
                    />
                  </CCol>

                  <CCol md="2" className="mb-3">
                    <div>
                      <input
                        type="file"
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
                <CCol md="4" className="mb-3" style={{ textAlign: 'center' }}>
                  <p>OR</p>
                </CCol>
                <CRow className="align-items-center">
                  <CCol md="4" className="mb-3" style={{ textAlign: 'center' }}>
                    <p>Medical Expenses if parents are Greater than 60 (Maximum Exemption Rs.50,000)</p>

                  </CCol>
                  <CCol md="2" className="mb-3">
                    <label htmlFor="amount" style={{ marginBottom: '10px' }}>Amount:</label>
                    <input
                      type="text"
                      id="amount"
                      className="form-control"
                      placeholder="Amount"
                    />
                  </CCol>

                  <CCol md="2" className="mb-3">
                    <div >
                      <input
                        type="file"
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
                  <CCol md="4" className="d-flex justify-content-end" >
                    <CButton color="primary">Save</CButton>
                  </CCol>



                </CRow>
              </CCardBody>
            )}
          </CCard>

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
                  <input type="checkbox" id="houseRentNoInvestments" className="custom-checkbox checkbox-spacing" />
                  <label htmlFor="houseRentNoInvestments" className="ml-2 mb-0">No Investments</label>



                </CCol>
                <CCol md="4" className="d-flex justify-content-end align-items-center">
                  <input type="checkbox" id="houseRentProofSubmitted" className="custom-checkbox" />

                </CCol>
              </CRow>
            </CCardHeader>
            {!isCollapsedSix && (
              <CCardBody>
                <CRow className="align-items-center">
                  <CCol md="4" className="mb-3">
                    <label htmlFor="amount" style={{ marginBottom: '10px' }}>Name of the Done:</label>
                    <input
                      type="text"
                      id="amount"
                      className="form-control"
                      placeholder="Name  of the done"
                    />
                  </CCol>
                  <CCol md="2" className="mb-3">
                    <label htmlFor="amount" style={{ marginBottom: '10px' }}>PAN Details:</label>
                    <input
                      type="text"
                      id="amount"
                      className="form-control"
                      placeholder="PAN Details"
                    />
                  </CCol>
                  <CCol md="2" className="mb-3">
                    <label htmlFor="amount" style={{ marginBottom: '10px' }}>Address:</label>
                    <input
                      type="text"
                      id="amount"
                      className="form-control"
                      placeholder="Address "
                    />
                  </CCol>
                  <CCol md="2" className="mb-3">
                    <label htmlFor="amount" style={{ marginBottom: '10px' }}>Amount:</label>
                    <input
                      type="text"
                      id="amount"
                      className="form-control"
                      placeholder="Amount"
                    />
                  </CCol>
                  <CCol md="2" className="mb-3">
                    <div >
                      <input
                        type="file"
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

          <CCard className="mt-3">
            <CCardHeader>
              <CRow className="align-items-center">
                <CCol md="4 mb-2 mt-2" className="d-flex align-items-center"  >
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
                  <input type="checkbox" id="houseRentNoInvestments" className="custom-checkbox checkbox-spacing" />
                  <label htmlFor="houseRentNoInvestments" className="ml-2 mb-0">No Investments</label>



                </CCol>
                <CCol md="4" className="d-flex justify-content-end align-items-center">
                  <input type="checkbox" id="houseRentProofSubmitted" className="custom-checkbox" />

                </CCol>
              </CRow>
            </CCardHeader>
            {!isCollapsedSeven && (
              <CCardBody>
                <CRow className="align-items-center">
                  <CCol md="6" className="mb-3">
                    <label htmlFor="amount" style={{ marginBottom: '10px' }}>Type Descriotion of investment type:</label>
                    <input
                      type="text"
                      id="amount"
                      className="form-control"
                      placeholder="Type Descriotion of investment type"
                    />
                  </CCol>

                  <CCol md="6" className="mb-3">
                    <div >
                      <input
                        type="file"
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
        <CRow className="mt-3">
          <CCol className="d-flex justify-content-end">
            <CButton type="submit" color="primary">Submit</CButton>

          </CCol>

        </CRow>
      </CCard>


    </>
  );
};

export default Form12BB;