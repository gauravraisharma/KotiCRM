import React, { useState } from 'react';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CContainer,
  CForm,
  CRow,
  CButton
} from '@coreui/react';

const Form12BB = () => {
  return (
    <CContainer className="mt-5">
      <CCard>
        <CCardHeader>
          <h5>Form 12BB Declaration</h5>
        </CCardHeader>
        <CCardBody>
          <CForm>
            <CCard className="mt-3">
              <CCardHeader>
              <CRow>
  <CCol md="4">
    <h5 className="m-0">House Rent Declaration</h5>
  </CCol>
  <CCol md="4">
    <input type="checkbox" id="beforeNoInvestments" />
    <label htmlFor="beforeNoInvestments" className="mx-2 mb-0">No Investments</label>
  </CCol>
  <CCol md="4">
    <input type="checkbox" id="afterNoInvestments" />
  </CCol>
</CRow>

              </CCardHeader>
              <CCardBody>
              <CRow>
  <CCol md="3" className="mb-3">
    <input
      type="text"
      id="amount"
      className="form-control"
      placeholder="Amount of House Rent in a year"
    />
  </CCol>
  <CCol md="3" className="mb-3">
    <input
      type="text"
      id="ownerPan"
      className="form-control"
      placeholder="Owner PAN Number"
    />
  </CCol>
  <CCol md="3" className="mb-3">
    <CButton color="primary">Save</CButton>
  </CCol>
  <CCol md="3">
    <input type="checkbox" id="afterNoInvestments" />
  </CCol>
</CRow>
<hr></hr>
<CRow>
<CCol md="3" className="mb-3">
<p>This Section will be made visible in Feb to submit the final proofs</p>

</CCol>
<CCol md="3" className="mb-3">
    <div className="input-group">
      <div className="custom-file">
        <input type="file" className="custom-file-input" id="rentSlips" />
        <label className="custom-file-label" htmlFor="rentSlips">
          Upload Rent slips in a zip file
        </label>
      </div>
      <div className="input-group-append">
        <button className="btn btn-outline-secondary" type="button">
          Upload
        </button>
      </div>
    </div>
  </CCol>
<CCol md="3" className="mb-3">
    <CButton color="primary">Save</CButton>
  </CCol>
  <CCol md="3">
    <input type="checkbox" id="afterNoInvestments" />
  </CCol>
</CRow>

              </CCardBody>
            </CCard>

            <CCard className="mt-3">
              <CCardHeader>
                <h5>Interest on Home Loan</h5>
              </CCardHeader>
              <CCardBody>
                <CRow>
                  <CCol md="6" className="mb-3">
                    <label htmlFor="interest_paid">Interest Paid</label>
                    <input
                      type="text"
                      id="interest_paid"
                      placeholder="Enter interest paid"
                    />
                  </CCol>
                  <CCol md="6" className="mb-3">
                    <label htmlFor="lender_name">Lender's Name</label>
                    <input
                      type="text"
                      id="lender_name"
                      placeholder="Enter lender's name"
                    />
                  </CCol>
                </CRow>
              </CCardBody>
            </CCard>

            <CCard className="mt-3">
              <CCardHeader>
                <h5>Section 80C Deductions</h5>
              </CCardHeader>
              <CCardBody>
                <CRow>
                  <CCol md="6" className="mb-3">
                    <label htmlFor="ppf">PPF</label>
                    <input
                      type="text"
                      id="ppf"
                      placeholder="Enter amount invested in PPF"
                    />
                  </CCol>
                  <CCol md="6" className="mb-3">
                    <label htmlFor="lic">LIC</label>
                    <input
                      type="text"
                      id="lic"
                      placeholder="Enter amount invested in LIC"
                    />
                  </CCol>
                </CRow>
              </CCardBody>
            </CCard>

            <CButton type="submit" color="primary" className="mt-3">
              Submit
            </CButton>
          </CForm>
        </CCardBody>
      </CCard>
    </CContainer>
  );
};

export default Form12BB;
