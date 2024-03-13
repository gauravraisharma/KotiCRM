import { CButton, CCard, CCardBody, CCardHeader, CCol, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from "@coreui/react";
import { useEffect, useState } from "react";
import { BsFiletypeDocx, BsFiletypePdf } from "react-icons/bs";
import { MdOutlinePictureAsPdf } from "react-icons/md";
import CreateOrUpdateAttachment from "./CreateOrUpdateAttachment";
import { useDispatch, useSelector } from "react-redux";
import { getAttachments } from "../../redux-saga/action";

const Attachments = () => {
    const dispatch = useDispatch();
    const fetchedAttachments = useSelector((state: any) => state.reducer.attachments);
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        dispatch(getAttachments());
    }, [dispatch]);

    console.log(fetchedAttachments);


    const handleModalOpen = () => {
        setIsModalVisible(true);
    }

    const handleModalClose = () => {
        setIsModalVisible(false);
    }

    return (
        <CRow>
            <CCol xs={12}>
                <CreateOrUpdateAttachment
                    isVisible={isModalVisible}
                    handleClose={handleModalClose}
                />
                <CCard className="mb-4">
                    <CCardHeader>
                        <CRow className="align-items-center">
                            <CCol xs={6} >Attachments</CCol>
                            <CCol xs={6}>
                                <div className="text-end">
                                    <CDropdown>
                                        <CDropdownToggle color="primary" variant="outline">
                                            Attach
                                        </CDropdownToggle>
                                        <CDropdownMenu>
                                            <CDropdownItem
                                                style={{ cursor: "pointer" }}
                                                onClick={handleModalOpen}
                                            >
                                                Attach File
                                            </CDropdownItem>
                                            {/* <CDropdownItem href="#">Owner</CDropdownItem>
                                            <CDropdownItem href="#">Phone</CDropdownItem>
                                            <CDropdownItem href="#">Country</CDropdownItem> */}
                                        </CDropdownMenu>
                                    </CDropdown>
                                </div>
                            </CCol>
                        </CRow>
                    </CCardHeader>
                    <CCardBody>
                        <CTable>
                            <CTableHead>
                                <CTableRow>
                                    <CTableHeaderCell scope="col">File Name</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Attached By</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Date Added</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Size</CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                {fetchedAttachments ? fetchedAttachments.map(attachment => (
                                    <CTableRow>
                                        <CTableHeaderCell>
                                            {attachment.fileExtension === ".pdf" ?
                                                <BsFiletypePdf className="pdf" /> :
                                                <BsFiletypeDocx className="doc" />}
                                            <CButton className="link" color="link">
                                                {attachment.fileName}
                                            </CButton>
                                        </CTableHeaderCell>
                                        <CTableDataCell>{attachment.userID}</CTableDataCell>
                                        <CTableDataCell>{attachment.dateAdded}</CTableDataCell>
                                        <CTableDataCell>{attachment.sizeMb} MB</CTableDataCell>
                                    </CTableRow>
                                )) : <div>No Attachment Available</div>}
                                <CTableRow>
                                    <CTableHeaderCell>
                                        <MdOutlinePictureAsPdf className="pdf" />
                                        <CButton className="link" color="link">
                                            Learner Settings Page-February 2024.pdf
                                        </CButton>
                                    </CTableHeaderCell>
                                    <CTableDataCell>Gourav Rai</CTableDataCell>
                                    <CTableDataCell>22/02/2024 06:50PM</CTableDataCell>
                                    <CTableDataCell>35kb</CTableDataCell>
                                </CTableRow>
                            </CTableBody>
                        </CTable>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    );
};

export default Attachments;