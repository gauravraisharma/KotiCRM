import { CButton, CCol, CForm, CFormInput, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CRow } from "@coreui/react";
import { CreateAttachment, CreateAttachmentClass } from "../../models/attachment/Attachment";
import { FormEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createAttachment } from "../../redux-saga/modules/attachment/action";

// const owners = [
//     { id: '1', firstName: 'John', lastName: 'Doe', email: 'john@example.com', logo: 'path_to_logo1' },
//     { id: '2', firstName: 'Jane', lastName: 'Smith', email: 'rony@test1.com', logo: 'path_to_logo2' },
//     { id: '3', firstName: 'Billy', lastName: 'Butcher', email: 'billy@example.com', logo: 'path_to_logo2' },
//     { id: '4', firstName: 'John', lastName: 'Doe', email: 'john@example.com', logo: 'path_to_logo1' },
//     { id: '5', firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com', logo: 'path_to_logo2' }
// ]

interface Props {
    isVisible: boolean;
    handleClose: () => void;
}

const CreateNewAttachment = ({ isVisible, handleClose }: Props) => {
    const dispatch = useDispatch();
    const [newAttachment, setNewAttachment] = useState<CreateAttachment>(new CreateAttachmentClass());
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        // Handle file change after component has rendered
        if (newAttachment.file) {
            console.log(newAttachment);
        }
    }, [newAttachment]);

    const resetForm = () => {
        setNewAttachment(new CreateAttachmentClass());
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const file = event.target.files[0];
            const fileReader = new FileReader();
            fileReader.onload = () => {
                setNewAttachment({
                    ...newAttachment,
                    file,
                });
            };
            fileReader.readAsDataURL(file);
        }
        console.log(newAttachment);
    }

    const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            setSubmitting(true);
            const formDataToSend = new FormData();
            formDataToSend.append('userId', newAttachment.userID);
            formDataToSend.append('file', newAttachment.file as Blob);
            console.log("Submitting");
            
            dispatch(createAttachment(formDataToSend));
            resetForm();
            handleClose();
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
                <CModalTitle id="VerticallyCenteredScrollableExample">Create Attachment</CModalTitle>
            </CModalHeader>
            <CForm onSubmit={handleFormSubmit}>
                <CModalBody>
                    <CRow className='justify-content-between'>
                        <CCol xs={12}>
                            <CFormInput
                                type="file"
                                id="file"
                                name="file"
                                onChange={event => handleFileChange(event)}
                            />
                        </CCol>
                    </CRow>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={handleClose}>
                        Close
                    </CButton>
                    <CButton type="submit" color="primary" disabled={submitting}>
                        {submitting ? 'Submitting...' : 'Submit'}
                    </CButton>
                </CModalFooter>
            </CForm>
        </CModal>
    );
};

export default CreateNewAttachment;