import { CButton, CCol, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CRow } from "@coreui/react";
import { Form, Formik } from "formik";
import * as Yup from "yup";

interface Props {
    isVisible: boolean;
    handleClose: () => void;
}

const CreateOrUpdateAttachment = ({ isVisible, handleClose }: Props) => {

    const validationSchema = Yup.object().shape({
        ownerId: Yup.number().required('Owner ID is required'),
        // firstName: Yup.string().required('First Name is required'),
        // lastName: Yup.string().required('Last Name is required'),
        // accountID: Yup.number().required('Account ID is required'),
        // email: Yup.string().email('Invalid email').required('Email is required')
      });

    const handleFormSubmit = async (contact: Contact, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
        try {
            contact.country = selectedCountry;
            contact.state = selectedState;
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

    return (
        <CModal
            alignment="center"
            scrollable
            visible={isVisible}
            onClose={handleClose}
            aria-labelledby="VerticallyCenteredScrollableExample"
        >
            <CModalHeader>
                <CModalTitle id="VerticallyCenteredScrollableExample">Create or Update Attachment</CModalTitle>
            </CModalHeader>
            <Formik
                initialValues={contact}
                enableReinitialize
                validationSchema={validationSchema}
                onSubmit={handleFormSubmit}
            >
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form onSubmit={handleSubmit} autoComplete='off'>
                        <CRow className='justify-content-between'>
                            <CCol xs={6}></CCol>
                            <CCol xs={6}></CCol>
                        </CRow>
                    </Form>
                )}
            </Formik>
            <CModalBody>
                <p>
                    Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
                    in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                </p>
                <p>
                    Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus
                    vel augue laoreet rutrum faucibus dolor auctor.
                </p>
                <p>
                    Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel
                    scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus
                    auctor fringilla.
                </p>
                <p>
                    Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
                    in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                </p>
                <p>
                    Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus
                    vel augue laoreet rutrum faucibus dolor auctor.
                </p>
            </CModalBody>
            <CModalFooter>
                <CButton color="secondary" onClick={handleClose}>
                    Close
                </CButton>
                <CButton type="submit" color="primary">Save changes</CButton>
            </CModalFooter>
        </CModal>
    );
};

export default CreateOrUpdateAttachment;