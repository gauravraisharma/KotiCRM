import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import * as Yup from "yup";
import { Contact, ContactClass } from '../../models/contact/Contact';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createContact, getContactById, updateContact } from '../../redux-saga/action';

const owners = [
  { ownerId: 1, ownerName: "Bob" },
  { ownerId: 2, ownerName: "Tom" },
  { ownerId: 3, ownerName: "Dom" },
]

// const accounts = [
//   { accountID: 1, accountName: "Bob" },
//   { accountID: 2, accountName: "Tom" },
//   { accountID: 3, accountName: "Dom" },
// ]

const CreateOrEditContact = () => {
  const { contactId } = useParams<{ contactId: string }>();
  const [contact, setContact] = useState<Contact>(new ContactClass());
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fetchedContact = useSelector((state: any) => state.reducer.contact);
  console.log(contact);

  const validationSchema = Yup.object().shape({
    ownerId: Yup.number().required('Owner ID is required'),
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    accountID: Yup.number().required('Account ID is required'),
    email: Yup.string().email('Invalid email').required('Email is required')
  });

  const handleFormSubmit = async (contact: Contact, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
    try {
      if (!contact.id) {
        console.log("Create new contact:", contact);
        dispatch(createContact(contact));
      } else {
        console.log("Edit existing contact", contact);
        dispatch(updateContact(contact, contact.id));
      }
      navigate('/contacts');
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (contactId) {
      dispatch(getContactById(+contactId));
    } else {
      setContact(new ContactClass());
    }
  }, [dispatch, contactId]);

  useEffect(() => {
    if (fetchedContact) {
      console.log("Fetched contact");
      setContact(fetchedContact);
    }
  }, [fetchedContact]);

  return (
    <CCard>
      <CCardHeader>
        <h5 className="mb-0">Create Contact</h5>
      </CCardHeader>
      <CCardBody>
        <Formik
          initialValues={contact}
          enableReinitialize
          validationSchema={validationSchema}
          onSubmit={handleFormSubmit}
        >
          {({ handleSubmit, isValid, isSubmitting, dirty }) => (
            <Form onSubmit={handleSubmit} autoComplete='off'>
              <CRow className="mb-3">
                <CCol sm={4}>
                  <label htmlFor="ownerId" className="col-form-label">Contact Owner</label>
                </CCol>
                <CCol sm={8}>
                  <Field as="select" name="ownerId" className="form-select">
                    <option value="">Select owner</option>
                    {owners.map((owner) => (
                      <option key={owner.ownerId} value={owner.ownerId}>{owner.ownerName}</option>
                    ))}
                  </Field>
                  <ErrorMessage name="ownerId" component="div" className="invalid-feedback" />
                </CCol>
              </CRow>
              <CRow className='justify-content-between'>
                <CCol xs={6}>
                  <CRow className="mb-3">
                    <CCol sm={4}>
                      <label htmlFor="firstName" className="col-form-label">First Name</label>
                    </CCol>
                    <CCol sm={8}>
                      <Field type="text" id="firstName" name="firstName" className="form-control" />
                      <ErrorMessage name="firstName" component="div" className="invalid-feedback" />
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CCol sm={4}>
                      <label htmlFor="accountName" className="col-form-label">Account ID</label>
                    </CCol>
                    <CCol sm={8}>
                      <Field type="text" id="accountID" name="accountID" className="form-control" />
                      <ErrorMessage name="accountID" component="div" className="invalid-feedback" />
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CCol sm={4}>
                      <label htmlFor="phone" className="col-form-label">Phone</label>
                    </CCol>
                    <CCol sm={8}>
                      <Field type="text" id="phone" name="phone" className="form-control" placeholder="Enter your phone number" />
                      <ErrorMessage name="phone" component="div" className="invalid-feedback" />
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CCol sm={4}>
                      <label htmlFor="mobile" className="col-form-label">Mobile</label>
                    </CCol>
                    <CCol sm={8}>
                      <Field type="text" id="mobile" name="mobile" className="form-control" placeholder="Enter your mobile number" />
                      <ErrorMessage name="mobile" component="div" className="invalid-feedback" />
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CCol sm={4}>
                      <label htmlFor="department" className="col-form-label">Department</label>
                    </CCol>
                    <CCol sm={8}>
                      <Field type="text" id="department" name="department" className="form-control" placeholder="Enter department" />
                      <ErrorMessage name="department" component="div" className="invalid-feedback" />
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CCol sm={4}>
                      <label htmlFor="homePhone" className="col-form-label">Home Phone</label>
                    </CCol>
                    <CCol sm={8}>
                      <Field type="text" id="homePhone" name="homePhone" className="form-control" placeholder="Home phone" />
                      <ErrorMessage name="homePhone" component="div" className="invalid-feedback" />
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CCol sm={4}>
                      <label htmlFor="linkedinUrl" className="col-form-label">Linkedin URL</label>
                    </CCol>
                    <CCol sm={8}>
                      <Field type="text" id="linkedinUrl" name="linkedinURL" className="form-control" placeholder="Enter your LinkedIn URL" />
                      <ErrorMessage name="linkedinURL" component="div" className="invalid-feedback" />
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CCol sm={4}>
                      <label htmlFor="secondaryEmail" className="col-form-label">Secondary Email</label>
                    </CCol>
                    <CCol sm={8}>
                      <Field type="email" id="secondaryEmail" name="secondaryEmail" className="form-control" placeholder="name@example.com" />
                      <ErrorMessage name="secondaryEmail" component="div" className="invalid-feedback" />
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CCol sm={4}>
                      <label htmlFor="city" className="col-form-label">City</label>
                    </CCol>
                    <CCol sm={8}>
                      <Field type="text" id="city" name="city" className="form-control" placeholder="Enter your city" />
                      <ErrorMessage name="city" component="div" className="invalid-feedback" />
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CCol sm={4}>
                      <label htmlFor="zip" className="col-form-label">Zip</label>
                    </CCol>
                    <CCol sm={8}>
                      <Field type="text" id="zip" name="zip" className="form-control" placeholder="Enter your zip code" />
                      <ErrorMessage name="zip" component="div" className="invalid-feedback" />
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CCol sm={4}>
                      <label htmlFor="description" className="col-form-label">Description</label>
                    </CCol>
                    <CCol sm={8}>
                      <Field as="textarea" id="description" name="description" className="form-control" placeholder="Leave a comment here" />
                      <ErrorMessage name="description" component="div" className="invalid-feedback" />
                    </CCol>
                  </CRow>
                </CCol>

                <CCol xs={6}>
                  <CRow className="mb-3">
                    <CCol sm={4}>
                      <label htmlFor="lastName" className="col-form-label">Last Name</label>
                    </CCol>
                    <CCol sm={8}>
                      <Field type="text" id="lastName" name="lastName" className="form-control" />
                      <ErrorMessage name="lastName" component="div" className="invalid-feedback" />
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CCol sm={4}>
                      <label htmlFor="email" className="col-form-label">Email</label>
                    </CCol>
                    <CCol sm={8}>
                      <Field type="email" id="email" name="email" className="form-control" placeholder="name@example.com" />
                      <ErrorMessage name="email" component="div" className="invalid-feedback" />
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CCol sm={4}>
                      <label htmlFor="otherPhone" className="col-form-label">Other Phone</label>
                    </CCol>
                    <CCol sm={8}>
                      <Field type="text" id="otherPhone" name="otherPhone" className="form-control" placeholder="Enter your second phone number" />
                      <ErrorMessage name="otherPhone" component="div" className="invalid-feedback" />
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CCol sm={4}>
                      <label htmlFor="title" className="col-form-label">Title</label>
                    </CCol>
                    <CCol sm={8}>
                      <Field type="text" id="title" name="title" className="form-control" placeholder="Enter title" />
                      <ErrorMessage name="title" component="div" className="invalid-feedback" />
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CCol sm={4}>
                      <label htmlFor="dateOfBirth" className="col-form-label">Date of birth</label>
                    </CCol>
                    <CCol sm={8}>
                      <Field type="date" id="dateOfBirth" name="dateOfBirth" className="form-control" placeholder="Enter DOB" />
                      <ErrorMessage name="dateOfBirth" component="div" className="invalid-feedback" />
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CCol sm={4}>
                      <label htmlFor="skypeId" className="col-form-label">Skype ID</label>
                    </CCol>
                    <CCol sm={8}>
                      <Field type="text" id="skypeId" name="skypeID" className="form-control" placeholder="Skype ID" />
                      <ErrorMessage name="skypeId" component="div" className="invalid-feedback" />
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CCol sm={4}>
                      <label htmlFor="twitterUrl" className="col-form-label">Twitter URL</label>
                    </CCol>
                    <CCol sm={8}>
                      <Field type="text" id="twitterUrl" name="twitterURL" className="form-control" placeholder="Enter your Twitter URL" />
                      <ErrorMessage name="twitterURL" component="div" className="invalid-feedback" />
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CCol sm={4}>
                      <label htmlFor="mailingStreet" className="col-form-label">Mailing Street</label>
                    </CCol>
                    <CCol sm={8}>
                      <Field type="text" id="mailingStreet" name="mailingStreet" className="form-control" placeholder="Enter your Mailing Street" />
                      <ErrorMessage name="mailingStreet" component="div" className="invalid-feedback" />
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CCol sm={4}>
                      <label htmlFor="state" className="col-form-label">State</label>
                    </CCol>
                    <CCol sm={8}>
                      <Field type="text" id="state" name="state" className="form-control" placeholder="Enter your state" />
                      <ErrorMessage name="state" component="div" className="invalid-feedback" />
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CCol sm={4}>
                      <label htmlFor="country" className="col-form-label">Country</label>
                    </CCol>
                    <CCol sm={8}>
                      <Field type="text" id="country" name="country" className="form-control" placeholder="Enter your country" />
                      <ErrorMessage name="country" component="div" className="invalid-feedback" />
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CCol sm={12} className='text-end'>
                      <button type="submit" className='btn btn-primary' disabled={isSubmitting || !isValid}>
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                      </button>
                    </CCol>
                  </CRow>
                </CCol>
              </CRow>
            </Form>
          )}
        </Formik>
      </CCardBody>
    </CCard>
  );
};

export default CreateOrEditContact;