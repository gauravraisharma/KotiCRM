import { CButton, CCol, CFormInput, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CRow } from "@coreui/react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { CreateAttachment, CreateAttachmentClass } from "../../models/attachment/Attachment";
import { useDispatch } from "react-redux";
import { createAttachment } from "../../redux-saga/action";
import { useNavigate } from "react-router-dom";
import SearchDropdown from "../base/select/SearchDropdown";
import { useState } from "react";

const owners = [
    { id: '1', firstName: 'John', lastName: 'Doe', email: 'john@example.com', logo: 'path_to_logo1' },
    { id: '2', firstName: 'Jane', lastName: 'Smith', email: 'rony@test1.com', logo: 'path_to_logo2' },
    { id: '3', firstName: 'Billy', lastName: 'Butcher', email: 'billy@example.com', logo: 'path_to_logo2' },
    { id: '4', firstName: 'John', lastName: 'Doe', email: 'john@example.com', logo: 'path_to_logo1' },
    { id: '5', firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com', logo: 'path_to_logo2' }
]

interface Props {
    isVisible: boolean;
    handleClose: () => void;
}

const CreateOrUpdateAttachment = ({ isVisible, handleClose }: Props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const [newAttachment, setNewAttachment] = useState<CreateAttachment>(new CreateAttachmentClass());
    const [newAttachment, setNewAttachment] = useState(new CreateAttachmentClass());
    let fileToUpload: any = null;

    const validationSchema = Yup.object().shape({
        userID: Yup.string().required('Owner ID is required'),
        // dateAdded: Yup.date().required('Date Added is required'),
        // file: Yup.mixed().required('File is required'), // Validate the file
    });

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const file = event.target.files[0];
            console.log("Current State of File: ", file);
            fileToUpload = file;
            // setNewAttachment(prevState => ({
            //     ...prevState,
            //     file: file
            // }));
            // console.log(newAttachment);
            
        }
    }

    const handleFormSubmit = async (values: CreateAttachment, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
        try {
            const formData = new FormData();
            formData.append("userID", values.userID);
            formData.append("file", fileToUpload);
            console.log("Create new attachment:", formData);
            dispatch(createAttachment(formData));
            // navigate('/contacts');
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
            size="lg"
        >
            <CModalHeader>
                <CModalTitle id="VerticallyCenteredScrollableExample">Create or Update Attachment</CModalTitle>
            </CModalHeader>
            <Formik
                initialValues={newAttachment}
                enableReinitialize
                validationSchema={validationSchema}
                onSubmit={handleFormSubmit}
            >
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form onSubmit={handleSubmit} autoComplete='off'>
                        <CRow className='justify-content-between'>
                            <CModalBody style={{ height: "500px", maxHeight: "550px" }}>
                                <CCol xs={12}>
                                    <CRow className="mb-3">
                                        <CCol sm={4}>
                                            <label htmlFor="userID" className="col-form-label">User ID</label>
                                        </CCol>
                                        <CCol sm={8}>
                                            <SearchDropdown name="userID" options={owners} />
                                            <ErrorMessage name="userID" component="div" className="invalid-feedback" />
                                        </CCol>
                                    </CRow>
                                    <CRow className="mb-3">
                                        <CCol sm={4}>
                                            <label htmlFor="file" className="col-form-label">File</label>
                                        </CCol>
                                        <CCol sm={8}>
                                            <Field
                                                type="file"
                                                id="file"
                                                name="file"
                                                className="form-control"
                                                onChange={handleFileChange}
                                            />
                                            <ErrorMessage name="file" component="div" className="invalid-feedback" />
                                        </CCol>
                                    </CRow>
                                </CCol>
                            </CModalBody>
                            <CModalFooter>
                                <CButton color="secondary" onClick={handleClose}>
                                    Close
                                </CButton>
                                <CButton type="submit" color="primary" disabled={isSubmitting || !isValid}>
                                    {isSubmitting ? 'Submitting...' : 'Submit'}
                                </CButton>
                            </CModalFooter>
                        </CRow>
                    </Form>
                )}
            </Formik>
        </CModal>
    );
};

export default CreateOrUpdateAttachment;