import {
  CButton,
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
} from "@coreui/react";
import { useEffect, useState } from "react";
import { IoDocumentTextSharp } from "react-icons/io5";
import { FaFilePdf } from "react-icons/fa6";

import { useDispatch, useSelector } from "react-redux";
import CreateNewAttachment from "./CreateNewAttachment";
import { getFileSizeAndLabel } from "../../utils/Shared/FileSizeAndLable";
import { formatDate } from "../../utils/Shared/DateTransform";
import { getAttachments } from "../../redux-saga/modules/attachment/action";
import { IoMdDownload } from "react-icons/io";
// import { GrDownload } from "react-icons/gr";

interface Props {
  accountId: number;
  getAttachmentsCount: (data: number) => void;
}

const Attachments = ({ accountId, getAttachmentsCount }: Props) => {
  // getAttachmentsCount,
  const dispatch = useDispatch();
  const fetchedAttachments = useSelector((state: any) => state.attachmentReducer.attachments);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const accountOwner = useSelector(
    (state: any) => state.accountReducer.accountOwner
  );

  let filteredAttachments = fetchedAttachments;
  if (accountId) {
    filteredAttachments = fetchedAttachments?.filter((attachment: any) => attachment.accountID === accountId);
  }
  const attachmentsCount = filteredAttachments.length;

  function getOwnerName(ownerId: string): string {
    const owner = accountOwner?.find((owner: any) => owner.id === ownerId);
    return owner ? owner.label : "";
  }

  useEffect(() => {
    dispatch(getAttachments());
  }, [dispatch]);

  useEffect(() => {
    getAttachmentsCount(attachmentsCount);
  });



  const handleModalOpen = () => {
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const handleButttonClick = (filename: string) => {
    const filePath = `../../../../KotiCRM.Server/Contents/${filename}`;
    const anchor = document.createElement('a');
    anchor.href = filePath;
    anchor.download = filename;
    anchor.click();
  }


  



  return (
    <CRow>
      <CCol xs={12}>
        <CreateNewAttachment
          accountId={accountId}
          isVisible={isModalVisible}
          handleClose={handleModalClose}
        />
        <CCard>
          <CCardHeader className="mb-3">
            {/* <CRow className="align-items-center"> */}
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h5 className="mb-0">Attachments</h5>
              </div>
              <div className="text-end">
                <CButton
                  component="input"
                  type="button"
                  color="primary"
                  value="Add Attachment"
                  style={{ cursor: "pointer" }}
                  onClick={handleModalOpen}
                // variant="outline"
                />
              </div>
            </div>
            {/* </CRow> */}
          </CCardHeader>
          <CCardBody>
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">File Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Attached By</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Date Added</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Size</CTableHeaderCell>
                  <CTableHeaderCell scope="col" className="text-center">Download</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {filteredAttachments ? (
                  filteredAttachments.map((attachment: any) => (
                    <CTableRow>
                      <CTableHeaderCell>
                        {attachment.fileExtension === ".pdf" ? (
                          <FaFilePdf className="pdf" />
                        ) : (
                          <IoDocumentTextSharp className="doc" />
                        )}
                        <CButton className="link" color="link" onClick={() => handleButttonClick(attachment.fileName)}>
                          {attachment.fileName}
                        </CButton>
                      </CTableHeaderCell>
                      <CTableDataCell>
                        {getOwnerName(attachment.userID)}
                      </CTableDataCell>
                      <CTableDataCell>
                        {formatDate(attachment.dateAdded, 'DD/MM/YYYY HH:mm')}
                      </CTableDataCell>
                      <CTableDataCell>
                        {getFileSizeAndLabel(attachment.fileSize)}
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                      <IoMdDownload style={{ color: "green", fontSize: "20px", cursor:"pointer" }} onClick={() => handleButttonClick(attachment.fileName)}/>
                      </CTableDataCell>
                    </CTableRow>
                  ))
                ) : (
                  <div>No Attachment Available</div>
                )}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Attachments;