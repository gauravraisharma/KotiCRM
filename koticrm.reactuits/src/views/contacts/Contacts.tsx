import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton,
} from "@coreui/react";
import "../../css/style.css";
import { useDispatch, useSelector } from "react-redux";
import { MdEditSquare } from "react-icons/md";
import { useEffect } from "react";
import { AiFillEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import { getContacts } from "../../redux-saga/modules/contact/action";
import { ToastContainer } from "react-toastify";
import { ContactWithAccountName } from "../../models/contact/ContactWithAccountName";

const tableHeader = [
  "Contact Name",
  "Account Name",
  "Email",
  "Phone",
  "Contact Owner",
  "Actions",
];

interface Props {
  accountId: number;
  // getContactsCount: (data: number) => void;
}

const Contacts = ({ accountId }: Props) => {
  // const [contacts, setContacts] = useState([]);
  const dispatch = useDispatch();
  const refreshList = useSelector((state: any) => state.contactReducer.refreshList)
  const fetchedContacts = useSelector((state: any) => state.contactReducer.contacts);
  const fetchedAccountOwner = useSelector((state: any) => state.accountReducer.accountOwner);

  let filteredContacts = fetchedContacts;
  if (accountId) {
    filteredContacts = fetchedContacts?.filter((contact: any) => contact.accountID === accountId);
  }
  // const contactsCount = filteredContacts.length;

  useEffect(() => {
    dispatch(getContacts());
  }, [dispatch, refreshList, fetchedContacts]);

  // useEffect(() => {
  //   getContactsCount(contactsCount);
  // });

  
  function getAccountOwnerName(ownerId: string): string {
    const owner = fetchedAccountOwner?.find((owner: any) => owner.id === ownerId);
    return owner ? owner.label : '';
  }

  return (
    <>
      <ToastContainer />
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <CRow>
                <CCol xs={6} className="d-flex align-items-center">
                  <h5>
                    <strong>Contacts</strong>
                  </h5>
                </CCol>
                <CCol xs={6} className="text-end">
                  {accountId && <Link to={`/contacts/createContact`}>
                    <CButton
                      component="input"
                      type="button"
                      color="primary"
                      value="New"
                    // variant="outline"
                    />
                  </Link>}
                </CCol>
              </CRow>
            </CCardHeader>
            <CCardBody>
              <CTable>
                <CTableHead>
                  <CTableRow>
                    {tableHeader.map((header, index) => (
                      <CTableHeaderCell key={index} scope="col">
                        {header}{" "}
                        {/* <span>
                        <CIcon
                          icon={cilHamburgerMenu}
                          title="hamburger"
                          className="me-1"
                          size="lg"
                        />
                      </span> */}
                      </CTableHeaderCell>
                    ))}
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {filteredContacts ? (
                    filteredContacts?.map((contact: ContactWithAccountName, index: number) => (
                      <CTableRow key={index}>

                        <CTableDataCell>{`${contact?.firstName} ${contact?.lastName}`}</CTableDataCell>
                        <CTableDataCell>{contact.accountName}</CTableDataCell>
                        <CTableDataCell>{contact?.email}</CTableDataCell>
                        <CTableDataCell>{contact?.phone}</CTableDataCell>
                        <CTableDataCell>{getAccountOwnerName(contact?.ownerId)}</CTableDataCell>
                        <CTableDataCell>
                          <Link to={`/contacts/editContact/${contact?.id}`}>
                            <MdEditSquare
                              style={{ color: "green", marginRight: "10px", fontSize: "20px" }}
                            />
                          </Link>

                          <Link to={`/contacts/${contact?.id}`}>
                            <AiFillEye style={{ color: "darkblue", marginRight: "10px", fontSize: "20px" }} />
                          </Link>
                        </CTableDataCell>
                      </CTableRow>
                    ))
                  ) : (
                    <div>No contact available</div>
                  )}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default Contacts;