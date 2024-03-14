import { CButton, CCard, CCardBody, CCardHeader, CCol, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from "@coreui/react";
import { useEffect, useState } from "react";
import { BsFiletypeDocx, BsFiletypePdf } from "react-icons/bs";
import { MdOutlinePictureAsPdf } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getAttachments } from "../../redux-saga/action";
import CreateNewAttachment from "./CreateNewAttachment";
import { getFileSizeAndLabel } from "../../utils/Shared/FileSizeAndLable";
import { getDateTime } from "../../utils/Shared/FormatDate";

interface Props {
    accountId: string,
    accountName: string
}

const Attachments = ({ accountId, accountName }: Props) => {
    const dispatch = useDispatch();
    const fetchedAttachments = useSelector((state: any) => state.reducer.attachments);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const accountOwner = useSelector((state: any) => state.reducer.accountOwner);

    if (accountId) {
        const filteredAttachments = fetchedAttachments.filter(attachment => attachment.accountID === accountId);
    }

    function getOwnerName(ownerId: string): string {
        const owner = accountOwner?.find((owner: any) => owner.id === ownerId);
        return owner ? owner.label : '';
    }

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
                <CreateNewAttachment
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
                                        <CTableDataCell>{getOwnerName(attachment.userID)}</CTableDataCell>
                                        <CTableDataCell>{getDateTime(attachment.dateAdded)}</CTableDataCell>
                                        <CTableDataCell>{getFileSizeAndLabel(attachment.fileSize)}</CTableDataCell>
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