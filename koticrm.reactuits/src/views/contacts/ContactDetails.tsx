import {CCard,CCardBody,CCardHeader,CCardText,CCol,CRow,} from "@coreui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getContactById } from "../../redux-saga/modules/contact/action";
import { formatDate } from "../../utils/Shared/DateTransform";

interface DetailRowProps {
  label: string;
  value: string;
}

const DetailRow = ({ label, value }: DetailRowProps) => (
  <div className="mb-2 d-flex align-items-center">
    <span className="font-weight-bold" style={{ color: "grey", flex: "2" }}>
      {label}
    </span>
    <span className="ms-2" style={{ flex: "1" }}>
      :
    </span>
    <span className="ms-2" style={{ flex: "4" }}>
      {value}
    </span>
  </div>
);

const ContactDetails = () => {
  const dispatch = useDispatch();
  const fetchedContact = useSelector((state: any) => state.contactReducer.contact);
  const { contactId } = useParams();

  useEffect(() => {
    if (contactId) {
      dispatch(getContactById(+contactId));
    }
  }, [dispatch, contactId]);

  return (
    <CCard className="mb-4">
      <CCardHeader>
        <CRow>
          <CCol>
            <h5>Contact Details</h5>
          </CCol>
        </CRow>
      </CCardHeader>
      <CCardBody>
        <CCardText>
          <CRow>
            <CCol xs={6}>
              <DetailRow
                label="Name"
                value={`${fetchedContact.firstName} ${fetchedContact.lastName}`}
              />
              <DetailRow label="Skype ID" value={fetchedContact.skypeID} />
              <DetailRow label="Title" value={fetchedContact.title} />
              <DetailRow
                label="Account Name"
                value={fetchedContact.accountName}
              />
              <DetailRow label="Phone" value={fetchedContact.phone} />
              <DetailRow label="Email" value={fetchedContact.email} />
              <DetailRow label="City" value={fetchedContact.city} />
              <DetailRow label="Country" value={fetchedContact.country} />
              <DetailRow label="ZIP" value={fetchedContact.zip} />
            </CCol>
            <CCol xs={6}>
              <DetailRow label="Department" value={fetchedContact.department} />
              <DetailRow
                label="Twitter URL"
                value={fetchedContact.twitterURL}
              />
              <DetailRow
                label="Date Of Birth"
                value={formatDate(fetchedContact.dateOfBirth)}
              />
              <DetailRow label="Mobile" value={fetchedContact.mobile} />
              <DetailRow
                label="Other Phone"
                value={fetchedContact.otherPhone}
              />
              <DetailRow
                label="Secondary Email"
                value={fetchedContact.secondaryEmail}
              />
              <DetailRow
                label="Mailing Street"
                value={fetchedContact.mailingStreet}
              />
              <DetailRow label="State" value={fetchedContact.state} />
              <DetailRow
                label="Description"
                value={fetchedContact.description}
              />
            </CCol>
          </CRow>
        </CCardText>
      </CCardBody>
    </CCard>
  );
};

export default ContactDetails;
