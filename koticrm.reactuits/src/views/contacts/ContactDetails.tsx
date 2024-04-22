import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
} from "@coreui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getContactById } from "../../redux-saga/modules/contact/action";
import moment from "moment";
import "moment-timezone";

const ContactDetails = () => {
  const dispatch = useDispatch();
  const fetchedContact = useSelector(
    (state: any) => state.contactReducer.contact
  );
  const timezone = useSelector((state: any) => state.sharedReducer.timezone);
  const { contactId } = useParams();

  useEffect(() => {
    if (contactId) {
      dispatch(getContactById(+contactId));
    }
  }, [dispatch, contactId]);

  return (
    <CCard className="mb-4">
      <CCardHeader>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h5>Contact Details</h5>
          </div>

          <div className="text-end">
            <Link to={`/contacts`}>
              <CButton
                component="input"
                type="button"
                color="secondary"
                value="Back To Contacts"
              />
            </Link>
          </div>
        </div>
      </CCardHeader>
      <CCardBody>
        <CRow>
          <ul className="contact-list">
            <CRow>
              <CCol xs={3}>
                <li>
                  Name:
                  <p>{`${fetchedContact?.firstName} ${fetchedContact?.lastName}`}</p>
                </li>
              </CCol>
              <CCol xs={3}>
                <li>
                  Skype ID:
                  <p>{fetchedContact?.skypeID}</p>
                </li>
              </CCol>
              <CCol xs={3}>
                <li>
                  Title:
                  <p>{fetchedContact?.title}</p>
                </li>
              </CCol>
              <CCol xs={3}>
                <li>
                  Account Name:
                  <p>{fetchedContact?.accountName}</p>
                </li>
              </CCol>
              <CCol xs={3}>
                <li>
                  Phone:
                  <p>{fetchedContact?.phone}</p>
                </li>
              </CCol>
              <CCol xs={3}>
                <li>
                  Email:
                  <p>{fetchedContact?.email}</p>
                </li>
              </CCol>
              <CCol xs={3}>
                <li>
                  City:
                  <p>{fetchedContact?.city}</p>
                </li>
              </CCol>
              <CCol xs={3}>
                <li>
                  Country:
                  <p>{fetchedContact?.country}</p>
                </li>
              </CCol>
              <CCol xs={3}>
                <li>
                  ZIP:
                  <p>{fetchedContact?.zip}</p>
                </li>
              </CCol>
              <CCol xs={3}>
                <li>
                  Department:
                  <p>{fetchedContact?.department}</p>
                </li>
              </CCol>
              <CCol xs={3}>
                <li>
                  Twitter URL:
                  <p>{fetchedContact?.twitterURL}</p>
                </li>
              </CCol>
              <CCol xs={3}>
                <li>
                  Date Of Birth:
                  <p>
                    {moment
                      .utc(fetchedContact?.dateOfBirth)
                      .tz(timezone)
                      ?.format("DD/MM/YYYY hh:mm A")}
                  </p>
                </li>
              </CCol>
              <CCol xs={3}>
                <li>
                  Mobile:
                  <p>{fetchedContact?.mobile}</p>
                </li>
              </CCol>
              <CCol xs={3}>
                <li>
                  Other Phone:
                  <p>{fetchedContact?.otherPhone}</p>
                </li>
              </CCol>
              <CCol xs={3}>
                <li>
                  Secondary Email:
                  <p>{fetchedContact?.secondaryEmail}</p>
                </li>
              </CCol>
              <CCol xs={3}>
                <li>
                  Mailing Street:
                  <p>{fetchedContact?.mailingStreet}</p>
                </li>
              </CCol>
              <CCol xs={3}>
                <li>
                  State:
                  <p>{fetchedContact?.state}</p>
                </li>
              </CCol>
              <CCol xs={3}>
                <li>
                  Description:
                  <p>{fetchedContact?.description}</p>
                </li>
              </CCol>
            </CRow>
          </ul>
        </CRow>
      </CCardBody>
    </CCard>
  );
};

export default ContactDetails;
