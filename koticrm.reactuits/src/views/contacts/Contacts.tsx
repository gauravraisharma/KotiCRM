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
  CLink,
} from "@coreui/react";
import "../../css/style.css";
import { useDispatch, useSelector } from "react-redux";
import { MdEditSquare } from "react-icons/md";
import { getContacts } from "../../redux-saga/action";
import { useEffect } from "react";
import { Contact } from "../../models/contact/Contact";
import { AiFillEye } from "react-icons/ai";
import { Link } from "react-router-dom";

const tableHeader = [
  "Contact Name",
  "Account Name",
  "Email",
  "Phone",
  "Contact Owner",
  "Actions",
];

const Contacts = () => {
  // const [contacts, setContacts] = useState([]);
  const dispatch = useDispatch();
  const fetchedContacts = useSelector((state: any) => state.reducer.contacts);

  useEffect(() => {
    dispatch(getContacts());
  }, [dispatch]);

  console.log("Contact on component:");
  console.log(fetchedContacts);

  return (
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
                <Link to={`/contacts/createContact`}>
                  <CButton
                    component="input"
                    type="button"
                    color="primary"
                    value="New"
                    // variant="outline"
                  />
                </Link>
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
                {fetchedContacts ? (
                  fetchedContacts?.map((contact: Contact, index: number) => (
                    <CTableRow key={index}>
                     
                      <CTableDataCell>{`${contact.firstName} ${contact.lastName}`}</CTableDataCell>
                      <CTableDataCell>{contact.accountID}</CTableDataCell>
                      <CTableDataCell>{contact.email}</CTableDataCell>
                      <CTableDataCell>{contact.phone}</CTableDataCell>
                      <CTableDataCell>{contact.ownerId}</CTableDataCell>
                      <CTableDataCell>
                        <Link to={`/contacts/editContact/${contact.id}`}>
                            <MdEditSquare 
                            style={{ color: "green", marginRight: "10px",fontSize:"20px" }}
                          />
                        </Link>

                        <Link to={`/contacts/${contact.id}`}>
                          <AiFillEye style={{ color: "darkblue" ,marginRight: "10px",fontSize:"20px"}} />
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
  );
};

export default Contacts;
