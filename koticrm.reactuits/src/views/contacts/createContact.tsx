import { CCol, CFormInput, CFormLabel, CFormSelect, CRow } from '@coreui/react';

const createContact = () => {
  return (
    <>
      <CRow className='justify-content-between'>
        <CCol xs={6}>
          <CRow className="mb-3">
            <CCol sm={4}>
              <CFormLabel htmlFor="staticEmail" className="col-form-label">Contact Onwer</CFormLabel>
            </CCol>
            <CCol sm={8}>
              <CFormSelect size='sm' aria-label="select example">
                <option>Select owner</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </CFormSelect>
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol sm={4}>
              <CFormLabel htmlFor="firstName" className="col-form-label">First Name</CFormLabel>
            </CCol>
            <CCol sm={8}>
              <CFormInput type="text" id="firstName" />
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol sm={4}>
              <CFormLabel htmlFor="accountName" className="col-form-label">Account Name</CFormLabel>
            </CCol>
            <CCol sm={8}>
              <CFormInput type="text" id="accountName" />
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol sm={4}>
              <CFormLabel htmlFor="email" className="col-form-label">Email</CFormLabel>
            </CCol>
            <CCol sm={8}>
              <CFormInput type="email" id="email" placeholder="name@example.com" />
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol sm={4}>
              <CFormLabel htmlFor="phone" className="col-form-label">Phone</CFormLabel>
            </CCol>
            <CCol sm={8}>
              <CFormInput type="text" id="phone" />
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol sm={4}>
              <CFormLabel htmlFor="otherPhone" className="col-form-label">Other Phone</CFormLabel>
            </CCol>
            <CCol sm={8}>
              <CFormInput type="text" id="otherPhone" />
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol sm={4}>
              <CFormLabel htmlFor="mobile" className="col-form-label">Mobile</CFormLabel>
            </CCol>
            <CCol sm={8}>
              <CFormInput type="text" id="mobile" />
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol sm={4}>
              <CFormLabel htmlFor="assistant" className="col-form-label">Assistant</CFormLabel>
            </CCol>
            <CCol sm={8}>
              <CFormInput type="text" id="assistant" />
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol sm={4}>
              <CFormLabel htmlFor="inputPassword" className="col-form-label">Password</CFormLabel>
            </CCol>
            <CCol sm={8}>
              <CFormInput type="password" id="inputPassword" />
            </CCol>
          </CRow>
        </CCol>

        <CCol xs={6}>
          <CRow className="mb-3">
            <CCol sm={4}>
              <CFormLabel htmlFor="staticEmail" className="col-form-label">Contact Onwer</CFormLabel>
            </CCol>
            <CCol sm={8}>
              <CFormInput type="text" id="inputtext" />
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol sm={4}>
              <CFormLabel htmlFor="staticEmail" className="col-form-label">Contact Onwer</CFormLabel>
            </CCol>
            <CCol sm={8}>
              <CFormInput type="text" id="inputtext" />
            </CCol>
          </CRow>
        </CCol>
      </CRow>

    </>
  );
};

export default createContact;