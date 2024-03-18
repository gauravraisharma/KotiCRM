import { CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getContactById } from "../../redux-saga/modules/contact/action";

const ContactDetails = () => {
    const dispatch = useDispatch();
    const fetchedContact = useSelector((state: any) => state.contactReducer.contact);
    const { contactId } = useParams();

    useEffect(() => {
        if (contactId) {
            dispatch(getContactById(+contactId));
        }
    }, [dispatch, contactId]);

    console.log("Contact on component:");
    console.log(fetchedContact);

    return (
        <>
            <CCard className="mb-4">
                <CCardHeader>
                    <CRow>
                        <CCol xs={12}>
                            <h5>Contact Details</h5>
                        </CCol>
                    </CRow>
                </CCardHeader>
                <CCardBody>
                    <CRow>
                        <CCol xs={6}>
                            <CRow>
                                <CCol xs={12}>
                                    <p>
                                        <span className="me-2">Name:</span>
                                        <span>{fetchedContact.firstName}</span>
                                    </p>
                                    <p>
                                        <span className="me-2">Mobile:</span>
                                        <span>{fetchedContact.Mobile}</span>
                                    </p>
                                    <p>
                                        <span className="me-2">Title:</span>
                                        <span>{fetchedContact.title}</span>
                                    </p>
                                </CCol>
                            </CRow>
                        </CCol>
                        <CCol xs={6}>
                            <CRow>
                                <CCol xs={12}>
                                    <p>
                                        <span className="me-2">Department:</span>
                                        <span>{fetchedContact.department}</span>
                                    </p>
                                    <p>
                                        <span className="me-2">Skype Id:</span>
                                        <span>{fetchedContact.skypeID}</span>
                                    </p>
                                    <p>
                                        <span className="me-2">Mailing street:</span>
                                        <span>{fetchedContact.mailingStreet}</span>
                                    </p>
                                </CCol>
                            </CRow>
                        </CCol>
                    </CRow>
                </CCardBody>
            </CCard>
        </>
    );
};

export default ContactDetails;